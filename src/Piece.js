"use strict";

Lyngk.Piece = function (color) {
    var color = color;

    this.getColor = function () {
        return color;
    };
    this.setColor = function (newColor) {
        color = newColor;
    };

};
