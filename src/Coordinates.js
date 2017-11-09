"use strict";

Lyngk.Coordinates = function (c, l) {
    var column = c;
    var line = l;

    this.isOk = function () {
        var tabOk = {
            "A": [3, 3],
            "B": [2, 5],
            "C": [1, 7],
            "D": [2, 7],
            "E": [2, 8],
            "F": [3, 8],
            "G": [3, 9],
            "H": [5, 8],
            "I": [7, 7]
        };
        if (tabOk[c] !== undefined && l >= tabOk[c][0] && l <= tabOk[c][1]) {
            return true;
        }
        return false;
    };
    this.toString = function () {
        if (this.isOk()) {
            return c + l;
        } else {
            return "invalid";
        }
    };
    this.getLine = function () {
        return line;
    };
    this.getColumn = function () {
        return column;
    };
    this.clone = function () {
        return new Lyngk.Coordinates(c, l);
    };
    this.do_hash = function () {
        return parseInt(c.charCodeAt(0) - 65 + " " + l);
    };
};
