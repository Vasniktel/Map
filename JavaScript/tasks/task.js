'use strict';

/**
 * Task:
 * Implement Map polyfill with 2 arrays: for keys and for values
 * Implement Iterable interface in polyfill
 */

class ArrayedMap {
  constructor() {
    this.keysArr = []; // array of [key, index in values]
    this.valuesArr = [];
  }
  set(key, value) {
    const data = this.get(key);
    if (data) {
      this.valuesArr[data[1]] = value;
    } else {
      const index = this.valuesArr.push(value) - 1;
      this.keysArr.push([ key, index ]);
    }
    return value;
  }
  get(key) {
    const data = this.keysArr.find(elem => elem[0] === key);
    return data && this.valuesArr[data[1]];
  }
  has(key) {
    return !!this.get(key);
  }
  delete(key) {
    const index = this.keysArr.findIndex(elem => elem[0] === key);
    this.valuesArr.splice(this.keysArr[index][1], 1);
    this.keysArr.splice(index, 1);
  }
  get size() {
    return this.keysArr.length;
  }
  keys() {
    return this.keysArr.map(elem => elem[0]);
  }
  values() {
    return this.valuesArr;
  }
  clear() {
    this.keysArr = [];
    this.valuesArr = [];
  }
  *[Symbol.iterator]() {
    yield* this.keysArr.map(elem => [ elem[0], this.valuesArr[elem[1]] ]);
  }
}

// Usage

const cityPopulation = new ArrayedMap();

cityPopulation.set('Shanghai', 24256800);
cityPopulation.set('Beijing',  21516000);
cityPopulation.set('Delhi',    16787941);
cityPopulation.set('Lagos',    16060303);

console.log('contents:');
for (const entry of cityPopulation) {
  console.log(entry);
}

cityPopulation.delete('Shanghai');

if (cityPopulation.has('Beijing')) {
  console.log('Beijing:', cityPopulation.get('Beijing'));
}

if (!cityPopulation.has('Shanghai')) {
  console.log('no data for Shanghai');
}

console.log('size:', cityPopulation.size);
console.log('keys:', cityPopulation.keys());
console.log('values:', cityPopulation.values());
