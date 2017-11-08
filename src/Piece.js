"use strict";

Lyngk.Piece = function (color) {
    var couleur=color;

    this.getCouleur=function(){
        return color;
    };
    this.setCouleur=function(newCouleur){
        couleur=newCouleur;
    }

};
