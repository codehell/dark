<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Game</title>
    <link rel="stylesheet" href="css/game.css">
</head>
<body>
    <canvas id="canvas" width="800" height="300"></canvas>
    <form>
        x:<input id="x" type="text" name="x">
        y:<input id="y" type="text" name="y">
        s:<input id="s" type="text" name="s">
        <button id="set" type="button">Set</button>
        <script src="js/colliders.js"></script>
        <script src="js/figures.js"></script>
        <script src="js/move.js"></script>
        <script src="js/dark.js"></script>
    </form>
</body>
</html>
