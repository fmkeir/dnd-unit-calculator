
const races = {
  bugbear: {
    attack: 2, power: 0, defense: 0, toughness: 0, morale: 1,
    traits: ["martial"]
  },
  dragonborn: {attack: 2, power: 2, defense: 1, toughness: 1, morale: 1,
    traits: ["courageous"]
  },
  Dwarf: {attack: 3, power: 1, defense: 1, toughness: 1, morale: 2,
    traits: ["stalwart"]
  },
  elf: {attack: 2, power: 0, defense: 0, toughness: 0, morale: 1,
    traits: ["eternal"]
  },
  "winged elf": {attack: 1, power: 1, defense: 0, toughness: 0, morale: 1,
    traits: ["eternal"]
  },
  ghoul: {attack: -1, power: 0, defense: 2, toughness: 2, morale: 0,
    traits: ["undead", "horrify", "ravenous"]
  },
  gnoll: {attack: 2, power: 0, defense: 0, toughness: 0, morale: 1,
    traits: ["frenzy"]
  },
  gnome: {attack: 1, power: -1, defense: 1, toughness: -1, morale: 1,
    traits: []
  },
  goblin: {attack: -1, power: -1, defense: 1, toughness: -1, morale: 0,
    traits: []
  },
  hobgoblin: {attack: 2, power: 0, defense: 0, toughness: 0, morale: 1,
    traits: ["bred for war", "martial advantage"]
  },
  human: {attack: 2, power: 0, defense: 0, toughness: 0, morale: 1,
    traits: ["courageous"]
  },
  kobold: {attack: -1, power: -1, defense: 1, toughness: -1, morale: -1,
    traits: []
  },
  lizardfolk: {attack: 2, power: 1, defense: -1, toughness: 1, morale: 1,
    traits: ["amphibious"]
  },
  ogre: {attack: 0, power: 2, defense: 0, toughness: 2, morale: 1,
    traits: ["brutal"]
  },
  orc: {attack: 2, power: 1, defense: 1, toughness: 1, morale: 2,
    traits: ["savage"]
  },
  skeleton: {attack: -2, power: -1, defense: 1, toughness: 1, morale: 1,
    traits: ["undead", "mindless"]
  },
  treant: {attack: 0, power: 2, defense: 0, toughness: 2, morale: 0,
    traits: ["siege engine", "twisting roots", "rock hurler"]
  },
  troll: {attack: 0, power: 2, defense: 0, toughness: 2, morale: 0,
    traits: ["regenerate"]
  },
  zombie: {attack: -2, power: 0, defense: 2, toughness: 2, morale: 2,
    traits: ["undead", "mindless"]
  }
};

const traits = {
  amphibious: {cost: 50},
  "bred for war": {cost: 100},
  brutal: {cost: 200},
  courageous: {cost: 50},
  eternal: {cost: 50},
  feast: {cost: 50},
  horrify: {cost: 200},
  martial: {cost: 100},
  mindless: {cost: 100},
  regenerate: {cost: 200},
  ravenous: {cost: 50},
  "rock hurler": {cost: 250},
  savage: {cost: 50},
  stalwart: {cost: 50},
  "twisting roots": {cost: 200},
  undead: {cost: 50},
};

const experiences = {
  green: {attack: 0, power: 0, defense: 0, toughness: 0, morale: 0},
  regular: {attack: 1, power: 0, defense: 0, toughness: 1, morale: 1},
  seasoned: {attack: 1, power: 0, defense: 0, toughness: 1, morale: 2},
  veteran: {attack: 1, power: 0, defense: 0, toughness: 1, morale: 3},
  elite: {attack: 2, power: 0, defense: 0, toughness: 2, morale: 4},
  "super elite": {attack: 2, power: 0, defense: 0, toughness: 2, morale: 5}
};

const equipments = {
  light: {attack: 0, power: 1, defense: 1, toughness: 0, morale: 0},
  medium: {attack: 0, power: 2, defense: 2, toughness: 0, morale: 0},
  heavy: {attack: 0, power: 4, defense: 4, toughness: 0, morale: 0},
  "super heavy": {attack: 0, power: 6, defense: 6, toughness: 0, morale: 0}
};

const unitTypes = {
  airborne: {
    attack: 0, power: 0, defense: 0, toughness: 0,
    morale: 3, costMulti: 2
  },
  archers: {
    attack: 0, power: 1, defense: 0, toughness: 0,
    morale: 1, costMulti: 1.75
  },
  cavalry: {
    attack: 1, power: 1, defense: 0, toughness: 0,
    morale: 2, costMulti: 1.5
  },
  levies: {
    attack: 0, power: 0, defense: 0, toughness: 0,
    morale: -1, costMulti: 0.75
  },
  infantry: {
    attack: 0, power: 0, defense: 1, toughness: 1,
    morale: 0, costMulti: 1
  },
  "siege engine": {
    attack: 1, power: 1, defense: 0, toughness: 1,
    morale: 0, costMulti: 1.5
  }
};

const unitSizes = {
  d4: {costMulti: 0.66},
  d6: {costMulti: 1},
  d8: {costMulti: 1.33},
  d10: {costMulti: 1.66},
  d12: {costMulti: 2},
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#unitForm');
  const submit = document.querySelector('#submit');
  const list = document.querySelector('#unitList');
  const deleteAll = document.querySelector('#deleteAll');

  submit.addEventListener('click', () => {
    handleFormSubmit(form, list);
  });

  deleteAll.addEventListener('click', () => {
    handleDeleteClick(list)
  });
});

const handleFormSubmit = (input, list) => {
  event.preventDefault();

  newUnit = createUnit(
    input.race.value, input.experience.value, input.equipment.value, input.unitType.value, input.unitSize.value
  );
  unitCost = calculateCost(newUnit);

  const newListItem = document.createElement('li');
  list.insertBefore(newListItem, list.childNodes[0]);

  generateElement(newListItem, 'h2', newUnit.name);
  generateElement(newListItem, 'h2',
    `Attack: ${newUnit.attack} Power: ${newUnit.power} Defense: ${newUnit.defense} Toughness: ${newUnit.toughness} Morale: ${newUnit.morale} Traits: ${newUnit.traits}`
  )
  generateElement(newListItem,'h3', `${unitCost.toFixed(2)} gp`);
};

const generateElement = (container, tag, content='') => {
  const element = document.createElement(tag);
  element.textContent = content;

  container.appendChild(element);
};

const handleDeleteClick = (list) => {
  list.textContent = '';
};


const createUnit = function (race, experience, equipment, unitType, unitSize) {
  let components = [
    races[race],
    experiences[experience],
    equipments[equipment],
    unitTypes[unitType]
  ];
  unit = {
    name: `${unitSize} ${race} ${experience} ${equipment} ${unitType}`,
    attack: sumModifier("attack", components),
    power: sumModifier("power", components),
    defense: sumModifier("defense", components),
    toughness: sumModifier("toughness", components),
    morale: sumModifier("morale", components),
    traits: races[race]["traits"],
    typeMulti:
    unitTypes[unitType]["costMulti"] * unitSizes[unitSize]["costMulti"] * 10
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
  return traitsArray.reduce((sum, trait) => sum += traits[trait]["cost"], 0)
}
