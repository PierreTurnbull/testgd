import { TAvailableEvents as TAvailableEventsBase, TEmitOptions, TEventEmitterCallback, TEventPayload, TListener, TListenerCallback, TListenerId } from "../../types/eventBus/eventBus.types";

/**
 * An event bus providing bidirectionnal communication using listener and emitter callbacks.
 */
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
	 * 
	 * If the event corresponding to the provided eventKey has a payload, then
	 * options are required. If this event does not have a payload but has a callback,
	 * then options are optional. Otherwise options are forbidden.
	 * 
	 * If this event has a payload, then the payload is required, otherwise it is forbidden.
	 * 
	 * If this event has a callback, then the callback is optional, otherwise it is forbidden.
	 * 
	 * This method resolves when all listener and emitter callbacks have finished executing.
	 */
	async emit<
		TKey extends TAvailableEvents[number]["key"],
	>(
		eventKey: TKey,
		...args: (
			Extract<TAvailableEvents[number], { key: TKey }> extends { payload: infer _ } ? [TEmitOptions<Extract<TAvailableEvents[number], { key: TKey }>>] :
			Extract<TAvailableEvents[number], { key: TKey }> extends { callback: infer _ } ? [TEmitOptions<Extract<TAvailableEvents[number], { key: TKey }>>?] :
			[]
		)
	) {
		const options = args[0];
		let payload: TEventPayload | null = null;
		let callback: TEventEmitterCallback | null = null;

		if (options && "payload" in options && options.payload) {
			payload = options.payload as TEventPayload;
		}
		if (options && "callback" in options && options.callback) {
			callback = options.callback as TEventEmitterCallback;
		}

		const listeners = this.getListenersByEventKey<TKey>(eventKey);

		const results: unknown[] = [];

		listeners.forEach(listener => {
			const result = listener.callback(payload);
			results.push(result);
			callback?.(result);
		});

		return results;
	}
}