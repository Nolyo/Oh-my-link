import { Groupe } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { LienItem } from './LienItem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface GroupeCardProps {
  groupe: Groupe;
  onAddLien?: () => void;
  onModifier?: (groupe: Groupe) => void;
  onSupprimer?: (groupe: Groupe) => void;
}

export function GroupeCard({ groupe, onAddLien, onModifier, onSupprimer }: GroupeCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          {groupe.logo && (
            <img src={groupe.logo} alt={groupe.titre} className="w-6 h-6 object-contain" />
          )}
          <CardTitle>{groupe.titre}</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onAddLien}>
            <Plus size={16} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                className="cursor-pointer flex items-center gap-2"
                onClick={() => onModifier?.(groupe)}
              >
                <Pencil size={14} />
                <span>Modifier</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-500 flex items-center gap-2"
                onClick={() => onSupprimer?.(groupe)}
              >
                <Trash2 size={14} />
                <span>Supprimer</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {groupe.liens.length === 0 ? (
          <p className="text-sm text-gray-500">Aucun lien dans ce groupe</p>
        ) : (
          <div className="space-y-2">
            {groupe.liens.map((lien) => (
              <LienItem key={lien.id} lien={lien} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}