import { database } from './database';

const exercises = [
  // Rinta
  { name: 'Penkkipunnerrus', category: 'Rinta' },
  { name: 'Vinopenkkipunnerrus', category: 'Rinta' },
  { name: 'Käsipainovinopenkkipunnerrus', category: 'Rinta' },
  { name: 'Dippi', category: 'Rinta' },
  // Selkä
  { name: 'Leuanveto', category: 'Selkä' },
  { name: 'Soutu tangolla', category: 'Selkä' },
  { name: 'Alasoutu', category: 'Selkä' },
  { name: 'Maastaveto', category: 'Selkä' },
  { name: 'Käsipainosoutu', category: 'Selkä' },
  // Jalat
  { name: 'Kyykky', category: 'Jalat' },
  { name: 'Askelkyykky', category: 'Jalat' },
  { name: 'Jalkaprässi', category: 'Jalat' },
  { name: 'Hamstring curl', category: 'Jalat' },
  { name: 'Leg extension', category: 'Jalat' },
  { name: 'Pohjenostot', category: 'Jalat' },
  { name: 'Hack kyykky', category: 'Jalat' },
  { name: 'Lantionnosto', category: 'Jalat' },
  // Olkapäät
  { name: 'Militarypress', category: 'Olkapäät' },
  { name: 'Sivunosto', category: 'Olkapäät' },
  { name: 'Etunosto', category: 'Olkapäät' },
  { name: 'Takanosto', category: 'Olkapäät' },
  { name: 'Arnold press', category: 'Olkapäät' },
  // Hauikset
  { name: 'Hauiskääntö tangolla', category: 'Hauikset' },
  { name: 'Hauiskääntö käsipainolla', category: 'Hauikset' },
  { name: 'Vasarakääntö', category: 'Hauikset' },
  { name: 'Kaapelihauiskääntö', category: 'Hauikset' },
  // Ojentajat
  { name: 'Punnerrus', category: 'Ojentajat' },
  { name: 'Ranskalaiset', category: 'Ojentajat' },
  { name: 'Kaapeliojentajat', category: 'Ojentajat' },
  { name: 'Skull crusher', category: 'Ojentajat' },
  // Vatsa
  { name: 'Lankku', category: 'Vatsa' },
  { name: 'Vatsarutistus', category: 'Vatsa' },
  { name: 'Jalannosto', category: 'Vatsa' },
  { name: 'Kaapelivatsarutistus', category: 'Vatsa' },
];
 
export const seedDatabase = async () => {
  try {
    const existing = await database.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM user_daily'
    );

    if (existing && existing.count > 0) {
      console.log('Seed ohitettu, dataa jo olemassa.');
      return;
    }

    await database.execAsync('BEGIN TRANSACTION;');
    
    // Exerciset
    for (const exercise of exercises) {
      await database.runAsync(
        'INSERT INTO exercise (name, category) VALUES (?, ?)',
        [exercise.name, exercise.category]
      );
    }
 
    // User daily
    const msInDay = 24 * 60 * 60 * 1000;
    let currentDateTs = Date.now();

    for (let i = 0; i < 100; i++) {
      const randomGap = Math.floor(Math.random() * 5) + 1;
      currentDateTs -= (randomGap * msInDay);

      const baseWeight = 80 + (i * 0.15);
      const weightVariation = (Math.random() - 0.5) * 1.2;
      const finalWeight = parseFloat((baseWeight + weightVariation).toFixed(1));
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