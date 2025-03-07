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
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex flex-col h-screen'>
        <HeaderApp onAjoutGroupe={() => setIsAjoutGroupeOpen(true)} />
        
        <main className='flex-1 p-4 overflow-auto'>
          <ListeGroupes 
            groupes={data.groupes} 
            onUpdateGroupes={(nouveauxGroupes: Groupe[]) => setData({...data, groupes: nouveauxGroupes})}
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
