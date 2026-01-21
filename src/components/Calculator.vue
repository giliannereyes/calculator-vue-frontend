<script>
    export default {
        name: "Calculator",
        emits: ["new-calculation"],

        data() {
            return {
                expression: "",
                lastResult: null,
                error: ""
            }
        },

        methods: {
            clearAll() {
                this.expression = ""
                this.error = ""
            },

            backspace() {
                this.error = ""
                this.expression = this.expression.slice(0, -1)

            },

            lastAnswer() {
                this.error = ""
                if (this.lastResult == null) return
                this.expression += String(this.lastResult)
            },

            appendDigit(d) {
                this.error = ""
                this.expression += d 
            },

            appendOperator(op) {
                this.error = ""
                if (!this.expression) return
                
                // replace the former operator 
                const last = this.expression[this.expression.length -1]
                if (this.isOperator(last) || last === ".") {
                    this.expression = this.expression.slice(0, -1) + op
                    return 
                }

                this.expression += op
            },

            appendDot() {
                this.error = ""
                
                // if empty -> inputs 0.
                if (!this.expression) {
                    this.expression = "0."
                    return
                }
                
                // if dot after operator -> 0. 
                const last = this.expression[this.expression.length - 1]
                if (this.isOperator(last)) {
                    this.expression += "0."
                    return 
                }

                // prevent multiple dots 
                const currentNumber = this.getCurrentNumberSegment()
                if (currentNumber.includes(".")) return
                this.expression += "."
            },

            changeSign() {
                this.error = ""
                if (!this.expression) return

                const {startIndex, segment} = this.getCurrentNumberSegmentWithIndex()
                if (!segment) return

                // segment has a leading minus -> remove it; else add it
                let newSegment = segment 
                if (segment.startsWith("-")) {
                    newSegment = segment.slice(1)
                } else {
                    newSegment = "-" + segment 
                }

                this.expression = this.expression.slice(0, startIndex) + newSegment
            },

            evaluate() {
                this.error = ""
                if (!this.expression) return 
                
                const last = this.expression[this.expression.length - 1]
                if (this.isOperator(last) || last == ".") {
                    this.error = "Invalid equation. Ends with an operator or a decimal point."
                    return
                }

                if (!/^[0-9+\-*/.\s]+$/.test(this.expression)) {
                    this.error = "Invalid characters in the equation."
                    return
                }

                try {
                    const result = Function(`"use strict"; return (${this.expression})`)()

                    if (!Number.isFinite(result)) {
                        this.error = "Invalid result."
                        return 
                    }

                    this.lastResult = result 

                    this.$emit("new-calculation", {
                        expression: this.expression, 
                        result
                    })

                    this.expression = String(result)
                } catch (e) {
                    this.error = "The equation could not be calculated."
                }
            },

            isOperator(ch) {
                return ch === "+" || ch === "-" || ch === "*" || ch == "/"            
            }, 

            getCurrentNumberSegment() {
                return this.expression.split(/[+\-*/]/).pop() ?? ""
            },

            getCurrentNumberSegmentWithIndex() {
                let lastOpIndex = -1
                for (let i = this.expression.length - 1; i >= 0; i--) {
                    if (this.isOperator(this.expression[i])) {
                        lastOpIndex = i
                        break
                    }
                }

                const startIndex = lastOpIndex + 1
                const segment = this.expression.slice(startIndex)

                return { startIndex, segment }
            }
        }
    }
</script>

<template>
    <div class="calculator">
        <div class="display" aria-live="polite">
            {{ expression ||  "0" }}
        </div>
        <div class="grid">
            <button class="button_utility" @click="clearAll">C</button>
            <button class="button_utility" @click="backspace">DEL</button>
            <button class="button_utility" @click="lastAnswer">ANS</button>
            <button class="button_operation" @click="appendOperator('/')">/</button>
            
            <button class="button" @click="appendDigit('7')">7</button>
            <button class="button" @click="appendDigit('8')">8</button>
            <button class="button" @click="appendDigit('9')">9</button>
            <button class="button_operation" @click="appendOperator('*')">X</button>

            <button class="button" @click="appendDigit('4')">4</button>
            <button class="button" @click="appendDigit('5')">5</button>
            <button class="button" @click="appendDigit('6')">6</button>
            <button class="button_operation" @click="appendOperator('-')">–</button>

            <button class="button" @click="appendDigit('1')">1</button>
            <button class="button" @click="appendDigit('2')">2</button>
            <button class="button" @click="appendDigit('3')">3</button>
            <button class="button_operation" @click="appendOperator('+')">+</button>

            <button class="button" @click="changeSign">+/-</button>
            <button class="button" @click="appendDigit('0')">0</button>
            <button class="button" @click="appendDot">.</button>
            <button class="button_equals" @click="evaluate">=</button>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<style scoped>
    .calculator {
        width: min(92vw, 420px); 
        margin: 0 auto; 
        padding: 16px; 
        border-radius: 16px; 
        background: #181818;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35),0 1px 0 rgba(255, 255, 255, 0.04) inset;
    }

    .display {
        border: 1px solid #ddd; 
        background: #fff; 
        border-radius: 12px; 
        padding: 14px 16px; 
        font-size: 32px; 
        color: #111; 
        text-align: right; 
        font-weight: 600; 
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis;
        margin-bottom: 12px;
    }

    .grid {
        display: grid; 
        grid-template-columns: repeat(4, 1fr);
        gap: 10px; 
    }

    button {
        border-radius: 12px; 
        padding: 14px 10px; 
        font-size: 18px; 
        cursor: pointer; 
        user-select: none; 
        background: #363737;
        color: #fbfbfb;
        transition: transform 0.05s ease, filter 0.15s ease;
    }

    button:active {
        transform: translateY(1px); 
    }

    .button_utility {
        background: #a5a4a4;
        font-weight: 700;
    }

    .button_operation {
        background: #ff9601;
        font-weight: 800;
    }

    .button_equals {
        background: #ff9601;
        font-weight: 900; 
    }

    button:hover {
        filter: brightness(0.97); 
    }

    .error {
        margin-top: 10px; 
        padding: 10px 12px; 
        border-radius: 10px; 
        border: 1px solid #f2b8b5; 
        background: #fff5f5; 
        color: #7a1f1c; 
        font-size: 14px; 
    }

    @media (max-width: 360px) {
        .calculator {
            padding: 12px; 
        }
        .display {
            font-size: 26px; 
            padding: 12px; 
        }
        button {
            padding: 12px 8px; 
            font-size: 16px; 
        }
    }
</style>