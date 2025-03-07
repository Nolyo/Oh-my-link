import { useState, useEffect } from 'react'
import { Lien } from '../types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

interface ModifierLienModalProps {
  isOpen: boolean
  onClose: () => void
  onModifier: (id: string, updates: Partial<Lien>) => void
  lien: Lien | null
}

export function ModifierLienModal({ 
  isOpen, 
  onClose, 
  onModifier, 
  lien 
}: ModifierLienModalProps) {
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  
  useEffect(() => {
    if (lien) {
      setTitre(lien.titre)
      setDescription(lien.description || '')
      setUrl(lien.url)
    }
  }, [lien])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!lien || !titre.trim() || !url.trim()) return

    const updates: Partial<Lien> = {
      titre: titre.trim(),
      url: url.trim(),
    }
    
    if (description.trim()) {
      updates.description = description.trim()
    } else {
      updates.description = undefined
    }
    
    onModifier(lien.id, updates)
    onClose()
  }

  if (!lien) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifier un lien</DialogTitle>
            <DialogDescription>
              Modifiez les détails du lien.
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
              <Label htmlFor="url" className="text-right">
                URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="col-span-3"
                placeholder="https://exemple.com"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="Description du lien (optionnel)"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
