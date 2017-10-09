'use strict';

var LyngkTestCase1 = TestCase("LyngkTestCase");
/*
LyngkTestCase1.prototype.testA=function(){
    var cpt=0;
    var lettres='ABCDEFGHI';
    for(var i=1;i<=9;i++){
        for(var j=1;j<=9;j++){
            var c=new Lyngk.Coordinates(lettres[i-1],j);
            if(c.isOk()){
                cpt++;
            }
        }
    }
    assertTrue(cpt===43);
};

LyngkTestCase1.prototype.testB=function(){
    var c='C';
    var l=3;
    var s=c+l;
    var c=new Lyngk.Coordinates(c,l);
    assertTrue(c.toString()===s);
};

LyngkTestCase1.prototype.testC=function() {
    // on test avec les coordonées que l'on sait faux
    var c='A';
    var l=12;
    var s=c+l;
    var c=new Lyngk.Coordinates(c,l);
    assertTrue(c.toString() === 'invalide');
};

LyngkTestCase1.prototype.testD=function() {
    var c1=new Lyngk.Coordinates('B',3);
    var c2=c1.clone();

    assertTrue((c1.getLigne() === c2.getLigne()) && (c1.getColonne() === c2.getColonne()));
};

LyngkTestCase1.prototype.testE=function() {
    var lettres='ABCDEFGHI';
    var res=0;
    // boucle va chercher chaque coordonnée
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){

            var c=new Lyngk.Coordinates(lettres[i],j+1);
            if(c.isOk()) {
                // la boucle va comparer la coordonnée de la boucle précedente
                // à toutes les autres
                for (var k = 0; k < 9; k++) {
                    for (var l = 0; l < 9; l++) {
                        var cTest = new Lyngk.Coordinates(lettres[i], j + 1);
                        if(cTest.hashage()===c.hashage()
                            && cTest.getColonne()!==c.getColonne()
                            && cTest.getLigne()!==c.getLigne()
                        ){// si la condition est vraie au moins une fois ; le hashage
                            // n'est pas bon
                            res++;
                        }
                    }
                }
            }
        }
    }
    assertTrue(res===0);
};

LyngkTestCase1.prototype.testF=function() {
    var lettres='ABCDEFGHI';
    var cpt=0;
    for(var i=1;i<=9;i++){
        for(var j=1;j<=9;j++){
            var c=new Lyngk.Coordinates(lettres[i-1],j);
            if(c.isOk()){
                var intersect=new Lyngk.Intersection(c);
                if(intersect.getEtat()!==0){// toutes les intersections douvent avoir
                                            // etat = 0 (vacant) par défaut
                    cpt++;
                }
            }
        }
    }
    assertTrue(cpt===0);
};

LyngkTestCase1.prototype.testG=function() {
    var engine=new Lyngk.Engine();
    var coor=new Lyngk.Coordinates('A',3);
    var inter=new Lyngk.Intersection(coor,'BLUE');
    var piece=new Lyngk.Piece(coor,'BLUE');
    engine.poser(inter,piece);
    assertTrue(inter.getEtat()===1);
};

LyngkTestCase1.prototype.testH=function() {
    var engine=new Lyngk.Engine();
    var coor=new Lyngk.Coordinates('A',3);
    var inter=new Lyngk.Intersection(coor,'BLUE');
    var pieceBlue=new Lyngk.Piece(coor,'BLUE');
    var pieceRed=new Lyngk.Piece(coor,'RED');
    engine.poser(inter,pieceBlue);
    engine.poser(inter,pieceRed);
    assertTrue(inter.getEtat()===2);
};
LyngkTestCase1.prototype.testI=function() {
    var engine=new Lyngk.Engine();
    var coor=new Lyngk.Coordinates('A',3);
    var inter=new Lyngk.Intersection(coor,'BLUE');
    var pieceBlue=new Lyngk.Piece(coor,'BLUE');
    var pieceRed=new Lyngk.Piece(coor,'RED');
    engine.poser(inter,pieceBlue);
    engine.poser(inter,pieceBlue);
    engine.poser(inter,pieceBlue);
    engine.poser(inter,pieceBlue);
    engine.poser(inter,pieceRed);
    assertTrue(inter.getEtat()===3);
};

LyngkTestCase1.prototype.testHistoire11=function() {
    var cpt=0;
    var lettres='ABCDEFGHI';
    var engine=new Lyngk.Engine();
    var tabInter=[];
    var tabPiece=[];
    var cpt=0;

    for(var i=1;i<=9;i++){
        for(var j=1;j<=9;j++){
            var coor=new Lyngk.Coordinates(lettres[i-1],j);
            if(coor.isOk()){
                tabInter.push(new Lyngk.Intersection(coor,'BLUE'));
                tabPiece.push(new Lyngk.Piece(coor,'BLUE'));
                engine.poser(tabInter[tabInter.length-1],tabPiece[tabPiece.length-1]);
            }
        }
    }
    tabInter.forEach(function(elem){
       if(elem.getEtat()!==1){
           cpt++;
       }
    });
    assertTrue(cpt===0);
};
*/
LyngkTestCase1.prototype.testHistoire12=function() {
    var engine=new Lyngk.Engine();
    var listeInter=engine.startGame();
    var cptRed=0;
    var cptBlue=0;
    var cptBlack=0;
    var cptGreen=0;
    var cptWhite=0;
    var cptIvory=0;

    listeInter.forEach(function(elem){
        elem.getListePiece().forEach(function(piece){
            if(piece.getCouleur()===0){
                cptBlack++;
            }
            if(piece.getCouleur()===1){
                cptIvory++;
            }
            if(piece.getCouleur()===2){
                cptBlue++;
            }
            if(piece.getCouleur()===3){
                cptRed++;
            }
            if(piece.getCouleur()===4){
                cptGreen++;
            }
            if(piece.getCouleur()===5){
                cptWhite++;
            }
        });
    });

    assertTrue((cptWhite===129) && cptBlack==43 && cptIvory==43 && cptBlue==43 && cptRed==43 && cptGreen==43);
};