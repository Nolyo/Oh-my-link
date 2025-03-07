import { Groupe } from '../types';
import { GroupeCard } from './GroupeCard';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';
import { useState } from 'react';
import { ModifierGroupeModal } from './ModifierGroupeModal';
import { ConfirmDialog } from './ConfirmDialog';

interface ListeGroupesProps {
  groupes: Groupe[];
  onUpdateGroupes: (groupes: Groupe[]) => void;
  onModifierGroupe: (id: string, updates: Partial<Groupe>) => void;
  onSupprimerGroupe: (id: string) => void;
  onAjouterLien?: (groupeId: string) => void;
}

export function ListeGroupes({ 
  groupes, 
  onUpdateGroupes,
  onModifierGroupe,
  onSupprimerGroupe,
  onAjouterLien
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

  if (groupes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Aucun groupe créé. Créez votre premier groupe pour commencer.</p>
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
              {groupes.sort((a, b) => a.ordre - b.ordre).map((groupe, index) => (
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