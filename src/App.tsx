import { useState } from "react";
import Form from "./components/Form";
import TableauProteines from "./components/TableauProteines";
import "./App.css";

// composant principal qui gere tout le state
function App() {
    const [selectedObj, setSelectedObj] = useState<string[]>([]);
    const [poidsMin, setPoidsMin] = useState<number>(50);
    const [poidsMax, setPoidsMax] = useState<number>(100);
    const [nbLignes, setNbLignes] = useState<number>(6);

    // calcul des poids a afficher
    // on fait une liste de poids entre min et max repartis sur nbLignes
    function genererPoids(): number[] {
        if (poidsMin >= poidsMax || nbLignes < 2) return [];

        const res: number[] = [];
        const step = (poidsMax - poidsMin) / (nbLignes - 1);

        for (let i = 0; i < nbLignes; i++) {
            // on arrondi pour pas avoir des virgules bizarre
            res.push(Math.round(poidsMin + step * i));
        }
        return res;
    }

    const poidsListe = genererPoids();

    return (
        <div className="app">
            <h1>Générateur de besoins en protéines</h1>
            <Form
                selectedObj={selectedObj}
                setSelectedObj={setSelectedObj}
                poidsMin={poidsMin}
                setPoidsMin={setPoidsMin}
                poidsMax={poidsMax}
                setPoidsMax={setPoidsMax}
                nbLignes={nbLignes}
                setNbLignes={setNbLignes}
            />
            <TableauProteines selectedObj={selectedObj} poidsListe={poidsListe} />
        </div>
    );
}

export default App;
