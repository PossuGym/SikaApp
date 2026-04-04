// Sovelluksen "pohja" navigaatiostack, tabit ja login
export type RootStackParamList = {
  Tabs: undefined;  // Kaikki sovelluksen navigoitavat reitit
  Login: undefined; // Kirjautumissivu
};

// Treenisivun stack, valinta ja treenin kirjaus
export type TrainingStackParamList = {
  TrainingHome: undefined;
  TrainingSession: undefined;
};