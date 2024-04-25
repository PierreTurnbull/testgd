export const loadSpritesheets = async () => {
	const lastCheckpointDate: Date = new Date()

	console.info("Start loading spritesheets.")

	console.info(`Spritesheets loaded in ${new Date().getTime() - lastCheckpointDate.getTime()}ms.`)
}