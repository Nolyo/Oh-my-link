import { Groupe } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus, MoreVertical } from 'lucide-react';
import { LienItem } from './LienItem.tsx';

interface GroupeCardProps {
  groupe: Groupe;
  onEdit?: () => void;
  onAddLien?: () => void;
}

export function GroupeCard({ groupe, onEdit, onAddLien }: GroupeCardProps) {
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
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
            <MoreVertical size={16} />
          </Button>
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