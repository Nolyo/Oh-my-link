import './index.css'
import { useState } from 'react'
import { ThemeProvider } from './components/theme-provider'
import { ListeGroupes } from './components/ListeGroupes'
import { HeaderApp } from './components/HeaderApp'
import { AjoutGroupeModal } from './components/AjoutGroupeModal'
import { useLocalStorage } from './hooks/useLocalStorage'
import { AppData, Groupe } from './types'
import { v4 as uuidv4 } from 'uuid'

const initialData: AppData = {
  groupes: []
}


function App() {
  const [data, setData] = useLocalStorage<AppData>('bookmark-app-data', initialData)
  const [isAjoutGroupeOpen, setIsAjoutGroupeOpen] = useState(false)
  const [groupeIdPourAjoutLien, setGroupeIdPourAjoutLien] = useState<string | null>(null)
  
  const handleAjouterGroupe = (groupe: Omit<Groupe, 'id' | 'ordre'>) => {
    const nouvelOrdre = data.groupes.length > 0 
      ? Math.max(...data.groupes.map(g => g.ordre)) + 1 
      : 0
      
    const nouveauGroupe: Groupe = {
      id: uuidv4(),
      ordre: nouvelOrdre,
      ...groupe
    }
    
    setData({
      ...data,
      groupes: [...data.groupes, nouveauGroupe]
    })
  }
  
  const handleModifierGroupe = (id: string, updates: Partial<Groupe>) => {
    const groupesModifies = data.groupes.map(groupe => 
      groupe.id === id 
        ? { ...groupe, ...updates } 
        : groupe
    )
    
    setData({
      ...data,
      groupes: groupesModifies
    })
  }
  
  const handleSupprimerGroupe = (id: string) => {
    const groupesFiltres = data.groupes.filter(groupe => groupe.id !== id)
    
    setData({
      ...data,
      groupes: groupesFiltres
    })
  }
  
  const handleAjouterLien = (groupeId: string) => {
    // Pour l'instant, on enregistre juste l'ID du groupe pour l'implémentation future
    setGroupeIdPourAjoutLien(groupeId)
    // Cette fonction sera complétée plus tard pour ouvrir une modal d'ajout de lien
    console.log(`Ajouter un lien au groupe: ${groupeId}`)
  }
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex flex-col h-screen'>
        <HeaderApp onAjoutGroupe={() => setIsAjoutGroupeOpen(true)} />
        
        <main className='flex-1 p-4 overflow-auto'>
          <ListeGroupes 
            groupes={data.groupes} 
            onUpdateGroupes={(nouveauxGroupes: Groupe[]) => setData({...data, groupes: nouveauxGroupes})}
            onModifierGroupe={handleModifierGroupe}
            onSupprimerGroupe={handleSupprimerGroupe}
            onAjouterLien={handleAjouterLien}
          />
        </main>
        
        {/* Les modals */}
        <AjoutGroupeModal
          isOpen={isAjoutGroupeOpen}
          onClose={() => setIsAjoutGroupeOpen(false)}
          onAjouter={handleAjouterGroupe}
          groupes={data.groupes}
        />
        
      </div>
    </ThemeProvider>
  )
}

export default App
