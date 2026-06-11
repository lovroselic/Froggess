/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

/**
 * definition of:
 *      monsters
 *      scrolls
 *      other item types
 */

"use strict";
console.log("%cMonsters for Groggess loaded.", "color: #888");

const HERO_TYPE = {
    Froggess: {
        name: "Froggess",
        asset: "Froggess",
        speed: 4.0 * 64,
        w: 64,
        h: 54,
        fps: 30,
    }
};

const MONSTER_TYPE = {
    /*Skeleton: {
        name: "WhiteSkeleton",
        model: "Skeleton",
        scale: 1.5 / 2 ** 4,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        material: MATERIAL.standardShine,
        static: true
    },*/
};