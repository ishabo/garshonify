import langConfig from './langConfig';
const getLangConfig = (config) => {
    let langConf;
    const langConfName = `${config['source']}-to-${config['target']}`;
    langConf = langConfig[langConfName];
    if (langConf === void 0) {
        throw new Error(`${langConfName} is not a valid lang config`);
    }
    return langConf;
};
const replaceCharsByPatterns = (times) => (sentence, patterns) => {
    let modifiedSentence = sentence;
    [...Array(times)].forEach(() => {
        for (const str of Object.keys(patterns)) {
            modifiedSentence = modifiedSentence.replace(new RegExp(str, 'g'), patterns[str]);
        }
    });
    return modifiedSentence;
};
export default ({ sentence, langConfig, customLangConfig, byCombo }) => {
    const langConf = customLangConfig || getLangConfig(langConfig);
    let transliteration = replaceCharsByPatterns(2)(sentence, langConf.cleanUp);
    if (!!byCombo) {
        transliteration = replaceCharsByPatterns(1)(transliteration, langConf.byCombo);
    }
    return replaceCharsByPatterns(1)(transliteration, langConf.byChar);
};
//# sourceMappingURL=garshonify.js.map