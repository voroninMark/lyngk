"use strict";

Lyngk.Joueur = function (n) {
    var num=n;
    var couleurs=[];

    this.getNum = function () {
        return num;
    };
    this.reclamer = function (c) {
        couleurs.push(Lyngk.Color[c]);
    };
    this.couleurIn = function (c) {
        if(couleurs.find(elem => elem === Lyngk.Color[c]) !== undefined){
            return true;
        }
        return false;
    };
};