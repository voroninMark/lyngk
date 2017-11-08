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
    this.getCouleurs = function(){
        return couleurs;
    }
    this.addPoint = function(){
        points++;
    };
    this.reclamer = function (c) {
        couleurs.push(c);
    };
    this.couleurIn = function (c) {
        for(var i=0;i<couleurs.length;i++){
            if(couleurs[i] === c){
                return true;
            }
        }
        return false;
    };
    this.couleurToString = function () {
        var res="->";
        for(var i=0;i<couleurs.length;i++){
            res+=couleurs[i]+"/";
        }
        return res;
    };
};