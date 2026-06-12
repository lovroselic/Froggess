/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
//Assets for Froggess
"use strict";



/** END */

LoadSheetSequences = [
    { srcName: "Froggess.png", count: 6, name: "Froggess" },
];

LoadFonts = [

    { srcName: "C64_Pro-STYLE.ttf", name: "C64" },
    { srcName: "ArcadeClassic.ttf", name: "Arcade" },
    { srcName: "MoriaCitadel.ttf", name: "Moria" },

];

LoadTextures = [
    /** textures used by shaders */
    //{ srcName: "Shading/Fire_color_map_512.webp", name: "Fire_color_map" },
    //{ srcName: "Shading/fire_noise_512.webp", name: "Fire_noise" },

    //title
    { srcName: "Title/Froggess_title_768.webp", name: "Title" },
    { srcName: "Title/FroggessBackground.webp", name: "FroggessBackground" },

    //explosions
    //{ srcName: "ObjectTextures/RedLiquid.jpg", name: "RedLiquid" },
    //{ srcName: "ObjectTextures/SnowTexture.webp", name: "SnowTexture" },



];

LoadAudio = [
    { srcName: "Acceptance - LaughingSkull.mp3", name: "Title" },
    { srcName: "death.mp3", name: "Death" },

    //action sounds


];

LoadShaders = [
    'vShader2D_1_0.glsl', 'fShader2D_1_0.glsl',
];

//LoadObjects = [  ];

//LoadModels = [];

LoadSprites = [
    //UI
    { srcName: "UI/FroggessLife.png", name: "Lives" },

    //Items/sprites
    { srcName: "Items/FroggessFilled.png", name: "FroggessFilled" },
    { srcName: "Items/DeadFrog.png", name: "DeadFrog" },
];

console.log("%cAssets for Froggess ready.", "color: orange");