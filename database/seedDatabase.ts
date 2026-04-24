import { database } from './database';

const initialExercises = [
  { id: 1, name: 'Penkkipunnerrus', category: 'Rinta' },
  { id: 2, name: 'Dippi', category: 'Rinta' },
  { id: 3, name: 'Leuanveto', category: 'Selkä' },
  { id: 4, name: 'Soutu tangolla', category: 'Selkä' },
  { id: 5, name: 'Kyykky', category: 'Jalat' },
  { id: 6, name: 'Jalkaprässi', category: 'Jalat' },
  { id: 7, name: 'Pystypunnerrus', category: 'Olkapäät' },
  { id: 8, name: 'Sivunosto', category: 'Olkapäät' },
  { id: 9, name: 'Hauiskääntö tangolla', category: 'Hauikset' },
  { id: 10, name: 'Vasarakääntö', category: 'Hauikset' },
  { id: 11, name: 'Punnerrus', category: 'Ojentajat' },
  { id: 12, name: 'Ranskalaiset', category: 'Ojentajat' },
];
 
export const seedDatabase = async (demoData: boolean = false) => {
  try {
    // Perusliikkeet
    for (const ex of initialExercises) {
      await database.runAsync(
        'INSERT OR IGNORE INTO exercise (id, name, category) VALUES (?, ?, ?)',
        [ex.id, ex.name, ex.category]
      );
    }
    
    // Treeniohjelmat
    await database.runAsync('INSERT OR IGNORE INTO workout (id, name, favorite) VALUES (1, ?, 1)', ['Rinta & Ojentajat']);
    await database.runAsync('INSERT OR IGNORE INTO workout (id, name, favorite) VALUES (2, ?, 0)', ['Selkä & Hauikset']);
    await database.runAsync('INSERT OR IGNORE INTO workout (id, name, favorite) VALUES (3, ?, 0)', ['Jalat & Olkapäät']);

    // Ohjelmien ja liikkeiden liitokset
    const links = [
      { w: 1, e: [1, 2, 11, 12] },
      { w: 2, e: [3, 4, 9, 10] },
      { w: 3, e: [5, 6, 7, 8] }
    ];

    for (const link of links) {
      for (const eId of link.e) {
        await database.runAsync('INSERT OR IGNORE INTO workout_exercise (workout_id, exercise_id) VALUES (?, ?)', [link.w, eId]);
      }
    }

    // TESTIDATA, vain jos demoData = true
    if (demoData) {
      console.log("Ladataan esittelydataa")

      // Treenitietoja 54 viikon ajalta (1 treeni/vko per ohjelma)
      const msInDay = 24 * 60 * 60 * 1000;
      const weeks = 54;

      const logConfig = [
        { eId: 1, wId: 1, baseW: 40, inc: 0.8, baseReps: 8 },  // Penkki
        { eId: 2, wId: 1, baseW: 0, inc: 0.2, baseReps: 10 },  // Dippi
        { eId: 11, wId: 1, baseW: 0, inc: 0, baseReps: 15 },   // Punnerrus
        { eId: 12, wId: 1, baseW: 20, inc: 0.4, baseReps: 10 }, // Ranskalaiset
        { eId: 3, wId: 2, baseW: 0, inc: 0.3, baseReps: 6 },   // Leuanveto
        { eId: 4, wId: 2, baseW: 40, inc: 0.7, baseReps: 8 },  // Soutu
        { eId: 9, wId: 2, baseW: 15, inc: 0.2, baseReps: 12 }, // Hauis tanko
        { eId: 10, wId: 2, baseW: 12, inc: 0.2, baseReps: 10 }, // Vasara
        { eId: 5, wId: 3, baseW: 50, inc: 1.2, baseReps: 5 },  // Kyykky
        { eId: 6, wId: 3, baseW: 80, inc: 1.5, baseReps: 10 }, // Prässi
        { eId: 7, wId: 3, baseW: 30, inc: 0.5, baseReps: 8 },  // Pystypp.
        { eId: 8, wId: 3, baseW: 6, inc: 0.1, baseReps: 12 },  // Sivunosto
      ];
      
      for (let i = 0; i < weeks; i++) {
        const date = Date.now() - ((weeks - i) * 7 * msInDay);
        
        for (const conf of logConfig) {
          const dayOffset = (conf.wId - 1) * 2; // Ohjelma 1 ma, 2 ke, 3 pe
          const date = Date.now() - ((weeks - i) * 7 * msInDay) + (dayOffset * msInDay);
          
          const progress = i * conf.inc;
          const randomFluc = (Math.random() * 2.5) - 1.25; // +/- 1.25kg vaihtelu
          const currentWeight = Math.max(0, conf.baseW + progress + randomFluc);
          
          for (let set = 1; set <= 3; set++) {
            const randomReps = conf.baseReps + Math.floor(Math.random() * 3) - 1;

            await database.runAsync(
              'INSERT OR IGNORE INTO exercise_log (workout_id, exercise_id, date, weight, reps, set_number) VALUES (?, ?, ?, ?, ?, ?)',
              [conf.wId, conf.eId, date, parseFloat(currentWeight.toFixed(1)), randomReps, set]
            );
          }
        }
      }

      // Painohistoria ja askeleet
      for (let i = 0; i < 90; i++) {
        const date = Date.now() - (i * msInDay);
        const weight = 85 - (i * 0.1) + (Math.random() * 0.8);
        const steps = Math.floor(Math.random() * 10000) + 3000;
        
        await database.runAsync(
          'INSERT OR IGNORE INTO user_daily (weight, daily_steps, date) VALUES (?, ?, ?)',
          [parseFloat(weight.toFixed(1)), steps, date]
        );
      }
    }

    // LASKUREIDEN NOLLAUS, varmistaa ettei SQLite yritä käyttää varattuja id-numeroita
    await database.execAsync(`
      DELETE FROM sqlite_sequence;
      INSERT INTO sqlite_sequence (name, seq) SELECT 'exercise', MAX(id) FROM exercise;
      INSERT INTO sqlite_sequence (name, seq) SELECT 'workout', MAX(id) FROM workout;
      INSERT INTO sqlite_sequence (name, seq) SELECT 'exercise_log', MAX(id) FROM exercise_log;
      INSERT INTO sqlite_sequence (name, seq) SELECT 'nutrition', MAX(id) FROM nutrition;
    `);

    console.log('Seedaus valmis.');
  } catch (error) {
    console.error('Seedaus epäonnistui:', error);
  }
};