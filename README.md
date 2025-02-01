# testgd

## Get started

Install node dependencies:
```
npm install
```
[Install blender](https://docs.blender.org/manual/fr/dev/getting_started/installing/)

Install `imagemagick`:
```
sudo apt install imagemagick
```

Generate assets from Blender:
```
npm run render
```

Generate web workers:
```
npm run workers:build
```

Run the app:
```
npm run dev
```

## Assets generation

Generate assets from Blender:
```
npm run render
```

You can also run specific stages of the rendering process.

To generate images from Blender:
```
npm run render:run
```

To generate assets from images:
```
npm run render:package
```

To export spritesheets, sprites, spritesheetsDatas and spritesDatas into the app:
```
npm run render:export
```

To clean the temporary directories:
```
npm run render:clean
```

Generate separate assets from Blender:
```
PROJECTION=<projection> npm run render
```

The projection is supported on all the sub-scripts that are used within `npm run render`:

```
PROJECTION=<projection> npm run render:run
PROJECTION=<projection> npm run render:spritesheets
PROJECTION=<projection> npm run render:export
PROJECTION=<projection> npm run render:clean
```

Projection format: JSON. Specify a list of key-boolean values, or true for all elements. Eg: `PROJECTION={"character1":true,"character2":{"action1":true,"action2":true}}`. This targets all actions for character1, and action1 from character2.

## Architecture

The game has an [ECS](https://en.wikipedia.org/wiki/Entity_component_system) architecture. 

### File structure

```
/src
	/app
		/common
		/core
		/domains
```

- /common contains contains common data and control structures, such as components and archetypes.
- /core contains the core logic of the game engine
- /domains contains concepts of the game, such as the player or the fps counter.
