import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Calculator from "../Calculator.vue"

function clickByText(wrapper: any, text: string) {
    const button = wrapper
        .findAll("button")
        .find((b: any) => b.text() === text)
    expect(button, 'Could not find button with text: "${text}"').toBeTruthy(); 
    return button!.trigger("click")
}

describe("Calculator.vue", () => {
    it("shows 0 when expression is empty", () => {
        const wrapper = mount(Calculator)
        expect(wrapper.find(".display").text()).toBe("0")
    })

    it("enters digits on click", async () => {
        const wrapper = mount(Calculator)
        
        await clickByText(wrapper, "7")
        await clickByText(wrapper, "8")
        await clickByText(wrapper, "9")

        expect(wrapper.find(".display").text()).toBe("789")
    })

    it("Clicking C resets the expression", async () => {
        const wrapper = mount(Calculator)

        await clickByText(wrapper, "9")
        await clickByText(wrapper, "+")
        await clickByText(wrapper, "1")

        expect(wrapper.find(".display").text()).toBe("9+1")

        await clickByText(wrapper, "C")

        expect(wrapper.find(".display").text()).toBe("0")
    })

    it("Clicking DEL removes the last character", async () => {
        const wrapper = mount(Calculator)

        await clickByText(wrapper, "9")
        await clickByText(wrapper, "+")
        await clickByText(wrapper, "1")

        expect(wrapper.find(".display").text()).toBe("9+1")

        await clickByText(wrapper, "DEL")

        expect(wrapper.find(".display").text()).toBe("9+")
    })

    it("Clicking ANS inserts the latest result if it exists", async () => {
        const wrapper = mount(Calculator)

        await clickByText(wrapper, "9")
        await clickByText(wrapper, "+")
        await clickByText(wrapper, "1")
        await clickByText(wrapper, "=")

        expect(wrapper.find(".display").text()).toBe("10")

        await clickByText(wrapper, "C")
        await clickByText(wrapper, "ANS")

        expect(wrapper.find(".display").text()).toBe("10")
    })

    it("Clicking +/- toggles the sign of the last number segment", async () => {
        const wrapper = mount(Calculator)

        await clickByText(wrapper, "1")
        await clickByText(wrapper, "+")
        await clickByText(wrapper, "3")
        await clickByText(wrapper, "+/-")

        expect(wrapper.find(".display").text()).toBe("1+-3")

        await clickByText(wrapper, "+/-")

        expect(wrapper.find(".display").text()).toBe("1+3")
    })

    it("Clicking = evaluates, updates the display, and emits new-calculation", async () => {
        const wrapper = mount(Calculator)

        await clickByText(wrapper, "1")
        await clickByText(wrapper, "+")
        await clickByText(wrapper, "3")
        await clickByText(wrapper, "=")

        expect(wrapper.find(".display").text()).toBe("4")
        expect(wrapper.find(".error").exists()).toBe(false)

        const emitted = wrapper.emitted("new-calculation")
        expect(emitted).toBeDefined()
        expect(emitted?.[0]?.[0]).toEqual({ expression: "1+3", result: 4 })
    })

    it("Operator is ignored if expression is empty", async () => {
        const wrapper = mount(Calculator)

        await clickByText(wrapper, "+")

        expect(wrapper.find(".display").text()).toBe("0")
    })

    it("Operator replaces the previous operator/decimal point", async () => {
        const wrapper = mount(Calculator)

        await clickByText(wrapper, "2")
        await clickByText(wrapper, ".")
        expect(wrapper.find(".display").text()).toBe("2.")

        await clickByText(wrapper, "/")
        expect(wrapper.find(".display").text()).toBe("2/")

        await clickByText(wrapper, "+")
        expect(wrapper.find(".display").text()).toBe("2+")
    })

    it("Clicking '.' after operator -> 0.", async () => {
        const wrapper = mount(Calculator)

        await clickByText(wrapper, "2")
        await clickByText(wrapper, "+")

        expect(wrapper.find(".display").text()).toBe("2+")

        await clickByText(wrapper, ".")

        expect(wrapper.find(".display").text()).toBe("2+0.")
    })

    it("Prevents multiple '.' in the same expression", async () => {
        const wrapper = mount(Calculator)

        await clickByText(wrapper, "2")
        await clickByText(wrapper, ".")

        expect(wrapper.find(".display").text()).toBe("2.")

        await clickByText(wrapper, ".")
        expect(wrapper.find(".display").text()).toBe("2.")
    })

    it("Clicking '=' shows an error if expression ends with an operator/'.'", async () => {
        const wrapper = mount(Calculator)

        await clickByText(wrapper, "2")
        await clickByText(wrapper, "+")
        await clickByText(wrapper, "=")

        expect(wrapper.find(".error").exists()).toBe(true)
    })
})