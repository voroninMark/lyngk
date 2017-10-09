"use strict";

Lyngk.Piece = function (c,color) {
    var coor=c;
    var couleur=Lyngk.Color[color];

    this.getCouleur=function(){
        return couleur;
    };
    this.setCouleur=function(newCouleur){
        couleur=Lyngk.Color[newCouleur];
    }

};
