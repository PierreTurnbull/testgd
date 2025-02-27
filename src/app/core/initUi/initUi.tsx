import { render } from "preact"

export const initUi = () => {
    const rootEl = document.querySelector("#root")

    if (!rootEl) {
        throw new Error("Root element does not exist.")
    }

    const jsxRoot = (
        <div>
            test
            <p>l</p>
        </div>
    )

    render(jsxRoot, rootEl)
}