-- Supprimer les contraintes NOT NULL des colonnes
ALTER TABLE properties ALTER COLUMN ville DROP NOT NULL;
ALTER TABLE properties ALTER COLUMN pays DROP NOT NULL;
ALTER TABLE properties ALTER COLUMN localisation DROP NOT NULL;

-- Supprimer les colonnes
ALTER TABLE properties DROP COLUMN ville;
ALTER TABLE properties DROP COLUMN pays;
ALTER TABLE properties DROP COLUMN localisation; 