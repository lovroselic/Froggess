/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";
console.log("%cMAP for Froggess loaded.", "color: #888");



/** Map definitions */
const MAP = {
    main: {
        data: '{"width":"15","height":"12","depth":1,"map":"AA90Á䁁䁁5$BB4ÁÁ74BB6"}',
        start: '[172,1]',
    }
    ,
    1: {
        //first row, pavement
        0: {},
        //road lanes
        1: {
            dir: 1,
            gap: 4,
            speed: 1.5,
            types: ["SUV", "PoliceCar"],
            start: 0,
            gridLength: 2,
        },
        2: {
            dir: -1,
            gap: 4,
            speed: 1.6,
            types: ["BronzeFormula", "GoldFormula", "SilverFormula"],
            start: 0,
            gridLength: 2,
        },
        3: {
            dir: 1,
            gap: 4,
            speed: 1.25,
            types: ["BlueCar", "GreenCar", "OrangeCar"],
            start: 1,
            gridLength: 1,
        },
        4: {
            dir: -1,
            gap: 3,
            speed: 1.0,
            types: ["SilverTruck", "BrownTruck", "BronzeTruck"],
            start: 0,
            gridLength: 3,
        },
        //mid row, pavement
        5: {
            dir: 1,
            gap: 14,
            speed: 1,
            start: 0,
            gridLength: 1,
            types: ["Snake"],
        },
        //water lanes
        6: {
            dir: -1,
            gap: 2,
            speed: 1,
            types: ["Turtle3"],
            start: 0,
            gridLength: 3,
        },
        7: {
            dir: 1,
            gap: 2,
            speed: 1.15,
            types: ["Log3"],
            start: 1,
            gridLength: 3,
            bonus: 1,
            bonusTypes: ["FrogBonus"]
        },
        8: {
            dir: 1,
            gap: 2,
            speed: 1.75,
            types: ["Log5"],
            start: 2,
            gridLength: 5,
        },
        9: {
            dir: -1,
            gap: 3,
            speed: 1.25,
            types: ["Turtle4"],
            start: 1,
            gridLength: 4,
        },
        10: {
            dir: 1,
            gap: 3,
            speed: 1.4,
            types: ["Log4"],
            start: 0,
            gridLength: 4,
        },
        //finish lane
        11: {
            bonusBlink: ["FlyBonus"],
        }
    },
    2: {
        //first row, pavement
        0: {
            dir: 1,
            gap: 14,
            speed: 1,
            start: 0,
            gridLength: 1,
            types: ["Snake"],
        },
        //road lanes
        1: {
            dir: 1,
            gap: 4,
            speed: 1.5,
            types: ["SUV", "PoliceCar", "FireTruck", "Ambulance"],
            start: 0,
            gridLength: 2,
        },
        2: {
            dir: -1,
            gap: 4,
            speed: 1.6,
            types: ["BronzeFormula", "GoldFormula", "RedFormula", "SilverFormula"],
            start: 0,
            gridLength: 2,
        },
        3: {
            dir: 1,
            gap: 4,
            speed: 1.25,
            types: ["BlueCar", "GreenCar", "OrangeCar", "PurpleCar", "RedCar", "SilverCar", "YellowCar"],
            //types: ["BlueCar"],
            start: 1,
            gridLength: 1,

        },
        4: {
            dir: -1,
            gap: 3,
            speed: 1.0,
            types: ["SilverTruck", "BrownTruck", "BronzeTruck"],
            start: 0,
            gridLength: 3,
        },
        //mid row, pavement
        5: {
            dir: 1,
            gap: 14,
            speed: 1.2,
            start: 3,
            gridLength: 1,
            types: ["Snake"],
        },
        //water lanes
        6: {
            dir: -1,
            gap: 2,
            speed: 1,
            types: ["Turtle3"],
            start: 0,
            gridLength: 3,
        },
        7: {
            dir: 1,
            gap: 2,
            speed: 1.15,
            types: ["Log3"],
            start: 1,
            gridLength: 3,

        },
        8: {
            dir: 1,
            gap: 2,
            speed: 1.75,
            types: ["Log5"],
            start: 2,
            gridLength: 5,
        },
        9: {
            dir: -1,
            gap: 3,
            speed: 1.25,
            types: ["Turtle4"],
            start: 1,
            gridLength: 4,

        },
        10: {
            dir: 1,
            gap: 3,
            speed: 1.4,
            types: ["Log4"],
            start: 0,
            gridLength: 4,
            bonus: 1,
            bonusTypes: ["FrogBonus"]
        },
        //finish lane
        11: {
            enemyBlink: ["Beast"],
        }
    },
};
