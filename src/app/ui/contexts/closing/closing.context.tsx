import { createContext } from "preact";
import { TClosingContextState } from "./closing.contextState";

export const ClosingContext = createContext<TClosingContextState | null>(null);