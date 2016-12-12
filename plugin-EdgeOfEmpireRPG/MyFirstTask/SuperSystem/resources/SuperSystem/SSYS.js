useLibrary('fontutils');
useLibrary('imageutils');
useLibrary('markup');
useLibrary('extension');
//importPackage(arkham.dialog.prefs);
var GameLanguage = Language.getGame();
var InterfaceLanguage = Language.getInterface();
function getName(){
	return "SuperSystem";
}
function getDescription(){
	return "SuperSystem plug-in";
}
function getVersion(){return 1.1;}

function initialize(){
	Eons.namedObjects.SSYS = new gameObject();
	InterfaceLanguage.addStrings('SuperSystem/text/SSYS-interface.properties');
	GameLanguage.addStrings('SuperSystem/text/SSYS-game.properties');
	const SSYSgame = Game.register(
		'SSYS',
		@SSYS-SuperSystem,
		#SSYS-SuperSystem,
		ImageUtils.get('SuperSystem/icon/SSYS-icon.png'),
		null
	);
	ClassMap.add('SuperSystem/SSYS.classmap');
}
function gameObject(){
	this.GameCode = 'SSYS';
	this.Plugin = 'SuperSystem.seext';
	this.BodyFont = ResourceKit.getBodyFamily();
	this.StatFont = FontUtils.registerFontFamilyFromResources.apply(this,[
		'SuperSystem/font/Pacaya.otf'
	]);
	this.TitleFont = FontUtils.registerFontFamilyFromResources.apply(this,[
		'SuperSystem/font/HHSamuel.ttf'
	]);
}
