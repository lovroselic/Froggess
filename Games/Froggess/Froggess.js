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
    AUTO_TEST: false,
    FPS: true,
    VERBOSE: true,
    _2D_display: false,
    INVINCIBLE: false,
    keys: false,
    max17: false,

};

const INI = {
    SCREEN_BORDER: 256,
    //AVATAR_TRANSPARENCY: 10,
    HERO_HEALTH: 100,
    //SUN_VECTOR: Vector3.from_array([0, 50, 0]),
    HERO_HEIGHT: 0.15,
    //CRASH_SAFE_SPEED: 20,
    //CRASH_LETHAL_SPEED: 150,
    //CRASH_DAMAGE_POWER: 2.4,
    //MAX_DAMAGE: 100,
    //MAX_LEVEL: 30,
    WINDOW_SCALE: 0.90,
    //DISPLAY_SCORES: 15,
    //OCCLUSION_RESOLUTION: 4,
};

const PRG = {
    VERSION: "0.1.6",
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
        //$("#speech_version").html(SPEECH.VERSION);


        $("#toggleHelp").click(function () {
            $("#help").toggle(400);
        });
        $("#toggleAbout").click(function () {
            $("#about").toggle(400);
        });


        //boxes
        ENGINE.gameWIDTH = 960;
        ENGINE.titleWIDTH = 1280 + INI.SCREEN_BORDER;
        ENGINE.sideWIDTH = ENGINE.titleWIDTH - ENGINE.gameWIDTH - INI.SCREEN_BORDER;
        ENGINE.gameHEIGHT = 768;
        ENGINE.titleHEIGHT = 96;
        ENGINE.bottomHEIGHT = 80;
        ENGINE.bottomWIDTH = ENGINE.titleWIDTH;
        MAP_TOOLS.INI.FOG = false;

        $("#bottom").css("margin-top", ENGINE.gameHEIGHT + ENGINE.titleHEIGHT + ENGINE.bottomHEIGHT);
        $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 2 * ENGINE.sideWIDTH + 4);
        ENGINE.addBOX("TITLE", ENGINE.titleWIDTH, ENGINE.titleHEIGHT, ["title"], null);
        ENGINE.addBOX("LSIDE", INI.SCREEN_BORDER, ENGINE.gameHEIGHT, ["Lsideback",], "side");
        ENGINE.addBOX("ROOM", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["background", "grid", "3d_webgl", "info", "text", "FPS", "button", "click"], "side");
        ENGINE.addBOX("SIDE", ENGINE.sideWIDTH, ENGINE.gameHEIGHT, ["sideback"], "fside");
        ENGINE.addBOX("DOWN", ENGINE.bottomWIDTH, ENGINE.bottomHEIGHT, ["bottom", "bottomText", "subtitle"], null);

        if (DEBUG._2D_display) {
            ENGINE.addBOX("LEVEL", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["pacgrid", , "coord", "player", "debug"], null);
        }


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
        this.height = INI.HERO_HEIGHT;
        this.maxHealth = INI.HERO_HEALTH;
        this.restore();
    },

    concludeAction() {
        if (WebGL.CONFIG.firstperson && !this.player.lookingAround && Math.abs(this.player.camera.direction_offset.y) > 0) {
            this.player.resetCamera();
        }

        this.player.lookingAround = false;

        if (["Sliding", "RightMove", "LeftMove", "Breaking"].includes(this.player.mode)) {
            this.player.setMode("Sliding");
        } else if (!this.player.actionModes.includes(this.player.mode)) this.player.setMode("idle");

    },
    applyDamage(damage) {
        HERO.health = Math.max(HERO.health - damage, 0);
        TITLE.health();
        if (HERO.health <= 0) {
            if (!DEBUG.INVINCIBLE) HERO.die();
        }
    },
    die() {
        if (HERO.dead) return;
        HERO.dead = true;
    },
    death() {
        $(AUDIO.PrincessScream).one("ended", HERO.endSpeech);
        AUDIO.PrincessScream.play();
        HERO.finalDeath();
    },
    endSpeech() {
        const texts = [
            "Is this game too hard for you? Maybe you should play something less sophisticated",
            "Next time maybe try to avoid hitting this wall?",
            "Your playing sucks",
            "Are you blind? Not into the wall, silly!",
            "Ah yes, the ancient strategy of steering directly into stone.",
            "Wonderful. The wall has won again.",
            "I am starting to suspect the wall is your actual destination.",
            "That was not a shortcut, that was architecture.",
            "My royal backside demands a better pilot.",
            "Do you steer with your elbows?",
            "Snow, slope, open path, and somehow you chose wall.",
            "Congratulations, you found the least elegant route down the mountain.",
            "The wall sends its compliments, and also my bruises.",
            "I have seen drunken goats with better line control.",
            "Was that a turn, or a cry for help?",
            "Try using the path next time, it is the big white thing without rocks.",
            "Excellent crash. Terrible skiing. No notes.",
            "If stupidity had traction, we would be uphill by now.",
            "That impact had more planning than your steering.",
            "I hope the wall enjoyed that, because I certainly did not.",
            "My royal medical bill will be sent to your ego.",
            "You missed the turn by only one entire mountain.",
            "I asked for speed, not masonry inspection.",
            "Next time, aim for the gap. It is the suspiciously empty part.",
            "The good news is, the wall is still standing. Unlike my dignity.",
            "You drive like a snowman having a panic attack.",
            "I am a princess, not a demolition permit.",
            "Try to miss the wall, next time.",
            "Not only my royal butt, also my royal head hurts.",
            "Steering clear of fatal acidents is not your strong suit.",
            "Did you lose a fight with the concept of turning?",
            "I have more control sliding on my butt than you have with both hands.",
            "That wall was visible from orbit, genius.",
            "Were you aiming, or just emotionally collapsing?",
            "Brilliant. You weaponized incompetence.",
            "The mountain has many paths, and you chose blunt trauma.",
            "I have met icicles with better decision making.",
            "Your steering belongs in a museum of bad ideas.",
            "My kingdom has fallen to a player with the reflexes of wet bread.",
            "You missed the road so hard I felt it in my head.",
            "Did the wall insult your family, or are you just like this?",
            "If bad driving were royal service, you would be a duke.",
            "I could steer better using only panic and butt friction.",
            "That was the gaming equivalent of eating soup with a fork.",
            "I hope you are proud. The wall certainly is.",
            "You turned a snowy slope into a crime scene for common sense.",
            "At this point I trust gravity more than you, and gravity is trying to kill me.",
            "Next time, give the controls to someone with a pulse and a plan.",
            "This ruined my makeup.",
            "The wall didn't give way. But my nose did.",
            "I wanted a finish line, not a facial reconstruction.",
            "Some players chase glory. You chased geology.",
            "The mountain called. It wants its wall back, with fewer princess dents.",
            "Your sense of direction has declared war on survival.",
            "That was less skiing and more aggressive wall appreciation.",
            "I am beginning to understand why helmets were invented.",
            "Did the path move, or did your brain simply resign?",
            "Beautiful impact. Shame about everything before it.",
            "You have the survival instincts of decorative pudding.",
            "I requested elegance, not a full-body argument with stone.",
            "Even the snow is embarrassed to be part of this.",
            "The royal chiropractor just bought a second castle.",
            "You did not miss the turn. You divorced it.",
            "That was a bold interpretation of navigation.",
            "Please tell me the controller is haunted. I need hope.",
            "My bones now know more about this wall than the architect did.",
            "The kingdom thanks you for your service to masonry.",
            "I have seen avalanches with better self-preservation.",
            "That corner was optional only if breathing was optional.",
            "Next time try steering before the screaming starts.",
            "If walls could laugh, this one would need medical assistance.",
            "I admire your commitment to being wrong at high speed.",
            "The path was wide, white, and friendly. Naturally, you attacked a wall.",
            "You have the reflexes of a sleepy cabbage.",
            "I am not sure what died first, my dignity or your strategy.",
            "That crash had all the grace of a piano falling down stairs.",
            "You aimed for victory and hit infrastructure.",
            "The wall and I are now on first name terms, thanks to your stupidity.",
            "I asked for downhill momentum, not a brick interview.",
            "The wall did nothing wrong. You, however, did everything wrong.",
            "The good news is we stopped. The bad news is how.",
            "I trusted you with one princess and one slope. Somehow both are worse now.",
            "Was the goal survival, or were we collecting bruises?",
            "That was a direct deposit into the bank of pain.",
            "I have more faith in blindfolded furniture.",
            "Next time, let the mountain play. It cannot do worse.",
            "Is that your idea of fun? Bashing Princess' head full speed into a wall?",
            "Wonderful. You painted the snow with my face.",
            "The wall asked for a kiss. You gave it my skull.",
            "I have seen smarter steering from a sausage.",
            "Congratulations, you turned me into princess flavored jam.",
            "That corner was so easy it came with instructions, and you still ate the wall.",
            "My nose is now doing modern art on the snow.",
            "You have the tactical awareness of a boiled potato.",
            "Bloody brilliant. Mostly bloody.",
            "The wall wanted tribute, so you paid in royal cartilage.",
            "I am leaking dignity, and possibly blood.",
            "You just gave the mountain a fresh coat of princess.",
            "I hope you enjoyed that, because my spleen just rage quit.",
            "That impact sounded expensive and stupid, mostly stupid.",
            "My royal butt survived, but my patience died on impact.",
            "You made the wall blush. With my blood.",
            "This is why peasants are not allowed near steering decisions.",
            "You missed the gap so hard the gap is filing a complaint.",
            "A turn signal would not help you. A brain signal might.",
            "The wall has more personality than your route planning.",
            "I came, I slid, I bled, I questioned your existence.",
            "That was a perfect landing, if the target was internal bleeding.",
            "You have weaponized dumb.",
            "This is not a ski game anymore. It is a princess disposal simulator.",
            "Your steering is a crime against geometry.",
            "My royal bloodline nearly ended because you feared turning.",
            "The wall did not hit me. Your incompetence did.",
            "If stupidity were a slope, you would be world champion.",
            "That was a headbutt with extra steps.",
            "I asked for control, not a crimson snow angel.",
            "You just invented the blood slalom. Please uninvent it.",
            "Even the rocks are whispering, what an idiot.",
            "My face has merged with local architecture.",
            "You make gravity look professional.",
            "The wall took my health bar and your reputation.",
            "I should have hired a drunk mule. At least it would zigzag.",
            "My royal insurance does not cover players with soup for brains.",
            "That was not wall damage. That was princess puree.",
            "If bad steering were a kingdom, you would be its idiot king.",
            "I am starting to think the real final boss is your thumb.",
            "Nice work. The mountain now has a blood stained signature edition.",
        ];
        const text = texts.chooseRandom();
        HERO.speak(text);

    },
    finalDeath() {
        for (const L of LIGHTS3D.POOL) {
            L.lightColor = Array(0, 0, 0);
        }

        let dir = HERO.player.camera.dir.reverse2D();
        const entity = new $3D_Entity(Vector3.to_FP_Grid3D(HERO.player.pos), MONSTER_TYPE.Skeleton, Vector3.to_Vector3D(dir));
        ENTITY3D.add(entity);
        ENGINE.GAME.ANIMATION.stop();

        setTimeout(function () {
            ENGINE.TEXT.centeredText("Rest In Peace", ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2);
            ENGINE.TEXT.centeredText("(ENTER)", ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2 + ENGINE.TEXT.RD.fs * 1.2);
            ENGINE.GAME.ANIMATION.resetTimer();
            ENGINE.GAME.ANIMATION.next(GAME.gameOverRun);
        }, 6000);

    },
    restore() {
        this.dead = false;
        this.health = this.maxHealth;
    },
    flightOn() {

    },
    flightOff() {

    },
    cancelFlight() {

    },
    updateSunPosition() {
        const sun = SUN3D.POOL[0];                              //assuming single sun
        sun.pos = this.player.pos.add(INI.SUN_VECTOR);
    },
    manage(lapsedTime) {
        const slideData = this.player.slide(lapsedTime);
        this.updateGame(slideData);
        this.updateSunPosition();
    },
    updateGame(obj) {
        if (!obj) return;
        for (const o in obj) {
            GAME[o] = obj[o];
        }
    },
    crash(crashSpeed) {
        const damage = this.calcCrashDamage(crashSpeed);
        console.warn("crash", crashSpeed, "damage", damage, "x", this.player.pos.x);
        GAME.realSpeed = 0;

        if (damage > 0) {
            this.applyDamage(damage);
            EXPLOSION3D.add(new BloodExplosion(this.player.pos));
        }
    },
    calcCrashDamage(crashSpeed) {
        let impactFactor = 1.0;                                         //we need to implement wall normals, or maybe not ... fuck it
        if (crashSpeed < INI.CRASH_SAFE_SPEED) return 0;
        if (crashSpeed >= INI.CRASH_LETHAL_SPEED) return INI.MAX_DAMAGE;
        const x = (crashSpeed - INI.CRASH_SAFE_SPEED) / (INI.CRASH_LETHAL_SPEED - INI.CRASH_SAFE_SPEED);
        const severity = Math.pow(x, INI.CRASH_DAMAGE_POWER);
        const damage = INI.MAX_DAMAGE * severity * impactFactor;
        return Math.round(damage);
    },
    break() {
        const pos = this.player.pos.add(new Vector3(-0.03, 0, 0));
        EXPLOSION3D.add(new SnowCloud(pos));
    },
    turn(label, sliding) {
        if (!sliding) return;
        const side = label === "Left" ? -1 : 1;
        const pos = this.player.pos.add(new Vector3(-0.005, 0, 0.1 * side));
        EXPLOSION3D.add(new SnowCloud(pos));
    },
    startRun() {
        if (GAME.timerRunning) return;
        GAME.timerRunning = true;
        GAME.time = new Timer("Main");
    },
    completeLevel() {
        if (GAME.levelComplete) return;
        GAME.timerRunning = false;
        GAME.levelComplete = true;
        GAME.time.stop();
        const name = $("#princess")[0].value;
        let time = GAME.time.getTime();
        console.log("time", GAME.time.time(), time, "princess", name);


        const W = ENGINE.gameWIDTH * INI.WINDOW_SCALE >>> 0;
        const H = ENGINE.gameHEIGHT * INI.WINDOW_SCALE >>> 0;
        const X = (ENGINE.gameWIDTH - W >>> 1) + ENGINE.sideWIDTH;
        const Y = (ENGINE.gameHEIGHT - H >>> 1) + ENGINE.titleHEIGHT;
        ENGINE.GAME.pause(false);

        //preparing
        let idx = binarySearch(MAP_SCORES[GAME.level].scores.values, time);
        let startIdx = Math.max(0, idx - INI.DISPLAY_SCORES + 1);
        let endIdx = Math.min(MAP_SCORE_MANAGER.ENTRIES, startIdx + INI.DISPLAY_SCORES);
        console.log("idx", idx, "startIdx", startIdx);

        MAP_SCORES[GAME.level].scores.values.splice(idx, 0, time);
        MAP_SCORES[GAME.level].scores.values.pop();
        MAP_SCORES[GAME.level].scores.names.splice(idx, 0, name);
        MAP_SCORES[GAME.level].scores.names.pop();

        // creating html wedge
        let WEDGE = "";

        for (let resultIndex = startIdx; resultIndex < endIdx; resultIndex++) {
            let P = `<p id="result_${resultIndex}">${(resultIndex + 1).toString().padStart(2, "0")}. ${MAP_SCORES[GAME.level].scores.names[resultIndex]}:`
            let time = Timer.MSH_String(Timer.toHMS(MAP_SCORES[GAME.level].scores.values[resultIndex]));
            P += ` ${time}</p>`;
            WEDGE += P;
        }

        // done creating html wedge

        const _form = new Form(`${name}'s result:`, X, Y, W, H, WEDGE);                      //don't be fooled, this IS used, it draws!
        $("#form_done").off("click", FORM.exit);
        $("#form_done").on("click", HERO.nextLevel);
        $(`#result_${idx}`).css("color", "#00FF00");

        localStorage.setItem(PRG.SG, JSON.stringify(MAP_SCORES));                           // save scores
    },
    nextLevel() {
        $("#FORM").remove();
        GAME.level = Math.min(INI.MAX_LEVEL, ++GAME.level);
        GAME.start();
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

        GAME.level = 1;
        GAME.lives = 3;

        HERO.construct();
        ENGINE.VECTOR2D.configure("player");
        GAME.fps = new FPS_short_term_measurement(300);
        GAME.prepareForRestart();
        ENGINE.draw("background", 0, 0, TEXTURE.FroggessBackground);
        GRID.grid();

        if (DEBUG.AUTO_TEST) {
            return DEBUG.automaticTests();
        }

        GAME.levelStart();
    },
    WebGL_settings() {
        WebGL.setAmbientStrength(1);
        WebGL.setDiffuseStrength(0.5);
        WebGL.INI.BACKGROUND_ALPHA = 0.0;
        WebGL.USE_SHADOW = false;
        WebGL.USE_INTERACTION = false;
        WebGL.INI.HERO_HEIGHT = INI.HERO_HEIGHT;
        WebGL.FIRST_PERSON_DUAL_DISPLAY = true;
        WebGL.NO_TOP_CEILING = true;
        WebGL.VIEWS_ALLOWED = new Set([3]);
        WebGL.GAME.setViewButtons();
        WebGL.CONFIG.setMovementMode("surface");
        WebGL.INI.SCALE_DECAL = 0.45;
        WebGL.INI.ADDITIONAL_TOP_OFFSET = 0.3;
    },
    levelStart() {
        console.log("starting level", GAME.level);

        this.levelComplete = false;
        if (GAME.time) GAME.time.unregister();
        GAME.time = null;

        GAME.initLevel(GAME.level);
        GAME.continueLevel(GAME.level);
    },
    continueLevel(level) {
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
        this.newDungeon(level);
        WebGL.setContext('webgl');
        this.buildWorld(level);

        const map = MAP[level].map;
        const start_dir = map.startPosition.vector;
        const start_grid = Grid.toClass(MAP[level].map.startPosition.grid);

        console.log("start", start_grid, start_dir);
        const HeroSprite = new $2D_Sprite(start_grid, start_dir, HERO_TYPE.Froggess);
        console.log("HeroSprite", HeroSprite);
        throw "dev";



        HERO.player = new $3D_player(start_grid, Vector3.from_2D_dir(start_dir), MAP[level].map, null, 0.1); //boooo

        GAME.setCameraView();
        GAME.setWorld(level);

    },
    setWorld(level) {
        WebGL.init2D('webgl');
    },
    buildWorld(level) {
        if (DEBUG.VERBOSE) console.info(" ******** building world, room/dungeon/level:", level, "restart", GAME.restarted);
        WebGL.init_required_IAM(MAP[level].map, HERO);
        SPAWN_TOOLS.spawn(level);
        //MAP[level].world = WORLD.build(MAP[level].map);
    },
    newDungeon(level) {
        MAP_TOOLS.unpack(level);
    },
    prepareForRestart() {
        let clear = ["background", "text", "FPS", "button", "bottomText"];
        ENGINE.clearManylayers(clear);
        TITLE.blackBackgrounds();
        ENGINE.TIMERS.clear();
    },
    setup() {
        console.log("GAME SETUP started");
        $("#conv").remove();
        GAME.WebGL_settings();
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
        TITLE.firstFrame();
        if (DEBUG._2D_display) {
            ENGINE.resizeBOX("LEVEL", MAP[level].pw, MAP[level].ph);
            ENGINE.BLOCKGRID.configure("pacgrid", "#FFF", "#000");
            ENGINE.BLOCKGRID3D.draw(MAP[GAME.level].map, HERO.player.depth);
            GRID.grid();
            GRID.paintCoord3D("coord", MAP[level].map, HERO.player.depth);
        }
    },
    run(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        const date = Date.now();
        //HERO.player.animateAction();
        EXPLOSION3D.manage(date);
        //GAME.respond(lapsedTime);
        ENGINE.TIMERS.update();
        //HERO.manage(lapsedTime);
        GAME.frameDraw(lapsedTime);
        //HERO.concludeAction();
        if (HERO.dead) IAM.checkIfProcessesComplete([EXPLOSION3D], HERO.death);
        if (GAME.completed) GAME.won();
    },
    frameDraw(lapsedTime) {
        if (DEBUG._2D_display) {
            GAME.drawPlayer();
        }
        WebGL.render2DScene(MAP[GAME.level].map);

        if (DEBUG.FPS) {
            GAME.FPS(lapsedTime);
        }
        if (DEBUG._2D_display) {
            const map = MAP[GAME.level].map;
            ENGINE.BLOCKGRID3D.draw(map, HERO.player.depth);
            GRID.paintCoord3D("coord", MAP[GAME.level].map, HERO.player.depth);
            WebGL.visualizeTexture3DSlice(map.occlusionMap.texture, map.zMap1.xSize, map.zMap1.ySize, 1, 0, LAYER.debug); //debug
        }
    },
    drawPlayer() {
        ENGINE.clearLayer(ENGINE.VECTOR2D.layerString);
        ENGINE.VECTOR2D.draw(HERO.player);
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
            HERO.player.slidingSpeed = 2.0;
            console.log("set speed", HERO.player.slidingSpeed);
            console.log("X", HERO.player.pos.x);
            console.log("#######################################################");
        }
        if (map[ENGINE.KEY.map.F9]) {
            ENGINE.GAME.keymap[ENGINE.KEY.map.F9] = false;

            if (!DEBUG.keys) return;

            console.log("\nDEBUG:");
            console.log("#######################################################");
            console.log("X", HERO.player.pos.x);
            console.log("speed", HERO.player.slidingSpeed);
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
    lifeLostRun(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        if (ENGINE.GAME.keymap[ENGINE.KEY.map.enter]) {
            ENGINE.GAME.ANIMATION.waitThen(GAME.resurect);
        }
        const date = Date.now();
        //WebGL.GAME.setFirstPerson();
        FIRE3D.manage(date);
        EXPLOSION3D.manage(date);
        ENTITY3D.manage(lapsedTime, date, [HERO.invisible, HERO.dead]);
        GAME.lifeLostFrameDraw(lapsedTime);
    },
    lifeLostFrameDraw(lapsedTime) {
        if (DEBUG._2D_display) {
            GAME.drawPlayer();
        }
        WebGL.renderScene(MAP[GAME.level].map);

        if (DEBUG.FPS) {
            GAME.FPS(lapsedTime);
        }
        if (DEBUG._2D_display) {
            ENGINE.BLOCKGRID.draw(MAP[GAME.level].map);
            MISSILE3D.draw();
            ENTITY3D.drawVector2D();
        }
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
};

const TITLE = {
    stack: {
        speed: 32,
        hispeed: 120,
        HEALTH_TEXT: 720,
        maxSlope: 210,
        avgSlope: 300,
        bestTime: 390,
        bestPlayer: 480,
    },
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

    },
    health() {
        ENGINE.clearLayer("health");
        const cX = ((INI.SCREEN_BORDER) / 2) | 0;
        const cY = (ENGINE.gameHEIGHT / 2) | 0;
        const CTX = LAYER.health;

        ENGINE.spriteDraw("health", cX, 56, SPRITE.Heart);

        if (HERO.health === HERO.maxHealth) {
            ENGINE.spriteDraw("health", cX, cY, SPRITE.Avatar);
        } else {
            HERO.health = Math.min(Math.max(0, HERO.health), HERO.maxHealth);
            const imageData = new ImageData(new Uint8ClampedArray(IMAGE_DATA.Avatar.data), IMAGE_DATA.Avatar.width, IMAGE_DATA.Avatar.height);
            const totalPixels = IMAGE_DATA.INDICES.Avatar.length;
            const transparentPixels = Math.floor(totalPixels * (HERO.maxHealth - HERO.health) / HERO.maxHealth);
            const indices = Array.from(IMAGE_DATA.INDICES.Avatar).shuffle();
            for (let i = 0; i < transparentPixels; i++) {
                imageData.data[indices[i]] = INI.AVATAR_TRANSPARENCY;
            }
            CTX.putImageData(imageData, cX - SPRITE.Avatar.width / 2, cY - SPRITE.Avatar.height / 2);
        }

        const fs = 40;
        CTX.font = `300 ${fs}px CPU`
        CTX.fillStyle = "#DDD";
        CTX.textAlign = "center";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        CTX.fillText(`${HERO.health} / ${HERO.maxHealth}`, cX, TITLE.stack.HEALTH_TEXT);
    },
    music() {
        AUDIO.Title.play();
    },
    speed() {
        GAME.realSpeed = Math.round(GAME.realSpeed);
        GAME.highSpeed = Math.max(GAME.highSpeed, GAME.realSpeed);
        this._text("speed", "Speed", TITLE.stack.speed, "realSpeed", 0);
        this._text("maxspeed", "Max Speed", TITLE.stack.hispeed, "highSpeed", 0);
    },
    time() {
        const CTX = LAYER.time;
        ENGINE.clearLayer("time");
        const fs = 36;
        CTX.font = fs + "px DigitalNumbers";
        CTX.textAlign = "center";
        let x = 1.5 * ENGINE.sideWIDTH + ENGINE.gameWIDTH;
        let y = ENGINE.titleHEIGHT / 2 + fs / 4;
        CTX.fillStyle = "#0D0";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        let text = "0:00:00";
        if (GAME.time) text = Timer.MSH_String(GAME.time.time());
        CTX.fillText(text, x, y);
    },
    _label(CTX, txt, fs, x, y) {
        CTX.font = fs + "px DigitalNumbers";
        this._grad(CTX, txt, fs, x, y);
        CTX.shadowColor = "#555555";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 2;
        CTX.textAlign = "center";
        CTX.fillText(txt, x, y);
    },
    _text(layer, txt, y, what, pad, clear = true) {
        if (clear) ENGINE.clearLayer(layer);
        let CTX = LAYER[layer];
        let x = ENGINE.sideWIDTH / 2;
        let fs = 18;
        this._label(CTX, txt, fs, x, y);
        CTX.fillStyle = "#FFF";
        CTX.shadowColor = "#DDD";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        y += fs + 4;
        CTX.fillText(GAME[what].toString().padStart(pad, "0"), x, y);
    },
    _grad(CTX, txt, fs, x, y) {
        let txtm = CTX.measureText(txt);
        let gx = x - txtm.width / 2;
        let gy = y - fs;
        CTX.fillStyle = this.makeGrad(CTX, gx, gy + 2, gx, gy + fs);
    },
};

// -- main --
$(() => {
    PRG.INIT();
    PRG.setup();
    ENGINE.LOAD.preload();
    UNIFORM.setup();
    SCORE.init("SC", "FROGGESS", 10, 2500);
    SCORE.loadHS();
    SCORE.hiScore();
    SCORE.extraLife = [10000, 25000, 50000, 100000, 200000, 500000, 1000000, Infinity];
});