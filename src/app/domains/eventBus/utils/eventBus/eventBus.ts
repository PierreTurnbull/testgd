import { TEventKey as TEventKeyBase, TListener, TListenerId } from "../../../../common/types/eventBus/eventBus.types";

/**
 * An event bus providing bidirectionnal communication through listener and emitter callbacks.
 */
export class EventBus<TEventKey extends TEventKeyBase> {
	private _idIncrementer = 0;
	private _listeners: TListener[] = [];

	/**
	 * Returns the list of listeners that listen to eventKey.
	 */
	private getListenersByEventKey(eventKey: TEventKey) {
		const relevantListeners = this._listeners.filter(listener => listener.eventKey === eventKey); 

		return relevantListeners;
	}

	/**
	 * Subscribes a listener to an event.
	 */
	subscribe<T extends TEventKey>(
		eventKey: T,
		callback: TListener["callback"],
	): TListenerId {
		const newListener: TListener = {
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
	 * Listener callbacks are executed one by one synchronously.
	 * 
	 * This function runs asynchronously and resolves once all listener callbacks have
	 * finished running.
	 */
	async emit<
		TKey extends TEventKey,
	>(
		eventKey: TKey,
		options?: {
			payload?: Parameters<TListener["callback"]>[0],
		},
	) {
		let payload: Parameters<TListener["callback"]>[0] = null;

		if (options && options.payload) {
			payload = options.payload;
		}

		const listeners = this.getListenersByEventKey(eventKey);

		const results: ReturnType<TListener["callback"]>[] = [];

		listeners.forEach(listener => {
			const result = listener.callback(payload);
			results.push(result);
		});

		return results;
	}
}