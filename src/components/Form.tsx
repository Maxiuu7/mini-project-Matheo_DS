import { objectifs } from "../data";

// props du formulaire
type FormProps = {
    selectedObj: string[];
    setSelectedObj: (val: string[]) => void;
    poidsMin: number;
    setPoidsMin: (val: number) => void;
    poidsMax: number;
    setPoidsMax: (val: number) => void;
    nbLignes: number;
    setNbLignes: (val: number) => void;
};

// composant formulaire pour les parametres
function Form({ selectedObj, setSelectedObj, poidsMin, setPoidsMin, poidsMax, setPoidsMax, nbLignes, setNbLignes }: FormProps) {

    // gere le toggle des checkboxes
    function handleCheck(nom: string) {
        if (selectedObj.includes(nom)) {
            // on enleve l'objectif
            setSelectedObj(selectedObj.filter((o) => o !== nom));
        } else {
            // on ajoute
            setSelectedObj([...selectedObj, nom]);
        }
    }

    return (
        <div className="form-container">
            <h2>Paramètres</h2>

            {/* checkboxes objectifs */}
            <div className="form-group">
                <label>Objectifs :</label>
                <div className="checkboxes">
                    {objectifs.map((obj) => (
                        <label key={obj.nom} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={selectedObj.includes(obj.nom)}
                                onChange={() => handleCheck(obj.nom)}
                            />
                            {obj.nom}
                        </label>
                    ))}
                </div>
            </div>

            {/* poids min */}
            <div className="form-group">
                <label>Poids minimum (kg) :</label>
                <input
                    type="number"
                    value={poidsMin}
                    onChange={(e) => setPoidsMin(Number(e.target.value))}
                    min="1"
                />
            </div>

            {/* poid max */}
            <div className="form-group">
                <label>Poids maximum (kg) :</label>
                <input
                    type="number"
                    value={poidsMax}
                    onChange={(e) => setPoidsMax(Number(e.target.value))}
                    min="1"
                />
            </div>

            {/* nombre de ligne */}
            <div className="form-group">
                <label>Nombre de lignes :</label>
                <input
                    type="number"
                    value={nbLignes}
                    onChange={(e) => setNbLignes(Number(e.target.value))}
                    min="2"
                />
            </div>

            {/* validation basique */}
            {poidsMin >= poidsMax && (
                <p className="erreur">Le poids minimum doit etre inférieur au poids maximum</p>
            )}
            {nbLignes < 2 && (
                <p className="erreur">Il faut au moins 2 lignes</p>
            )}
        </div>
    );
}

export default Form;
