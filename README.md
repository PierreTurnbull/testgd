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

Domains are the different concepts of the game, such as the player, the monsters, the world, etc. They are defined using "aspects".

### Aspects

Aspects represent different kinds of functionalities. Each domain includes one or more aspects, such as models, constants or types.

#### Complex aspects

While aspects are usually simple concepts such as models or types, they can be more complex and require some boilerplate code. In such cases, all the boilerplate is encapsulated in an aspect directory. These aspect directories can be seen as advanced services. They are made of one or more sub-aspects.

For example, actions are aspects that require a base model (abstract class) and generic types to work. Instead of copy-pasting them in every domain, an actions directory is created in the aspects directory. The player's actions all extend its base model, while adding domain knowledge from the player to it.

Complex aspects include:

- Organisms: tangible entities such as a wall or a monster.
  - Characters: organisms that represent a living entity, such as a monster or the player.
- Actions: actions that can be performed by characters.
- Children: a list of children, meaning they are subsets of their parent.

Domains can be subsets of other domains, and the same goes with aspects. This relation is represented by the "children" aspect, using a hierarchy structure.

The kind of the aspect is used as a suffix on the file name. For example, a file containing models is named `<name>.models.ts`.

### File structure example

```
/src
	/assets
	/aspects
		/myComplexAspect
			/models
				/example.models.ts
			/children
				/mySubComplexAspect
					/models
						/example.models.ts
					/logic
						/example.logic.ts
						/example2.logic.ts
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
		/myDomain2
			/mySubComplexAspect
				/example.mySubComplexAspect.ts
			/types
				/example.types.ts
```