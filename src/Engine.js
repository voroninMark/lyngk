"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var listIntersections = [];

    this.between_strict = function (min,max,test) {
        if(test>min && test<max){
            return true;
        }
        return false;
    };
    this.updateState = function (inter) {
        var listLength=inter.getListPieces().length;
        if (listLength === 1) {
            inter.setState('ONE_PIECE');
        }else if (this.between_strict(1,5,listLength)) {
            inter.setState('STACK');
        } else{
            inter.setState('FULL_STACK');
        }
    };
    this.poser = function (inter, piece) {
        inter.addPiece(piece);
        this.updateState(inter);
    };
    this.movePiece = function (origin, target) {
        var listPiecesOrigin = origin.getListPieces();
        var topPiece = listPiecesOrigin[listPiecesOrigin.length - 1];
        target.addPiece(topPiece);
        origin.removeTopPiece();
    };
    /*
    this.compareColors = function (listPiecesOrigin, pieceOfTarget) {
        var length_origin=listPiecesOrigin.length;
        var pieceOfTargetColor=pieceOfTarget.getColor();
        var i;
        for (i = 0; i < length_origin; i+=1) {
            console.log(listPiecesOrigin[i].getColor()+" :: "+pieceOfTargetColor);
            if (listPiecesOrigin[i].getColor() === pieceOfTargetColor &&
                listPiecesOrigin[i].getColor() !== 'WHITE'
            ) {
                return false;
            }
        }
        return true;
    };
    */
    this.colorCheck = function (origin, target) {
        var length_target = target.getListPieces().length;
        var length_origin = origin.getListPieces().length;
        var i,j;
        for (i = 0; i < length_target; i+=1) {
            /*
            if(!this.compareColors(origin,target.getListPieces()[i])){
                return false;
            }
            */
            for (j = 0; j < length_origin; j+=1) {
                if (origin.getListPieces()[j].getColor() === target.getListPieces()[i].getColor()) {
                    if (origin.getListPieces()[j].getColor() !== 'WHITE') {
                        return false;
                    }
                }
            }

        }
        return true;
    };
    this.moveOk = function (origin, target) {
        var coordinates_origin = origin.getCoordinates();
        var coordinates = target.getCoordinates();
        var l1 = coordinates_origin.getLine();
        var l2 = coordinates.getLine();
        var c1 = coordinates_origin.getColumn().charCodeAt(0);
        var c2 = coordinates.getColumn().charCodeAt(0);
        var max, min, temp, max_c, max_l, min_c, min_l, i,temp_col;
        if (!this.colorCheck(origin, target) ||
            (origin.getListPieces().length < target.getListPieces().length) ||
            (origin.getListPieces().length + target.getListPieces().length > 5) ||
            !coordinates.isOk() || !coordinates_origin.isOk() || coordinates_origin.toString() === coordinates.toString()
        ) {
            return false;
        }
        if (origin.getState() !== 3 && target.getState() !== 0) {
            if (l1 === l2 ^ c1 === c2 ^ (l1 - l2 === c1 - c2)) {
                if (l1 === l2) {
                    max = Math.max(c1, c2);
                    min = Math.min(c1, c2);
                    for (i = min + 1; i < max; i+=1) {
                        temp_col = String.fromCharCode(i);
                        temp = new Lyngk.Coordinates(temp_col, l1);
                        if (this.intersectionFromCoordinates(temp).getState() !== 0) {
                            return false;
                        }
                    }
                    return true;
                }
                if (c1 === c2) {
                    max = Math.max(l1, l2);
                    min = Math.min(l1, l2);
                    for (i = min + 1; i < max; i+=1) {
                        temp = new Lyngk.Coordinates(coordinates_origin.getColumn(), i);
                        if (this.intersectionFromCoordinates(temp).getState() === 0) {
                            return false;
                        }
                    }
                    return true;
                }
                if (l1 - l2 === c1 - c2) {
                    max_c = Math.max(c1, c2);
                    min_c = Math.min(c1, c2) + 1;
                    max_l = Math.max(l1, l2);
                    min_l = Math.min(l1, l2) + 1;
                    while (min_c < max_c && min_l < max_l) {
                        temp = new Lyngk.Coordinates(String.fromCharCode(min_c), min_l);
                        if (this.intersectionFromCoordinates(temp).getState() !== 0) {
                            return false;
                        }
                        min_c++;
                        min_l++;
                    }
                    return true;
                }
            }
        }
        return false;
    };
    this.poserPile = function (origin, target) {
        var listPiecesOrigin = origin.getListPieces();
        for (var i = 0; i < listPiecesOrigin.length; i++) {
            this.poser(target, listPiecesOrigin[i]);
        }
    };
    this.coordinatesFromString = function (s) {
        var c = s.charAt(0);
        var l = parseInt(s.charAt(1));

        return new Lyngk.Coordinates(c, l);
    };
    this.intersectionFromCoordinates = function (coordinates) {
        var tab = this.getTabInter();
        var testColumn;
        var testLine;
        for (var i = 0; i < tab.length; i++) {
            testColumn = tab[i].getCoordinates().getColumn();
            testLine = tab[i].getCoordinates().getLine();
            if (testLine === coordinates.getLine() && testColumn === coordinates.getColumn()) {
                return tab[i];
            }
        }
        return new Lyngk.Intersection(coordinates);
    };
    this.movePile = function (coordinatesOrigin, coordinatesTarget) {
        var origin = this.intersectionFromCoordinates(coordinatesOrigin);
        var target = this.intersectionFromCoordinates(coordinatesTarget);
        if (this.moveOk(origin, target)) {
            this.poserPile(origin, target);
            origin.cleanPile();
        }
    };
    this.startWhiteGame = function () {
        var letters = 'ABCDEFGHI';
        var coordinates;
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                coordinates = new Lyngk.Coordinates(letters[i - 1], j);
                if (coordinates.isOk()) {
                    listIntersections.push(new Lyngk.Intersection(coordinates));
                    this.poser(listIntersections[listIntersections.length - 1], new Lyngk.Piece('WHITE'));
                }
            }
        }
    };
    this.startVoidGame = function () {
        var letters = 'ABCDEFGHI';
        var coordinates;
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                coordinates = new Lyngk.Coordinates(letters[i - 1], j);
                if (coordinates.isOk()) {
                    listIntersections.push(new Lyngk.Intersection(coordinates));
                }
            }
        }
    };
    this.pick_random_number_to_chose_color = function (tabCpt) {
        var rand;
        do {
            rand = Math.floor(Math.random() * 6);
        } while ((tabCpt[rand] >= 8 && rand !== 5) || (rand === 5 && tabCpt[rand] >= 3));
        return rand;
    };
    this.startGame = function () {
        var letters = 'ABCDEFGHI';
        var listOfColors = ["BLACK", "IVORY", "BLUE", "RED", "GREEN", "WHITE"];
        var tabCpt = [0, 0, 0, 0, 0, 0];
        var rand;
        var coordinates;

        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                coordinates = new Lyngk.Coordinates(letters[i - 1], j);
                if (coordinates.isOk()) {
                    rand=this.pick_random_number_to_chose_color(tabCpt);
                    tabCpt[rand]++;
                    listIntersections.push(new Lyngk.Intersection(coordinates));
                    this.poser(listIntersections[listIntersections.length - 1], new Lyngk.Piece(listOfColors[rand]));
                }
            }
        }
    };
    this.nbPieces = function () {
        var cpt = 0;
        for (var i = 0; i < listIntersections.length; i++) {
            for (var j = 0; j < listIntersections[i].getListPieces().length; j++) {
                cpt++;
            }
        }
        return cpt;
    };
    this.getTabInter = function () {
        return listIntersections;
    };
    this.calcInterValid = function (colors) {
        var coups = 0;
        var check = 1;

        for (var i = 0; i < listIntersections.length; i++) {
            if (listIntersections[i].getListPieces().length > 0) {
                if (listIntersections[i].getColor() === 'WHITE') {
                    check = 0;
                } else {
                    for (var j = 0; j < colors.length; j++) {
                        if (listIntersections[i].getColor() === colors[j]) {
                            check = 0;
                            break;
                        }
                    }
                }
                if (check === 1) {
                    coups++;
                }
                check = 1;
            }
        }
        return coups;
    };
    this.getListOfValidIntersections = function (colors) {
        var res = [];
        var check = 1;

        for (var i = 0; i < listIntersections.length; i++) {
            if (listIntersections[i].getListPieces().length > 0) {
                if (listIntersections[i].getColor() === 'WHITE') {
                    check = 0;
                } else {
                    for (var j = 0; j < colors.length; j++) {
                        if (listIntersections[i].getColor() === colors[j]) {
                            check = 0;
                            break;
                        }
                    }
                }
                if (check === 1) {
                    res.push(listIntersections[i]);
                }
                check = 1;
            }
        }
        return res;
    };
    this.cptPiles = function (n, player) {
        var res = 0;
        for (var i = 0; i < listIntersections.length; i++) {
            if (listIntersections[i].getListPieces().length === n && player.colorIn(listIntersections[i].getColor())) {
                res++;
            }
        }
        return res;
    };
};
