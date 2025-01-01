import { vi } from "vitest";
import { mockPixi } from "./pixi/mockPixi";
import { mockConsole } from "./console/mockConsole";
import { mockWorker } from "./worker/mockWorker";

export const mockAll = () => {
	vi.doMock("pixi.js", mockPixi);
	mockWorker();
	mockConsole();
};