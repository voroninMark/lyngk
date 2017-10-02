"use strict";

Lyngk.Coordinates = function (c, l) {
    var colonne=c;
    var ligne=l;

    this.isOk=function(){
        var tabOk= {
                "A" : [3, 3],
                "B" : [2, 5],
                "C" : [1, 7],
                "D" : [2, 7],
                "E" : [2, 8],
                "F" : [3, 8],
                "G" : [3, 9],
                "H" : [5, 8],
                "I" : [7, 7]
            };
        if(l>=tabOk[c][0] && l<=tabOk[c][1]){
            return true;
        }
    }
};
