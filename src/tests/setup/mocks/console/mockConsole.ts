import { vi } from "vitest";

/**
 * Mocks the console.
 */
export const mockConsole = () => {
	vi.spyOn(console, "time").mockImplementation(() => {});
	vi.spyOn(console, "timeEnd").mockImplementation(() => {});
};