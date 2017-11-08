"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var tabInter=[];

    this.poser=function(inter,piece){
        inter.addPiece(piece);
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
        cible.addPiece(pieceDuHaut);
        origine.supprTopPiece();
    };
    this.colorCheck = function(origine,cible){
        var length_cible=cible.getListePiece().length;
        var length_origine=origine.getListePiece().length;

        for(var i = 0;i<length_cible;i++) {
            for(var j = 0;j<length_origine;j++){
                if (origine.getListePiece()[j].getCouleur() === cible.getListePiece()[i].getCouleur() ) {
                    if(origine.getListePiece()[j].getCouleur() !== 'WHITE') {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    this.moveOk = function(origine,cible){
        var coor1=origine.getCoor();
        var coor2=cible.getCoor();
        var l1=coor1.getLigne();
        var l2=coor2.getLigne();
        var c1=coor1.getColonne().charCodeAt(0);
        var c2=coor2.getColonne().charCodeAt(0);
        if( !this.colorCheck(origine,cible) ||
            (origine.getListePiece().length < cible.getListePiece().length) ||
            (origine.getListePiece().length + cible.getListePiece().length >5)
        ){
            return false;
        }
        if(origine.getEtat() !== 3 && cible.getEtat() !== 0) {
            if (l1 === l2 ^ c1 === c2 ^ (l1 - l2 === c1 - c2)) {
                if (l1 === l2) {
                    var max = Math.max(c1, c2);
                    var min = Math.min(c1, c2);
                    for (var i = min + 1; i < max; i++) {
                        var temp_col = String.fromCharCode(i);
                        var temp = new Lyngk.Coordinates(temp_col, l1);
                        if (this.interFromCoor(temp).getEtat() !== 0) {
                            return false;
                        }
                    }
                    return true;
                }
                if (c1 === c2) {
                    var max = Math.max(l1, l2);
                    var min = Math.min(l1, l2);
                    for (var i = min + 1; i < max; i++) {
                        var temp = new Lyngk.Coordinates(coor1.getColonne(), i);
                        if (this.interFromCoor(temp).getEtat() === 0) {
                            return false;
                        }
                    }
                    return true;
                }
                if (l1 - l2 === c1 - c2) {
                    var max_c = Math.max(c1, c2);
                    var min_c = Math.min(c1, c2) + 1;
                    var max_l = Math.max(l1, l2);
                    var min_l = Math.min(l1, l2) + 1;
                    while (min_c < max_c && min_l < max_l) {
                        var temp = new Lyngk.Coordinates(String.fromCharCode(min_c), min_l);
                        if (this.interFromCoor(temp).getEtat() !== 0) {
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
    this.poserPile = function(origine,cible){
        var listePieceOrigine = origine.getListePiece();
        var listePieceCible = cible.getListePiece();
        for(var i = 0; i<listePieceOrigine.length;i++){
            this.poser(cible,listePieceOrigine[i]);
        }
    };
    this.coorFromString = function(s){
        var c=s.charAt(0);
        var l=parseInt(s.charAt(1));

        return new Lyngk.Coordinates(c,l);
    };
    this.interFromCoor=function(coor){
        var tab=this.getTabInter();
        for(var i=0;i<tab.length;i++) {
            var testColonne = tab[i].getCoor().getColonne();
            var testLigne = tab[i].getCoor().getLigne();
            if(testLigne === coor.getLigne() && testColonne === coor.getColonne()){
                return tab[i];
            }
        }
        return null;
    };
    this.movePile=function(origineCoor,cibleCoor){
        var origine=this.interFromCoor(origineCoor);
        var cible=this.interFromCoor(cibleCoor);
        if(this.moveOk(origine,cible)) {
            this.poserPile(origine,cible);
            origine.cleanPile();
        }
    };
    this.startWhiteGame=function(){
        var lettres='ABCDEFGHI';
        for(var i=1;i<=9;i++){
            for(var j=1;j<=9;j++){
                var coor=new Lyngk.Coordinates(lettres[i-1],j);
                if(coor.isOk()){
                    tabInter.push(new Lyngk.Intersection(coor));
                    this.poser(tabInter[tabInter.length - 1], new Lyngk.Piece('WHITE'));
                }
            }
        }
    };
    this.startVoidGame=function(){
        var lettres='ABCDEFGHI';
        for(var i=1;i<=9;i++){
            for(var j=1;j<=9;j++){
                var coor=new Lyngk.Coordinates(lettres[i-1],j);
                if(coor.isOk()){
                    tabInter.push(new Lyngk.Intersection(coor));
                }
            }
        }
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
                    tabInter.push(new Lyngk.Intersection(coor));
                    this.poser(tabInter[tabInter.length - 1], new Lyngk.Piece(listeColor[rand]));
                }
            }
        }
    };
    this.nbPieces = function () {
        var cpt=0;
        for(var i = 0; i<tabInter.length;i++){
            for(var j = 0;j<tabInter[i].getListePiece().length;j++){
                cpt++;
            }
        }
        return cpt;
    };
    this.getTabInter=function(){
        return tabInter;
    };
    this.calcCoups = function(couleurs){
        var coups=0;
        var check=1;
        for(var i = 0; i<tabInter.length;i++){
            if(tabInter[i].getCouleur() === 'WHITE'){
                check=0;
            }else{
                for(var j = 0;j<couleurs.length;j++){
                    if(tabInter[i].getCouleur() === couleurs[j]){
                        check=0;
                        break;
                    }
                }
            }
            if(check===1){
                coups++;
            }
            check=1;
        }
        return coups;
    };

};
