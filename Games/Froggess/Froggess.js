/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

/////////////////////////////////////////////////
/*
      
TODO:
    * 
known bugs: 
    * i don't do bugs

retests:
    * all completed

 */
////////////////////////////////////////////////////

const DEBUG = {
    SETTING: true,
    FPS: true,
    VERBOSE: true,
    _2D_display: false,
    INVINCIBLE: false,
    keys: false,
    max17: false,
};

const INI = {
    SCREEN_BORDER: 64,
    HERO_HEALTH: 100,
    //HERO_HEIGHT: 0.15,
    WINDOW_SCALE: 0.90,
    //TIMEOUT: 60,
    TIMEOUT: 600,
    MAX_ROW: 11,
    SCORE_ROW: 10,
    SCORE_GOAL: 50,
    SCORE_PER_SECOND: 10,
};

const PRG = {
    VERSION: "0.6.3",
    NAME: "Froggess",
    YEAR: "2026",
    SG: "Froggess",
    CSS: "color: #239AFF;",
    INIT() {
        console.log("%c**************************************************************************************************************************************", PRG.CSS);
        console.log(`${PRG.NAME} ${PRG.VERSION} by Lovro Selic, (c) LaughingSkull ${PRG.YEAR} on ${navigator.userAgent}`);
        console.log("%c**************************************************************************************************************************************", PRG.CSS);
        $("#title").html(PRG.NAME);
        $("#version").html(`${PRG.NAME} V${PRG.VERSION} <span style='font-size:14px'>&copy</span> LaughingSkull ${PRG.YEAR}`);
        $("input#toggleAbout").val("About " + PRG.NAME);
        $("#about fieldset legend").append(" " + PRG.NAME + " ");

        ENGINE.autostart = true;
        ENGINE.start = PRG.start;
        ENGINE.readyCall = GAME.setup;
        ENGINE.setGridSize(64);
        ENGINE.setSpriteSheetSize(64);
        ENGINE.init();
    },
    setup() {

        $("#engine_version").html(ENGINE.VERSION);
        $("#grid_version").html(GRID.VERSION);
        $("#maze_version").html(DUNGEON.VERSION);
        $("#iam_version").html(IndexArrayManagers.VERSION);
        $("#lib_version").html(LIB.VERSION);
        $("#webgl_version").html(WebGL.VERSION);
        $("#maptools_version").html(MAP_TOOLS.VERSION);

        $("#toggleHelp").click(function () {
            $("#help").toggle(400);
        });
        $("#toggleAbout").click(function () {
            $("#about").toggle(400);
        });
        $("#toggleVersion").click(function () {
            $("#debug").toggle(400);
        });

        //boxes
        ENGINE.gameWIDTH = 960;
        ENGINE.titleWIDTH = ENGINE.gameWIDTH + 2 * INI.SCREEN_BORDER;
        ENGINE.sideWIDTH = INI.SCREEN_BORDER;
        ENGINE.gameHEIGHT = 768;
        ENGINE.titleHEIGHT = 96;
        ENGINE.bottomHEIGHT = 80;
        ENGINE.bottomWIDTH = ENGINE.titleWIDTH;
        MAP_TOOLS.INI.FOG = false;

        $("#bottom").css("margin-top", ENGINE.gameHEIGHT + ENGINE.titleHEIGHT + ENGINE.bottomHEIGHT);
        $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 2 * ENGINE.sideWIDTH + 4);
        ENGINE.addBOX("TITLE", ENGINE.titleWIDTH, ENGINE.titleHEIGHT, ["title", "score", "level", "hiscore", "time"], null);
        ENGINE.addBOX("LSIDE", INI.SCREEN_BORDER, ENGINE.gameHEIGHT, ["Lsideback",], "side");
        ENGINE.addBOX("ROOM", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["background", "grid", "coord", "3d_webgl", "fill", "info", "text", "FPS", "button", "click"], "side");
        ENGINE.addBOX("SIDE", ENGINE.sideWIDTH, ENGINE.gameHEIGHT, ["sideback"], "fside");
        ENGINE.addBOX("DOWN", ENGINE.bottomWIDTH, ENGINE.bottomHEIGHT, ["bottom", "bottomText", "subtitle", "lives",], null);

        MAP_TOOLS.use2D();

        /** dev settings */
        if (DEBUG.VERBOSE) {
            WebGL.VERBOSE = true;
            ENGINE.verbose = true;
            MAP_TOOLS.INI.VERBOSE = true;
        }
    },
    start() {
        console.log("%c**************************************************************************************************************************************", PRG.CSS);
        console.log(`${PRG.NAME} ${PRG.VERSION} STARTED!`);
        console.log("%c**************************************************************************************************************************************", PRG.CSS);
        $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
        $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
        $(ENGINE.topCanvas).css("cursor", "");
        $("#startGame").addClass("hidden");
        ENGINE.disableDefaultKeys();
        TITLE.startTitle();
    }
};

