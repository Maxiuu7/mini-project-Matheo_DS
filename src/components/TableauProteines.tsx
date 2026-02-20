import { objectifs } from "../data";

// props du tableau
type TableauProteinesProps = {
    selectedObj: string[];
    poidsListe: number[];
};

// composant qui genere le tableau dynamiquement
function TableauProteines({ selectedObj, poidsListe }: TableauProteinesProps) {
    // on recupere que les objectifs selectionnés
    const objFiltres = objectifs.filter((o) => selectedObj.includes(o.nom));

    // fonction pour exporter en csv
    function exportCSV() {
        let csv = "";

        // d'abord les entetes
        csv += "Poids (kg);";
        for (let i = 0; i < objFiltres.length; i++) {
            csv += objFiltres[i].nom;
            if (i < objFiltres.length - 1) csv += ";";
        }
        csv += "\n";

        // ensuite les lignes de donées
        for (let j = 0; j < poidsListe.length; j++) {
            const poids = poidsListe[j];
            csv += poids + ";";

            for (let i = 0; i < objFiltres.length; i++) {
                const min = Math.round(poids * objFiltres[i].min);
                const max = Math.round(poids * objFiltres[i].max);
                csv += min + " - " + max + " g/jour";
                if (i < objFiltres.length - 1) csv += ";";
            }
            csv += "\n";
        }

        // on telecharge le fichier
        // j'ai trouvé ca sur stackoverflow en gros ca crée un lien invisible et on clique dessus
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const lien = document.createElement("a");
        lien.href = url;
        lien.download = "proteines.csv";
        lien.click();
    }

    // si rien est selectionné on affiche rien
    if (objFiltres.length === 0 || poidsListe.length === 0) {
        return <p className="info">Sélectionnez au moins un objectif pour afficher le tableau.</p>;
    }

    return (
        <div className="tableau-container">
            <h2>Besoins journaliers en protéines</h2>
            <table>
                <thead>
                    <tr>
                        <th>Poids (kg)</th>
                        {/* une colone par objectif */}
                        {objFiltres.map((obj) => (
                            <th key={obj.nom}>{obj.nom}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {poidsListe.map((poids) => (
                        <tr key={poids}>
                            <td className="poids-cell">{poids}</td>
                            {objFiltres.map((obj) => {
                                // calcul dynamique des besoins
                                const besoinMin = Math.round(poids * obj.min);
                                const besoinMax = Math.round(poids * obj.max);
                                return (
                                    <td key={obj.nom}>
                                        {besoinMin} – {besoinMax} g/jour
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* bouton export */}
            <button className="btn-export" onClick={exportCSV}>
                Exporter en CSV
            </button>
        </div>
    );
}

export default TableauProteines;

