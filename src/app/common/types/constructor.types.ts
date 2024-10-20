/**
 * Returns a constructor that returns the type passed as parameter.
*/
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type ConstructorOf<T> = new (...args: any[]) => T