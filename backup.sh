#!/bin/bash

# === CONFIGURATION ===
DB_PATH="./backend/potions.db"
BACKUP_DIR="./backups"
LOG_FILE="./backup.log"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
ARCHIVE_NAME="potions_backup_$DATE.db"

# === CRÉATION DU DOSSIER DE SAUVEGARDE ===
mkdir -p "$BACKUP_DIR"

# === COPIE DE LA BASE DE DONNÉES ===
if [ -f "$DB_PATH" ]; then
    cp "$DB_PATH" "$BACKUP_DIR/$ARCHIVE_NAME"
    echo "[$DATE] Sauvegarde réussie : $ARCHIVE_NAME" >> "$LOG_FILE"
else
    echo "[$DATE] ERREUR : Base $DB_PATH introuvable !" >> "$LOG_FILE"
fi
