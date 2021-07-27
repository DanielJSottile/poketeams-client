// Regular Expressions
export const FOLDERPARSE = /^=== \[(.*)\] (.*)\/(.*) ===$/;
export const NICKNAME_GEN_AND_ITEM_RE = /^(.*) \((.*)\) \(([MF])\) @ (.*)$/;
export const NICKNAME_AND_ITEM_RE = /^(.*) \((.{2,})\) @ (.*)$/;
export const NICKNAME_GEN_NO_ITEM_RE = /^(.*) \((.*)\) \(([MF])\)$/;
export const NICKNAME_NO_ITEM_RE = /^(.*) \((.*)\)$/;
export const NO_NICKNAME_GEN_AND_ITEM_RE = /^(.*) \(([MF])\) @ (.*)$/;
export const NO_NICKNAME_AND_ITEM_RE = /^(.*) @ (.*)$/;

export const ALL = /^(.*)\W(.*)$/;
export const TYPENULL = /^(.*):\W(.*)$/;
export const MIME = /^(.*).\W(.*)$/;
export const BADBIRB = /^(.*)’(.*)$/;
export const FARGALAR = /^(.*)'(.*)$/;
export const MIMEJR = /^(.*)\W(.*).$/;
export const MIMEGALAR = /^(.*). (.*)$/;

export const REGEX_UPPER_LOWER_NUMBER_SPECIAL =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*.!@$%^&(){}[\]:;<>,.?~_+-=|])[\S]+/;

// List of 'Exceptions' to regular Regex rules

export const EXCEPTIONS: string[] = [
  'vivillon-icy snow',
  'vivillon-high plains',
  'alcremie-ruby-cream',
  'alcremie-matcha-cream',
  'alcremie-mint-cream',
  'alcremie-lemon-cream',
  'alcremie-salted-cream',
  'alcremie-ruby-swirl',
  'alcremie-caramel-swirl',
  'alcremie-rainbow-swirl',
  'charizard-mega-y',
  'charizard-mega-x',
  'mewtwo-mega-y',
  'mewtwo-mega-x',
  'darmanitan-galar-zen',
  'ho-oh',
  'kommo-o',
  'jangmo-o',
  'hakamo-o',
  "sirfetch'd",
  'sirfetch’d',
  "farfetch'd",
  'farfetch’d',
  'necrozma-dusk-mane',
  'necrozma-dawn-wings',
  'tapu bulu',
  'tapu lele',
  'tapu fini',
  'tapu koko',
  'nidoran-m',
  'nidoran-f',
  'urshifu-rapid-strike',
];

// List of Custom Pokemon

export const INFINITE: string[] = [
  'arcanine-mega',
  'rapidash-mega',
  'meganium-mega',
  'octillery-mega',
  'sunflora-mega',
  'dunsparce-mega',
  'mightyena-mega',
  'delcatty-mega',
  'flygon-mega',
  'milotic-mega',
  'castform-mega',
  'luxray-mega',
  'floatzel-mega',
  'togekiss-mega',
  'yanmega-mega',
  'cresselia-mega',
  'darkrai-mega',
  'samurott-mega',
  'klinklang-mega',
  'beartic-mega',
  'noivern-mega',
  'golisopod-mega',
  'cinderace-mega',
  "sirfetch'd-mega",
  'sirfetch’d-mega',
  'tyranitar-gmax',
  'regigigas-gmax',
  'jellicent-gmax',
  'hydreigon-gmax',
  'rotom-dex',
  'rotom-phone',
  'rotom-melee',
  'rotom-speak',
  'chesnaught-clemont',
  'delphox-serena',
  'unown-origin',
  'unown-alphabet',
  'kyurem-omnipotent',
  'mewtwo-armored',
  'nihilego-fusion',
  'guzzlord-fusion',
  'celebi-aumagari',
  'arceus-infinite',
  'silvally-infinite',
  'castform-sandy',
  'castform-nasty',
  'alcremie-black-forest',
  'arceus-aumagari',
  'mantine-aumagari',
  'mantyke-aumagari',
  'raikou-aumagari',
  'entei-aumagari',
  'suicune-aumagari',
  'gible-aumagari',
  'gabite-aumagari',
  'garchomp-aumagari',
  'hippowdon-aumagari',
  'pawniard-aumagari',
  'dubsknight',
  'drilbur-aumagari',
  'excadrill-aumagari',
  'urshifu-dragon-fist',
  'urshifu-tiger-claw',

  // not actually Custom, but not added into Showdown Yet
  // TODO: Check if these were added
  'venusaur-gmax',
  'blastoise-gmax',
  'cinderace-gmax',
  'rillaboom-gmax',
];

export const FARFETCHD = 'farfetch’d';
export const SIRFETCHD = 'sirfetch’d';
export const FARFETCDGALAR = 'farfetch’d-galar';
export const SIRFECHDMEGA = 'sirfetch’d-mega';
export const MIMEJRSTRING = 'mime jr.';
export const MRMIME = 'mr. mime';
export const MRMIMEGALAR = 'mr. mime-galar';
export const MRRIME = 'mr. rime';
export const TYPENULLSTRING = 'type: null';
