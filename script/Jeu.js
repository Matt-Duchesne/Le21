class Jeu{

    next = (position) => { 
        let elParticipants = document.querySelectorAll('.participant');
        let idNext = 0;
        let idCurrent = 0;
        // Recherche le joueur courant et le prochain joueurs dans le tableau des participant restants;
        // Tous les joueurs éliminés de la partie perdent la classe "participant", ce qui les élimine de 
        // la liste et permet de cycler plus facilement. Si plus aucun "participant" trouvé, le check 
        // pour la victoire est effectué : )
        if(elParticipants.length > 0){
            for (let i = 0; i < elParticipants.length; i++) {
                if(elParticipants[i].dataset.jsJoueur >= position){
                    if(elParticipants[i].dataset.jsJoueur == position){
                        idCurrent = i;
                        if(i+1 < elParticipants.length){
                            idNext = i+1;
                        }
                    }
                    else
                    {
                        idCurrent = -1;
                        idNext = i;    
                    }
                    break; 
                }    
            }
            
            if(idCurrent > -1){
                elParticipants[idCurrent].classList.remove('active');
                elParticipants[idCurrent].classList.add('inactive');
            }
            elParticipants[idNext].classList.add('active');
            elParticipants[idNext].classList.remove('inactive');
        }
        else
        {
            this.winCheck();
        }
    }

    // Vérifie toutes les conditions de victoire et active les classes et effets appropriés 
    // Effets différents pour 1,2,3 et 4 gagnants simultanés et bonus pour une victoire avec un 21 :D
    winCheck = () => {
        let replay = document.querySelector('[data-js-replay]');
        let elJoueurs = document.querySelectorAll('.joueur');
        let winners = [];
        let maxScore = 0;

        replay.classList.remove('hide');
        window.scrollTo(0,document.body.scrollHeight);
        
        
        for (let i = 0; i < elJoueurs.length; i++) {
            let total = parseInt(elJoueurs[i].querySelector('[data-js-total]').innerHTML);
            if(total > maxScore){
                winners = [];
                maxScore = total;
                winners.push(i);
            }
            else if(total == maxScore)
            {
                winners.push(i);
            } 
        }

        // Vérifie le nombre de gagnants simultanés qui ont été poussés dans winners[]
        for (let i = 0; i < winners.length; i++) {
            let elAffichageWin = elJoueurs[winners[i]].querySelector('[data-js-affichage]');
            let elControlsWin = elJoueurs[winners[i]].querySelector('[data-js-boutons]');
            
            elControlsWin.classList.add('disable');
            elAffichageWin.style.backgroundImage = "url('images/cash.gif')";
            elAffichageWin.classList.add('winner');
            
            // Conditions de victoire!
            if(winners.length == 4)
            {
                elAffichageWin.innerHTML = `<p class="center winnerText win" data-js-win>QUOI? IMPOSSIBLE!</p>`;
            }
            else if(winners.length == 3)
            {
                elAffichageWin.innerHTML = `<p class="center winnerText win" data-js-win>TROIS GAGNANTS!?</p>`;
            }
            else if(winners.length == 2)
            {
                elAffichageWin.innerHTML = `<p class="center winnerText win" data-js-win>DEUX GAGNANTS!</p>`;
            }
            else
            {
                elAffichageWin.innerHTML = `<p class="center winnerText win" data-js-win>GRAND GAGNANT!</p>`;
            }
            
            if(maxScore == 21){
                elAffichageWin.innerHTML = `<p class="center winnerText win" data-js-win>21!<br>LUCKY!</p>`;
                let win21text = elJoueurs[winners[i]].querySelector('[data-js-win]');
                let win21 = new Audio('music/perfect.mp3')
                win21.play();
                win21.volume = 0.5;
                win21text.classList.remove('win');
                win21text.classList.add('win21');
            }
        }
    }
}