const HERO = {
    construct() {
        this.player = null;
        this.dead = false;
        this.carried = 0;
        this.row = INI.MAX_ROW;
        this.to_fill = 5;
        //this.to_fill = 1; //
    },
    concludeAction() {
        if (!HERO.player.moveState.moving) HERO.player.sprite.reset();
    },
    die() {
        console.error("HERO.die");
        if (HERO.dead) return;
        HERO.dead = true;
    },
    async death() {
        console.error("HERO.death");
        ENGINE.GAME.ANIMATION.stop();
        GAME.lives--;

        await AUDIO_TOOLS.waitUntilEnded(AUDIO.Splash);
        await AUDIO_TOOLS.playAndWait(AUDIO.Death);
        HERO.finalDeath();
    },
    finalDeath() {
        console.error("HERO.finalDeath");
        if (GAME.lives > 0) return GAME.levelStart();
        GAME.checkScore();
        TITLE.hiscore();
        TITLE.startTitle();
    },
    manage(lapsedTime) {
        this.player.continueMove(lapsedTime);
    },
    completeLevel() {
        console.error("level completed");
        AUDIO.LevelUp.play();
        GAME.level++;
        GAME.levelStart();
    },
    nextLevel() {
        $("#FORM").remove();
        GAME.level = Math.min(INI.MAX_LEVEL, ++GAME.level);
        GAME.start();
    },
    playerSetUp() {
        const map = MAP.main.map;
        const start_dir = map.startPosition.vector;
        const start_grid = Grid.toClass(map.startPosition.grid);
        HERO.player = new $2D_player(start_grid, start_dir, HERO_TYPE.Froggess, map.GA, map);
        HERO.player.addDeathTexture(SPRITE.DeadFrog);
        console.log("HERO.player", HERO.player);
        if (GAME.time) GAME.time.unregister();
        GAME.time = new CountDown("LevelTime", INI.TIMEOUT, HERO.die);
    },
    handleHoleMove(grid) {

        const map = MAP.main.map;
        const IA = map.enemyIA;
        const who = IA.unroll(grid)[0] || null; //can be only one

        console.warn("handleHoleMove", grid, "who", who);


        //check survival ..
        if (who) {
            const which = PLANE_GRID1D.show(who);

            if (which.category === "carrier") {
                HERO.carried = who;
                HERO.checkForwardProgress();
                return;
            }

        }

        //
        AUDIO.Splash.play();
        HERO.die();
    },
    handleEmptyMove(grid) {
        console.warn("handleEmptyMove", grid);
        HERO.carried = 0;
        HERO.checkForwardProgress();
    },
    handleReservedMove(grid) {
        console.warn("handleReservedMove", grid);
        const GA = this.player.GA;
        GA.toWall(grid);
        ENGINE.drawToGrid("fill", grid, SPRITE.FroggessFilled);
        GAME.score += INI.SCORE_GOAL;
        TITLE.score();
        HERO.player.sprite.hide();
        GAME.time.stop();
        ENGINE.GAME.ANIMATION.next(GAME.goalReachedRun);
    },
    checkForwardProgress() {
        const currentRow = this.player.moveState.startGrid.y;
        if (currentRow < this.row) {
            this.row = currentRow;
            GAME.score += INI.SCORE_ROW;
            TITLE.score();
        }
    }
};

