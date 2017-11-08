"use strict";

Lyngk.Partie = function () {
    var joueurs = [];
    var engine;
    var tour;

    this.startPartie = function(){
        joueurs.push(new Lyngk.Joueur(1));
        joueurs.push(new Lyngk.Joueur(2));
        engine=new Lyngk.Engine();
        tour=1;
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