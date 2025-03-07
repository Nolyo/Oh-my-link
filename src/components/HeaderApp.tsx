import { Button } from './ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from './ui/input';

interface HeaderAppProps {
  onAjoutGroupe: () => void;
  onSearch: (term: string) => void;
  searchTerm: string;
}

export function HeaderApp({ onAjoutGroupe, onSearch, searchTerm }: HeaderAppProps) {
  return (
    <header className="p-4 border-b">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Oh My Links !</h1>
        
        <div className="flex w-full md:w-auto items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <Button onClick={onAjoutGroupe} variant="outline" className="flex items-center gap-2 whitespace-nowrap">
            <PlusCircle size={16} />
            Ajouter un groupe
          </Button>
        </div>
      </div>
    </header>
  );
}