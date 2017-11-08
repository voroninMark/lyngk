"use strict";

Lyngk.Partie = function () {
    var joueurs = [];
    var engine;
    var tour;

    this.startPartie = function(param){
        joueurs.push(new Lyngk.Joueur(1));
        joueurs.push(new Lyngk.Joueur(2));
        engine=new Lyngk.Engine();
        if(param==='void') {
            engine.startVoidGame();
        }
        if(param==='normal') {
            engine.startGame();
        }
        if(param === 'white') {
            engine.startWhiteGame();
        }
        tour=1;
    };
    this.interValides = function(joueur){
        var couleurs=this.getAdversaire(joueur).getCouleurs();
        return engine.calcInterValides(couleurs);
    };
    this.coupsPossibles = function (origine) {
        var coor=origine.getCoor();
        var l=coor.getLigne();
        var c=coor.getColonne().charCodeAt(0);
        var cpt = 0;
        if(origine.getListePiece().length === 0 || (origine.getListePiece().length > 0 && origine.getCouleur() === 'WHITE')){return cpt;}
        if(engine.moveOk(origine,engine.interFromCoor(new Lyngk.Coordinates(String.fromCharCode(c),l+1)))) cpt++;

        if(engine.moveOk(origine,engine.interFromCoor(new Lyngk.Coordinates(String.fromCharCode(c),l-1)))) cpt++;

        if(engine.moveOk(origine,engine.interFromCoor(new Lyngk.Coordinates(String.fromCharCode(c+1),l)))) cpt++;

        if(engine.moveOk(origine,engine.interFromCoor(new Lyngk.Coordinates(String.fromCharCode(c-1),l)))) cpt++;

        if(engine.moveOk(origine,engine.interFromCoor(new Lyngk.Coordinates(String.fromCharCode(c+1),l+1)))) cpt++;

        if(engine.moveOk(origine,engine.interFromCoor(new Lyngk.Coordinates(String.fromCharCode(c-1),l-1)))) cpt++;

        return cpt;
    };
    this.coupsPossiblesTot = function () {
        var cpt=0;
        for(var i = 0;i<engine.getTabInter().length;i++){
            cpt+=this.coupsPossibles(engine.getTabInter()[i]);
        }
        return cpt;
    };
    this.jouer = function (s_origine,s_cible) {
        var origine=engine.coorFromString(s_origine);
        var cible=engine.coorFromString(s_cible);
        if(!this.getAdversaire(this.getJoueurCourant()).couleurIn(engine.interFromCoor(origine).getCouleur())){
            engine.movePile(origine, cible);
        }
        if( engine.interFromCoor(cible).getEtat() === 3 &&
            this.getJoueurCourant().couleurIn(engine.interFromCoor(cible).getCouleur())
        ){
            engine.interFromCoor(cible).cleanPile();
            this.getJoueurCourant().addPoint();
        }
        tour++;
    };
    this.getJoueur = function(n){
        return joueurs[n-1];
    };
    this.getTour = function(){
        return tour;
    };
    this.getJoueurCourant = function () {
        return joueurs[(tour+1)%2];
    };
    this.getEngine = function () {
        return engine;
    };
    this.getAdversaire = function(joueur){
        return joueurs[(joueur.getNum())%2];
    }
};