# Guide d'utilisation de Oh My Links !

## Résumé rapide

**Oh My Links** est une application web qui vous permet d'organiser vos liens web préférés en groupes personnalisables. 

**Fonctionnalités principales :**
- Création de groupes thématiques pour organiser vos liens
- Ajout de liens avec titre, description et URL
- Recherche rapide parmi tous vos liens
- Réorganisation des groupes par glisser-déposer
- Import/Export des données pour sauvegarde ou transfert

L'application stocke toutes vos données localement dans votre navigateur, ce qui signifie qu'aucune information n'est envoyée à un serveur externe - vous conservez le contrôle total de vos données.

## Guide complet

### 1. Présentation générale

Oh My Links est une application web de gestion de favoris qui vous permet d'organiser vos liens internet dans une interface conviviale et visuelle. Contrairement aux favoris classiques des navigateurs, Oh My Links offre une organisation plus flexible et personnalisable.

### 2. Structure de l'application

L'application s'organise autour de deux concepts principaux :

- **Groupes** : Ce sont des collections thématiques qui peuvent contenir plusieurs liens. Chaque groupe possède un titre, et peut optionnellement avoir un logo et une couleur personnalisée.
  
- **Liens** : Ce sont les éléments individuels stockés dans chaque groupe. Un lien comprend obligatoirement un titre et une URL, et peut également avoir une description et un logo.

### 3. Fonctionnalités détaillées

#### Création de groupes

1. Cliquez sur le bouton "Ajouter un groupe" dans la barre supérieure
2. Renseignez le titre du groupe (obligatoire)
3. Ajoutez optionnellement un logo et une couleur pour personnaliser le groupe
4. Validez pour créer le groupe

#### Gestion des groupes

- **Modifier un groupe** : Cliquez sur l'icône de modification (crayon) dans l'en-tête du groupe pour changer son titre, logo ou couleur
- **Supprimer un groupe** : Cliquez sur l'icône de suppression (poubelle) dans l'en-tête du groupe, puis confirmez la suppression
- **Réorganiser les groupes** : Faites simplement glisser-déposer les groupes pour modifier leur ordre d'affichage

#### Ajout de liens

1. Cliquez sur le bouton "+" dans un groupe
2. Renseignez le titre et l'URL du lien (obligatoires)
3. Ajoutez optionnellement une description et un logo
4. Validez pour ajouter le lien au groupe

#### Gestion des liens

- **Accéder à un lien** : Cliquez sur le titre ou le logo du lien pour l'ouvrir dans un nouvel onglet
- **Modifier un lien** : Cliquez sur l'icône de modification (crayon) sur la carte du lien
- **Supprimer un lien** : Cliquez sur l'icône de suppression (poubelle) sur la carte du lien, puis confirmez

#### Recherche

La barre de recherche dans l'en-tête vous permet de filtrer rapidement vos groupes et liens :
- Saisissez un terme de recherche pour filtrer les groupes et liens qui contiennent ce terme
- La recherche s'effectue dans les titres, URLs et descriptions des liens
- Les groupes dont le titre correspond au terme de recherche afficheront tous leurs liens
- Les groupes qui ne correspondent pas mais qui contiennent des liens correspondants n'afficheront que ces liens spécifiques

#### Import et Export des données

L'application propose des fonctionnalités pour sauvegarder et restaurer vos données :

- **Exporter vos données** :
  1. Cliquez sur "Import / Export" dans la barre supérieure
  2. Sélectionnez "Exporter les données"
  3. Un fichier JSON contenant toutes vos données sera téléchargé

- **Importer des données** :
  1. Cliquez sur "Import / Export" dans la barre supérieure
  2. Sélectionnez "Importer des données"
  3. Choisissez un fichier JSON précédemment exporté
  4. Confirmez l'import
  5. La page se rechargera pour afficher les données importées

### 4. Stockage des données

Toutes vos données (groupes et liens) sont stockées localement dans le navigateur via le mécanisme de localStorage. Cela présente plusieurs avantages :

- **Confidentialité** : Vos données restent sur votre appareil et ne sont pas envoyées à des serveurs externes
- **Rapidité** : L'accès aux données est instantané sans délai réseau
- **Simplicité** : Aucune création de compte ou authentification n'est nécessaire

Cependant, cela implique aussi quelques limitations :

- Les données sont spécifiques au navigateur et à l'appareil utilisé
- En cas de suppression des données de navigation, vos données peuvent être perdues
- L'espace de stockage est limité (généralement quelques MB par domaine)

C'est pourquoi la fonctionnalité d'export/import est particulièrement importante pour sauvegarder régulièrement vos données ou les transférer entre appareils.

### 5. Conseils d'utilisation

- **Organisation** : Créez des groupes thématiques (Travail, Loisirs, Inspiration, etc.) pour mieux structurer vos liens
- **Descriptions** : Utilisez les descriptions pour ajouter des informations contextuelles sur vos liens
- **Sauvegardes régulières** : Exportez régulièrement vos données pour éviter toute perte
- **Personnalisation** : Utilisez les couleurs et logos pour rendre l'interface plus visuelle et faciliter la navigation
- **Recherche** : Privilégiez des mots-clés spécifiques dans les titres pour faciliter la recherche ultérieure

### 6. Compatibilité

L'application fonctionne sur tous les navigateurs modernes qui supportent :
- JavaScript ES6+
- LocalStorage API
- L'API Drag and Drop HTML5

Pour une expérience optimale, utilisez un navigateur à jour comme Chrome, Firefox, Safari ou Edge. 