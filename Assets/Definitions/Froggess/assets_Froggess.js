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

    //action sounds


];

LoadShaders = [
    'vShader_1_2.glsl',
    'fShader_1_5.glsl',
    'pick_vShader_1_0.glsl', 'pick_fShader_1_0.glsl',
    'particle_render_fShader_1_1.glsl', 'particle_render_vShader_1_0.glsl', 'particle_transform_fShader_1_0.glsl', 'particle_transform_vShader_1_1.glsl',
    'model_vShader_1_2.glsl', 'fire_transform_vShader_1_0.glsl', 'fire_render_fShader_1_0.glsl',
    'shadow_vShader_1_0.glsl', 'shadow_fShader_1_0.glsl'
];

//LoadObjects = [  ];

LoadModels = [
   
];

LoadSprites = [
   
];

console.log("%cAssets for Froggess ready.", "color: orange");