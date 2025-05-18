-- Up
CREATE TABLE IF NOT EXISTS Tiers (
    tier_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tier_name TEXT UNIQUE NOT NULL,
    request_limit INTEGER NOT NULL,
    time_window INTEGER NOT NULL -- in seconds
);

-- Add tier_id to Users table if it doesn't exist
SELECT CASE 
    WHEN NOT EXISTS(SELECT 1 FROM pragma_table_info('Users') WHERE name='tier_id') 
    THEN 'ALTER TABLE Users ADD COLUMN tier_id INTEGER DEFAULT 1 REFERENCES Tiers(tier_id)'
END;

-- Seed default tiers if they don't exist
INSERT OR IGNORE INTO Tiers (tier_name, request_limit, time_window) VALUES ('free', 5, 3600);
INSERT OR IGNORE INTO Tiers (tier_name, request_limit, time_window) VALUES ('premium', 10, 3600);

-- Down
DROP TABLE IF EXISTS Tiers;
-- Note: SQLite does not support DROP COLUMN, so this is not reversible for Users.tier_id 