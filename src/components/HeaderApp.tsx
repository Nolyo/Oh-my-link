import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';

interface HeaderAppProps {
  onAjoutGroupe: () => void;
}

export function HeaderApp({ onAjoutGroupe }: HeaderAppProps) {
  return (
    <header className="p-4 border-b flex justify-between items-center">
      <h1 className="text-2xl font-bold">Mes URLs Importantes</h1>
      <Button onClick={onAjoutGroupe} variant="outline" className="flex items-center gap-2">
        <PlusCircle size={16} />
        Ajouter un groupe
      </Button>
    </header>
  );
} 