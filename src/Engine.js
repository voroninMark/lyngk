"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    this.poser=function(inter,piece){
        inter.setListePiece(inter.getListePiece().push(piece));
        if(piece.getCouleur()===2){
            inter.setEtat('ONE_PIECE');
        }
    }
};
