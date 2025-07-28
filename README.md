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

Run the editor server:
```
npm run dev:editor
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

Projection format: JSON. Specify a list of key-boolean values, or true for all elements. Eg: `PROJECTION={"character1":true,"character2":{"action1":true,"action2":true}}`. This targets all actions of character1, and action1 and action2 of character2.

## Architecture

The app is divided into 2 sub-apps:
- a highly interactive 2D part of the game is implemented with PixiJS and a an [ECS](https://en.wikipedia.org/wiki/Entity_component_system) architecture.
- user interfaces are implemented with a PReact app.

This specialization makes the codebase simpler and more reliable. However it requires an additional communication layer for both sub-apps to communicate together. An event bus and a global store are used for this purpose.

```
--------     ----------------     --------
|      | <-> | event bus    | <-> |      |
|  UI  |     ----------------     | game |
|      | --> | global store | <-- |      |
--------     ----------------     --------
```

### File structure

```
/src
	/app
		/common
		/core
		/domains
		/ui
```

- `/common` contains contains common data and control structures, such as components and archetypes.
- `/core` contains the core logic of the game engine
- `/domains` contains concepts of the game, such as the player or the fps counter.
- `/ui` contains user interfaces, such as the game menu or the editor menu.

## TODO

- distinction between views (CView): sprite and animatedSprite
- replace string key hierarchies (e.g.: "environment.muddyBuddy.hitbox") with complex structures where it is more appropriate.
- replace "view sorting curve" with "sorting curve"
- reorganize view utility functions (init, replace, remove...) -> more domains, less common
- replace "hitbox border view" with "hitbox view"
- make more domains from common and core content
- add readme in each domain to explain the domain
- replace "location" with "coordinates"