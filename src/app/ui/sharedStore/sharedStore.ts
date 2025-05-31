/**
 * The shared store is meant to store informations available from anywhere in the app.
 * It is meant to be used as a mirror, not a source of truth.
 * This makes communication between all parts of the app possible without complexifying
 * their respective logic.
 */
export const sharedStore = {
	editorMenuIsOpen: false,
};