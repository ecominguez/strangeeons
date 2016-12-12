/*
 * EdgeOfEmpireRPG.js
 */

useLibrary( 'extension' );


/**
 * Returns a short name for the plug-in.
 */
function getName() {
	return 'EdgeOfEmpireRPG';
}


/**
 * Returns a brief description of the plug-in.
 */
function getDescription() {
	return null;
}


/**
 * Returns a version number for the plug-in.
 */
function getVersion() {
	return 1.0;
}



/**
 * Called when the plug-in is loaded. This is the entry point for
 * extension plug-ins; whatever you want the plug-in to do should
 * be included here.
 */
function initialize() {
	// Note that if this returns false, Strange Eons will stop loading
	// the plug-in. You might do this, for example, if your plug-in
	// requires a game that is not currently installed.
}


/**
 * This function is called when the plug-in is being unloaded.
 * (Extension plug-ins are unloaded during application shutdown.)
 *
 * If this function is empty, you can safely delete it from your script.
 */
function unload() {
}

