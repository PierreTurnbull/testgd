import { TEnvironmentConfigItem } from "@root/app/domains/editor/data/data.types";
import { data as editorData } from "../../domains/editor/data/data";

/**
 * The editor config items in a flat format, i.e.: `a: { b: value }` -> `"a.b": value`
 */
export const flatEnvironmentConfigItems: Record<string, TEnvironmentConfigItem> = {};

Object.entries(editorData.config.environment).forEach(entry1 => {
	Object.entries(entry1[1]).forEach(entry2 => {
		Object.entries(entry2[1]).forEach(entry3 => {
			const key = `environment.${entry1[0]}.${entry2[0]}.${entry3[0]}`;

			flatEnvironmentConfigItems[key] = entry3[1];
		});
	});
});