const GAME = {
    time: null,
    realSpeed: null,
    highSpeed: null,
    restarted: false,
    timerRunning: false,
    levelComplete: false,
    start() {
        console.log("GAME started");
        if (AUDIO.Title) {
            AUDIO.Title.pause();
            AUDIO.Title.currentTime = 0;
        }
        $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
        $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
        $(ENGINE.topCanvas).css("cursor", "");
        ENGINE.hideMouse();
        ENGINE.GAME.pauseBlock();
        ENGINE.GAME.paused = true;

        let GameRD = new RenderData("Moria", 60, "#fF2010", "text", "#444444", 2, 2, 2);
        ENGINE.TEXT.setRD(GameRD);
        ENGINE.watchVisibility(ENGINE.GAME.lostFocus);
        ENGINE.GAME.setGameLoop(GAME.run);
        ENGINE.GAME.start(16);
        GAME.extraLife = SCORE.extraLife.clone();
        GAME.level = 1;
        GAME.lives = 3; //3
        GAME.score = 0;

        GAME.fps = new FPS_short_term_measurement(300);
        if (DEBUG._2D_display) GRID.grid();

        GAME.levelStart();
    },
    WebGL_settings() {
        WebGL.INI.BACKGROUND_ALPHA = 0.0;
    },
    levelStart() {
        console.log("starting level", GAME.level);
        GAME.prepareForRestart();
        ENGINE.draw("background", 0, 0, TEXTURE.FroggessBackground);
        HERO.construct();
        this.levelComplete = false;
        GAME.initLevel(GAME.level);
        GAME.continueLevel();
    },
    continueLevel() {
        GAME.levelExecute();
    },
    levelExecute() {
        GAME.drawFirstFrame(GAME.level);
        ENGINE.GAME.resume();
    },
    setCameraView() {
        WebGL.hero.camera2D = new $2D_Camera(ENGINE.gameWIDTH, ENGINE.gameHEIGHT);
        WebGL.camera = WebGL.hero.camera2D;
    },
    initLevel(level) {
        if (DEBUG.VERBOSE) console.info("init level", level);
        this.newDungeon();
        this.buildWorld(level);
        HERO.playerSetUp();
        GAME.setCameraView();
        GAME.setWorld();
    },
    setWorld() {
        WebGL.init2D('webgl');
    },
    buildWorld(level) {
        if (DEBUG.VERBOSE) console.info(" ******** building world, room/dungeon/level:", level, "restart", GAME.restarted);
        WebGL.init_required_IAM(MAP.main.map, HERO);
        SPAWN_TOOLS.spawnLanes(level, MAP.main.map.GA);
    },
    newDungeon() {
        MAP_TOOLS.unpack("main");
        MAP.main.unpacked = false;
    },
    prepareForRestart() {
        let clear = ["background", "text", "FPS", "button", "bottomText", "fill"];
        ENGINE.clearManylayers(clear);
        TITLE.blackBackgrounds();
        ENGINE.TIMERS.clear();
    },
    async setup() {
        console.log("GAME SETUP started");
        $("#conv").remove();
        GAME.WebGL_settings();
        WebGL.setContext('webgl');
        await ASSET.convertToTextures();
    },
    setTitle() {
        const text = GAME.generateTitleText();
        const RD = new RenderData("Moria", 24, "#0E0", "bottomText");
        const SQ = new RectArea(0, 0, LAYER.bottomText.canvas.width, LAYER.bottomText.canvas.height);
        GAME.movingText = new MovingText(text, 4, RD, SQ);
    },
    generateTitleText() {
        let text = `${PRG.NAME} ${PRG.VERSION
            }, a game by Lovro Selič, ${"\u00A9"} LaughingSkull ${PRG.YEAR
            }. 
             
            Music: 'Acceptance' written and performed by LaughingSkull, ${"\u00A9"
            } 2008 Lovro Selič. `;
        text += "     ENGINE, SPEECH, GRID, MAZE, Burrows-Wheeler RLE Compression, WebGL, shaders and GAME code by Lovro Selič using JavaScript and GLSL. ";
        text += "     glMatrix library by Brandon Jones and Colin MacKenzie IV. Thanks. ";
        text = text.split("").join(String.fromCharCode(8202));
        return text;
    },
    runTitle() {
        if (ENGINE.GAME.stopAnimation) return;
        GAME.movingText.process();
        GAME.titleFrameDraw();
    },
    titleFrameDraw() {
        GAME.movingText.draw();
    },
    drawFirstFrame(level) {
        if (DEBUG.VERBOSE) console.log("drawing first frame");
        if (DEBUG._2D_display) GRID.paintCoord("coord", MAP.main.map);
        TITLE.firstFrame();
    },
    run(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        const date = Date.now();
        //EXPLOSION3D.manage(date);
        GAME.respond(lapsedTime);
        ENGINE.TIMERS.update();
        HERO.manage(lapsedTime);
        PLANE_GRID1D.manage(lapsedTime);
        GAME.frameDraw(lapsedTime);
        HERO.concludeAction(lapsedTime);
        if (HERO.dead) IAM.checkIfProcessesComplete([EXPLOSION3D], HERO.death);
        if (GAME.completed) GAME.won();
    },
    frameDraw(lapsedTime) {
        WebGL.render2DScene(MAP[GAME.level].map);
        TITLE.time();
        if (DEBUG.FPS) {
            GAME.FPS(lapsedTime);
        }
    },
    respond(lapsedTime) {
        if (HERO.dead) return;
        if (GAME.levelComplete) return;

        HERO.player.respond(lapsedTime);
        WebGL.GAME.respond(lapsedTime);
        ENGINE.GAME.respond(lapsedTime);

        const map = ENGINE.GAME.keymap;

        //debug
        if (map[ENGINE.KEY.map.F7]) {
            if (!DEBUG.keys) return;
        }
        if (map[ENGINE.KEY.map.F8]) {
            if (!DEBUG.keys) return;

            ENGINE.GAME.keymap[ENGINE.KEY.map.F8] = false;

            console.log("\nDEBUG:");
            console.log("#######################################################");

            console.log("#######################################################");
        }
        if (map[ENGINE.KEY.map.F9]) {
            ENGINE.GAME.keymap[ENGINE.KEY.map.F9] = false;

            if (!DEBUG.keys) return;

            console.log("\nDEBUG:");
            console.log("#######################################################");

            console.log("#######################################################");
        }

        return;
    },
    FPS(lapsedTime) {
        let CTX = LAYER.FPS;
        CTX.fillStyle = "white";
        ENGINE.clearLayer("FPS");
        let fps = 1000 / lapsedTime || 0;
        GAME.fps.update(fps);
        CTX.fillText(GAME.fps.getFps(), 5, 10);
    },
    gameOverRun(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        if (ENGINE.GAME.keymap[ENGINE.KEY.map.enter]) {
            ENGINE.GAME.ANIMATION.waitThen(TITLE.startTitle);
        }
        const date = Date.now();
        WebGL.GAME.setThirdPerson();
        EXPLOSION3D.manage(date);
        ENTITY3D.manage(lapsedTime, date, [HERO.invisible, HERO.dead]);
        GAME.lifeLostFrameDraw(lapsedTime);
    },
    checkScore() {
        SCORE.checkScore(GAME.score);
        SCORE.hiScore();
    },
    goalReachedRun() {
        if (ENGINE.GAME.stopAnimation) return;
        GAME.time.decrease(1);
        GAME.score += INI.SCORE_PER_SECOND;
        const remains = GAME.time.remains();
        if (remains <= 0) {
            HERO.to_fill--;
            if (HERO.to_fill === 0) return HERO.completeLevel();
            HERO.playerSetUp();
            ENGINE.GAME.ANIMATION.next(ENGINE.GAME.gameLoop);
        }

        GAME.goalReachedFrameDraw();
    },
    goalReachedFrameDraw() {
        TITLE.time();
        TITLE.score();
    }
};

