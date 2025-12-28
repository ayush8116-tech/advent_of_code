const childParent = {}

const count = (child, relations) => {
  if(relations[child] === undefined) {
    return 0;
  }
  return (1 + count(relations[child], relations))
}

export const relationSum = (counts) => {
  return counts.reduce((sum, count) => (sum += count) && sum,0)
}

export const countRelations = (relations) => {
  const parentCounts = [];
  for(const child in relations) {
    parentCounts.push(count(child, relations))
  }

  return relationSum(parentCounts)
}

export const generateRelations = (map) => {
  const spaceMap = [...map]
  spaceMap.forEach(([parent, child]) => {
    childParent[child] = parent
  })

  return childParent
}

export const parseMap = (mapString) => {
  const orbits = mapString.split("  ")
  const planets = orbits.map(system => system.split(")"))

  return planets;
}

export const main = (map) => {
  const parsedMap = parseMap(map)
  generateRelations(parsedMap)

  return countRelations(childParent)
}

const input = Deno.readTextFileSync("./input.md")
console.log(main(input))