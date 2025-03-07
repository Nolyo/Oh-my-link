import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Download, Upload } from 'lucide-react';
import { downloadExportedData, readAndImportFile } from '../hooks/useLocalStorage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from './ui/use-toast';

interface ImportExportMenuProps {
  onImportSuccess?: () => void;
}

export function ImportExportMenu({ onImportSuccess }: ImportExportMenuProps) {
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      downloadExportedData();
      toast({
        title: 'Export réussi',
        description: 'Vos données ont été exportées avec succès.',
        variant: 'default',
      });
    } catch (error) {
      console.error("Erreur lors de l'export", error);
      toast({
        title: 'Erreur',
        description: "Une erreur est survenue lors de l'export de vos données.",
        variant: 'destructive',
      });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsImporting(true);
    try {
      const success = await readAndImportFile(files[0]);
      
      if (success) {
        toast({
          title: 'Import réussi',
          description: 'Vos données ont été importées avec succès. La page va se recharger.',
          variant: 'default',
        });
        
        if (onImportSuccess) {
          setTimeout(() => {
            onImportSuccess();
          }, 1500);
        } else {
          // Actualiser la page si aucun callback n'est fourni
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } else {
        toast({
          title: 'Échec de l\'import',
          description: 'Le fichier sélectionné n\'est pas valide.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'import", error);
      toast({
        title: 'Erreur',
        description: "Une erreur est survenue lors de l'import de vos données.",
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Import / Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleExport} className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            Exporter les données
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleImportClick} className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Importer des données
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
        disabled={isImporting}
      />
    </>
  );
}
