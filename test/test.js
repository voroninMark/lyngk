'use strict';

var LyngkTestCase1 = TestCase("LyngkTestCase");

LyngkTestCase1.prototype.testA=function(){
    var c=new Lyngk.Coordinates('A',1);
    var cpt=0;
    var lettres='ABCDEFGHI';
    for(var i=1;i<=9;i++){
        for(var j=1;j<=9;j++){
            if(assertTrue(c.isOk(lettres[i],j))){
                cpt++;
            }
        }
    }
};