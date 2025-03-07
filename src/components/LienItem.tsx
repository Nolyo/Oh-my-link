import { Lien } from '../types';
import { Card, CardContent } from './ui/card';
import { ExternalLink, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface LienItemProps {
  lien: Lien;
  onModifier?: (lien: Lien) => void;
  onSupprimer?: (lien: Lien) => void;
}

export function LienItem({ lien, onModifier, onSupprimer }: LienItemProps) {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="p-3">
        <div className="flex items-start">
          <a 
            href={lien.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-start gap-2 flex-1"
          >
            {lien.logo ? (
              <img 
                src={lien.logo} 
                alt="Logo" 
                className="w-4 h-4 mt-1 flex-shrink-0 object-contain" 
                onError={(e) => {
                  // Remplace par une icône par défaut en cas d'erreur de chargement
                  e.currentTarget.src = '';
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextSibling) {
                    (e.currentTarget.nextSibling as HTMLElement).style.display = 'block';
                  }
                }}
              />
            ) : null}
            <ExternalLink 
              size={16} 
              className="mt-1 flex-shrink-0" 
              style={{ display: lien.logo ? 'none' : 'block' }} 
            />
            <div className="flex-1">
              <h3 className="font-medium text-sm">{lien.titre}</h3>
              {lien.description && (
                <p className="text-xs text-muted-foreground">{lien.description}</p>
              )}
            </div>
          </a>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                <MoreVertical size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem 
                className="cursor-pointer flex items-center gap-2"
                onClick={() => onModifier?.(lien)}
              >
                <Pencil size={14} />
                <span>Modifier</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-500 flex items-center gap-2"
                onClick={() => onSupprimer?.(lien)}
              >
                <Trash2 size={14} />
                <span>Supprimer</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}