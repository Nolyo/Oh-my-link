import { Groupe } from '../types';
import { GroupeCard } from './GroupeCard';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';

interface ListeGroupesProps {
  groupes: Groupe[];
  onUpdateGroupes: (groupes: Groupe[]) => void;
}

export function ListeGroupes({ groupes, onUpdateGroupes }: ListeGroupesProps) {
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
                    <GroupeCard groupe={groupe} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
} 