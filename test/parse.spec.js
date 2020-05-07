const {showdownParse} = require('../src/functions/parse');

const assert = require('assert');

const fullThing = `Swordy Boi (Aegislash) (F) @ Choice Band  
Ability: Stance Change  
Level: 99  
Shiny: Yes  
Happiness: 249  
EVs: 248 HP / 252 Atk / 8 SpD  
Brave Nature  
IVs: 0 SpA / 0 Spe  
- Close Combat  
- Head Smash  
- Iron Head  
- Shadow Claw`;

it('should parse a full thing', function() {
  assert.equal(toString(showdownParse(fullThing)), {
    nickname: 'Swordy Boi',
    species: 'Aegislash',
    gender: 'F',
    item: 'Choice Band',
    ability: 'Stance Change',
    level: '99',
    shiny: 'Yes',
    happiness: '249',
    ev: '248 HP / 252 Atk / 8 SpD',
    nature: 'Brave',
    iv: '0 SpA / 0 Spe',
    moves: [ 'Close Combat', 'Iron Head', 'Head Smash' ]
  })
})
