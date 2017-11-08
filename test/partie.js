"use strict";

Lyngk.Partie = function () {
    var joueurs = [];
    var vainqueur;
    var perdant;
    var taillePileWin;
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
    this.simulation = function(){
        var cpt=0;
        do{

            var moves_possibles = this.coupsPossiblesTot();
            var origine=this.pickOrigine(this.getJoueurCourant());
            var cible=this.pickCible(origine);
            this.jouer(origine.getCoor().toString(),cible.getCoor().toString());
            cpt++;
        }while(moves_possibles > 5 && cpt<100);
        for(var i = 5;i>=1;i--){
            var pts_j1=engine.cptPiles(i,this.getJoueur(1));
            var pts_j2=engine.cptPiles(i,this.getJoueur(2));
            if(pts_j1 > pts_j2){
                this.getJoueur(1).setPoint(pts_j1);
                this.getJoueur(2).setPoint(pts_j2);

                vainqueur=this.getJoueur(1);

                perdant=this.getJoueur(2);

                taillePileWin=i;
                return "victoire";
            }
            if(pts_j1 < pts_j2){
                this.getJoueur(1).setPoint(pts_j1);
                this.getJoueur(2).setPoint(pts_j2);

                vainqueur=this.getJoueur(2);

                perdant=this.getJoueur(1);

                taillePileWin=i;
                return "victoire";
            }
        }
        return "match nul";
    };
    this.pickOrigine = function(joueur){
        var couleurs=this.getAdversaire(joueur).getCouleurs();
        var interValide = engine.getInterValides(couleurs);
        do{
            var rand = Math.floor(Math.random() * interValide.length);
        }while(this.coupsPossibles(interValide[rand]) === 0);

        return interValide[rand];
    };
    this.pickCible = function(origine){
        var res=[];
        var inter=this.checkDirection(origine,0,1,'inter');
        if(inter !== null) res.push(inter);
        inter=this.checkDirection(origine,0,-1,'inter');
        if(inter !== null) res.push(inter);
        inter=this.checkDirection(origine,1,0,'inter');
        if(inter !== null) res.push(inter);
        this.checkDirection(origine,-1,0,'inter');
        if(inter !== null) res.push(inter);
        inter=this.checkDirection(origine,-1,-1,'inter');
        if(inter !== null) res.push(inter);
        inter=this.checkDirection(origine,1,1,'inter');
        if(inter !== null) res.push(inter);
        var rand = Math.floor(Math.random() * res.length);
        if(res.length === 0) return origine;
        return res[rand];
    };
    this.interValides = function(joueur){
        var couleurs=this.getAdversaire(joueur).getCouleurs();
        return engine.calcInterValides(couleurs);
    };
    this.checkDirection = function(origine,c_fact,l_fact,but){
        var coorOrigine=origine.getCoor();
        var l=coorOrigine.getLigne();
        var c=coorOrigine.getColonne().charCodeAt(0);
        var i=1;

        do{
            var coor = new Lyngk.Coordinates(String.fromCharCode(c+c_fact*i),l+l_fact*i);
            var cible=engine.interFromCoor(coor);
            i++;
        }
        while(!engine.moveOk(origine,cible) && coor.isOk());

        if(coor.isOk()){
            if(but === 'inter')
                return cible;
            else
                return 1;
        }else{
            if(but === 'inter')
                return null;
            else
                return 0;
        }
    };
    this.coupsPossibles = function (origine) {
        var cpt = 0;
        if(origine.getListePiece().length === 0 || (origine.getListePiece().length > 0 && origine.getCouleur() === 'WHITE')){return cpt;}
        cpt+=this.checkDirection(origine,0,1,'int');
        cpt+=this.checkDirection(origine,0,-1,'int');
        cpt+=this.checkDirection(origine,1,0,'int');
        cpt+=this.checkDirection(origine,-1,0,'int');
        cpt+=this.checkDirection(origine,1,1,'int');
        cpt+=this.checkDirection(origine,-1,-1,'int');
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
    this.getVainqueur = function(){
        return vainqueur;
    }

    this.getPerdant = function(){
        return perdant;
    }
    this.getTaillePilleWin = function(){
        return taillePileWin;
    }
};