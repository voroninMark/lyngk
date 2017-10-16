"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var tabInter=[];

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
    this.movePiece=function(origine,cible){
        var listePieceOrigine=origine.getListePiece();
        var pieceDuHaut=listePieceOrigine[listePieceOrigine.length-1];
        cible.setListePiece(pieceDuHaut);
        origine.supprTopPiece();
    };
    this.startGame=function(){
        var lettres='ABCDEFGHI';
        var listeColor=["BLACK","IVORY","BLUE","RED","GREEN","WHITE"];
        var tabCpt=[0,0,0,0,0,0]
        var rand;

        for(var i=1;i<=9;i++){
            for(var j=1;j<=9;j++){
                var coor=new Lyngk.Coordinates(lettres[i-1],j);
                if(coor.isOk()){
                    do {
                        rand = Math.floor(Math.random() * 6);
                    }while((tabCpt[rand]>=8 && rand!==5) || (rand === 5 && tabCpt[rand]>=3));
                    tabCpt[rand]++;
                    tabInter.push(new Lyngk.Intersection(coor,listeColor[rand]));
                    this.poser(tabInter[tabInter.length - 1], new Lyngk.Piece(listeColor[rand]));
                }
            }
        }
    };

    this.getTabInter=function(){
        return tabInter;
    };
};
