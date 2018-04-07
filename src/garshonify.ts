import langConfig from './langConfig';

export type TSourceLangs = 'clAra' | 'eng';
export type TTargetLangs = 'clSyr' | 'turSyr';
export type TLangs = TSourceLangs | TTargetLangs | string;

export interface IDictionary<T extends number | string> {
  [k: string]: T;
}

export interface IGarshonifyProps {
  sentence: string;
  langConfig?: { source: TLangs, target: TLangs };
  customLangConfig?: ILangConfig;
  byCombo?: boolean;
}


export interface ILangConfig {
  cleanUp: IDictionary<string>;
  byCombo: IDictionary<string>;
  byChar: IDictionary<string>;
}

const getLangConfig = (config: IGarshonifyProps['langConfig']) => {
  let langConf: ILangConfig;

  const langConfName = `${config['source']}-to-${config['target']}`;
  langConf = langConfig[langConfName];

  if (langConf === void (0)) {
    throw new Error(`${langConfName} is not a valid lang config`);
  }

  return langConf;
};

const garshonify = ({ sentence, langConfig, customLangConfig, byCombo }: IGarshonifyProps) => {
  const langConf = customLangConfig || getLangConfig(langConfig);

  let transliteration = replaceChars(sentence, langConf.cleanUp);

  if (!!byCombo) {
    transliteration = replaceCharsByPatterns(transliteration, langConf.byCombo);
  }

  return replaceChars(transliteration, langConf.byChar);
};

const replaceChars = (chars: string, replacementObject: ILangConfig['byChar'] = {}) =>
  chars.split('').map((char: string) => {
    let newChar;
    try {
      if (replacementObject[char]) {
        newChar = replacementObject[char];
      } else {
        newChar = char;
      }
    } catch (error) {
      console.warn(error);
      newChar = '';
    }
    return newChar;
  }).join('');

const replaceCharsByPatterns = (sentence: string, patterns: object) => {
  let str: string;
  let modifiedSentence = sentence;

  for (str of Object.keys(patterns)) {
    modifiedSentence = modifiedSentence.replace(new RegExp(str, 'g'), patterns[str]);
  }

  return modifiedSentence;
};

export default garshonify;
