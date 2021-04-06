class Jeu{
    // constructor(position, total){
    //     this._total = total;
    //     this._position = position;
    // }
    
    next = (position) => { 
        let elJoueurs = document.querySelectorAll('[data-js-joueur]');
        for (let i = 0; i <= elJoueurs.length-1; i++) {
            // while(elJoueurs[i].classList.contains('pass')){
            //     i++;
            //     console.log(i)
            // }
            if(position == elJoueurs.length-1){
                elJoueurs[elJoueurs.length-1].classList.add('inactive');
                elJoueurs[elJoueurs.length-1].classList.remove('active');
                elJoueurs[0].classList.add('active');
                elJoueurs[0].classList.remove('inactive');
            }
            else if(elJoueurs[i].classList.contains('active')){
                elJoueurs[i].classList.remove('active');
                elJoueurs[i].classList.add('inactive');
                elJoueurs[i].nextSibling.classList.add('active');
                elJoueurs[i].nextSibling.classList.remove('inactive');
                break;
            }
        }
    }

    // winCheck = () => {
    //     let elTotalJoueurs = document.querySelectorAll('[data-js-total]');
    //     let elJoueurs = document.querySelectorAll('[data-js-joueur]');
    //     let elPass = document.querySelectorAll('.pass');
    // }
}

    // if(element.classList.contains('pass'))