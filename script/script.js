// Script initial - formulaire pour le nombre de joueurs puis activation de la classe Board.
// Gère aussi les boutons pour la musique.
document.addEventListener('DOMContentLoaded', () => {
    let elBoard = document.querySelector('[data-js-board]');
    let elMusic = document.querySelector('[data-js-music]');
    let elPlay = document.querySelector('[data-js-play]');
    let elStop = document.querySelector('[data-js-stop]');
    let elForm = document.querySelector('[data-js-nbJoueurs]');
    let elSubmit = elForm.querySelector('[data-js-submit]');
    let elErreur = document.querySelector('[data-js-erreur]');
    let elReplay = document.querySelector('[data-js-replay]');
    let elParties = document.querySelector('[data-js-nbParties]');
    let jazz = new Audio('music/jazz.mp3');
    let shuffle = new Audio('music/shuffle.wav');
    let nbJoueurs,
        nbParties;
    
    if (!nbParties) {
        // Enregistrer des données dans sessionStorage
        sessionStorage.setItem('nombre', 1);
        // Place la valeur du sessionStorage dans une variable
        nbParties = sessionStorage.getItem('nombre');
    }

    // Validation du formulaire et activation de la classe board avec l'information entrée.
    elSubmit.addEventListener('click', (e) =>{
        e.preventDefault();
        let reg = /^[A-Za-z]/g;
        nbJoueurs = document.getElementById('nbJoueurs').value;
        if(nbJoueurs > 4 || nbJoueurs < 2 || reg.test(nbJoueurs)){
            elErreur.style.display = "block";
            elErreur.innerHTML = "SVP entrer un <u>nombre</u> de joueurs entre 2 et 4";
        }
        else {
            new Board(nbJoueurs);
            jazz.play();
            jazz.volume = 0.3;
            shuffle.play();
            elMusic.classList.remove('hide');
            elForm.classList.add('hide');
            elErreur.style.display = "none";
            elParties.innerHTML = nbParties++;
        }
    })

    // Bouton "play" 
    elPlay.addEventListener('click', () =>{
        jazz.play();
        elPlay.classList.add('disable');
        elStop.classList.remove('disable');
    });

    // Bouton "stop" 
    elStop.addEventListener('click', () =>{
        jazz.pause();
        elPlay.classList.remove('disable');
        elStop.classList.add('disable');
    });

    // Bouton "rejouer?"
    elReplay.addEventListener('click', () => {
        elBoard.innerHTML = "";
        elForm.classList.remove('hide');
        elReplay.classList.add('hide');
    });

});