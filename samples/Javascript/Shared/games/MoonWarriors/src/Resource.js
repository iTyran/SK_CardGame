var dirImg = "res/";
var dirMusic = "res/Music/";

//image
var s_loading = dirImg + "loading.png";
var s_menu = dirImg + "menu.png";
var s_logo = dirImg + "logo.png";
var s_b01 = dirImg + "b01.png";
var s_cocos2dhtml5 = dirImg + "cocos2d-html5.png";
var s_gameOver = dirImg + "gameOver.png";
var s_menuTitle = dirImg + "menuTitle.png";
var s_flare = dirImg + "flare.jpg";
var s_explosion = dirImg + "explosion.png";
var s_arial14 = dirImg + "arial-14.png";
var s_arial14_fnt = dirImg + "arial-14.fnt";
var s_textureOpaquePack = dirImg + "textureOpaquePack.png";
var s_textureTransparentPack = dirImg + "textureTransparentPack.png";

//music
var s_bgMusic_mp3 = dirMusic + "bgMusic.mp3";
var s_mainMainMusic_mp3 = dirMusic + "mainMainMusic.mp3";

//effect
var s_buttonEffect_mp3 = dirMusic + "buttonEffet.mp3";
var s_explodeEffect_mp3 = dirMusic + "explodeEffect.mp3";
var s_fireEffect_mp3 = dirMusic + "fireEffect.mp3";
var s_shipDestroyEffect_mp3 = dirMusic + "shipDestroyEffect.mp3";

var s_bgMusic_ogg = dirMusic + "bgMusic.ogg";
var s_mainMainMusic_ogg = dirMusic + "mainMainMusic.ogg";

//effect
var s_buttonEffect_ogg = dirMusic + "buttonEffet.ogg";
var s_explodeEffect_ogg = dirMusic + "explodeEffect.ogg";
var s_fireEffect_ogg = dirMusic + "fireEffect.ogg";
var s_shipDestroyEffect_ogg = dirMusic + "shipDestroyEffect.ogg";

//tmx
var s_level01 = dirImg + "level01.tmx";

//plist
var s_explosion_plist = dirImg + "explosion.plist";
var s_textureOpaquePack_plist = dirImg + "textureOpaquePack.plist";
var s_textureTransparentPack_plist = dirImg + "textureTransparentPack.plist";

var g_mainmenu = [
    {src:s_loading},
    {src:s_flare},
    {src:s_menu},
    {src:s_logo},
    {src:s_flare},
	{src:s_b01},
    {src:s_mainMainMusic_mp3},
    {src:s_mainMainMusic_ogg},
    {src:s_menuTitle},
    {src:s_textureTransparentPack_plist},
    {src:s_textureTransparentPack}
];

var g_maingame = [
    //image
    {src:s_cocos2dhtml5},
    {src:s_gameOver},
    {src:s_arial14},
    {src:s_explosion},
    {src:s_textureOpaquePack},

    //tmx
    {src:s_level01},

    //plist
    {src:s_explosion_plist},
    {src:s_textureOpaquePack_plist},

    //music
    {src:s_bgMusic_mp3},
    {src:s_bgMusic_ogg},

    //effect
    {src:s_buttonEffect_mp3},
    {src:s_explodeEffect_mp3},
    {src:s_fireEffect_mp3},
    {src:s_shipDestroyEffect_mp3},
    {src:s_buttonEffect_ogg},
    {src:s_explodeEffect_ogg},
    {src:s_fireEffect_ogg},
    {src:s_shipDestroyEffect_ogg},

    // FNT
    {src:s_arial14_fnt}
];
