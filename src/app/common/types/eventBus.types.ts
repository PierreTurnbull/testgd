/**
 * A key that uniquely identifies an event.
 */
export type TEventKey = string

/**
 * The payload that might be passed to a listener when an event is emitted.
 */
export type TEventPayload = number | string | boolean | object

/**
 * An event that can be used in the bus.
 */
export type TAvailableEvent = {
	key:      string
	payload?: TEventPayload
}

/**
 * All the events that can be used in the bus.
 */
export type TAvailableEvents = TAvailableEvent[]

/**
 * The callback that will be called when an event is emitted.
 */
export type TListenerCallback<TEventPayload> = TEventPayload extends undefined
	? () => void
	: (payload: TEventPayload) => void

export type TListenerId = number

/**
 * A listener that is subscribed to an event.
 */
export type TListener<TEventKey, TEventPayload> = {
	id:       TListenerId
	eventKey: TEventKey
	callback: TListenerCallback<TEventPayload>
}