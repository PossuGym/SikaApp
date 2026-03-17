import * as SQLite from 'expo-sqlite';

/* 
    Tietokantayhteys 'database'
*/
const DB_NAME = 'app_database.db';
const DATABASE_VERSION = '1.0'; // Tulevaisuuden migraatioita varten

export const database = SQLite.openDatabaseSync(DB_NAME)
