import { Groupe, Lien } from '../types';
import { GroupeCard } from './GroupeCard';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';
import { useState, useMemo } from 'react';
import { ModifierGroupeModal } from './ModifierGroupeModal';
import { ConfirmDialog } from './ConfirmDialog';

interface ListeGroupesProps {
  groupes: Groupe[];
  onUpdateGroupes: (groupes: Groupe[]) => void;
  onModifierGroupe: (id: string, updates: Partial<Groupe>) => void;
  onSupprimerGroupe: (id: string) => void;
  onAjouterLien?: (groupeId: string) => void;
  onModifierLien?: (groupeId: string, lienId: string, updates: Partial<Lien>) => void;
  onSupprimerLien?: (groupeId: string, lienId: string) => void;
  searchTerm?: string;
}

export function ListeGroupes({ 
  groupes, 
  onUpdateGroupes,
  onModifierGroupe,
  onSupprimerGroupe,
  onAjouterLien,
  onModifierLien,
  onSupprimerLien,
  searchTerm = ''
}: ListeGroupesProps) {
  const [groupeAModifier, setGroupeAModifier] = useState<Groupe | null>(null);
  const [groupeASupprimer, setGroupeASupprimer] = useState<Groupe | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(groupes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Mise à jour des ordres
    const updatedItems = items.map((item, index) => ({
      ...item,
      ordre: index
    }));

    onUpdateGroupes(updatedItems);
  };

  const filteredGroupes = useMemo(() => {
    if (!searchTerm) return groupes;
    
    const term = searchTerm.toLowerCase();
    
    return groupes.map(groupe => {
      // Vérifier si le titre du groupe correspond
      const groupeMatches = groupe.titre.toLowerCase().includes(term);
      
      // Filtrer les liens qui correspondent
      const filteredLiens = (groupe.liens || []).filter(lien => 
        lien.titre.toLowerCase().includes(term) || 
        lien.url.toLowerCase().includes(term) || 
        (lien.description || '').toLowerCase().includes(term)
      );
      
      // Si le groupe correspond ou s'il contient des liens qui correspondent
      if (groupeMatches || filteredLiens.length > 0) {
        return {
          ...groupe,
          // Si le groupe correspond, afficher tous les liens
          // Sinon, n'afficher que les liens qui correspondent
          liens: groupeMatches ? groupe.liens : filteredLiens,
          // Flag pour indiquer si le groupe lui-même correspond à la recherche
          // Utilisé pour l'affichage visuel
          _matchesSearch: groupeMatches
        };
      }
      
      // Ne pas inclure les groupes qui ne correspondent pas
      return null;
    }).filter(Boolean) as Groupe[];
  }, [groupes, searchTerm]);

  if (groupes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Aucun groupe créé. Créez votre premier groupe pour commencer.</p>
      </div>
    );
  }
  
  if (filteredGroupes.length === 0 && searchTerm) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Aucun résultat pour "{searchTerm}".</p>
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="groupes">
          {(provided: DroppableProvided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredGroupes.sort((a, b) => a.ordre - b.ordre).map((groupe, index) => (
                <Draggable key={groupe.id} draggableId={groupe.id} index={index}>
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <GroupeCard 
                        groupe={groupe}
                        onModifier={(g) => setGroupeAModifier(g)}
                        onSupprimer={(g) => setGroupeASupprimer(g)}
                        onAddLien={() => onAjouterLien?.(groupe.id)}
                        onModifierLien={onModifierLien}
                        onSupprimerLien={onSupprimerLien}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Modal de modification */}
      <ModifierGroupeModal
        isOpen={groupeAModifier !== null}
        onClose={() => setGroupeAModifier(null)}
        onModifier={onModifierGroupe}
        groupe={groupeAModifier}
      />

      {/* Dialog de confirmation de suppression */}
      <ConfirmDialog
        isOpen={groupeASupprimer !== null}
        onClose={() => setGroupeASupprimer(null)}
        onConfirm={() => {
          if (groupeASupprimer) {
            onSupprimerGroupe(groupeASupprimer.id);
          }
        }}
        title="Supprimer le groupe"
        description={`Êtes-vous sûr de vouloir supprimer le groupe "${groupeASupprimer?.titre}" ? Cette action ne peut pas être annulée et tous les liens associés seront également supprimés.`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="destructive"
      />
    </>
  );
}