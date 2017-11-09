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
    var l=3;
    var c='A';
    var coor=new Lyngk.Coordinates(c,l);
    var s=c+l;
    assertTrue(coor.toString()===s);
};

LyngkTestCase1.prototype.testC=function() {
    // on test avec les coordonées que l'on sait faux
    var c='A';
    var l=12;
    var s=c+l;
    var c=new Lyngk.Coordinates(c,l);
    assertTrue(c.toString() === 'invalid');
};

LyngkTestCase1.prototype.testD=function() {
    var c1=new Lyngk.Coordinates('B',3);
    var c2=c1.clone();

    assertTrue((c1.getLine() === c2.getLine()) && (c1.getColumn() === c2.getColumn()));
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
                        if(cTest.do_hash()===c.do_hash()
                            && cTest.getColumn()!==c.getColumn()
                            && cTest.getLine()!==c.getLine()
                        ){// si la condition est vraie au moins une fois ; le do_hash
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
                if(intersect.getState()!==0){// toutes les intersections douvent avoir
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
    assertTrue(inter.getState()===1);
};

LyngkTestCase1.prototype.testH=function() {
    var engine=new Lyngk.Engine();
    var coor=new Lyngk.Coordinates('A',3);
    var inter=new Lyngk.Intersection(coor);
    var pieceBlue=new Lyngk.Piece('BLUE');
    var pieceRed=new Lyngk.Piece('RED');
    engine.poser(inter,pieceBlue);
    engine.poser(inter,pieceRed);
    assertTrue(inter.getState()===2);
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
    assertTrue(inter.getState()===3);
};

LyngkTestCase1.prototype.testHistoire11=function() {
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
       if(elem.getState()!==1){
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
        elem.getListPieces().forEach(function(piece){
            if(Lyngk.Color[piece.getColor()]===0){
                cptBlack++;
            }
            if(Lyngk.Color[piece.getColor()]===1){
                cptIvory++;
            }
            if(Lyngk.Color[piece.getColor()]===2){
                cptBlue++;
            }
            if(Lyngk.Color[piece.getColor()]===3){
                cptRed++;
            }
            if(Lyngk.Color[piece.getColor()]===4){
                cptGreen++;
            }
            if(Lyngk.Color[piece.getColor()]===5){
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
        var tempLength=elem.getListPieces().length;
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
    var listePiece=listeInter[rand].getListPieces();
    var couleurIntersection=listeInter[rand].getColor();
    var couleurDernierePiece=listePiece[listePiece.length-1].getColor();

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
    var couleurInter1=inter1.getColor();

    engine.movePiece(inter1,inter2);

    var couleurInter2=inter2.getColor();
    assertTrue(couleurInter1===couleurInter2 && inter1.getListPieces().length === 0);

};

LyngkTestCase1.prototype.testHistoire16=function() {
    var engine=new Lyngk.Engine();

    var B3=new Lyngk.Coordinates('B',3);
    var B2=new Lyngk.Coordinates('B',2);
    engine.startWhiteGame();
    var interB2=engine.intersectionFromCoordinates(B2);
    var interB3=engine.intersectionFromCoordinates(B3);

    // on pose 2 pieces supplémentaires pour respecter l'histoire
    engine.poser(interB2,new Lyngk.Piece('WHITE'));
    engine.poser(interB2,new Lyngk.Piece('BLACK'));

    var couleurB2=Lyngk.Color[interB2.getColor()];

    engine.movePile(B2,B3);

    var couleurB3=Lyngk.Color[interB3.getColor()];
    assertTrue(couleurB2===couleurB3 && interB2.getListPieces().length === 0 && interB3.getListPieces().length === 4);
};

LyngkTestCase1.prototype.testHistoire17=function() {
    var engine=new Lyngk.Engine();

    var B3=new Lyngk.Coordinates('B',3);
    var B2=new Lyngk.Coordinates('B',2);
    engine.startWhiteGame();
    var interB2=engine.intersectionFromCoordinates(B2);
    var interB3=engine.intersectionFromCoordinates(B3);

    var etatB2PremierMoveAvant = interB2.getState();
    engine.movePile(B2,B3);
    var etatB2PremierMoveApres = interB2.getState();

    var etatB3DeuxiemeMoveAvant = interB3.getState();
    engine.movePile(B3,B2);
    var etatB3DeuxiemeMoveApres = interB3.getState();

    assertTrue(
        etatB2PremierMoveAvant !== etatB2PremierMoveApres &&
        etatB3DeuxiemeMoveAvant === etatB3DeuxiemeMoveApres);
};

LyngkTestCase1.prototype.testHistoire18=function() {
    var engine=new Lyngk.Engine();
    engine.startWhiteGame();

    var B3=new Lyngk.Coordinates('B',3);
    var B2=new Lyngk.Coordinates('B',2);
    var C2=new Lyngk.Coordinates('C',2);

    var interB2=engine.intersectionFromCoordinates(B2);
    var interC2=engine.intersectionFromCoordinates(C2);



    var etatB2avant = interB2.getState();
    engine.movePile(B2,B3);
    var etatB2apres = interB2.getState();

    var etatC2avant = interC2.getState();
    engine.movePile(C2,B3);
    var etatC2apres = interC2.getState();

    assertTrue(
        etatB2avant !== etatB2apres &&
        etatC2avant === etatC2apres);
};

LyngkTestCase1.prototype.testHistoire19=function() {
    var engine=new Lyngk.Engine();
    engine.startWhiteGame();

    var H5=new Lyngk.Coordinates('H',5);
    var I7=new Lyngk.Coordinates('I',7);
    var H6=new Lyngk.Coordinates('H',6);
    var H8=new Lyngk.Coordinates('H',8);
    var F5=new Lyngk.Coordinates('F',5);
    var F3=new Lyngk.Coordinates('F',3);

    var interH5=engine.intersectionFromCoordinates(H5);
    var interH6=engine.intersectionFromCoordinates(H6);
    var interI7=engine.intersectionFromCoordinates(I7);

    var etatI7_avant_I7toH6;
    var etatI7_apres_I7toH6;
    var etatH6_avant_H6toH5;
    var etatH6_apres_H6toH5;
    var etatH5_avant_H5toH8;
    var etatH5_apres_H5toH8;
    var etatH5_avant_H5toF5;
    var etatH5_apres_H5toF5;
    var etatH5_avant_H5toF3;
    var etatH5_apres_H5toF3;

    etatI7_avant_I7toH6=interI7.getState();
    engine.movePile(I7,H6);
    etatI7_apres_I7toH6=interI7.getState();

    etatH6_avant_H6toH5=interH6.getState();
    engine.movePile(H6,H5);
    etatH6_apres_H6toH5=interH6.getState();

    etatH5_avant_H5toH8=interH5.getState();
    engine.movePile(H5,H8);
    etatH5_apres_H5toH8=interH5.getState();

    etatH5_avant_H5toF5=interH5.getState();
    engine.movePile(H5,F5);
    etatH5_apres_H5toF5=interH5.getState();

    etatH5_avant_H5toF3=interH5.getState();
    engine.movePile(H5,H8);
    etatH5_apres_H5toF3=interH5.getState();

    assertTrue(
        etatI7_avant_I7toH6 !== etatI7_apres_I7toH6 &&
        etatH6_avant_H6toH5 !== etatH6_apres_H6toH5 &&
        etatH5_avant_H5toH8 === etatH5_apres_H5toH8 &&
        etatH5_avant_H5toF5 === etatH5_apres_H5toF5 &&
        etatH5_avant_H5toF3 === etatH5_apres_H5toF3
    );
};

LyngkTestCase1.prototype.testHistoire20=function() {
    var engine=new Lyngk.Engine();
    engine.startWhiteGame();

    var B4=new Lyngk.Coordinates('B',4);
    var B3=new Lyngk.Coordinates('B',3);
    var B2=new Lyngk.Coordinates('B',2);
    var C2=new Lyngk.Coordinates('C',2);
    var D2=new Lyngk.Coordinates('D',2);
    var E2=new Lyngk.Coordinates('E',2);


    var taille_pille_D2_avant_move_E2;
    var taille_pille_D2_apres_move_E2;

    engine.movePile(B4,B3);
    engine.movePile(B3,B2);
    engine.movePile(B2,C2);
    engine.movePile(C2,D2);
    taille_pille_D2_avant_move_E2 = engine.intersectionFromCoordinates(D2).getState();
    engine.movePile(D2,E2);
    taille_pille_D2_apres_move_E2 = engine.intersectionFromCoordinates(D2).getState();


    assertTrue(taille_pille_D2_avant_move_E2 === 3 &&
                taille_pille_D2_apres_move_E2 === 3
    );
};

LyngkTestCase1.prototype.testHistoire21=function() {
    var engine=new Lyngk.Engine();
    engine.startWhiteGame();

    var A3=new Lyngk.Coordinates('A',3);
    var B3=new Lyngk.Coordinates('B',3);
    var C3=new Lyngk.Coordinates('C',3);

    var etatC3_avant_C3toB3;
    var etatC3_apres_C3toB3;

    engine.movePile(A3,B3);
    etatC3_avant_C3toB3=engine.intersectionFromCoordinates(C3).getState();
    engine.movePile(C3,B3);
    etatC3_apres_C3toB3=engine.intersectionFromCoordinates(C3).getState();

    assertTrue(etatC3_avant_C3toB3 === etatC3_apres_C3toB3);

};

LyngkTestCase1.prototype.testHistoire22=function() {
    var engine=new Lyngk.Engine();
    engine.startWhiteGame();

    var I7=new Lyngk.Coordinates('I',7);
    var H6=new Lyngk.Coordinates('H',6);
    var G4=new Lyngk.Coordinates('G',4);
    var G5=new Lyngk.Coordinates('G',5);
    var G6=new Lyngk.Coordinates('G',6);

    var etatG6_avant_G6toH6;
    var etatG6_apres_G6toH6;
    var etatH6_avant_G6toH6;
    var etatH6_apres_G6toH6;

    engine.movePile(I7,H6);
    engine.movePile(G4,G5);
    engine.movePile(G5,G6);
    etatG6_avant_G6toH6=engine.intersectionFromCoordinates(G6).getListPieces().length;
    etatH6_avant_G6toH6=engine.intersectionFromCoordinates(H6).getListPieces().length;
    engine.movePile(H6,G6);
    etatH6_apres_G6toH6=engine.intersectionFromCoordinates(H6).getListPieces().length;
    etatG6_apres_G6toH6=engine.intersectionFromCoordinates(G6).getListPieces().length;
    assertTrue(
      etatH6_avant_G6toH6 === etatH6_apres_G6toH6 &&
      etatG6_avant_G6toH6 === etatG6_apres_G6toH6
    );
};

LyngkTestCase1.prototype.testHistoire23=function() {
    var engine=new Lyngk.Engine();
    engine.startVoidGame();

    var G3=new Lyngk.Coordinates('G',3);
    var G4=new Lyngk.Coordinates('G',4);
    var G5=new Lyngk.Coordinates('G',5);
    var G6=new Lyngk.Coordinates('G',6);
    var G7=new Lyngk.Coordinates('G',7);

    var blue=new Lyngk.Piece('BLUE');
    var white=new Lyngk.Piece('WHITE');
    var red=new Lyngk.Piece('RED');

    var interG3=engine.intersectionFromCoordinates(G3);
    var interG4=engine.intersectionFromCoordinates(G4);
    var interG5=engine.intersectionFromCoordinates(G5);
    var interG6=engine.intersectionFromCoordinates(G6);
    var interG7=engine.intersectionFromCoordinates(G7);

    var length_G5;
    var length_G6_avant_G6toG7;
    var length_G6_apres_G6toG7;

    engine.poser(interG3,blue);
    engine.poser(interG4,white);
    engine.poser(interG5,white);
    engine.poser(interG6,red);
    engine.poser(interG7,blue);

    engine.movePile(G3,G4);
    engine.movePile(G4,G5);
    length_G5=interG5.getListPieces().length;
    engine.movePile(G5,G6);
    length_G6_avant_G6toG7=interG6.getListPieces().length;
    engine.movePile(G6,G7);
    length_G6_apres_G6toG7=interG6.getListPieces().length;

    console.log(length_G5+" "+length_G6_avant_G6toG7+" "+length_G6_apres_G6toG7);
    assertTrue(length_G5 === 3 && length_G6_avant_G6toG7 === length_G6_apres_G6toG7);
};

LyngkTestCase1.prototype.testHistoire24=function() {
    var partie = new Lyngk.Game();
    partie.startMatch();

   assertTrue(partie.getTour() === 1 && partie.getCurrentPlayer().getNum() === 1);

};

LyngkTestCase1.prototype.testHistoire25=function() {
    var partie = new Lyngk.Game();
    partie.startMatch('normal');


    var j_avant_move;
    var j_apres_move;

    j_avant_move = partie.getCurrentPlayer().getNum();
    partie.play('A3','B3');
    j_apres_move = partie.getCurrentPlayer().getNum();

    assertTrue(j_avant_move === 1 && j_apres_move === 2);


};

LyngkTestCase1.prototype.testHistoire26=function() {
    var partie = new Lyngk.Game();
    partie.startMatch('normal');

    var couleur_j1;
    var couleur_j2;

    partie.getCurrentPlayer().claim('RED');
    partie.play('A3','B3');
    partie.getCurrentPlayer().claim('BLUE');


    assertTrue(partie.getPlayer(1).colorIn('RED') &&
                partie.getPlayer(2).colorIn('BLUE')
    );
};

LyngkTestCase1.prototype.testHistoire27=function() {
    var partie = new Lyngk.Game();
    partie.startMatch('white');
    var engine=partie.getEngine();
    var pt_j1_avant=partie.getPlayer(1).getPoints();
    var pt_j1_apres;
    var nbPieces;

    engine.intersectionFromCoordinates(engine.coordinatesFromString('A3')).cleanPile();
    engine.poser(engine.intersectionFromCoordinates(engine.coordinatesFromString('A3')),new Lyngk.Piece('BLUE'));


    partie.getCurrentPlayer().claim('BLUE');

    partie.play('A3','B3');
    partie.play('H6','G5');
    partie.play('B3','C3');
    partie.play('G5','G6');
    partie.play('C3','C2');
    partie.play('G6','H7');
    partie.play('C2','D2');


    nbPieces=engine.nbPieces();
    pt_j1_apres=partie.getPlayer(1).getPoints();

    assertTrue(pt_j1_avant === 0 && pt_j1_apres === 1 && nbPieces === 38);

};
LyngkTestCase1.prototype.testHistoire28=function() {
    var partie = new Lyngk.Game();
    partie.startMatch('white');
    var engine=partie.getEngine();
    var interB4=engine.intersectionFromCoordinates(engine.coordinatesFromString('B4'));
    engine.intersectionFromCoordinates(engine.coordinatesFromString('A3')).cleanPile();
    engine.poser(engine.intersectionFromCoordinates(engine.coordinatesFromString('A3')),new Lyngk.Piece('RED'));

    partie.getCurrentPlayer().claim('RED');
    partie.play('A3','B3');
    partie.play('B3','B4');

    assertTrue(interB4.getListPieces().length === 1);
    // la taille de B4 n'a pas changé , le deplacement B3
    //vers B4 a donc echoué
};
LyngkTestCase1.prototype.testHistoire29=function() {
    var partie = new Lyngk.Game();
    partie.startMatch('normal');
    assertTrue(partie.validIntersections(partie.getCurrentPlayer()) === 40);
};
LyngkTestCase1.prototype.testHistoire30=function() {
    var partie = new Lyngk.Game();
    partie.startMatch('white');
    var engine=partie.getEngine();

    engine.intersectionFromCoordinates(engine.coordinatesFromString('A3')).cleanPile();
    engine.poser(engine.intersectionFromCoordinates(engine.coordinatesFromString('A3')),new Lyngk.Piece('BLACK'));
    engine.intersectionFromCoordinates(engine.coordinatesFromString('B3')).cleanPile();
    engine.poser(engine.intersectionFromCoordinates(engine.coordinatesFromString('B3')),new Lyngk.Piece('GREEN'));


    partie.getCurrentPlayer().claim('BLACK');

    partie.play('A3','B3');

    var interValides_j1=partie.validIntersections(partie.getPlayer(1));
    var interValides_j2=partie.validIntersections(partie.getPlayer(2));

    assertTrue(interValides_j1 === 1 && interValides_j2 === 0);
    // seul le joueur 1 a encore un coup car le plateau est remplis de pieces blanches sauf une intersection sur laquelle une pille est noire, et le joueur 1 à reclamé la couleur noire
};
LyngkTestCase1.prototype.testHistoire31=function() {
    var partie = new Lyngk.Game();
    partie.startMatch('white');
    var engine=partie.getEngine();
    var interA3=engine.intersectionFromCoordinates(engine.coordinatesFromString('A3'));
    engine.poser(interA3,new Lyngk.Piece('BLACK'));
    var interB3=engine.intersectionFromCoordinates(engine.coordinatesFromString('B3'));
    engine.poser(interB3,new Lyngk.Piece('RED'));
    var interX1=engine.intersectionFromCoordinates(engine.coordinatesFromString('X1'));
    engine.poser(interX1,new Lyngk.Piece('BLUE'));
    var interE3=engine.intersectionFromCoordinates(engine.coordinatesFromString('E3'));
    engine.poser(interE3,new Lyngk.Piece('IVORY'));


    var coupsA3=partie.possibleMoves(interA3);
    var coupsB3=partie.possibleMoves(interB3);
    var coupsX1=partie.possibleMoves(interX1);
    var coupsE3=partie.possibleMoves(interE3);

    assertTrue(coupsA3 === 2 && coupsB3 === 5 && coupsX1 === 0 && coupsE3 === 6);
    // on fait les test sur un plateau blancs avec seulement 4 pieces non blanches pour poivoir avoir des resultat de test conctants ( le plateau de jeu est généré aléatoiremnt normalement

};
/*
LyngkTestCase1.prototype.testHistoire32=function() {
    var partie = new Lyngk.Game();
    var win;
    var lose;

    partie.startMatch('normal');
    var engine=partie.getEngine();
    partie.getPlayer(1).claim('RED');
    partie.getPlayer(2).claim('BLUE');
    var res=partie.simulation();
    var taillePileWin = partie.getSizeOfWinnerStack();
    win=partie.getWinner();
    lose=partie.getLoser();
    console.log(res);
    if(res==='victoire') {
        console.log('Vainquer = joueur ' + win.getNum());
        console.log('Taille pile retenue :: ' + taillePileWin);
        console.log('Score vainqueur :: ' + win.getPoints());
        console.log('Score perdant :: ' + lose.getPoints());
    }
};
*/