const TITLE = {
    startTitle() {
        if (DEBUG.VERBOSE) console.log("TITLE started");
        //if (AUDIO.Title) AUDIO.Title.play(); //dev

        ENGINE.GAME.pauseBlock();
        TITLE.clearAllLayers();
        TITLE.blackBackgrounds();
        TITLE.titlePlot();
        ENGINE.draw("background", (ENGINE.gameWIDTH - TEXTURE.Title.width) / 2, (ENGINE.gameHEIGHT - TEXTURE.Title.height) / 2, TEXTURE.Title);
        $("#DOWN")[0].scrollIntoView();
        ENGINE.topCanvas = ENGINE.getCanvasName("ROOM");
        TITLE.drawButtons();
        GAME.setTitle();
        ENGINE.GAME.start(16);
        ENGINE.GAME.ANIMATION.next(GAME.runTitle);
    },
    clearAllLayers() {
        ENGINE.layersToClear = new Set(["text",
            "sideback", "button", "title", "FPS", "info", "subtitle",
            "score", "level", "hiscore",
            "lives", "time",
            "fill",
            "grid", "coord",
            "bottomText"]);
        ENGINE.clearLayerStack();
        WebGL.transparent();
    },
    blackBackgrounds() {
        this.topBackground();
        this.bottomBackground();
        this.sideBackground();
        ENGINE.fillLayer("background", "#000");
    },
    topBackground() {
        const CTX = LAYER.title;
        CTX.fillStyle = "#000";
        CTX.roundRectLegacy(0, 0, ENGINE.titleWIDTH, ENGINE.titleHEIGHT, { upperLeft: 20, upperRight: 20, lowerLeft: 0, lowerRight: 0 }, true, true);
    },
    bottomBackground() {
        const CTX = LAYER.bottom;
        CTX.fillStyle = "#000";
        CTX.roundRectLegacy(0, 0, ENGINE.bottomWIDTH, ENGINE.bottomHEIGHT, { upperLeft: 0, upperRight: 0, lowerLeft: 20, lowerRight: 20 }, true, true);
    },
    sideBackground() {
        ENGINE.fillLayer("sideback", "#000");
        ENGINE.fillLayer("Lsideback", "#000");
    },
    makeGrad(CTX, x, y, w, h) {
        // Smooth Froggess title gradient:
        // deep blue -> cyan -> aqua -> lime -> green
        const grad = CTX.createLinearGradient(x, y, w, h);

        grad.addColorStop(0.000, "#06184F");
        grad.addColorStop(0.025, "#08216A");
        grad.addColorStop(0.050, "#0A2B85");
        grad.addColorStop(0.075, "#0D36A0");
        grad.addColorStop(0.100, "#1144B8");

        grad.addColorStop(0.125, "#1554CB");
        grad.addColorStop(0.150, "#1A66DA");
        grad.addColorStop(0.175, "#2079E5");
        grad.addColorStop(0.200, "#278CEF");
        grad.addColorStop(0.225, "#30A0F5");

        grad.addColorStop(0.250, "#3AB4F8");
        grad.addColorStop(0.275, "#45C7F7");
        grad.addColorStop(0.300, "#53D8F2");
        grad.addColorStop(0.325, "#63E5EA");
        grad.addColorStop(0.350, "#74EFE0");

        grad.addColorStop(0.375, "#86F6D3");
        grad.addColorStop(0.400, "#98FBC4");
        grad.addColorStop(0.425, "#AAFFB4");
        grad.addColorStop(0.450, "#BDFFA1");
        grad.addColorStop(0.475, "#CFFF8E");

        grad.addColorStop(0.500, "#DFFF7A"); // soft lime shine
        grad.addColorStop(0.525, "#D5FB68");
        grad.addColorStop(0.550, "#C7F457");
        grad.addColorStop(0.575, "#B7EC49");
        grad.addColorStop(0.600, "#A5E33E");

        grad.addColorStop(0.625, "#91D936");
        grad.addColorStop(0.650, "#7DCE31");
        grad.addColorStop(0.675, "#69C430");
        grad.addColorStop(0.700, "#55B932");
        grad.addColorStop(0.725, "#43AE34");

        grad.addColorStop(0.750, "#34A339");
        grad.addColorStop(0.775, "#28983D");
        grad.addColorStop(0.800, "#208E42");
        grad.addColorStop(0.825, "#1B8446");
        grad.addColorStop(0.850, "#187A49");

        grad.addColorStop(0.875, "#15714B");
        grad.addColorStop(0.900, "#13684C");
        grad.addColorStop(0.925, "#11604C");
        grad.addColorStop(0.950, "#10584B");
        grad.addColorStop(0.975, "#0F5149");
        grad.addColorStop(1.000, "#0E4A46");

        return grad;
    },
    titlePlot() {
        const CTX = LAYER.title;
        const fs = 64;
        CTX.font = fs + "px Moria";
        CTX.textAlign = "center";
        let txt = CTX.measureText(PRG.NAME);
        let x = ENGINE.titleWIDTH / 2;
        let y = fs;
        let gx = x - txt.width / 2;
        let gy = y - fs;
        let grad = this.makeGrad(CTX, gx, gy + 10, gx, gy + fs);
        CTX.fillStyle = grad;
        GAME.grad = grad;
        CTX.shadowColor = "#666666";
        CTX.shadowOffsetX = 2;
        CTX.shadowOffsetY = 2;
        CTX.shadowBlur = 3;
        CTX.fillText(PRG.NAME, x, y);
    },
    smalTitle() {
        const CTX = LAYER.title;
        const fs = 20;
        CTX.font = fs + "px Moria";
        CTX.textAlign = "center";
        let txt = CTX.measureText(PRG.NAME);
        let x = ENGINE.titleWIDTH / 2;
        let y = fs + 2;
        let gx = x - txt.width / 2;
        let gy = y - fs;
        let grad = this.makeGrad(CTX, gx, gy + 10, gx, gy + fs);
        CTX.fillStyle = grad;
        GAME.grad = grad;
        CTX.shadowColor = "#666666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        CTX.fillText(PRG.NAME, x, y);
    },
    drawButtons() {
        ENGINE.clearLayer("button");
        FORM.BUTTON.POOL.clear();
        let x = 8;
        const w = 100;
        const h = 24;
        const F = 1.5;
        let y = 768 - 3 * (F * h);

        const buttonColors = new ColorInfo("#F00", "#A00", "#222", "#666", 13);
        const musicColors = new ColorInfo("#0E0", "#090", "#222", "#666", 13);

        y += F * h;
        FORM.BUTTON.POOL.push(new Button("Start game", new Area(x, y, w, h), buttonColors, GAME.start));

        y += F * h;
        FORM.BUTTON.POOL.push(new Button("Title music", new Area(x, y, w, h), musicColors, TITLE.music));

        FORM.BUTTON.draw();
        $(ENGINE.topCanvas).on("mousemove", { layer: ENGINE.topCanvas }, ENGINE.mouseOver);
        $(ENGINE.topCanvas).on("click", { layer: ENGINE.topCanvas }, ENGINE.mouseClick);
    },
    firstFrame() {
        TITLE.score();
        TITLE.stage();
        TITLE.hiscore();
        TITLE.lives();
        TITLE.time();
        TITLE.smalTitle();
    },
    music() {
        AUDIO.Title.play();
    },
    time() {
        const CTX = LAYER.time;
        ENGINE.clearLayer("time");
        const x = 64;
        const h = 12;
        const y = ENGINE.titleHEIGHT - h - 1 - 16;
        const w = ENGINE.gameWIDTH;
        const remaining = GAME.time.remains();
        const fraction = remaining / INI.TIMEOUT;
        ENGINE.percentBar(fraction, y, CTX, w, ["green", "yellow", "red"], h, x, 0);
    },
    score() {
        ENGINE.clearLayer("score");
        const CTX = LAYER.score;
        const fs = 18;
        const x = 64;
        const y = ENGINE.titleHEIGHT / 2 + fs / 4;
        CTX.font = fs + "px Moria";
        CTX.textAlign = "left";
        CTX.fillStyle = "rgb(10, 149, 10)";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        CTX.fillText(`Score: ${GAME.score.toString().padStart(6, "0")}`, x, y);
        if (GAME.score >= GAME.extraLife[0]) {
            GAME.lives++;
            GAME.extraLife.shift();
            TITLE.lives();
            AUDIO.ExtraLife.play();
        }
    },
    stage() {
        ENGINE.clearLayer("level");
        const CTX = LAYER.level;
        const fs = 18;
        const x = 300 + 32;
        const y = ENGINE.titleHEIGHT / 2 + fs / 4;
        CTX.font = fs + "px Moria";
        CTX.textAlign = "left";
        CTX.fillStyle = "#2911c2";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        CTX.fillText(`Stage: ${GAME.level.toString().padStart(2, "0")}`, x, y);
    },
    hiscore() {
        ENGINE.clearLayer("hiscore");
        const CTX = LAYER.hiscore;
        const fs = 18;
        const x = ENGINE.gameWIDTH + INI.SCREEN_BORDER;;
        const y = ENGINE.titleHEIGHT / 2 + fs / 4;
        CTX.font = fs + "px Moria";
        CTX.textAlign = "right";
        CTX.fillStyle = "#c211a5";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        let HS;
        const index = SCORE.SCORE.name[0].indexOf("&nbsp");
        if (index > 0) {
            HS = SCORE.SCORE.name[0].substring(0, SCORE.SCORE.name[0].indexOf("&nbsp"));
        } else {
            HS = SCORE.SCORE.name[0];
        }
        const text = "HISCORE: " + SCORE.SCORE.value[0].toString().padStart(6, "0") + " by " + HS;
        CTX.fillText(text, x, y);
    },
    lives() {
        ENGINE.clearLayer("lives");
        if (GAME.lives < 1) return;
        const CTX = LAYER.lives;
        const cX = ENGINE.bottomWIDTH / 2;
        const y = ENGINE.bottomHEIGHT / 2;
        const spread = ENGINE.spreadAroundCenter(GAME.lives - 1, cX, 72);
        for (let x of spread) {
            ENGINE.spriteDraw("lives", x, y, SPRITE.Lives);
        }
    }
};

// -- main --
$(() => {
    PRG.INIT();
    PRG.setup();
    ENGINE.LOAD.preload();
    UNIFORM.setup();
    SCORE.init("SC", "FROGGESS", 10, 1000);
    SCORE.loadHS();
    SCORE.hiScore();
    SCORE.extraLife = [5000, 10000, 15000, 20000, 25000, 50000, 100000, 200000, 500000, 1000000, Infinity];
});