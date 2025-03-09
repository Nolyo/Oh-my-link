export interface Lien {
  id: string;
  titre: string;
  description?: string;
  url: string;
  logo?: string;
}

export interface Groupe {
  id: string;
  titre: string;
  logo?: string;
  couleur?: string;
  ordre: number;
  liens: Lien[];
}

export type AppData = {
  groupes: Groupe[];
}; 