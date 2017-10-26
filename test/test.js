'use strict';

var LyngkTestCase1 = TestCase("LyngkTestCase");

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
    var inter=new Lyngk.Intersection(coor);
    var piece=new Lyngk.Piece('BLUE');
    engine.poser(inter,piece);
    assertTrue(inter.getEtat()===1);
};

LyngkTestCase1.prototype.testH=function() {
    var engine=new Lyngk.Engine();
    var coor=new Lyngk.Coordinates('A',3);
    var inter=new Lyngk.Intersection(coor);
    var pieceBlue=new Lyngk.Piece('BLUE');
    var pieceRed=new Lyngk.Piece('RED');
    engine.poser(inter,pieceBlue);
    engine.poser(inter,pieceRed);
    assertTrue(inter.getEtat()===2);
};
LyngkTestCase1.prototype.testI=function() {
    var engine=new Lyngk.Engine();
    var coor=new Lyngk.Coordinates('A',3);
    var inter=new Lyngk.Intersection(coor);
    var pieceBlue=new Lyngk.Piece('BLUE');
    var pieceRed=new Lyngk.Piece('RED');
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
                tabInter.push(new Lyngk.Intersection(coor));
                tabPiece.push(new Lyngk.Piece('BLUE'));
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

LyngkTestCase1.prototype.testHistoire12=function() {
    var engine=new Lyngk.Engine();
    engine.startGame();
    var listeInter=engine.getTabInter();
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
    assertTrue(cptWhite===3 && cptBlack===8 && cptIvory===8 && cptBlue===8 && cptRed===8 && cptGreen===8);
};

LyngkTestCase1.prototype.testHistoire13=function() {
    var engine=new Lyngk.Engine();
    engine.startGame();
    var listeInter=engine.getTabInter();
    var cptTest=0;

    listeInter.forEach(function(elem){
        var tempLength=elem.getListePiece().length;
        if(tempLength!==1){
            cptTest++;
        }
    });
    assertTrue(cptTest === 0);
};

LyngkTestCase1.prototype.testHistoire14=function() {
    var engine=new Lyngk.Engine();
    engine.startGame();
    var listeInter=engine.getTabInter();

    var rand=Math.floor(Math.random()*43);
    var listePiece=listeInter[rand].getListePiece();
    var couleurIntersection=listeInter[rand].getCouleur();
    var couleurDernierePiece=listePiece[listePiece.length-1].getCouleur();

    assertTrue(couleurIntersection===couleurDernierePiece);
};

LyngkTestCase1.prototype.testHistoire15=function() {
    var engine=new Lyngk.Engine();

    var coor1=new Lyngk.Coordinates('A',3);
    var coor2=new Lyngk.Coordinates('B',3);

    var inter1=new Lyngk.Intersection(coor1);
    var inter2=new Lyngk.Intersection(coor2);

    engine.poser(inter1,new Lyngk.Piece('WHITE'));
    engine.poser(inter2,new Lyngk.Piece('BLACK'));
    var couleurInter1=inter1.getCouleur();

    engine.movePiece(inter1,inter2);

    var couleurInter2=inter2.getCouleur();
    assertTrue(couleurInter1===couleurInter2 && inter1.getListePiece().length === 0);

};

LyngkTestCase1.prototype.testHistoire16=function() {
    var engine=new Lyngk.Engine();

    var coor1=new Lyngk.Coordinates('B',3);
    var coor2=new Lyngk.Coordinates('B',2);

    var inter1=new Lyngk.Intersection(coor1);
    var inter2=new Lyngk.Intersection(coor2);

    engine.poser(inter1,new Lyngk.Piece('WHITE'));
    engine.poser(inter1,new Lyngk.Piece('BLACK'));
    engine.poser(inter1,new Lyngk.Piece('RED'));
    engine.poser(inter2,new Lyngk.Piece('RED'));

    var couleurInter1=inter1.getCouleur();

    engine.movePile(inter1,inter2);

    var couleurInter2=inter2.getCouleur();
    assertTrue(couleurInter1===couleurInter2 && inter1.getListePiece().length === 0 && inter2.getListePiece().length === 4);
};

LyngkTestCase1.prototype.testHistoire17=function() {
    var engine=new Lyngk.Engine();

    var coor1=new Lyngk.Coordinates('B',3);
    var coor2=new Lyngk.Coordinates('B',2);

    var inter1=new Lyngk.Intersection(coor1);
    var inter2=new Lyngk.Intersection(coor2);

    engine.poser(inter1,new Lyngk.Piece('WHITE'));
    engine.poser(inter1,new Lyngk.Piece('BLACK'));
    engine.poser(inter1,new Lyngk.Piece('RED'));
    engine.poser(inter2,new Lyngk.Piece('RED'));

    var etatInter1PremierMoveAvant = inter1.getEtat();
    engine.movePile(inter1,inter2);
    var etatInter1PremierMoveApres = inter1.getEtat();

    var etatInter2DeuxiemeMoveAvant = inter2.getEtat();
    engine.movePile(inter2,inter1);
    var etatInter2DeuxiemeMoveApres = inter2.getEtat();

    assertTrue(
        etatInter1PremierMoveAvant !== etatInter1PremierMoveApres &&
        etatInter2DeuxiemeMoveAvant === etatInter2DeuxiemeMoveApres);
};

LyngkTestCase1.prototype.testHistoire18=function() {
    var engine=new Lyngk.Engine();

    var coor1=new Lyngk.Coordinates('B',3);
    var coor2=new Lyngk.Coordinates('B',2);
    var coor3=new Lyngk.Coordinates('C',2);

    var inter1=new Lyngk.Intersection(coor1);
    var inter2=new Lyngk.Intersection(coor2);
    var inter3=new Lyngk.Intersection(coor3);

    engine.poser(inter1,new Lyngk.Piece('WHITE'));
    engine.poser(inter2,new Lyngk.Piece('RED'));
    engine.poser(inter3,new Lyngk.Piece('BLUE'));

    var etatInter2PremierMoveAvant = inter1.getEtat();
    engine.movePile(inter2,inter1);
    var etatInter2PremierMoveApres = inter1.getEtat();

    var etatInter3DeuxiemeMoveAvant = inter3.getEtat();
    engine.movePile(inter3,inter2);
    var etatInter3DeuxiemeMoveApres = inter3.getEtat();

    assertTrue(
        etatInter2PremierMoveAvant !== etatInter2PremierMoveApres &&
        etatInter3DeuxiemeMoveAvant === etatInter3DeuxiemeMoveApres);
};