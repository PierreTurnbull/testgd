export type TClosingContextState = {
	registerUi:      (key: string) => void
	removeUi:        (key: string) => void
	getLastOpenedUi: () => string | null
}