// Classe qui initialise l'espace de jeu et créé le nombre de joueurs demandés.
class Board {
    constructor(nbJoueurs){
        // Définition des propriétés
        this._nbJoueurs = nbJoueurs;
        this._listeJoueur = [];
        this._elBoard = document.querySelector('[data-js-board]');
        
        this.init(this._nbJoueurs);
    }

    // Fonction initiale - génère les éléments DOM requis pour chaque emplacement joueur.
    init = () => {
        for (let i = 0; i < this._nbJoueurs; i++) {
            this._elBoard.innerHTML += 
            `<div class='ereDeJeu joueur inactive participant' data-js-joueur='${i}'>
                <h1 class='position center' data-js-pos>Joueur ${i+1}</h1> <p class="center">Total de vos cartes: <span data-js-total></span></p>
                <div class='affichage' data-js-affichage> </div>
                <div class='center' data-js-boutons>
                    <button class="controls" data-js-deal><span>&#10084; Deal &#10084;</span></button>
                    <button class="controls disable" data-js-hold><span>&#9670; Hold &#9670;</span></button>
                </div>  
            </div>`
        }

        // Désactive tout les joueurs sauf le premier et instancie la classe joueurs pour chaque noeud DOM créé plus haut.
        let elJoueurs = document.querySelectorAll('[data-js-joueur]');
        console.log(elJoueurs);
        elJoueurs[0].classList.remove('inactive');
        elJoueurs[0].classList.add('active');

        for (let i = 0; i < elJoueurs.length; i++) {
            this._listeJoueur.push(new Joueur(elJoueurs[i]));
        }
    }
}