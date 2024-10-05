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

The architecture is inspired by the [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) methodology.

It defines a set of domains that are organized in a tree structure.

### Domain definition

The global domain is the game. It contains a game engine that is specific to the project, meaning that it is not meant to be reused. It contains multiple domains.

Domains are the different concepts of the game, such as the player, the monsters, the world, etc. They are defined using different kinds of data structures and control structures.

Domains can be subsets of other domains. This relation is represented by a "children" subdirectory, thus shaping a hierarchy structure.

The kind of data/control structure defining the domain is used as a suffix on the file name. For example, a file containing models is named `<name>.models.ts`.

### File structure example

```
/src
	/domains
		/myDomain
			/models
				/example.models.ts
			/types
				/example.types.ts
				/example2.types.ts
			/children
				/mySubDomain
					/models
						/example.models.ts
					/logic
						/example.logic.ts
```