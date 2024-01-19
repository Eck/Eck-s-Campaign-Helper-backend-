-- This file will hold the seed rows for the database

INSERT OR REPLACE INTO Race (RaceID, RaceName) VALUES (0, "[Random]");
INSERT OR REPLACE INTO Race (RaceID, RaceName) VALUES (1, "Human");
INSERT OR REPLACE INTO Race (RaceID, RaceName) VALUES (2, "Elf");
INSERT OR REPLACE INTO Race (RaceID, RaceName) VALUES (3, "Dwarf");
INSERT OR REPLACE INTO Race (RaceID, RaceName) VALUES (4, "Half-Orc");

INSERT OR REPLACE INTO Class (ClassID, ClassName) VALUES (0, "[Random]");
INSERT OR REPLACE INTO Class (ClassID, ClassName) VALUES (1, "Fighter");
INSERT OR REPLACE INTO Class (ClassID, ClassName) VALUES (2, "Cleric");
INSERT OR REPLACE INTO Class (ClassID, ClassName) VALUES (3, "Rogue");
INSERT OR REPLACE INTO Class (ClassID, ClassName) VALUES (4, "Wizard");
INSERT OR REPLACE INTO Class (ClassID, ClassName) VALUES (5, "Druid");

INSERT OR REPLACE INTO Gender (GenderID, GenderName) VALUES (0, "[Random]");
INSERT OR REPLACE INTO Gender (GenderID, GenderName) VALUES (1, "Female");
INSERT OR REPLACE INTO Gender (GenderID, GenderName) VALUES (2, "Male");
INSERT OR REPLACE INTO Gender (GenderID, GenderName) VALUES (3, "Nonbinary");