"use strict";

Lyngk.Joueur = function (n) {
    var num=n;
    var couleurs=[];
    var points=0;

    this.getNum = function () {
        return num;
    };
    this.getPoints = function () {
        return points;
    };
    this.addPoint = function(){
        points++;
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