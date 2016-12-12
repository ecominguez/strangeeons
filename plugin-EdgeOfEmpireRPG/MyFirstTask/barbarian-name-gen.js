// this library has useful functions we will use for
// picking random name fragments
useLibrary( "random" );

function getName() {
    return 'Barbarian Name Generator';
}

function getDescription() {
    return 'Rename your component, barbarian style';
}

function getVersion() {
    return 1.0;
}

function getPluginType() {
    return arkham.plugins.Plugin.ACTIVATED;
}

function isUsable() {
	return Eons.activeGameComponent != null;
}

function run() {
    var component = Eons.activeGameComponent;
    if( component != null ) {
        component.name = generateName();
        var editor = Eons.activeEditor;
        editor.populateFieldsFromComponent();
	editor.redrawPreview();
    }
}

// these arrays are lists of name fragments we will assemble
// in various ways to generate our names
var syllables = [
	"Ack", "Bar", "Bog", "Dak", "Grak", "Grug", "Hurt",
	"Juk", "Kag", "Krak", "Kruk", "Lak", "Mug", "Morg", "Nok",
	"Pog", "Pok", "Rak", "Sog", "Sok", "Targ", "Zog", "Zug"
];

var optionalSyllables = [
	"-ak", "-ek", "-ik", "-ok", "-uk"
];

var familyNouns = [
	"Bear", "Blood", "Cave", "Chunk", "Dark", "Ear", "Foot",
	"Gob", "Gorg", "Grub", "Gut", "Head", "Horse", "Ik", "Larg",
	"Moon", "Nob", "Og-", "Orc", "Pole", "Snake", "Spear",
	"Sun", "Tree", "Troll"
];

var familyVerbs = [
	"axe", "bite", "burn", "cut", "fight", "gash", "growl",
	"hit", "hurt", "hunt", "kill", "lance", "punch", "rend",
	"rip", "smash", "snarl", "split", "stab", "stomp", "thump"
];

/*
 * generateName()
 * Returns a randomly generated name.
 */
function generateName() {
	var first, second = "", family = "";
	
	// choose a first syllable for the name
	first = syllables.pick();
	
	// 80% of names have a second syllable
	if( random.number() < 0.8 ) {
		// 20% of second syllables are from the optional set,
		// the other 80% are from the same set as the first syllable
		if( random.number() > 0.8 ) {
			second = optionalSyllables.pick();
		} else {
			second = syllables.pickOtherThan( first ).toLowerCase();
		}
	}

	// 80% of names include a family name, which consists of a random
	// pairing from the nouns array and the verbs array
	if( random.number() < 0.8 ) {
		family = " " + familyNouns.pick() + familyVerbs.pick();
	}
	
	return first + second + family;
}

if( sourcefile == 'Quickscript' ) {
    run();
}