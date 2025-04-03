/**
 * A unique key that identifies an event. The event key is unique, but there can be
 * multiple listeners and emitters that reference it.
 */
export type TEventKey = string

/**
 * A unique id that identifies one listener.
 */
export type TListenerId = number

/**
 * The callback of a listener. When the event that the listener listens to is emitted,
 * this callback is called.
 */
export type TListenerCallback = (payload: unknown) => unknown

/**
 * A listener that is subscribed to an event.
 */
export type TListener = {
	id:       TListenerId
	eventKey: TEventKey
	callback: TListenerCallback
}