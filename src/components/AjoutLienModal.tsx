import { useState } from "react";
import { Lien, Groupe } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { v4 as uuidv4 } from "uuid";

interface AjoutLienModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAjouter: (groupeId: string, lien: Lien) => void;
  groupeId: string | null;
  groupes: Groupe[];
}

export function AjoutLienModal({
  isOpen,
  onClose,
  onAjouter,
  groupeId,
  groupes,
}: AjoutLienModalProps) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState("");

  const groupe = groupes.find((g) => g.id === groupeId);

  // Extraire le domaine d'une URL pour construire le lien vers le favicon
  const extractDomain = (url: string): string => {
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    } catch {
      // Si l'URL n'est pas valide, retourner l'URL d'origine
      return url;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupeId || !titre.trim() || !url.trim()) return;

    const nouveauLien: Lien = {
      id: uuidv4(),
      titre: titre.trim(),
      url: url.trim(),
    };

    if (description.trim()) {
      nouveauLien.description = description.trim();
    }

    // Icône par défaut en SVG pour les cas où le favicon n'existe pas (optimisée pour le mode dark)
    const defaultIcon =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1saW5rIj48cGF0aCBkPSJNMTAgMTNhNSA1IDAgMCAwIDcuNSAwTTkgMTFoMTAiLz48Y2lyY2xlIGN4PSI5IiBjeT0iMTIiIHI9IjIiLz48Y2lyY2xlIGN4PSIxNSIgY3k9IjEyIiByPSIyIi8+PC9zdmc+Jzs=";

    if (logo.trim()) {
      // Utiliser le logo spécifié par l'utilisateur
      nouveauLien.logo = logo.trim();
      // Ajouter le lien directement quand un logo personnalisé est fourni
      onAjouter(groupeId, nouveauLien);
      resetForm();
    } else {
      // Si aucun logo n'est fourni, vérifier d'abord si le favicon existe
      const domain = extractDomain(url.trim());
      const faviconUrl = `${domain}/favicon.ico`;

      // Vérifier si le favicon existe avant d'ajouter le lien
      const img = new Image();

      img.onload = () => {
        // Le favicon existe, l'utiliser
        nouveauLien.logo = faviconUrl;
        onAjouter(groupeId, nouveauLien);
        resetForm();
      };

      img.onerror = () => {
        // Le favicon n'existe pas, utiliser l'icône par défaut
        nouveauLien.logo = defaultIcon;
        onAjouter(groupeId, nouveauLien);
        resetForm();
      };

      // Démarrer le chargement de l'image pour vérification
      img.src = faviconUrl;
    }
  };

  const resetForm = () => {
    setTitre("");
    setDescription("");
    setUrl("");
    setLogo("");
    onClose();
  };

  if (!groupeId || !groupe) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Ajouter un lien au groupe {groupe.titre}</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau lien à ce groupe.
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
              <Label htmlFor="url" className="text-right">
                URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="col-span-3"
                placeholder="https://exemple.com"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="Description du lien (optionnel)"
                rows={3}
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
