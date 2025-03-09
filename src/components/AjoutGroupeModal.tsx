import { useState } from "react";
import { Groupe } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ColorSelector } from "./ui/ColorSelector";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface AjoutGroupeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAjouter: (groupe: Omit<Groupe, "id" | "ordre">) => void;
}

export function AjoutGroupeModal({
  isOpen,
  onClose,
  onAjouter,
}: AjoutGroupeModalProps) {
  const [titre, setTitre] = useState("");
  const [logo, setLogo] = useState("");
  const [couleur, setCouleur] = useState("bg-slate-700");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titre.trim()) return;

    const newGroupe: Omit<Groupe, "id" | "ordre"> = {
      titre: titre.trim(),
      liens: [],
    };

    if (logo.trim()) {
      newGroupe.logo = logo.trim();
    }

    if (couleur) {
      newGroupe.couleur = couleur;
    }

    onAjouter(newGroupe);
    resetForm();
  };

  const resetForm = () => {
    setTitre("");
    setLogo("");
    setCouleur("bg-slate-700");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau groupe</DialogTitle>
            <DialogDescription>
              Créez un groupe pour organiser vos liens.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="titre" className="text-right">
                Titre <span className="text-red-500">*</span>
              </Label>
              <Input
                id="titre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="logo" className="text-right">
                Logo URL
              </Label>
              <Input
                id="logo"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="col-span-3"
                placeholder="https://exemple.com/logo.png"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="couleur" className="text-right">
                Couleur
              </Label>
              <div className="col-span-3">
                <ColorSelector value={couleur} onChange={setCouleur} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={resetForm}>
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
