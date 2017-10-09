"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    this.poser=function(inter,piece){
        inter.setListePiece(piece);
        if(inter.getListePiece().length===1){
            inter.setEtat('ONE_PIECE');
        }
        if(inter.getListePiece().length>1 && inter.getListePiece().length<5){
            inter.setEtat('STACK');
        }
    }
};
