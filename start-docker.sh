#!/bin/bash

# Arrêter tous les conteneurs existants pour oh-my-link
echo "Arrêt des conteneurs existants..."
docker compose down

# Construire et démarrer les conteneurs
echo "Construction et démarrage des conteneurs..."
docker compose up -d --build

# Afficher les logs
echo "Conteneurs démarrés. Affichage des logs..."
docker compose logs -f
