/* eslint-disable */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "fs"

const exportAssets = () => {
	const projection = process.env.PROJECTION ? JSON.parse(process.env.PROJECTION) : null

	const existingSpritesheetsDatasExists = existsSync("src/assets/spritesheetsDatas.json")
	let existingSpritesheetsDatas = null
	if (existingSpritesheetsDatasExists) {
		existingSpritesheetsDatas = JSON.parse(readFileSync("src/assets/spritesheetsDatas.json", "utf8"))
	}

	const newSpritesheetsDatasExists = existsSync("blender/tmp/spritesheets/spritesheetsDatas.json")
	let newSpritesheetsDatas = null
	if (newSpritesheetsDatasExists) {
		newSpritesheetsDatas = JSON.parse(readFileSync("blender/tmp/spritesheets/spritesheetsDatas.json", "utf8"))
	}

	if (existingSpritesheetsDatasExists) {
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

		const spritesheetsExists = existsSync("src/assets/spritesheets")
		if (!spritesheetsExists) {
			mkdirSync("src/assets/spritesheets")
		}
		writeFileSync("src/assets/spritesheets/spritesheetsDatas.json", JSON.stringify(spritesheetsDatas, null, 4))

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

	readdirSync("blender/tmp/sprites").forEach(dirName => {
		const src = `blender/tmp/sprites/${dirName}`
		const dest = `src/assets/sprites/${dirName}`

		const exists = existsSync(dest)

		if (exists) {
			rmSync(dest, { recursive: true })
		}

		cpSync(src, dest, { recursive: true })
	})
}

exportAssets()

console.info("Exported assets.")