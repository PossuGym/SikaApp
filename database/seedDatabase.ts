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
    // Tarkistetaan, onko treenilokeja olemassa. Tämä on luotettavampi tapa varmistaa, onko seedaus ajettu loppuun.
    const logCount = await database.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM exercise_log'
    );

    if (logCount && logCount.count > 0) {
      console.log('Seed ohitettu, treenidataa jo olemassa.');
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

    // Workouts
    await database.runAsync('INSERT INTO workout (name, favorite) VALUES (?, ?)', ['Rinta & Ojentajat', 1]); // id 1
    await database.runAsync('INSERT INTO workout (name) VALUES (?)', ['Selkä & Hauikset']); // id 2
    await database.runAsync('INSERT INTO workout (name) VALUES (?)', ['Jalat & Olkapäät']); // id 3

    // workout_exercise
    // Rinta & Ojentajat (workout_id: 1)
    // Penkkipunnerrus (exercise_id: 1), Dippi (4), Punnerrus (28), Ranskalaiset (29)
    const workout1Exercises = [1, 4, 28, 29];
    for (const exerciseId of workout1Exercises) {
        await database.runAsync(
            'INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (?, ?)',
            [1, exerciseId]
        );
    }

    // Selkä & Hauikset (workout_id: 2)
    // Leuanveto (5), Soutu tangolla (6), Alasoutu (7), Maastaveto (8), Hauiskääntö tangolla (24), Vasarakääntö (26)
    const workout2Exercises = [5, 6, 7, 8, 24, 26];
    for (const exerciseId of workout2Exercises) {
        await database.runAsync(
            'INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (?, ?)',
            [2, exerciseId]
        );
    }

    // Jalat & Olkapäät (workout_id: 3)
    // Kyykky (10), Jalkaprässi (12), Militarypress (18), Sivunosto (19), Arnold press (22)
    const workout3Exercises = [10, 12, 18, 19, 22];
    for (const exerciseId of workout3Exercises) {
        await database.runAsync(
            'INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (?, ?)',
            [3, exerciseId]
        );
    }

    // Exercise Log for progression for 1 year (52 weeks)
    const weeks = 52;

    // Penkkipunnerrus (exercise_id: 1, workout_id: 1)
    const benchPressBaseWeight = 60;
    for (let i = 0; i < weeks; i++) {
        const dateTs = Date.now() - ((weeks - 1 - i) * 7 * msInDay);
        const weightVariation = (Math.random() - 0.5) * 2; // +/- 1kg variation
        const currentWeight = benchPressBaseWeight + (i * 0.5) + weightVariation;

        // Joka 8. viikko kokeillaan maksimia
        if (i > 0 && i % 6 === 0) { // More frequent maxes
            const maxWeightVariation = (Math.random() - 0.3) * 6; // Mostly positive variation
            const maxWeight = currentWeight + 10 + maxWeightVariation;
            await database.runAsync(
                'INSERT INTO exercise_log (workout_id, exercise_id, date, weight, reps, set_number) VALUES (?, ?, ?, ?, ?, ?)',
                [1, 1, dateTs, Math.max(benchPressBaseWeight, parseFloat(maxWeight.toFixed(1))), 1, 1]
            );
        } else {
            for (let set = 1; set <= 3; set++) {
                const reps = Math.floor(Math.random() * 3) + 6; // 6-8 reps
                await database.runAsync(
                    'INSERT INTO exercise_log (workout_id, exercise_id, date, weight, reps, set_number) VALUES (?, ?, ?, ?, ?, ?)',
                    [1, 1, dateTs, Math.max(20, parseFloat(currentWeight.toFixed(1))), reps, set]
                );
            }
        }
    }

    // Kyykky (exercise_id: 10, workout_id: 3)
    const squatBaseWeight = 80;
    for (let i = 0; i < weeks; i++) {
        const dateTs = Date.now() - ((weeks - 1 - i) * 7 * msInDay) - (2 * msInDay); // Start on a different day
        const weightVariation = (Math.random() - 0.5) * 3; // +/- 1.5kg variation
        const currentWeight = squatBaseWeight + (i * 1) + weightVariation;

        // Joka 8. viikko kokeillaan maksimia
        if (i > 0 && i % 6 === 0) { // More frequent maxes
            const maxWeightVariation = (Math.random() - 0.3) * 8; // Mostly positive variation
            const maxWeight = currentWeight + 15 + maxWeightVariation;
            await database.runAsync(
                'INSERT INTO exercise_log (workout_id, exercise_id, date, weight, reps, set_number) VALUES (?, ?, ?, ?, ?, ?)',
                [3, 10, dateTs, Math.max(squatBaseWeight, parseFloat(maxWeight.toFixed(1))), 1, 1]
            );
        } else {
            for (let set = 1; set <= 3; set++) {
                const reps = Math.floor(Math.random() * 3) + 5; // 5-7 reps
                await database.runAsync(
                    'INSERT INTO exercise_log (workout_id, exercise_id, date, weight, reps, set_number) VALUES (?, ?, ?, ?, ?, ?)',
                    [3, 10, dateTs, Math.max(40, parseFloat(currentWeight.toFixed(1))), reps, set]
                );
            }
        }
    }

    // Maastaveto (exercise_id: 8, workout_id: 2)
    const deadliftBaseWeight = 100;
    for (let i = 0; i < weeks; i++) {
        const dateTs = Date.now() - ((weeks - 1 - i) * 7 * msInDay) - (4 * msInDay); // Start on a different day
        const weightVariation = (Math.random() - 0.5) * 4; // +/- 2kg variation
        const currentWeight = deadliftBaseWeight + (i * 1.25) + weightVariation;

        // Joka 8. viikko kokeillaan maksimia
        if (i > 0 && i % 7 === 0) { // A bit more frequent
            const maxWeightVariation = (Math.random() - 0.3) * 10; // Mostly positive variation
            const maxWeight = currentWeight + 20 + maxWeightVariation;
            await database.runAsync(
                'INSERT INTO exercise_log (workout_id, exercise_id, date, weight, reps, set_number) VALUES (?, ?, ?, ?, ?, ?)',
                [2, 8, dateTs, Math.max(deadliftBaseWeight, parseFloat(maxWeight.toFixed(1))), 1, 1]
            );
        } else {
            for (let set = 1; set <= 3; set++) {
                const reps = Math.floor(Math.random() * 3) + 3; // 3-5 reps
                await database.runAsync(
                    'INSERT INTO exercise_log (workout_id, exercise_id, date, weight, reps, set_number) VALUES (?, ?, ?, ?, ?, ?)',
                    [2, 8, dateTs, Math.max(60, parseFloat(currentWeight.toFixed(1))), reps, set]
                );
            }
        }
    }

    // Alasoutu (exercise_id: 7, workout_id: 2) for 2 years
    const latPulldownWeeks = 104;
    const latPulldownBaseWeight = 40;
    for (let i = 0; i < latPulldownWeeks; i++) {
        const dateTs = Date.now() - ((latPulldownWeeks - 1 - i) * 7 * msInDay) - (3 * msInDay); // Start on a different day
        const weightVariation = (Math.random() - 0.5) * 2.5; // +/- 1.25kg variation
        const currentWeight = latPulldownBaseWeight + (i * 0.25) + weightVariation;
        
        // Joka 10. viikko kokeillaan maksimia
        if (i > 0 && i % 10 === 0) {
            const maxWeightVariation = (Math.random() - 0.3) * 5; // Mostly positive variation
            const maxWeight = currentWeight + 10 + maxWeightVariation;
            await database.runAsync(
                'INSERT INTO exercise_log (workout_id, exercise_id, date, weight, reps, set_number) VALUES (?, ?, ?, ?, ?, ?)',
                [2, 7, dateTs, Math.max(latPulldownBaseWeight, parseFloat(maxWeight.toFixed(1))), 1, 1]
            );
        } else {
            for (let set = 1; set <= 3; set++) {
                const reps = Math.floor(Math.random() * 3) + 8; // 8-10 reps
                await database.runAsync(
                    'INSERT INTO exercise_log (workout_id, exercise_id, date, weight, reps, set_number) VALUES (?, ?, ?, ?, ?, ?)',
                    [2, 7, dateTs, Math.max(20, parseFloat(currentWeight.toFixed(1))), reps, set]
                );
            }
        }
    }

    // Arnold press (exercise_id: 22, workout_id: 3) for 3 years
    const arnoldWeeks = 156;
    const arnoldBaseWeight = 10;
    for (let i = 0; i < arnoldWeeks; i++) {
        const dateTs = Date.now() - ((arnoldWeeks - 1 - i) * 7 * msInDay) - (5 * msInDay); // Start on a different day
        const weightVariation = (Math.random() - 0.5) * 1; // +/- 0.5kg variation
        const currentWeight = arnoldBaseWeight + (i * 0.1) + weightVariation;

        // Joka 12. viikko kokeillaan maksimia
        if (i > 0 && i % 10 === 0) { // More frequent
            const maxWeightVariation = (Math.random() - 0.3) * 2; // Mostly positive variation
            const maxWeight = currentWeight + 4 + maxWeightVariation;
            await database.runAsync(
                'INSERT INTO exercise_log (workout_id, exercise_id, date, weight, reps, set_number) VALUES (?, ?, ?, ?, ?, ?)',
                [3, 22, dateTs, Math.max(arnoldBaseWeight, parseFloat(maxWeight.toFixed(1))), 1, 1]
            );
        } else {
            for (let set = 1; set <= 3; set++) {
                const reps = Math.floor(Math.random() * 3) + 8; // 8-10 reps
                await database.runAsync(
                    'INSERT INTO exercise_log (workout_id, exercise_id, date, weight, reps, set_number) VALUES (?, ?, ?, ?, ?, ?)',
                    [3, 22, dateTs, Math.max(5, parseFloat(currentWeight.toFixed(1))), reps, set]
                );
            }
        }
    }

    await database.execAsync('COMMIT;');
    console.log('Seed valmis.');
  } catch (error) {
    await database.execAsync('ROLLBACK;');
    console.error('Seeding epäonnistui:', error);
  }
};