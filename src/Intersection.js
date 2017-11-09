"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var coordinates = c;
    var state = Lyngk.State.VACANT;
    var listPieces = [];
    this.getState = function () {
        return state;
    };
    this.setState = function (newState) {
        state = Lyngk.State[newState];
    };
    this.getListPieces = function () {
        return listPieces;
    };
    this.addPiece = function (newPiece) {
        listPieces.push(newPiece);
    };
    this.setListPieces = function (newList) {
        listPieces = newList;
    };
    this.getColor = function () {
        return listPieces[listPieces.length - 1].getColor();
    };
    this.removeTopPiece = function () {
        listPieces.pop();
    };
    this.cleanPile = function () {
        listPieces = [];
        this.setState('VACANT');
    };
    this.getCoordinates = function () {
        return coordinates;
    };
};
