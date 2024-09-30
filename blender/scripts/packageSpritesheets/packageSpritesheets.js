/* eslint-disable */
import { execSync } from "child_process";
import { cpSync, lstatSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "fs";
import sizeOf from "image-size"

const basePath = `${process.cwd()}/blender/tmp`
const baseRawPath = `${basePath}/raw`
const baseImagesPath = `${basePath}/images`
const baseSpritesheetsPath = `${basePath}/spritesheets`

const getSpritesheets = (path, images) => {
	const dimensions = sizeOf(`${path}/${images[0]}`)

	const spritesheetDatas = {}

	spritesheetDatas.width = dimensions.width,
	spritesheetDatas.height = dimensions.height,
	spritesheetDatas.framesCount = images.length,
	spritesheetDatas.name = path.replace(/.*\//, "")

	return spritesheetDatas
}

const writeSpritesheet = (rawPath, spritesheetPath) => {
	mkdirSync(spritesheetPath, { recursive: true })
	const cmd = `montage ${rawPath}/*.png -geometry +0+0 -tile 1x -background none ${spritesheetPath}/spritesheet.png`
	execSync(cmd)
}

const moveImage = (rawPath, images) => {
	const from = `${baseRawPath}${rawPath.replace(baseRawPath, "")}/${images[0]}`
	const dest = `${baseImagesPath}${rawPath.replace(baseRawPath, "")}/${images[0]}`
	cpSync(from, dest, { recursive: true })
}

const spritesheetsDatas = []

const packageSpritesheets = (path) => {
	const images = readdirSync(path).filter(fileName => fileName.includes(".png"))

	if (images.length > 0) {
		const spritesheetPath = `${baseSpritesheetsPath}/${path.replace(baseRawPath, "")}`
		writeSpritesheet(path, spritesheetPath)

		const spritesheetDatas = getSpritesheets(path, images)
		spritesheetsDatas.push(spritesheetDatas)
	// } else if (images.length === 1) {
	// 	moveImage(path, images)
	}
}

const imagesDirs = readdirSync(baseRawPath).filter(path => lstatSync(`${baseRawPath}/${path}`).isDirectory())
for (const imagesDir of imagesDirs) {
	packageSpritesheets(`${baseRawPath}/${imagesDir}`)
}

writeFileSync(`${basePath}/spritesheetsDatas.json`, JSON.stringify(spritesheetsDatas, null, 4))
rmSync(baseRawPath, { recursive: true })