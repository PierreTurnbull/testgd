import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "fs"

const exportAssets = () => {
	// spritesheetDatas

	const existingSpritesheetsDatasExists = existsSync("src/assets/spritesheets/spritesheetsDatas.json")
	let existingSpritesheetsDatas = []
	if (existingSpritesheetsDatasExists) {
		existingSpritesheetsDatas = JSON.parse(readFileSync("src/assets/spritesheets/spritesheetsDatas.json", "utf8"))
	}

	const newSpritesheetsDatasExists = existsSync("blender/tmp/spritesheets/spritesheetsDatas.json")
	let newSpritesheetsDatas = []
	if (newSpritesheetsDatasExists) {
		newSpritesheetsDatas = JSON.parse(readFileSync("blender/tmp/spritesheets/spritesheetsDatas.json", "utf8"))
	}

	// spriteDatas

	const existingSpritesDatasExists = existsSync("src/assets/sprites/spritesDatas.json")
	let existingSpritesDatas = []
	if (existingSpritesDatasExists) {
		existingSpritesDatas = JSON.parse(readFileSync("src/assets/sprites/spritesDatas.json", "utf8"))
	}

	const newSpritesDatasExists = existsSync("blender/tmp/sprites/spritesDatas.json")
	let newSpritesDatas = []
	if (newSpritesDatasExists) {
		newSpritesDatas = JSON.parse(readFileSync("blender/tmp/sprites/spritesDatas.json", "utf8"))
	}

	merge(existingSpritesheetsDatas, newSpritesheetsDatas, "spritesheets")
	merge(existingSpritesDatas, newSpritesDatas, "sprites")
}

const merge = (
	existingDatas,
	newDatas,
	type,
) => {
	const projection = process.env.PROJECTION ? JSON.parse(process.env.PROJECTION) : null

	/**
	 * Returns whether the data has a replacement in the list of new datas.
	 */
	const getWillBeReplaced = data => {
		const keys = data.name.split(".")
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

	const datasToKeep = existingDatas
		.filter(item => !getWillBeReplaced(item))

	const datas = datasToKeep
		.concat(newDatas)

	const datasExists = existsSync(`src/assets/${type}`)
	if (!datasExists) {
		mkdirSync(`src/assets/${type}`)
	}

	const dirName = `blender/tmp/${type}`
	const dirExists = existsSync(dirName)
	if (dirExists) {
		readdirSync(dirName).forEach(dirName => {
			const src = `blender/tmp/${type}/${dirName}`
			const dest = `src/assets/${type}/${dirName}`

			const exists = existsSync(dest)

			if (exists) {
				rmSync(dest, { recursive: true })
			}

			cpSync(src, dest, { recursive: true })
		})
	}

	writeFileSync(`src/assets/${type}/${type}Datas.json`, JSON.stringify(datas, null, 4))
}

exportAssets()

console.info("Exported assets.")