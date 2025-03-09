/**
 * Détermine si une couleur de fond nécessite un texte foncé ou clair
 * Cette fonction est basée sur les couleurs Tailwind utilisées dans l'application
 *
 * @param bgColor La classe de couleur de fond (ex: 'bg-blue-500')
 * @returns La classe de couleur de texte appropriée ('text-gray-900' pour les fonds clairs, 'text-white' pour les fonds foncés)
 */
export function getTextColorForBackground(bgColor: string | undefined): string {
  if (!bgColor) return "text-white"; // Couleur par défaut pour fond absent

  // Liste des couleurs claires qui nécessitent un texte foncé
  const lightBackgrounds = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-red-100",
    "bg-yellow-500", // Le jaune en 500 reste assez clair
    // Autres couleurs claires si nécessaire
  ];

  // Liste des couleurs foncées qui nécessitent un texte clair
  const darkBackgrounds = [
    // Couleurs bleues
    "bg-blue-500",
    "bg-blue-600",
    "bg-blue-700",
    "bg-blue-800",
    "bg-blue-900",
    // Couleurs vertes
    "bg-green-500",
    "bg-green-600",
    "bg-green-700",
    "bg-green-800",
    "bg-green-900",
    // Couleurs violettes
    "bg-purple-500",
    "bg-purple-600",
    "bg-purple-700",
    "bg-purple-800",
    "bg-purple-900",
    // Couleurs rouges
    "bg-red-500",
    "bg-red-600",
    "bg-red-700",
    "bg-red-800",
    "bg-red-900",
    // Couleurs grises
    "bg-gray-600",
    "bg-gray-700",
    "bg-gray-800",
    "bg-gray-900",
    // Noir et ardoise
    "bg-black",
    "bg-slate-700",
    "bg-slate-800",
    "bg-slate-900",
    // Autres couleurs
    "bg-pink-500",
    "bg-pink-600",
    "bg-indigo-500",
    "bg-indigo-600",
    "bg-cyan-500",
    "bg-cyan-600",
    "bg-amber-600",
    "bg-amber-700",
    "bg-teal-500",
    "bg-teal-600",
    "bg-orange-500",
    "bg-orange-600",
    // Autres couleurs foncées si nécessaire
  ];

  // Si c'est une couleur claire, utilisez du texte foncé
  if (lightBackgrounds.some((color) => bgColor.includes(color))) {
    return "text-gray-900";
  }

  // Si c'est une couleur foncée, utilisez du texte clair
  if (darkBackgrounds.some((color) => bgColor.includes(color))) {
    return "text-white";
  }

  // Pour les couleurs intermédiaires, on peut faire une approximation simple
  // basée sur la valeur numérique de la couleur Tailwind
  const colorMatch = bgColor.match(/bg-[a-z]+-(\d+)/);
  if (colorMatch && colorMatch[1]) {
    const colorValue = parseInt(colorMatch[1], 10);
    return colorValue >= 400 ? "text-white" : "text-gray-900";
  }

  // Par défaut, utilisez du texte clair pour plus de sécurité
  return "text-white";
}
