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
  'tapu kaua’i',
  "tapu kaua'i",
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
  'dragonite-gmax',
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
  'celebi-remius',
  'castform-sandy',
  'alcremie-black-forest',
  'arceus-remius',
  'mantine-remius',
  'mantyke-remius',
  'raikou-remius',
  'entei-remius',
  'suicune-remius',
  'gible-remius',
  'gabite-remius',
  'garchomp-remius',
  'hippowdon-remius',
  'golett-remius',
  'golaunch',
  'pawniard-remius',
  'dubsknight',
  'drilbur-remius',
  'excadrill-remius',
  'urshifu-dragon-fist',
  'urshifu-tiger-claw',
  'tapu kaui-i',
  // not actually Custom, but not added into Showdown Yet
  // TODO: Check if these were added
  'venusaur-gmax',
  'blastoise-gmax',
  'cinderace-gmax',
  'rillaboom-gmax',
];

export const CANGIGANTAMAXLIST: string[] = [
  'alcremie',
  'appletun',
  'bashigon',
  'blastoise',
  'butterfree',
  'carnicreeper',
  'centiskorch',
  'charizard',
  'cinderace',
  'coalossal',
  'copperajah',
  'corviknight',
  'dreadnaw',
  'duraludon',
  'dragonite',
  'eevee',
  'flapple',
  'garbodor',
  'gengar',
  'grimmsnarl',
  'hatterene',
  'inteleon',
  'kingler',
  'lapras',
  'machamp',
  'melmetal',
  'meowth',
  'orbeetle',
  'pikachu',
  'regigigas',
  'rillaboom',
  'sandaconda',
  'toxtricity',
  'toxtricity-low-key',
  'dragonite',
  'tyranitar',
  'urshifu',
  'urshifu-rapid-strike',
  'urshifu-dragon-fist',
  'urshifu-tiger-claw',
  'venusaur',
  'victini',
  'voltergeist',
];

export const GIGANTAMAXLIST = [
  'alcremie-gmax',
  'appletun-gmax',
  'bashigon-gmax',
  'blastoise-gmax',
  'butterfree-gmax',
  'carnicreeper-gmax',
  'centiskorch-gmax',
  'charizard-gmax',
  'cinderace-gmax',
  'coalossal-gmax',
  'copperajah-gmax',
  'corviknight-gmax',
  'dreadnaw-gmax',
  'duraludon-gmax',
  'dragonite-gmax',
  'eevee-gmax',
  'flapple-gmax',
  'garbodor-gmax',
  'gengar-gmax',
  'grimmsnarl-gmax',
  'hatterene-gmax',
  'inteleon-gmax',
  'kingler-gmax',
  'lapras-gmax',
  'machamp-gmax',
  'melmetal-gmax',
  'meowth-gmax',
  'orbeetle-gmax',
  'pikachu-gmax',
  'regigigas-gmax',
  'rillaboom-gmax',
  'sandaconda-gmax',
  'toxtricity-gmax',
  'toxtricity-low-key-gmax',
  'dragonite-gmax',
  'tyranitar-gmax',
  'urshifu-gmax',
  'urshifu-rapid-strike-gmax',
  'urshifu-dragon-fist-gmax',
  'urshifu-tiger-claw-gmax',
  'venusaur-gmax',
  'victini-gmax',
  'voltergeist-gmax',
];

export const MEGAEVOLUTIONLIST: string[] = [
  'venusaur-mega',
  'charizard-mega-y',
  'charizard-mega-x',
  'blastoise-mega',
  'beedrill-mega',
  'pidgeot-mega',
  'arcanine-mega',
  'alakazam-mega',
  'rapidash-mega',
  'slowbro-mega',
  'gengar-mega',
  'kangaskhan-mega',
  'pinsir-mega',
  'gyarados-mega',
  'aerodactyl-mega',
  'mewtwo-mega-y',
  'mewtwo-mega-x',
  'meganium-mega',
  'ampharos-mega',
  'sunflora-mega',
  'dunsparce-mega',
  'steelix-mega',
  'scizor-mega',
  'heracross-mega',
  'octillery-mega',
  'hounddom-mega',
  'tyranitar-mega',
  'sceptile-mega',
  'blaziken-mega',
  'swampert-mega',
  'mightyena-mega',
  'gardevoir-mega',
  'delcatty-mega',
  'sableye-mega',
  'mawile-mega',
  'aggron-mega',
  'medicham-mega',
  'manectric-mega',
  'sharpedo-mega',
  'camerupt-mega',
  'flygon-mega',
  'altaria-mega',
  'milotic-mega',
  'castform-mega',
  'banette-mega',
  'absol-mega',
  'glalie-mega',
  'salamence-mega',
  'metagross-mega',
  'latias-mega',
  'latios-mega',
  'rayquaza-mega',
  'luxray-mega',
  'floatzel-mega',
  'lopunny-mega',
  'garchomp-mega',
  'lucario-mega',
  'abomasnow-mega',
  'togekiss-mega',
  'yanmega-mega',
  'gallade-mega',
  'cresselia-mega',
  'darkrai-mega',
  'samurott-mega',
  'audino-mega',
  'klinklang-mega',
  'beartic-mega',
  'noivern-mega',
  'diancie-mega',
  'golisopod-mega',
  'cinderace-mega',
  "sirfetch'd-mega",
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
