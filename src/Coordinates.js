"use strict";

Lyngk.Coordinates = function (c, l) {
    var colonne=c;
    var ligne=l;

    this.isOk=function(){
        if(colonne=='A' && ligne==1){
            return false;
        }
    }
};
