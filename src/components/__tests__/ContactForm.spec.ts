import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"
import { useContactStore } from "@/stores/contact"
import ContactForm from "@/components/ContactForm.vue"

function mountForm() {
  return mount(ContactForm, {
    global: {
      plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn })],
    },
  })
}

describe("ContactForm (unit)", () => {
  it("is disabled when empty and shows required errors after submit attempt", async () => {
    const wrapper = mountForm()

    expect(wrapper.get('button[type="submit"]').attributes("disabled")).toBeDefined()

    await wrapper.get("form").trigger("submit.prevent")

    const errors = wrapper.findAll(".error")
    expect(errors).toHaveLength(3)

    errors.forEach((error) => {
        expect(error.classes()).not.toContain("hidden")
    })
  })

  it("enables submit when inputs are valid and hides errors", async () => {
    const wrapper = mountForm()
    const store = useContactStore()

    store.name = "Gi"
    store.email = "gi@example.com"
    await wrapper.get("#message").setValue("Hello!")

    expect(wrapper.get('button[type="submit"]').attributes("disabled")).toBeUndefined()

    const errors = wrapper.findAll(".error")
    expect(errors).toHaveLength(3)
    errors.forEach((error) => {
        expect(error.classes()).toContain("hidden")
    })
  })

  it("shows invalid email error", async () => {
    const wrapper = mountForm()
    const store = useContactStore()

    store.name = "Gi"
    store.email = "not-an-email"
    await wrapper.get("#message").setValue("Hello!")

    await wrapper.get("form").trigger("submit.prevent")
    expect(wrapper.text()).toContain("Email is invalid")
  })

  it("disables submit button while submitting", async () => {
    const wrapper = mountForm()
    const store = useContactStore()

    store.name = "Gi"
    store.email = "gi@example.com"
    await wrapper.get("#message").setValue("Hello!")

    // Mock fetch to delay response
    global.fetch = vi.fn(() =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(
              new Response(JSON.stringify({}), {
                status: 200,
              })
            ),
          100
        )
      )
    ) as any

    const button = wrapper.get('button[type="submit"]')
    expect(button.attributes("disabled")).toBeUndefined()

    wrapper.get("form").trigger("submit.prevent")
    await wrapper.vm.$nextTick()

    // Button should be disabled and show "Sending..."
    expect(button.attributes("disabled")).toBeDefined()
    expect(button.text()).toBe("Sending...")
  })

  it("shows success message after form submission", async () => {
    const wrapper = mountForm()
    const store = useContactStore()

    store.name = "Gi"
    store.email = "gi@example.com"
    await wrapper.get("#message").setValue("Hello!")

    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({}), { status: 200 }))
    ) as any

    await wrapper.get("form").trigger("submit.prevent")
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain("Success! Thank you for your feedback.")
    expect(wrapper.find(".status.success").exists()).toBe(true)
  })

  it("shows error message on submission failure", async () => {
    const wrapper = mountForm()
    const store = useContactStore()

    store.name = "Gi"
    store.email = "gi@example.com"
    await wrapper.get("#message").setValue("Hello!")

    global.fetch = vi.fn(() =>
      Promise.reject(new Error("Network error"))
    ) as any

    await wrapper.get("form").trigger("submit.prevent")
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain("Something went wrong. Please try again.")
    expect(wrapper.find(".status.error").exists()).toBe(true)
  })

  it("clears message field after successful submission", async () => {
    const wrapper = mountForm()
    const store = useContactStore()

    store.name = "Gi"
    store.email = "gi@example.com"
    await wrapper.get("#message").setValue("Hello!")

    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({}), { status: 200 }))
    ) as any

    await wrapper.get("form").trigger("submit.prevent")
    await wrapper.vm.$nextTick()

    expect((wrapper.get("#message").element as HTMLTextAreaElement).value).toBe("")
  })
})
