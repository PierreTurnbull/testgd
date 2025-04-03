/**
 * A key that uniquely identifies an event.
 */
export type TEventKey = string

/**
 * The payload that might be passed to a listener when an event is emitted.
 */
export type TEventPayload = unknown

/* eslint-disable-next-line @typescript-eslint/no-unsafe-function-type */
export type TEventEmitterCallback = Function

/**
 * An event that can be used in the bus.
 */
export type TAvailableEvent = {
	key:              string
	payload?:         TEventPayload
	emitterCallback?: TEventEmitterCallback
}

/**
 * All the events that can be used in the bus.
 */
export type TAvailableEvents = TAvailableEvent[]

/**
 * The callback that will be called when an event is emitted.
 */
export type TListenerCallback<TEventPayload> = TEventPayload extends undefined
	? () => unknown
	: (payload: TEventPayload) => unknown

export type TListenerId = number

/**
 * A listener that is subscribed to an event.
 */
export type TListener<TEventKey, TEventPayload> = {
	id:       TListenerId
	eventKey: TEventKey
	callback: TListenerCallback<TEventPayload>
}


type TEmitOptionsBase = {
	_?: never
}

/**
 * Options that can be passed when emitting an event.
 */
export type TEmitOptions<
	TEvent extends TAvailableEvents[number]
> = (
	TEmitOptionsBase &
	(TEvent extends { callback: infer C } ? { callback?: C } : TEmitOptionsBase) &
	(TEvent extends { payload: infer P } ? { payload: P } : TEmitOptionsBase)
)
