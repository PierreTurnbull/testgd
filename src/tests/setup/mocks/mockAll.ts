import { vi } from "vitest";
import { mockPixi } from "./pixi/mockPixi";
import { mockConsole } from "./console/mockConsole";

export const mockAll = () => {
	vi.doMock("pixi.js", mockPixi);
	mockConsole();
};