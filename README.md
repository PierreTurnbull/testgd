# testgd

## Get started

Install dependencies:
```
npm install
```

Generate assets from Blender:
```
npm run render
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

To generate spritesheets from images:
```
npm run render:spritesheets
```

To export spritesheets and spritesheetsDatas into the app:
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

Projection format: `<character>.<action>`

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