import { beforeEach, describe, expect, it, vi } from "vitest";
import { EventBus } from "./eventBus";

type TTestBusEvents = "withPayload" | "withoutPayload" | "a1" | "a2"

describe("eventBus", () => {
	let eventBus: EventBus<TTestBusEvents>;

	beforeEach(() => {
		eventBus = new EventBus();
	});

	it("Subscribe to one event, emit once with payload", () => {
		let receivedValue: unknown = null;
		const valueToEmit: number = 1;

		eventBus.subscribe("withPayload", (payload) => receivedValue = payload);
		eventBus.emit("withPayload", { payload: 1 });

		expect(receivedValue).toEqual(valueToEmit);
	});

	it("Subscribe to one event, emit to another one", () => {
		const mockCallback = vi.fn();

		eventBus.subscribe("a1", mockCallback);

		eventBus.emit("a2");
		expect(mockCallback).not.toHaveBeenCalled();

		eventBus.emit("a1");
		expect(mockCallback).toHaveBeenCalledOnce();
	});

	it("Subscribe to one event, emit twice", () => {
		const mockCallback = vi.fn();

		eventBus.subscribe("withoutPayload", mockCallback);
		eventBus.emit("withoutPayload");
		eventBus.emit("withoutPayload");

		expect(mockCallback).toHaveBeenCalledTimes(2);
	});

	it("Emit one event to multiple listeners", () => {
		const mockCallback1 = vi.fn();
		const mockCallback2 = vi.fn();

		eventBus.subscribe("withoutPayload", mockCallback1);
		eventBus.subscribe("withoutPayload", mockCallback2);

		expect(mockCallback1).not.toHaveBeenCalled();
		expect(mockCallback2).not.toHaveBeenCalled();

		eventBus.emit("withoutPayload");

		expect(mockCallback1).toHaveBeenCalledOnce();
		expect(mockCallback2).toHaveBeenCalledOnce();
	});

	it("Emit 2 events to one listener", () => {
		const mockCallback = vi.fn();

		eventBus.subscribe("a1", mockCallback);
		eventBus.subscribe("a2", mockCallback);

		expect(mockCallback).not.toHaveBeenCalled();

		eventBus.emit("a1");
		eventBus.emit("a2");

		expect(mockCallback).toHaveBeenCalledTimes(2);
	});

	it("Unsubscribe one listener", () => {
		const mockCallback = vi.fn();

		const listenerId = eventBus.subscribe("withoutPayload", mockCallback);
		eventBus.unsubscribe(listenerId);

		eventBus.emit("withoutPayload");
		expect(mockCallback).not.toHaveBeenCalled();
	});

	it("Unsubscribe already unsubscribed listener", () => {
		expect(() => eventBus.unsubscribe(0)).not.toThrowError();
	});
});