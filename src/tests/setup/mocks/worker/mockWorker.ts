import { vi } from "vitest";

export const mockWorker = () => {
	class WorkerMock {
		postMessage() {}
		terminate() {}
		addEventListener() {}
	}

	vi.stubGlobal("Worker", WorkerMock);
};