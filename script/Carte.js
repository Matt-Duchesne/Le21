// Classe qui recoit la velur initiale de la carte et la converti à la valeur nécessaire
// rien de plus, rien de moins.
class Carte {
    constructor(valeur) {
        // Définition des propriétés
        this._valeur = valeur;
        this._vraieValeur;

        if(valeur == 11 || valeur == 12 || valeur == 13){
            this._vraieValeur = 10;
        }
        else if(this._valeur == 1)
        {
            this._vraieValeur = 11;
        }
        else
        {
            this._vraieValeur = valeur;
        }
    }
}



