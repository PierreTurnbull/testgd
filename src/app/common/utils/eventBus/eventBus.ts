import { TAvailableEvents as TAvailableEventsBase, TListener, TListenerCallback, TListenerId } from "../../types/eventBus.types";

export class EventBus<TAvailableEvents extends TAvailableEventsBase> {
	private _idIncrementer = 0;
	private _listeners: TListener<
		TAvailableEvents[number]["key"],
		TAvailableEvents[number] extends { payload: infer P } ? P : undefined
	>[] = [];

	/**
	 * Returns the list of listeners that listen to eventKey.
	 */
	private getListenersByEventKey<T extends TAvailableEvents[number]["key"]>(eventKey: T) {
		const relevantListeners = this._listeners.filter(listener => listener.eventKey === eventKey); 

		return relevantListeners;
	}

	/**
	 * Subscribes a listener to an event.
	 */
	subscribe<T extends TAvailableEvents[number]["key"]>(
		eventKey: T,
		callback: TListenerCallback<Extract<TAvailableEvents[number], { key: T }> extends { payload: infer P } ? P : undefined>,
	): TListenerId {
		const newListener: TListener<T, Extract<TAvailableEvents[number], { key: T }> extends { payload: infer P } ? P : undefined> = {
			id:       this._idIncrementer++,
			eventKey: eventKey,
			callback: callback,
		};

		this._listeners.push(newListener);

		return newListener.id;
	}

	/**
	 * Unsubscribes a listener.
	 */
	unsubscribe(id: TListenerId) {
		const index = this._listeners.findIndex(listener => listener.id === id);

		this._listeners.splice(index, 1);
	}

	/**
	 * Emits an event to all listeners that listen to this event.
	 */
	emit<T extends TAvailableEvents[number]["key"]>(
		eventKey: T,
		...args: Extract<TAvailableEvents[number], { key: T }> extends { payload: infer P } ? [P] : []
	) {
		const payload = args[0];
		const payloadIsValid = (payload: unknown): payload is Extract<TAvailableEvents, { key: T }> extends { payload: infer P } ? P : undefined => true;
		if (!payloadIsValid(payload)) {
			throw new Error("Payload is invalid.");
		}

		const listeners = this.getListenersByEventKey<T>(eventKey);

		listeners.forEach(listener => listener.callback(payload));
	}
}