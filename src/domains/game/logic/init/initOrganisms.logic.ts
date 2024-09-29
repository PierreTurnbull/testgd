import { Monster1 } from "@root/domains/monster1/characters/monster.characters";
import { Player } from "@root/domains/player/characters/player.characters";
import { game } from "../../singletons/game.singletons";

const initPlayer = () => {
	game.player = new Player({
		coordinates: {
			x: 300,
			y: 300, 
		}, 
	});
};

const initMonster1 = () => {
	game.monsters = [
		new Monster1({
			coordinates: {
				x: 500,
				y: 500, 
			}, 
		}),
	];
};

export const initOrganisms = () => {
	initPlayer();
	// initMonster1();
};