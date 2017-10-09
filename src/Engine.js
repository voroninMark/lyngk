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
        if(inter.getListePiece().length>=5){
            inter.setEtat('FULL_STACK');
        }
    };
    this.startGame=function(){
        var lettres='ABCDEFGHI';
        var tabInter=[];
        var tabPiece=[];
        var listeColor=["BLACK","IVORY","BLUE","RED","GREEN","WHITE","WHITE","WHITE"];
        for(var i=1;i<=9;i++){
            for(var j=1;j<=9;j++){
                var coor=new Lyngk.Coordinates(lettres[i-1],j);
                if(coor.isOk()){
                    tabInter.push(new Lyngk.Intersection(coor,'WHITE'));
                    for(var k=0;k<listeColor.length;k++){
                        tabPiece.push(new Lyngk.Piece(coor, listeColor[k]));
                        this.poser(tabInter[tabInter.length - 1], tabPiece[tabPiece.length - 1]);
                    }
                }
            }
        }
        return tabInter;
    };
};
