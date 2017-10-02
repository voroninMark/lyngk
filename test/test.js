'use strict';

var LyngkTestCase1 = TestCase("LyngkTestCase");

LyngkTestCase1.prototype.testA=function(){
    var c=new Lyngk.Coordinates('A',1);
    assertFalse(c.isOk());
}