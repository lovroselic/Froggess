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
        0: {
            dir: -1,
            gap: 10,
            speed: 2,
        },
        //road lanes
        1: {
            dir: 1,
            gap: 4,
            speed: 1,
        },
        2: {
            dir: -1,
            gap: 5,
            speed: 1.2,
        },
        3: {
            dir: 1,
            gap: 6,
            speed: 1,
        },
        4: {
            dir: -1,
            gap: 7,
            speed: 1.35,
        },
        //mid row, pavement
        5: {
            dir: 1,
            gap: 10,
            speed: 2,
        },
        //water lanes
        6: {
            dir: -1,
            gap: 2,
            //speed: 0, //1
            speed: 1, //1
            types: ["Turtle3"],
            start: 0,

        },
        7: {
            dir: 1,
            gap: 2,
            speed: 1.15,
            //speed: 0,
            types: ["Log3"],
            start: 1,
        },
        8: {
            dir: 1,
            gap: 2,
            speed: 1.75,
            types: ["Log5"],
            start: 2,
        },
        9: {
            dir: -1,
            gap: 3,
            speed: 1.25,
            types: ["Turtle4"],
            start: 1,
        },
        10: {
            dir: 1,
            gap: 3,
            speed: 1.4,
            types: ["Log4"],
            start: 0,
        }
    },
    2: {},
    3: {},
};
