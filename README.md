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

## Architecture

The architecture uses an (ECS)[https://en.wikipedia.org/wiki/Entity_component_system].

### File structure

```
/src
	/app
		/common
		/core
		/domains
```

- /common contains contains common data and control structures.
- /core contains the core logic of the game engine
- /domains contains concepts of the game, such as the player or the fps counter.