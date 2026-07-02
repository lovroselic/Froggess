<!DOCTYPE html>
<?php include_once $_SERVER['DOCUMENT_ROOT'] . '/Include/globals.php';?>
<html lang="en">

<head>
    <?php include_once $GL_root . $GL_path . '/Include/head_includes.php';?>

    <meta name="description"
        content="Froggess is a Frogger-inspired arcade game: guide a brave little frog through traffic, river hazards, and nature's usual murder attempts." />
    <meta name="keywords"
        content="Froggess, Frogger clone, arcade game, retro game, browser game, HTML5 game, WebGL game, LaughingSkull" />

    <link rel="canonical" href="https://www.laughingskull.org/Games/Froggess/Froggess.php">
    <title>Froggess</title>
</head>

<body>
    <?php include_once $GL_root . $GL_path . '/Include/header.php';?>
    <?php include_once $GL_root . $GL_path . '/Include/resolutionAlert.php';?>
    <?php include_once $GL_root . $GL_path . '/Games/Froggess/Froggess.html.php';?>
    <?php include_once $GL_root . $GL_path . '/Include/footer.php';?>

    <!-- JS -->
    <script src="/Code/JS/Library/Engine/Prototype_5_04.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/LS_Matrix_1_05.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/ENGINE_5_03.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/GRID_4_04.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/MAZE_5_00.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/BWT_1_00.js" type="text/javascript"></script>
    <script src='/Code/JS/Library/Engine/IndexArrayManagers_4_02.js'></script>
    <script src="/Code/JS/Library/Engine/WebGL_2_03.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/Lights_and_materials_1_06.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/GenericTimers_1_03.js" type="text/javascript"></script>
    <script src="/Assets/Definitions/Froggess/assets_Froggess.js" type="text/javascript"></script>
    <script src="/Assets/Definitions/Froggess/MAP_Froggess.js" type="text/javascript"></script>
    <script src="/Assets/Definitions/Froggess/Monsters_Froggess.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Engine/MAP and SPAWN tools_2_03.js" type="text/javascript"></script>
    <script src="/Code/JS/Library/Misc/score_1_05.js" type="text/javascript"></script>
    <script src="/Games/Froggess/Froggess.js" type="text/javascript"></script>
</body>

</html>