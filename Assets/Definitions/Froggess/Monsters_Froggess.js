/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";
console.log("%cMonsters for Froggess loaded.", "color: #888");

const HERO_TYPE = {
    Froggess: {
        name: "Froggess",
        asset: "Froggess",
        speed: 4.0 * 64,
        w: 64,
        h: 54,
        fps: 30,
        animate: true,
        dirRef: UP,
    }
};

const MONSTER_TYPE = {
    Log3: {
        name: "Log3",
        category: "carrier",
        gridLength: 3,
        asset: "Log3",
        canVanish: false,
        vanishTimer: 0,
        animate: false,
        dirRef: RIGHT,
    },
    Log4: {
        name: "Log4",
        category: "carrier",
        gridLength: 4,
        asset: "Log4",
        canVanish: false,
        vanishTimer: 0,
        animate: false,
        dirRef: RIGHT,
    },
    Log5: {
        name: "Log5",
        category: "carrier",
        gridLength: 5,
        asset: "Log5",
        canVanish: false,
        vanishTimer: 0,
        animate: false,
        dirRef: RIGHT,
    },
    Turtle2: {
        name: "Turtle2",
        category: "carrier",
        gridLength: 2,
        asset: "Turtle",
        canVanish: true,
        vanishTimer: 12,
        animate: false,
        dirRef: LEFT,
    },
    Turtle3: {
        name: "Turtle3",
        category: "carrier",
        gridLength: 3,
        asset: "Turtle",
        //asset: "Log3",
        canVanish: true,
        vanishTimer: 10,
        animate: false,
        dirRef: LEFT,
    },
    Turtle4: {
        name: "Turtle4",
        category: "carrier",
        gridLength: 4,
        asset: "Turtle",
        canVanish: true,
        vanishTimer: 8,
        animate: false,
        dirRef: LEFT,
    },
};