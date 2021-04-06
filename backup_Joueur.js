// Classe qui s'occupe des mécaniques pour chaque joueurs (boutons, affichage des cartes, etc)
class Joueur{
    constructor(el){
        // Définition des propriétés
        this._el = el;
        this._elPosition = this._el.querySelector('[data-js-pos]');
        this._elBoutons = this._el.querySelector('[data-js-boutons]')
        this._elAffichage =  this._el.querySelector('[data-js-affichage]');
        this._elDeal = this._el.querySelector('[data-js-deal]');
        this._elHold = this._el.querySelector('[data-js-hold]');
        this._elTotal = this._el.querySelector('[data-js-total]');
        this._total = 0;

        this.init();
    }
    
    // Activation des fonctions initiales
    init = () => {
        this.deal();
        this.hold();
    }
    
    // Fonction qui donne un nombre random de {minimum} à {maximum}.
    numRandom = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    }
    
    // Fonction qui gère le bouton "deal" et ses évenements.
    deal = () => {
        this._elDeal.addEventListener('click', () => {
            if(this._elAffichage.children.length + 1 == 9){
                this._elDeal.classList.add('disable');
            }
            else
            {
                let valeur = this.numRandom(1,13);
                let carte = new Carte(valeur);
                let spanCarte = document.createElement('span');
                let image = document.createElement('img');
                let flip = new Audio("music/flip.wav");
                this._elHold.classList.remove('disable');
                this._total += carte._vraieValeur;
                this._elTotal.innerHTML = this._total;
                flip.play();
                spanCarte.setAttribute("class", "carte");
                image.src = `cartes/a${valeur}.png`;
                spanCarte.appendChild(image);
                this._elAffichage.insertAdjacentElement('beforeend', spanCarte);
               
                this.ifPlayed();
            }
        });
    }
    
    // Fonction qui gère le bouton "hold" et ses évenements.
    hold = () => {
        this._elHold.addEventListener('click', () => {
            let hold = new Audio("music/hold.wav");
            hold.play();
            this._el.classList.add('pass');
            this._elBoutons.classList.add('disable');
            // this._elBoutons.classList.remove('inactive');
            this._elAffichage.style.border = "5px solid red";
            this._elAffichage.parentNode.classList.remove('active');
            this._elAffichage.style.opacity = "75%";
            //manque qqc comme jeu.next ici.... how?
        });
    }
    
    // Fonction qui vérifie si un joueur a joué et s'il dépasse un total de 21
    ifPlayed = () => {
        let jeu = new Jeu(this._el.dataset.jsJoueur, this._total);
        jeu.next();
        jeu.winCheck();
  
        if(this._total > 21)
        {
            let over = new Audio('music/over.wav');
            over.play();
            this._elAffichage.parentNode.classList.add('disable');
            this._elAffichage.parentNode.classList.add('pass');
            this._elAffichage.parentNode.classList.remove('active');
            this._elAffichage.parentNode.classList.remove('inactive');
            this._elAffichage.innerHTML = "";
            this._elAffichage.style.boxShadow = "inset 5px 5px 22px 10px #000000";
            this._elAffichage.style.backgroundImage = "url('images/over.jpg')";        
        }
    }
}





  