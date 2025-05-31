// reset
import "@app/core/utils/initUi/styles/reset.css";
// tailwind
import "@app/core/utils/initUi/styles/tailwind.css";
// index
import "@app/core/utils/initUi/styles/index.css";
import { render } from "preact";
import { App } from "../../../ui/App";

export const initUi = () => {
	const rootEl = document.querySelector("#root");

	if (!rootEl) {
		throw new Error("Root element does not exist.");
	}

	const jsxRoot = <App />;

	render(jsxRoot, rootEl);
};