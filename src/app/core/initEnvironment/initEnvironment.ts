import { initSprite } from "@root/app/common/views/utils/sprites/initSprite";
import { createWall } from "@root/app/domains/wall/utils/createWall";

export const initEnvironment = () => {
	for (let i = -5; i < 5; i++) {
		for (let j = -5; j < 5; j++) {
			initSprite("environment.dirt." + Math.floor(Math.random() * 10), {
				x: j * 256 * 3,
				y: i * 256 * 3,
			});
		}
	}

	const verticalWallPoints = [
		{ x: 0, y: 0 },
		{ x: 1, y: 0 },
		{ x: 1, y: 100 },
		{ x: 0, y: 100 },
	];
	const horizontalWallPoints = [
		{ x: 0, y: 0 },
		{ x: 100, y: 0 },
		{ x: 100, y: 1 },
		{ x: 0, y: 1 },
	];
	// createWall({ x: 0, y: 0 }, verticalWallPoints);
	// createWall({ x: 0, y: 100 }, verticalWallPoints);
	// createWall({ x: 0, y: 200 }, verticalWallPoints);
	// createWall({ x: 0, y: 300 }, verticalWallPoints);
	// createWall({ x: 0, y: 400 }, verticalWallPoints);
	// createWall({ x: 100, y: 100 }, verticalWallPoints);
	// createWall({ x: 100, y: 200 }, verticalWallPoints);
	// createWall({ x: 200, y: 100 }, verticalWallPoints);
	// createWall({ x: 200, y: 300 }, verticalWallPoints);
	// createWall({ x: 200, y: 400 }, verticalWallPoints);
	// createWall({ x: 300, y: 300 }, verticalWallPoints);
	// createWall({ x: 400, y: 400 }, verticalWallPoints);
	// createWall({ x: 500, y: 0 }, verticalWallPoints);
	// createWall({ x: 500, y: 100 }, verticalWallPoints);
	// createWall({ x: 500, y: 200 }, verticalWallPoints);
	// createWall({ x: 500, y: 300 }, verticalWallPoints);
	// createWall({ x: 500, y: 400 }, verticalWallPoints);

	// createWall({ x: 50, y: -50 }, horizontalWallPoints);
	// createWall({ x: 150, y: -50 }, horizontalWallPoints);
	// createWall({ x: 350, y: -50 }, horizontalWallPoints);
	// createWall({ x: 450, y: -50 }, horizontalWallPoints);
	// createWall({ x: 250, y: 50 }, horizontalWallPoints);
	// createWall({ x: 350, y: 50 }, horizontalWallPoints);
	// createWall({ x: 250, y: 150 }, horizontalWallPoints);
	// createWall({ x: 350, y: 150 }, horizontalWallPoints);
	// createWall({ x: 450, y: 150 }, horizontalWallPoints);
	// createWall({ x: 150, y: 250 }, horizontalWallPoints);
	// createWall({ x: 350, y: 250 }, horizontalWallPoints);
	// createWall({ x: 50, y: 350 }, horizontalWallPoints);
	// createWall({ x: 250, y: 350 }, horizontalWallPoints);
	// createWall({ x: 50, y: 450 }, horizontalWallPoints);
	// createWall({ x: 150, y: 450 }, horizontalWallPoints);
	// createWall({ x: 250, y: 450 }, horizontalWallPoints);
	// createWall({ x: 350, y: 450 }, horizontalWallPoints);
	// createWall({ x: 450, y: 450 }, horizontalWallPoints);

	// createWall({ x: 300,y: 0 }, [{ x: 0,y: 0 },{ x: 400,y: 0 },{ x: 200,y: 150 }]);
	// createWall({ x: 300,y: 0 }, [{ x: 0,y: 0 },{ x: 200,y: 0 },{ x: 100,y: 50 }]);

	// createWall({ x: 0, y: 0 }, [
	// 	{ x: 0, y: 0 },
	// 	{ x: 50, y: 0 },
	// 	{ x: 50, y: 50 },
	// 	{ x: 0, y: 50 },
	// ]);
	// createWall({ x: 200, y: 200 }, [
	// 	{ x: 0, y: 0 },
	// 	{ x: 50, y: 0 },
	// 	{ x: 50, y: 50 },
	// 	{ x: 0, y: 50 },
	// ]);
	// createWall({ x: 400, y: 0 }, [
	// 	{ x: 0, y: 0 },
	// 	{ x: 50, y: 0 },
	// 	{ x: 50, y: 50 },
	// 	{ x: 0, y: 50 },
	// ]);

	// createWall({ x: 0, y: 0 }, [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]);
	// createWall({ x: 1250, y: 0 }, [{ x: 0, y: 0 }, { x: 50, y: -30 }, { x: 100, y: -22 }, { x: 250, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 100 }]);
	// createWall({ x: 250, y: 0 }, [{ x: 0, y: 0 }, { x: 80, y: 100 }, { x: 30, y: 100 }]);
	// createWall({ x: 300, y: 0 }, [{ x: -50,y: 0 },{ x: 50,y: 0 },{ x: 0,y: 250 }]);

	// createWall({ x: 0, y: 0 }, [
	// 	{ x: 0, y: 0 },
	// 	{ x: 50, y: 0 },
	// 	{ x: 50, y: 50 },
	// 	{ x: 0, y: 50 },
	// ]);

	createWall({ x: 0, y: 0 }, [
		{ x: 0, y: 0 },
		{ x: 200, y: 50 },
		{ x: 100, y: 40 },
	]);
	// createWall({ x: 0, y: 0 }, [
	// 	{ x: 0, y: 0 },
	// 	{ x: 200, y: 50 },
	// 	{ x: 100, y: 40 },
	// ]);
};