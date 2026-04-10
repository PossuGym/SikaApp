/*
  Tämä tiedosto sisältää matematiikan osuuden projektin tilastoista.
  Toteutettuna:
  - Suoran sovittaminen pistejoukkoon pienimmän neliösumman menetelmällä.
*/

/**
  * Laskee pienimmän neliösumman suoran (y = m*x + b)
  * @returns Trendiviivan y-arvot
*/
export function calcLinearTrend(values: number[]): number[] {
  const n = values.length;
  if (n < 3) return []; // Ei lasketa alle kolmelle datapisteelle

  let Sx = 0;
  let Sy = 0;
  let Sxx = 0;
  let Sxy = 0;

  for (let i = 0; i < n; i++) {
    Sx += i;
    Sy += values[i];
    Sxx += i * i;
    Sxy += values[i] * i;
  }
  // Nimittäjä aina sama, joten lasketaan se vain kerran
  const denominator = n*Sxx - Sx*Sx;
  // Kulmakerroin
  const m = (n*Sxy - Sx*Sy) / denominator
  // Vakiotermi
  const b = (Sxx*Sy - Sx*Sxy) / denominator;
  // Lasketaan (y = m*x + b)
  const trend = values.map((_, i) => +(m * i + b));

  return trend;
}
