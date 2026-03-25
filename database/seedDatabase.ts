import { database } from './database';
 
export const seedDatabase = async () => {
  try {
    const existing = await database.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM user_daily'
    );
    if (existing && existing.count > 0) return;
 
    console.log('Generoidaan satunnaista treenihistoriaa...');
    await database.execAsync('BEGIN TRANSACTION;');
 
    const msInDay = 24 * 60 * 60 * 1000;
    let currentDateTs = Date.now(); // Aloitetaan tästä hetkestä
 
    // Luodaan n. 100 datapistettä satunnaisilla väleillä
    for (let i = 0; i < 100; i++) {
 
      // SATUNNAISET PÄIVÄT
      const randomGap = Math.floor(Math.random() * 5) + 1; 
      currentDateTs -= (randomGap * msInDay);
 
      // SATUNNAINEN PAINO
      // (Mitä isompi 'i', sitä kauempana historiassa ollaan -> paino on korkeampi)
      const baseWeight = 80 + (i * 0.15); 
      const weightVariation = (Math.random() - 0.5) * 1.2; // +/- 0.6kg heittoa
      const finalWeight = parseFloat((baseWeight + weightVariation).toFixed(1));
 
      // SATUNNAISET ASKELEET: 2000 - 15000
      const randomSteps = Math.floor(Math.random() * 13000) + 2000;
 
      await database.runAsync(
        'INSERT INTO user_daily (weight, daily_steps, date) VALUES (?, ?, ?)',
        [finalWeight, randomSteps, currentDateTs]
      );
    }
 
    await database.execAsync('COMMIT;');
    console.log('Seed valmis.');
  } catch (error) {
    await database.execAsync('ROLLBACK;');
    console.error('Seeding epäonnistui:', error);
  }
};