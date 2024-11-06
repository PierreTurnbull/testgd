/* eslint-disable */
import { execSync } from "child_process";
import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "fs";
import sizeOf from "image-size"

const basePath = `${process.cwd()}/blender/tmp`
const baseRawPath = `${basePath}/raw`
const baseSpritesPath = `${basePath}/sprites`
const baseSpritesheetsPath = `${basePath}/spritesheets`

const getSpritesheetDatas = (path, images) => {
	const dimensions = sizeOf(`${path}/${images[0]}`)

	const spritesheetDatas = {}

	spritesheetDatas.width = dimensions.width,
	spritesheetDatas.height = dimensions.height,
	spritesheetDatas.framesCount = images.length,
	spritesheetDatas.name = path
		.replace(`${baseRawPath}/animations/`, "")

	return spritesheetDatas
}

const getSpriteDatas = (path, image) => {
	const dimensions = sizeOf(`${path}/${image}`)

	const spriteDatas = {}

	spriteDatas.width = dimensions.width,
	spriteDatas.height = dimensions.height,
	spriteDatas.name = path
		.replace(`${baseRawPath}/images/`, "")
		.replace("/", ".")

	return spriteDatas
}

const writeSpritesheet = (rawPath, spritesheetPath) => {
	mkdirSync(spritesheetPath, { recursive: true })
	const cmd = `montage ${rawPath}/*.png -geometry +0+0 -tile 1x -background none ${spritesheetPath}/spritesheet.png`
	execSync(cmd)
}

const moveImage = (rawPath, image) => {
	const from = `${baseRawPath}${rawPath.replace(baseRawPath, "")}/${image}`
	const dest = `${baseSpritesPath}${rawPath.replace(baseRawPath, "").replace("/images", "")}/${image}`
	cpSync(from, dest, { recursive: true })
}

const spritesheetsDatas = []
const spritesDatas = []

const packageSpritesheets = (path) => {
	const images = readdirSync(path).filter(fileName => fileName.includes(".png"))

	if (images.length > 0) {
		const spritesheetPath = `${baseSpritesheetsPath}/${path.replace(baseRawPath, "").replace("/animations", "")}`
		writeSpritesheet(path, spritesheetPath)

		const spritesheetDatas = getSpritesheetDatas(path, images)
		spritesheetsDatas.push(spritesheetDatas)
	}
}

const packageSprites = (path) => {
	const images = readdirSync(path).filter(fileName => fileName.includes(".png"))
	moveImage(path, images[0])

	const spriteDatas = getSpriteDatas(path, images[0])
	spritesDatas.push(spriteDatas)
}

// spritesheets
const animationDirsExists = existsSync(`${baseRawPath}/animations`)
if (animationDirsExists) {
	const animationDirs = readdirSync(`${baseRawPath}/animations`).filter(path => lstatSync(`${baseRawPath}/animations/${path}`).isDirectory())

	for (const animationDir of animationDirs) {
		packageSpritesheets(`${baseRawPath}/animations/${animationDir}`)
	}

	writeFileSync(`${basePath}/spritesheets/spritesheetsDatas.json`, JSON.stringify(spritesheetsDatas, null, 4))
}

// single images
const imageDirsExists = existsSync(`${baseRawPath}/images`)
if (imageDirsExists) {
	const imageDirs = readdirSync(`${baseRawPath}/images`).filter(path => lstatSync(`${baseRawPath}/images/${path}`).isDirectory())

	for (const imageDir of imageDirs) {
		packageSprites(`${baseRawPath}/images/${imageDir}`)
	}

	writeFileSync(`${basePath}/sprites/spritesDatas.json`, JSON.stringify(spritesDatas, null, 4))
}

rmSync(baseRawPath, { recursive: true })

console.info("Packaged spritesheets.")