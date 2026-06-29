/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
//Assets for Froggess
"use strict";



/** END */

LoadSheetSequences = [
    { srcName: "Froggess.png", count: 6, name: "Froggess" },
    { srcName: "Log3.webp", count: 3, name: "Log3" },
    { srcName: "Log4.webp", count: 4, name: "Log4" },
    { srcName: "Log5.webp", count: 5, name: "Log5" },
    { srcName: "SnakeAnimation.png", count: 4, name: "Snake" },
    { srcName: "Turtle.webp", count: 1, name: "Turtle" },

    { srcName: "Ambulance.png", count: 2, name: "Ambulance" },
    { srcName: "BlueCar.png", count: 1, name: "BlueCar" },
    { srcName: "BronzeFormula.png", count: 2, name: "BronzeFormula" },
    { srcName: "BronzeTruck.png", count: 3, name: "BronzeTruck" },
    { srcName: "BrownTruck.png", count: 3, name: "BrownTruck" },
    { srcName: "Crocodile.png", count: 2, name: "Crocodile" },
    { srcName: "FireTruck.png", count: 2, name: "FireTruck" },
    { srcName: "GoldFormula.png", count: 2, name: "GoldFormula" },
    { srcName: "GreenCar.png", count: 1, name: "GreenCar" },
    { srcName: "OrangeCar.png", count: 1, name: "OrangeCar" },
    { srcName: "PoliceCar.png", count: 2, name: "PoliceCar" },
    { srcName: "PurpleCar.png", count: 1, name: "PurpleCar" },
    { srcName: "RedCar.png", count: 1, name: "RedCar" },
    { srcName: "RedFormula.png", count: 2, name: "RedFormula" },
    { srcName: "SUV.png", count: 2, name: "SUV" },
    { srcName: "SilverCar.png", count: 1, name: "SilverCar" },
    { srcName: "SilverFormula.png", count: 2, name: "SilverFormula" },
    { srcName: "SilverTruck.png", count: 3, name: "SilverTruck" },
    { srcName: "YellowCar.png", count: 1, name: "YellowCar" },
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
    { srcName: "ExtraLife.mp3", name: "ExtraLife" },
    { srcName: "death.mp3", name: "Death" },
    { srcName: "Splash.mp3", name: "Splash" },
    { srcName: "Level up.mp3", name: "LevelUp" },
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
    { srcName: "Items/BeastJaw.png", name: "BeastJaw" },
    { srcName: "Items/Fly2.png", name: "Fly2" },
    { srcName: "Items/Frog2.png", name: "Frog2" },



];

console.log("%cAssets for Froggess ready.", "color: orange");