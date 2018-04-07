import langConfig from './langConfig';
const getLangConfig = (config) => {
    let langConf;
    const langConfName = `${config['source']}-to-${config['target']}`;
    langConf = langConfig[langConfName];
    if (langConf === void (0)) {
        throw new Error(`${langConfName} is not a valid lang config`);
    }
    return langConf;
};
const garshonify = ({ sentence, langConfig, customLangConfig, byCombo }) => {
    const langConf = customLangConfig || getLangConfig(langConfig);
    let transliteration = replaceChars(sentence, langConf.cleanUp);
    if (!!byCombo) {
        transliteration = replaceCharsByPatterns(transliteration, langConf.byCombo);
    }
    return replaceChars(transliteration, langConf.byChar);
};
const replaceChars = (chars, replacementObject = {}) => chars.split('').map((char) => {
    let newChar;
    try {
        if (replacementObject[char]) {
            newChar = replacementObject[char];
        }
        else {
            newChar = char;
        }
    }
    catch (error) {
        console.warn(error);
        newChar = '';
    }
    return newChar;
}).join('');
const replaceCharsByPatterns = (sentence, patterns) => {
    let str;
    let modifiedSentence = sentence;
    for (str of Object.keys(patterns)) {
        modifiedSentence = modifiedSentence.replace(new RegExp(str, 'g'), patterns[str]);
    }
    return modifiedSentence;
};
export default garshonify;
//# sourceMappingURL=garshonify.js.map