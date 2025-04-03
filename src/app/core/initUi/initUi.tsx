// reset
import "@app/core/reset.css";
// tailwind
import "@app/core/tailwind.css";
// index
import "@app/core/index.css";
import { render } from "preact";
import { App } from "../ui/App";

export const initUi = () => {
	const rootEl = document.querySelector("#root")

	if (!rootEl) {
		throw new Error("Root element does not exist.");
	}

	const jsxRoot = <App />;

	render(jsxRoot, rootEl);
};