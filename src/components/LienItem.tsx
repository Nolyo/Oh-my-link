import { Lien } from '../types';
import { Card, CardContent } from './ui/card';
import { ExternalLink } from 'lucide-react';

interface LienItemProps {
  lien: Lien;
  onEdit?: () => void;
}

export function LienItem({ lien, onEdit }: LienItemProps) {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="p-3">
        <a 
          href={lien.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-start gap-2"
        >
          <ExternalLink size={16} className="mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-medium text-sm">{lien.titre}</h3>
            {lien.description && (
              <p className="text-xs text-muted-foreground">{lien.description}</p>
            )}
          </div>
        </a>
      </CardContent>
    </Card>
  );
} 