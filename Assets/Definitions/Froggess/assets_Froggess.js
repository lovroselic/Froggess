/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
//Assets for Froggess
"use strict";



/** END */

LoadSheetSequences = [
    { srcName: "Froggess.png", count: 6, name: "Froggess", trim: false },
    { srcName: "Log3.webp", count: 3, name: "Log3", trim: false },
    { srcName: "Log4.webp", count: 4, name: "Log4", trim: false },
    { srcName: "Log5.webp", count: 5, name: "Log5", trim: false },
    { srcName: "SnakeAnimation.png", count: 4, name: "Snake", trim: false },
    { srcName: "Turtle.webp", count: 1, name: "Turtle", trim: false },
    { srcName: "Frog2.png", count: 1, name: "Frog", trim: false },
    { srcName: "Ambulance.png", count: 2, name: "Ambulance", trim: false },
    { srcName: "BlueCar.png", count: 1, name: "BlueCar", trim: false },
    { srcName: "BronzeFormula.png", count: 2, name: "BronzeFormula", trim: false },
    { srcName: "BronzeTruck.png", count: 3, name: "BronzeTruck", trim: false },
    { srcName: "BrownTruck.png", count: 3, name: "BrownTruck", trim: false },
    { srcName: "Crocodile.png", count: 2, name: "Crocodile", trim: false },
    { srcName: "FireTruck.png", count: 2, name: "FireTruck", trim: false },
    { srcName: "GoldFormula.png", count: 2, name: "GoldFormula", trim: false },
    { srcName: "GreenCar.png", count: 1, name: "GreenCar", trim: false },
    { srcName: "OrangeCar.png", count: 1, name: "OrangeCar", trim: false },
    { srcName: "PoliceCar.png", count: 2, name: "PoliceCar", trim: false },
    { srcName: "PurpleCar.png", count: 1, name: "PurpleCar", trim: false },
    { srcName: "RedCar.png", count: 1, name: "RedCar", trim: false },
    { srcName: "RedFormula.png", count: 2, name: "RedFormula", trim: false },
    { srcName: "SUV.png", count: 2, name: "SUV", trim: false },
    { srcName: "SilverCar.png", count: 1, name: "SilverCar", trim: false },
    { srcName: "SilverFormula.png", count: 2, name: "SilverFormula", trim: false },
    { srcName: "SilverTruck.png", count: 3, name: "SilverTruck", trim: false },
    { srcName: "YellowCar.png", count: 1, name: "YellowCar", trim: false },
    { srcName: "BeastJaw.png", count: 1, name: "Beast", trim: false },
    { srcName: "Fly2.png", count: 1, name: "Fly", trim: false },
];

LoadFonts = [
    { srcName: "C64_Pro-STYLE.ttf", name: "C64" },
    { srcName: "ArcadeClassic.ttf", name: "Arcade" },
    { srcName: "MoriaCitadel.ttf", name: "Moria" },
];

LoadTextures = [
    { srcName: "Title/Froggess_title_768.webp", name: "Title" },
    { srcName: "Title/FroggessBackground.webp", name: "FroggessBackground" },
];

LoadAudio = [
    { srcName: "Acceptance - LaughingSkull.mp3", name: "Title" },
    { srcName: "death.mp3", name: "Death" },
    { srcName: "ExtraLife.mp3", name: "ExtraLife" },
    { srcName: "death.mp3", name: "Death" },
    { srcName: "Splash.mp3", name: "Splash" },
    { srcName: "Level up.mp3", name: "LevelUp" },
    { srcName: "Ribbit.mp3", name: "Ribbit" },
];

LoadShaders = [
    'vShader2D_1_0.glsl', 'fShader2D_1_0.glsl',
];

LoadSprites = [
    //UI
    { srcName: "UI/FroggessLife.png", name: "Lives" },

    //Items/sprites
    { srcName: "Items/FroggessFilled.png", name: "FroggessFilled" },
    { srcName: "Items/DeadFrog.png", name: "DeadFrog" },
];

console.log("%cAssets for Froggess ready.", "color: orange");