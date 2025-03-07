import { useState, useEffect } from 'react';

// Type pour les données exportées
export interface ExportedData {
  [key: string]: unknown;
}

// Fonction pour exporter toutes les données du localStorage
export function exportLocalStorageData(): string {
  const data: ExportedData = {};
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          data[key] = JSON.parse(value);
        }
      } catch (error) {
        console.error(`Erreur lors de l'export de la clé ${key}:`, error);
      }
    }
  }
  
  return JSON.stringify(data);
}

// Fonction pour télécharger les données exportées sous forme de fichier
export function downloadExportedData(fileName: string = 'oh-my-link-export.json'): void {
  const data = exportLocalStorageData();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  
  // Nettoyage
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

// Fonction pour importer des données dans le localStorage
export function importLocalStorageData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData) as ExportedData;
    
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
    
    return true;
  } catch (error) {
    console.error("Erreur lors de l'import des données:", error);
    return false;
  }
}

// Fonction pour lire un fichier et importer son contenu
export function readAndImportFile(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        const success = importLocalStorageData(event.target.result);
        resolve(success);
      } else {
        resolve(false);
      }
    };
    
    reader.onerror = () => resolve(false);
    reader.readAsText(file);
  });
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
} 