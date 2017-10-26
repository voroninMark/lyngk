"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var coor=c;
    var etat=Lyngk.State.VACANT;
    var listePiece=[];
    this.getEtat=function(){
        return etat;
    };
    this.setEtat=function(newEtat){
        etat=Lyngk.State[newEtat];
    };
    this.getListePiece=function(){
        return listePiece;
    };
    this.addPiece=function(newPiece){
        listePiece.push(newPiece);
    };
    this.setListePiece=function(newListe){
        listePiece=newListe;
    };
    this.getCouleur=function(){
        return listePiece[listePiece.length - 1].getCouleur();
    };
    this.supprTopPiece=function(){
        listePiece.pop();
    };
    this.cleanPile=function(){
        listePiece=[];
        this.setEtat('VACANT');
    };
    this.getCoor = function(){
        return coor;
    }
};
