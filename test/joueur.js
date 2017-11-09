"use strict";

Lyngk.Player = function (n) {
    var num=n;
    var colors=[];
    var points=0;

    this.getNum = function () {
        return num;
    };
    this.getPoints = function () {
        return points;
    };
    this.getColors = function(){
        return colors;
    };
    this.setPoint = function(n){
        points=n;
    };
    this.addPoint = function(){
        points++;
    };
    this.claim = function (c) {
        colors.push(c);
    };
    this.colorIn = function (c) {
        for(var i=0;i<colors.length;i++){
            if(colors[i] === c){
                return true;
            }
        }
        return false;
    };
    this.colorsToString = function () {
        var result="->";
        for(var i=0;i<colors.length;i++){
            result+=colors[i]+"/";
        }
        return result;
    };
};