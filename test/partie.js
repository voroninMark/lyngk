"use strict";

Lyngk.Game = function () {
    var players = [];
    var winner;
    var loser;
    var sizeOfWinnerStack;
    var engine;
    var turn;

    this.startMatch = function (param) {
        players.push(new Lyngk.Player(1));
        players.push(new Lyngk.Player(2));
        engine = new Lyngk.Engine();
        if (param === 'void') {
            engine.startVoidGame();
        }
        if (param === 'normal') {
            engine.startGame();
        }
        if (param === 'white') {
            engine.startWhiteGame();
        }
        turn = 1;
    };
    this.simulation = function () {
        var cpt = 0;
        var origin;
        var target;
        var moves_possibles = this.coupsPossiblesTot();
        do {
            origin = this.pickOrigin(this.getCurrentPlayer());
            target = this.pickTarget(origin);
            this.play(origin.getCoordinates().toString(), target.getCoordinates().toString());
            cpt++;
        } while (moves_possibles > 5 && cpt < 100);
        for (var i = 5; i >= 1; i--) {
            var pts_j1 = engine.cptPiles(i, this.getPlayer(1));
            var pts_j2 = engine.cptPiles(i, this.getPlayer(2));
            if (pts_j1 > pts_j2) {
                this.getPlayer(1).setPoint(pts_j1);
                this.getPlayer(2).setPoint(pts_j2);

                winner = this.getPlayer(1);

                loser = this.getPlayer(2);

                sizeOfWinnerStack = i;
                return "victory";
            }
            if (pts_j1 < pts_j2) {
                this.getPlayer(1).setPoint(pts_j1);
                this.getPlayer(2).setPoint(pts_j2);

                winner = this.getPlayer(2);

                loser = this.getPlayer(1);

                sizeOfWinnerStack = i;
                return "victory";
            }
        }
        return "even";
    };
    this.pickOrigin = function (pickPlayer) {
        var colors = this.getFoe(pickPlayer).getColors();
        var valid_intersections_list = engine.getListOfValidIntersections(colors);
        var rand;
        do {
            rand = Math.floor(Math.random() * valid_intersections_list.length);
        } while (this.possibleMoves(valid_intersections_list[rand]) === 0);

        return valid_intersections_list[rand];
    };
    this.pickTarget = function (origin) {
        var res = [];
        var inter = this.checkDirection(origin, 0, 1, 'inter');
        if (inter !== null) {
            res.push(inter);
        }
        inter = this.checkDirection(origin, 0, -1, 'inter');
        if (inter !== null) {
            res.push(inter);
        }
        inter = this.checkDirection(origin, 1, 0, 'inter');
        if (inter !== null) {
            res.push(inter);
        }
        this.checkDirection(origin, -1, 0, 'inter');
        if (inter !== null) {
            res.push(inter);
        }
        inter = this.checkDirection(origin, -1, -1, 'inter');
        if (inter !== null) {
            res.push(inter);
        }
        inter = this.checkDirection(origin, 1, 1, 'inter');
        if (inter !== null) {
            res.push(inter);
        }
        var rand = Math.floor(Math.random() * res.length);
        if (res.length === 0) {
            return origin;
        }
        return res[rand];
    };
    this.validIntersections = function (player) {
        var colors = this.getFoe(player).getColors();
        return engine.calcInterValid(colors);
    };
    this.checkDirection = function (origin, c_fact, l_fact, but) {
        var coordinates_origin = origin.getCoordinates();
        var l = coordinates_origin.getLine();
        var c = coordinates_origin.getColumn().charCodeAt(0);
        var i = 1;
        var coordinate;
        var target;

        do {
            coordinate = new Lyngk.Coordinates(String.fromCharCode(c + c_fact * i), l + l_fact * i);
            target = engine.intersectionFromCoordinates(coordinate);
            i++;
        }
        while (!engine.moveOk(origin, target) && coordinate.isOk());

        if (coordinate.isOk()) {
            if (but === 'inter') {
                return target;
            } else {
                return 1;
            }
        } else {
            if (but === 'inter') {
                return null;
            } else {
                return 0;
            }
        }
    };
    this.possibleMoves = function (origin) {
        var cpt = 0;
        if (origin.getListPieces().length === 0 || (origin.getListPieces().length > 0 && origin.getColor() === 'WHITE')) {
            return cpt;
        }
        cpt += this.checkDirection(origin, 0, 1, 'int');
        cpt += this.checkDirection(origin, 0, -1, 'int');
        cpt += this.checkDirection(origin, 1, 0, 'int');
        cpt += this.checkDirection(origin, -1, 0, 'int');
        cpt += this.checkDirection(origin, 1, 1, 'int');
        cpt += this.checkDirection(origin, -1, -1, 'int');
        return cpt;
    };
    this.coupsPossiblesTot = function () {
        var cpt = 0;
        for (var i = 0; i < engine.getTabInter().length; i++) {
            cpt += this.possibleMoves(engine.getTabInter()[i]);
        }
        return cpt;
    };
    this.play = function (string_origin, string_target) {
        var origin = engine.coordinatesFromString(string_origin);
        var target = engine.coordinatesFromString(string_target);
        if (!this.getFoe(this.getCurrentPlayer()).colorIn(engine.intersectionFromCoordinates(origin).getColor())) {
            engine.movePile(origin, target);
        }
        if (engine.intersectionFromCoordinates(target).getState() === 3 &&
            this.getCurrentPlayer().colorIn(engine.intersectionFromCoordinates(target).getColor())
        ) {
            engine.intersectionFromCoordinates(target).cleanPile();
            this.getCurrentPlayer().addPoint();
        }

        turn++;
    };
    this.getPlayer = function (n) {
        return players[n - 1];
    };
    this.getTour = function () {
        return turn;
    };
    this.getCurrentPlayer = function () {
        return players[(turn + 1) % 2];
    };
    this.getEngine = function () {
        return engine;
    };
    this.getFoe = function (player) {
        return players[(player.getNum()) % 2];
    };
    this.getWinner = function () {
        return winner;
    };

    this.getLoser = function () {
        return loser;
    };
    this.getSizeOfWinnerStack = function () {
        return sizeOfWinnerStack;
    };
};