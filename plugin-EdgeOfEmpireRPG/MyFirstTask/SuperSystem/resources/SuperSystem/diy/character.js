useLibrary('diy');
useLibrary('common');
useLibrary('ui');
useLibrary('markup');
useLibrary('fontutils');
useLibrary('imageutils');
useLibrary('tints');
importClass(arkham.component.DefaultPortrait);
var GameLanguage = Language.getGame();
var InterfaceLanguage = Language.getInterface();
var PortraitList = [];
function getPortraitCount(){return PortraitList.length;}
function getPortrait(index){
	if((index<0)||(index>=PortraitList.length)){
		throw new Error('Invalid portrait index: '+index);
	}
	return PortraitList[index];
}
function create(diy){
	diy.cardVersion = 1;
	diy.extensionName = Eons.namedObjects.SSYS.Plugin;
	diy.settings.addSettingsFrom('SuperSystem/settings/character.settings');
	GameLanguage.addStrings('SuperSystem/text/character.properties');
	diy.faceStyle = FaceStyle.ONE_FACE;
	diy.frontTemplateKey = 'FrontTemplate';
	diy.bleedMargin = 0;
	diy.customPortraitHandling = true;
	PortraitList[0] = new DefaultPortrait(diy,'Portrait');
	PortraitList[0].backgroundFilled = false;
	PortraitList[0].clipping = true;
	PortraitList[0].installDefault();
	PortraitList[0].setScale(2.8);
	PortraitList[1] = new DefaultPortrait(diy,'Background');
	PortraitList[1].backgroundFilled = true;
	PortraitList[1].clipping = true;
	PortraitList[1].installDefault();
	PortraitList[1].setScale(3.0);
	$PortraitListCount = getPortraitCount();
	diy.name = #SSYS-Name;
	$Name = #SSYS-Name;
	$Body = #SSYS-Body;
}
function uiBuildStat(Key,tab,diy,bindings){
	this[Key+'Field'] = new textField(null,10);
	bindings.add(Key,eval(Key+'Field'),[0]);
	tab.place(@('SSYS-'+Key),'newline,split',eval(Key+'Field'),'growx');
}
function createInterface(diy,editor){
	var bindings = new Bindings(editor,diy);
	TextTab = new Grid();
	TextTab.editorTabScrolling = true;
	diy.nameField = new textField(null,30);
	bindings.add('Name',diy.nameField,[0]);
	TextTab.place(@SSYS-Name,'newline,split',diy.nameField,'growx');
	BodyField = new textArea(null,10,40,true);
	bindings.add('Body',BodyField,[0]);
	TextTab.place(@SSYS-Body,'newline',BodyField,'newline');
	StatsTab = new Grid();
	StatsTab.editorTabScrolling = true;
	uiBuildStat('BuildPoints',StatsTab,diy,bindings);
	uiBuildStat('Strength',StatsTab,diy,bindings);
	uiBuildStat('Agility',StatsTab,diy,bindings);
	uiBuildStat('Mind',StatsTab,diy,bindings);
	uiBuildStat('Resolve',StatsTab,diy,bindings);
	uiBuildStat('Vitality',StatsTab,diy,bindings);
	uiBuildStat('Initiative',StatsTab,diy,bindings);
	uiBuildStat('ActionPoints',StatsTab,diy,bindings);
	uiBuildStat('Damage',StatsTab,diy,bindings);
	uiBuildStat('PhysicalAttack',StatsTab,diy,bindings);
	uiBuildStat('PhysicalDefense',StatsTab,diy,bindings);
	uiBuildStat('PhysicalResistance',StatsTab,diy,bindings);
	uiBuildStat('MindAttack',StatsTab,diy,bindings);
	uiBuildStat('MindDefense',StatsTab,diy,bindings);
	uiBuildStat('MindResistance',StatsTab,diy,bindings);
	PortraitTab = new Grid();
	PortraitTab.editorTabScrolling = true;
	PortraitPanel = new portraitPanel(diy,0);
	PortraitPanel.panelTitle = @SSYS-Portrait;
	PortraitTab.place(PortraitPanel,'newline');
	BackgroundPanel = new portraitPanel(diy,1);
	BackgroundPanel.panelTitle = @SSYS-Background;
	PortraitTab.place(BackgroundPanel,'newline');
	bindings.bind();
	TextTab.addToEditor(editor,@SSYS-Text-tab);
	StatsTab.addToEditor(editor,@SSYS-Stats-tab);
	PortraitTab.addToEditor(editor,@SSYS-Portrait-tab);
}
function buildStatBox(Key,diy,sheet){
	var StatStyle = new TextStyle( 
		FAMILY, Eons.namedObjects.SSYS.StatFont
		,WIDTH, WIDTH_SEMICONDENSED
		,WEIGHT, WEIGHT_BOLD
		,COLOR, Color(1,1,1)
		,SIZE, 9
	);
	this[Key+'Box'] = markupBox(sheet);
	this[Key+'Box'].setTextFitting(FIT_BOTH);
	this[Key+'Box'].alignment = LAYOUT_LEFT | LAYOUT_MIDDLE;
	this[Key+'Box'].defaultStyle = StatStyle;
	if(Key==='BuildPoints'){
		this[Key+'Box'].defaultStyle.add(SIZE, 6);
		this[Key+'Box'].alignment = LAYOUT_RIGHT;
	}
	if(	(Key==='Vitality')||(Key==='Initiative')||(Key==='ActionPoints')){
		this[Key+'Box'].defaultStyle.add(SIZE, 12);
		this[Key+'Box'].alignment = LAYOUT_CENTER | LAYOUT_BOTTOM;
	}
	if(	(Key==='Strength')||(Key==='Agility')||(Key==='Mind')||(Key==='Resolve')){
		this[Key+'Box'].defaultStyle.add(SIZE, 16);
		this[Key+'Box'].alignment = LAYOUT_CENTER | LAYOUT_MIDDLE;
	}
}
function createFrontPainter(diy,sheet){
	var BodyStyle = new TextStyle( 
		FAMILY, Eons.namedObjects.SSYS.BodyFont
		,WIDTH, WIDTH_SEMICONDENSED
		,WEIGHT, WEIGHT_BOLD
		,COLOR, Color(0,0,0)
		,SIZE, 8
	);
	var NameStyle = new TextStyle( 
		FAMILY, Eons.namedObjects.SSYS.TitleFont
		,WIDTH, WIDTH_SEMICONDENSED
		,WEIGHT, WEIGHT_BOLD
		,COLOR, Color(1,1,1)
		,SIZE, 18
	);
	NameBox = markupBox(sheet);
	NameBox.setTextFitting(FIT_BOTH);
	NameBox.defaultStyle = NameStyle;
	NameBox.alignment = LAYOUT_CENTER | LAYOUT_MIDDLE;
	BodyBox = markupBox(sheet);
	BodyBox.setTextFitting(FIT_BOTH);
	BodyBox.setLineTightness(0.1);
	BodyBox.defaultStyle = BodyStyle;
	BodyBox.alignment = LAYOUT_CENTER | LAYOUT_TOP;
	buildStatBox('ActionPoints',diy,sheet);
	buildStatBox('BuildPoints',diy,sheet);
	buildStatBox('Agility',diy,sheet);
	buildStatBox('Damage',diy,sheet);
	buildStatBox('Initiative',diy,sheet);
	buildStatBox('Mind',diy,sheet);
	buildStatBox('MindAttack',diy,sheet);
	buildStatBox('MindDefense',diy,sheet);
	buildStatBox('MindResistance',diy,sheet);
	buildStatBox('PhysicalAttack',diy,sheet);
	buildStatBox('PhysicalDefense',diy,sheet);
	buildStatBox('PhysicalResistance',diy,sheet);
	buildStatBox('Resolve',diy,sheet);
	buildStatBox('Strength',diy,sheet);
	buildStatBox('Vitality',diy,sheet);
}
function drawStatBox(Key,g,diy){
	if(GameLanguage.isKeyDefined('SSYS-'+Key+'-short')){
		this[Key+'Box'].markupText = #('SSYS-'+Key+'-short')+': '+$(Key);
	}else{
		this[Key+'Box'].markupText = $(Key);
	}
	this[Key+'Box'].drawAsSingleLine(g,diy.settings.getRegion(Key));
}
function paintFront(g,diy,sheet){
	target = sheet.getRenderTarget();
	g.fill( diy.settings.getRegion('Background-portrait-clip-region') );
	PortraitList[1].paint(g,target);
	sheet.paintTemplateImage(g);
	PortraitList[0].paint(g,target);
	NameBox.markupText = $Name;
	NameBox.drawAsSingleLine(g,diy.settings.getRegion('Name'));
	BodyBox.markupText = $Body;
	BodyBox.draw(g,diy.settings.getRegion('Body'));
	drawStatBox('ActionPoints',g,diy);
	drawStatBox('BuildPoints',g,diy);
	drawStatBox('Agility',g,diy);
	drawStatBox('Damage',g,diy);
	drawStatBox('Initiative',g,diy);
	drawStatBox('Mind',g,diy);
	drawStatBox('MindAttack',g,diy);
	drawStatBox('MindDefense',g,diy);
	drawStatBox('MindResistance',g,diy);
	drawStatBox('PhysicalAttack',g,diy);
	drawStatBox('PhysicalDefense',g,diy);
	drawStatBox('PhysicalResistance',g,diy);
	drawStatBox('Resolve',g,diy);
	drawStatBox('Strength',g,diy);
	drawStatBox('Vitality',g,diy);
}
function onWrite(diy,oos){
	oos.writeObject(PortraitList[0]);
	oos.writeObject(PortraitList[1]);
}
function onRead(diy,ois){
	PortraitList[0] = ois.readObject();
	PortraitList[1] = ois.readObject();
}
function onClear(diy){
	$ActionPoints='';
	$BuildPoints='';
	$Agility='';
	$Body='';
	$Damage='';
	$Initiative='';
	$Mind='';
	$MindAttack='';
	$MindDefense='';
	$MindResistance='';
	$Name='';
	$PhysicalAttack='';
	$PhysicalDefense='';
	$PhysicalResistance='';
	$Resolve='';
	$Strength='';
	$Vitality='';
}
if(sourcefile=='Quickscript'){
	useLibrary('project:SuperSystem/resources/SuperSystem/SSYS.js');
	Eons.namedObjects.SSYS = new gameObject();
	GameLanguage.addStrings('project:SuperSystem/resources/SuperSystem/text/SSYS-game.properties');
	InterfaceLanguage.addStrings('project:SuperSystem/resources/SuperSystem/text/SSYS-interface.properties');
	testDIYScript();
}
