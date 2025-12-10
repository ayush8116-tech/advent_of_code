import { input } from "./part-1.js";
const dbg = (x) => console.log(x) && x;

const orbitMap = {};
const navigation = { direct: [], indirect: [] };

export const generateOrbitMap = (planets) => {
  if(!(planets[0] in orbitMap)) {
    orbitMap[planets[0]] = navigation
  }

  let i = 1;
  while (i < planets.length) {
    const navigationMap = {
      direct: [...navigation.direct],
      indirect: [...navigation.indirect],
    };

    navigationMap.direct.push(planets[i - 1]);
    const indirectlyConnected = orbitMap[navigationMap.direct].direct.concat(
      orbitMap[navigationMap.direct].indirect,
    );

    navigationMap.indirect.push(...indirectlyConnected);
    orbitMap[planets[i]] = navigationMap;

    i++;
  }

  return orbitMap;
};

export const calculateOrbits = (map) => {
  const planetsNavigation = Object.values(map);
  const orbitCount = planetsNavigation.reduce((sum, planet) => {
    sum += planet.direct.length + planet.indirect.length;
    return sum;
  }, 0);

  return orbitCount;
};

export const main = (map) => {
  const mapTokens = map.split("  ");
  const splittedMapTokens = mapTokens.map((planetPosition) =>
    planetPosition.split(")")
  );

  splittedMapTokens.map((map) => generateOrbitMap(map));
  const orbitCount = calculateOrbits(orbitMap);
  return orbitCount;
};

console.log(main(input))