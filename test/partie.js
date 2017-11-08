"use strict";

Lyngk.Partie = function () {
    var joueurs = [];
    var engine;
    var tour;

    this.startPartie = function(){
        joueurs.push(new Lyngk.Joueur(1));
        joueurs.push(new Lyngk.Joueur(2));
        engine=new Lyngk.Engine();
        engine.startGame();
        tour=1;
    };
    this.jouer = function (s_origine,s_cible) {
        var origine=engine.coorFromString(s_origine);
        var cible=engine.coorFromString(s_cible);
        engine.movePile(origine,cible);
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
};