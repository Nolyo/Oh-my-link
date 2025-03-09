import {
  exportLocalStorageData,
  importLocalStorageData,
  readAndImportFile,
  downloadExportedData,
  ExportedData,
} from "../hooks/useLocalStorage";

// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
    length: 0,
    get lengthProp() {
      return Object.keys(store).length;
    },
  };
})();

// Mock des méthodes globales (URL.createObjectURL, etc.)
global.URL.createObjectURL = jest.fn(() => "mocked-url");
global.URL.revokeObjectURL = jest.fn();

// Mock de document.createElement et de ses méthodes
document.createElement = jest.fn().mockImplementation((tag) => {
  if (tag === "a") {
    return {
      href: "",
      download: "",
      click: jest.fn(),
    };
  }
  return document.createElement(tag);
});

document.body.appendChild = jest.fn();
document.body.removeChild = jest.fn();

describe("Fonctions de manipulation de localStorage", () => {
  beforeEach(() => {
    // Configuration du mock de localStorage avant chaque test
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    localStorageMock.clear();

    // Reset des compteurs d'appels des mocks
    jest.clearAllMocks();

    // Mise à jour de la propriété length
    Object.defineProperty(localStorageMock, "length", {
      get: () => localStorageMock.lengthProp,
    });
  });

  describe("exportLocalStorageData", () => {
    it("devrait exporter les données du localStorage au format JSON", () => {
      // Arrangement
      localStorageMock.setItem(
        "test1",
        JSON.stringify({ id: 1, name: "Test 1" })
      );
      localStorageMock.setItem(
        "test2",
        JSON.stringify({ id: 2, name: "Test 2" })
      );

      // Action
      const result = exportLocalStorageData();

      // Assertion
      const parsed = JSON.parse(result) as ExportedData;
      expect(parsed).toEqual({
        test1: { id: 1, name: "Test 1" },
        test2: { id: 2, name: "Test 2" },
      });
    });

    it("devrait gérer les erreurs lors du parsing des valeurs", () => {
      // Arrangement
      console.error = jest.fn(); // Mock de console.error
      localStorageMock.getItem = jest.fn().mockImplementation((key) => {
        if (key === "test1") return "invalid-json";
        return null;
      });

      // Mock pour simuler des clés existantes
      localStorageMock.key = jest
        .fn()
        .mockImplementation((i) => (i === 0 ? "test1" : null));
      Object.defineProperty(localStorageMock, "length", { value: 1 });

      // Action
      const result = exportLocalStorageData();

      // Assertion
      expect(result).toBe("{}");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("downloadExportedData", () => {
    it("devrait télécharger les données exportées dans un fichier", () => {
      // Arrangement
      jest.useFakeTimers();
      localStorageMock.setItem(
        "test1",
        JSON.stringify({ id: 1, name: "Test 1" })
      );

      // Action
      downloadExportedData("test-export.json");

      // Assertion
      expect(global.URL.createObjectURL).toHaveBeenCalled();
      expect(document.createElement).toHaveBeenCalledWith("a");
      expect(document.body.appendChild).toHaveBeenCalled();

      // Vérification du nettoyage
      jest.advanceTimersByTime(100);
      expect(document.body.removeChild).toHaveBeenCalled();
      expect(global.URL.revokeObjectURL).toHaveBeenCalled();

      // Restauration des timers
      jest.useRealTimers();
    });

    it("devrait utiliser le nom de fichier par défaut si aucun nom n'est fourni", () => {
      // Arrangement
      const mockAnchor = { href: "", download: "", click: jest.fn() };
      (document.createElement as jest.Mock).mockReturnValue(mockAnchor);

      // Action
      downloadExportedData();

      // Assertion
      expect(mockAnchor.download).toBe("oh-my-link-export.json");
    });
  });

  describe("importLocalStorageData", () => {
    it("devrait importer correctement les données JSON dans localStorage", () => {
      // Arrangement
      const jsonData = JSON.stringify({
        test1: { id: 1, name: "Test 1" },
        test2: { id: 2, name: "Test 2" },
      });

      // Action
      const result = importLocalStorageData(jsonData);

      // Assertion
      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "test1",
        JSON.stringify({ id: 1, name: "Test 1" })
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "test2",
        JSON.stringify({ id: 2, name: "Test 2" })
      );
    });

    it("devrait retourner false en cas d'erreur lors du parsing", () => {
      // Arrangement
      console.error = jest.fn(); // Mock de console.error
      const invalidJson = "{invalid-json}";

      // Action
      const result = importLocalStorageData(invalidJson);

      // Assertion
      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe("readAndImportFile", () => {
    it("devrait lire un fichier et importer son contenu", async () => {
      // Arrangement
      const mockFile = new File(['{"test": {"value": 42}}'], "test.json", {
        type: "application/json",
      });

      // Mock de FileReader
      interface MockFileReader {
        onload: ((event: { target: { result: string } }) => void) | null;
        onerror: ((error: Error) => void) | null;
        readAsText: jest.Mock;
      }

      const mockFileReader: MockFileReader = {
        onload: null,
        onerror: null,
        readAsText: jest.fn(function (this: MockFileReader) {
          setTimeout(() => {
            if (this.onload) {
              this.onload({ target: { result: '{"test": {"value": 42}}' } });
            }
          }, 0);
        }),
      };

      global.FileReader = jest.fn(
        () => mockFileReader
      ) as unknown as typeof FileReader;

      // Action
      const result = readAndImportFile(mockFile);

      // Assertion
      await expect(result).resolves.toBe(true);
      expect(mockFileReader.readAsText).toHaveBeenCalledWith(mockFile);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "test",
        JSON.stringify({ value: 42 })
      );
    });

    it("devrait gérer les erreurs de lecture de fichier", async () => {
      // Arrangement
      const mockFile = new File([""], "test.json", {
        type: "application/json",
      });

      // Mock de FileReader avec erreur
      interface MockFileReader {
        onload: ((event: { target: { result: string } }) => void) | null;
        onerror: ((error: Error) => void) | null;
        readAsText: jest.Mock;
      }

      const mockFileReader: MockFileReader = {
        onload: null,
        onerror: null,
        readAsText: jest.fn(function (this: MockFileReader) {
          setTimeout(() => {
            if (this.onerror) {
              this.onerror(new Error("Erreur de lecture"));
            }
          }, 0);
        }),
      };

      global.FileReader = jest.fn(
        () => mockFileReader
      ) as unknown as typeof FileReader;

      // Action
      const result = readAndImportFile(mockFile);

      // Assertion
      await expect(result).resolves.toBe(false);
    });
  });
});
