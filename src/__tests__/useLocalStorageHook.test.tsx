import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  };
})();

describe("useLocalStorage hook", () => {
  beforeEach(() => {
    // Configuration du mock de localStorage avant chaque test
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it("devrait retourner la valeur initiale si aucune donnée n'est stockée", () => {
    // Arrangement
    const initialValue = { name: "Test initial" };

    // Action
    const { result } = renderHook(() =>
      useLocalStorage("testKey", initialValue)
    );

    // Assertion
    expect(result.current[0]).toEqual(initialValue);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("testKey");
  });

  it("devrait retourner la valeur stockée si elle existe", () => {
    // Arrangement
    const storedValue = { name: "Test stored" };
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(storedValue));

    // Action
    const { result } = renderHook(() =>
      useLocalStorage("testKey", { name: "default" })
    );

    // Assertion
    expect(result.current[0]).toEqual(storedValue);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("testKey");
  });

  it("devrait mettre à jour la valeur et la sauvegarder dans localStorage", () => {
    // Arrangement
    const { result } = renderHook(() =>
      useLocalStorage("testKey", { name: "initial" })
    );
    const newValue = { name: "updated" };

    // Action
    act(() => {
      result.current[1](newValue);
    });

    // Assertion
    expect(result.current[0]).toEqual(newValue);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify(newValue)
    );
  });

  it("devrait gérer les erreurs lors de la lecture depuis localStorage", () => {
    // Arrangement
    console.error = jest.fn();
    localStorageMock.getItem.mockImplementationOnce(() => {
      throw new Error("Erreur de lecture");
    });

    // Action
    const { result } = renderHook(() =>
      useLocalStorage("testKey", { name: "fallback" })
    );

    // Assertion
    expect(result.current[0]).toEqual({ name: "fallback" });
    expect(console.error).toHaveBeenCalled();
  });

  it("devrait gérer les erreurs lors de l'écriture dans localStorage", () => {
    // Arrangement
    console.error = jest.fn();
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error("Erreur d'écriture");
    });

    const { result } = renderHook(() =>
      useLocalStorage("testKey", { name: "initial" })
    );

    // Action
    act(() => {
      result.current[1]({ name: "should fail to write" });
    });

    // Assertion
    expect(console.error).toHaveBeenCalled();
  });
});
