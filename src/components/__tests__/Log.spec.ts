import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Calculator from "../Calculator.vue"
import Log from "../Log.vue"

function clickByText(wrapper: any, text: string) {
    const button = wrapper
        .findAll("button")
        .find((b: any) => b.text() === text)
    expect(button, 'Could not find button with text: "${text}"').toBeTruthy(); 
    return button!.trigger("click")
}

describe("Log.vue", async () => {
    it("shows the correct expression and result", async () => {
        const calculator = mount(Calculator)
        
        await clickByText(calculator, "9")
        await clickByText(calculator, "+")
        await clickByText(calculator, "1")
        await clickByText(calculator, "=")

        const emitted = calculator.emitted("new-calculation")?.[0]?.[0]
        expect(emitted).toBeTruthy()

        const log = mount(Log, {
            props: {
                entries: [emitted]
            }
        })

        expect(log.find(".eq").text()).toBe("9+1")
        expect(log.find(".result").text()).toBe("10")
    })

    it("empty when no calculations are performed", async () => {
        const log = mount(Log, {
            props: {
                entries: []
            }
        })
        expect(log.find(".list").exists()).toBe(false)
        expect(log.find(".empty").exists()).toBe(true)    
    })

    it("shows multiple entries in correct order", async () => {
        const calculator = mount(Calculator)
        
        await clickByText(calculator, "9")
        await clickByText(calculator, "+")
        await clickByText(calculator, "1")
        await clickByText(calculator, "=")

        await clickByText(calculator, "C")

        await clickByText(calculator, "9")
        await clickByText(calculator, "/")
        await clickByText(calculator, "3")
        await clickByText(calculator, "=")

        const emissions = calculator.emitted("new-calculation")
        expect(emissions).toHaveLength(2)

        const firstCalc = emissions?.[0]?.[0]
        const secondCalc = emissions?.[1]?.[0]

        const log = mount(Log, {
            props: {
                entries: [secondCalc, firstCalc]
            }
        })

        const items = log.findAll(".item")
        expect(items).toHaveLength(2)

        expect(items[0]?.find(".eq").text()).toBe("9/3")
        expect(items[0]?.find(".result").text()).toBe("3")
        expect(items[1]?.find(".eq").text()).toBe("9+1")
        expect(items[1]?.find(".result").text()).toBe("10")
    })
})

