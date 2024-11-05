/* eslint-disable */
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "fs"

const exportAssets = () => {
	const projection = process.env.PROJECTION ? JSON.parse(process.env.PROJECTION) : null

	const existingSpritesheetsDatas = JSON.parse(readFileSync("src/assets/spritesheetsDatas.json", "utf8"))
	const newSpritesheetsDatas = JSON.parse(readFileSync("blender/tmp/spritesheetsDatas.json", "utf8"))

	/**
	 * Returns whether the spritesheetData has a replacement in the list of new spritesheetsDatas.
	 */
	const getWillBeReplaced = spritesheetData => {
		const keys = spritesheetData.name.split(".")
		const name = keys[1]
		const action = keys[2]

		if (!projection) {
			return true
		}

		if (
			projection[name] !== undefined &&
			(
				projection[name] === true ||
				projection[name].includes(action)
			)
		) {
			return true
		}

		return false
	}

	const spritesheetsDatasToKeep = existingSpritesheetsDatas
		.filter(item => !getWillBeReplaced(item))

	const spritesheetsDatas = spritesheetsDatasToKeep
		.concat(newSpritesheetsDatas)

	writeFileSync("src/assets/spritesheetsDatas.json", JSON.stringify(spritesheetsDatas, null, 4))

	readdirSync("blender/tmp/spritesheets").forEach(dirName => {
		const src = `blender/tmp/spritesheets/${dirName}`
		const dest = `src/assets/spritesheets/${dirName}`

		const exists = existsSync(dest)

		if (exists) {
			rmSync(dest, { recursive: true })
		}

		cpSync(src, dest, { recursive: true })
	})
}

exportAssets()

console.info("Exported assets.")