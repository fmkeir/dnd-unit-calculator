const tables = require('./tables')

const createUnit = function (race, experience, equipment, unitType, unitSize) {
  let components = [
    tables.races[race],
    tables.experiences[experience],
    tables.equipments[equipment],
    tables.unitTypes[unitType]
  ];
  unit = {
    name: `${unitSize} ${race} ${experience} ${equipment} ${unitType}`,
    attack: sumModifier("attack", components),
    power: sumModifier("power", components),
    defense: sumModifier("defense", components),
    toughness: sumModifier("toughness", components),
    morale: sumModifier("morale", components),
    traits: tables.races[race]["traits"],
    typeMulti:
    tables.unitTypes[unitType]["costMulti"] * tables.unitSizes[unitSize]["costMulti"] * 10
  }
  return unit;
};

const calculateCost = function (unit){
   let result = unit.attack + unit.power + unit.defense + unit.toughness + 2*unit.morale;
   result *= unit.typeMulti;
   result += 30;
   result += sumTraitValues(unit.traits);
   return result;
};

const sumModifier = function (trait, components) {
  return components.reduce((sum, component) => sum += component[trait], 0);
};

const sumTraitValues = function(traitsArray){
  return traitsArray.reduce((sum, trait) => sum += tables.traits[trait]["cost"], 0)
}

unit = createUnit("dragonborn", "seasoned", "light", "infantry", "d4")
cost = calculateCost(unit)
console.log('1d4 dragonborn seasoned light infantry:', unit)
console.log('cost:', cost)
