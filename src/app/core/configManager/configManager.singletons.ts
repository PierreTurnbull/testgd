class ConfigManager {
	config = {
		debug: {
			showsEntityBorders: true,
		},
	} as const;
}

export const configManager = new ConfigManager();