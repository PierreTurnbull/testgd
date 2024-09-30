import { Player } from "@root/domains/player/characters/player.characters";
import { game } from "../../singletons/game.singletons";
import { Monster1 } from "@root/domains/monster1/characters/monster1.characters";

const initPlayer = () => {
	game.player = new Player({
		initialCoordinates: {
			x: 300,
			y: 300, 
		}, 
	});
};

const initMonster1 = () => {
	game.monsters = [
		new Monster1({
			initialCoordinates: {
				x: 500,
				y: 500, 
			}, 
		}),
	];
};

export const initOrganisms = () => {
	initPlayer();
	initMonster1();
};