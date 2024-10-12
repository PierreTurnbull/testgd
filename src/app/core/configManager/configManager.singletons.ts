class ConfigManager {
	config = {
		debug: {
			showsEntityBorders: false,
			showsEntityHitboxes: true,
		},
	} as const;
}

export const configManager = new ConfigManager();