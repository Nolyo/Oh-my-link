import { useState, useEffect } from 'react'
import { Groupe } from '../types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

interface ModifierGroupeModalProps {
  isOpen: boolean
  onClose: () => void
  onModifier: (id: string, updates: Partial<Groupe>) => void
  groupe: Groupe | null
}

export function ModifierGroupeModal({ 
  isOpen, 
  onClose, 
  onModifier, 
  groupe 
}: ModifierGroupeModalProps) {
  const [titre, setTitre] = useState('')
  const [logo, setLogo] = useState('')

  useEffect(() => {
    if (groupe) {
      setTitre(groupe.titre)
      setLogo(groupe.logo || '')
    }
  }, [groupe])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!groupe || !titre.trim()) return

    const updates: Partial<Groupe> = {
      titre: titre.trim()
    }
    
    if (logo.trim()) {
      updates.logo = logo.trim()
    } else if (groupe.logo) {
      // On supprime le logo si le champ est vide
      updates.logo = undefined
    }
    
    onModifier(groupe.id, updates)
    onClose()
  }

  const resetForm = () => {
    if (groupe) {
      setTitre(groupe.titre)
      setLogo(groupe.logo || '')
    }
    onClose()
  }

  if (!groupe) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifier le groupe</DialogTitle>
            <DialogDescription>
              Modifiez les informations du groupe.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="titre" className="text-right">
                Titre <span className="text-red-500">*</span>
              </Label>
              <Input
                id="titre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="logo" className="text-right">
                Logo URL
              </Label>
              <Input
                id="logo"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="col-span-3"
                placeholder="https://exemple.com/logo.png"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={resetForm}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
