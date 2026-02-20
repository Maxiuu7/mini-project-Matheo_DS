// les objectifs et leur coef en g/kg/jour
// j'ai mis les valeurs du sujet directment

// type pour un objectif
export type Objectif = {
    nom: string;
    min: number;
    max: number;
};

export const objectifs: Objectif[] = [
    { nom: "Sédentaire", min: 0.8, max: 1.0 },
    { nom: "Endurance", min: 1.2, max: 1.6 },
    { nom: "Conservation de la masse musculaire", min: 1.6, max: 1.8 },
    { nom: "Prise de masse musculaire", min: 1.8, max: 2.2 },
];
