export declare type TSourceLangs = 'clAra' | 'eng';
export declare type TTargetLangs = 'clSyr' | 'turSyr';
export declare type TLangs = TSourceLangs | TTargetLangs | string;
export interface IDictionary<T extends number | string> {
    [k: string]: T;
}
export interface IGarshonifyProps {
    sentence: string;
    langConfig?: {
        source: TLangs;
        target: TLangs;
    };
    customLangConfig?: ILangConfig;
    byCombo?: boolean;
}
export interface ILangConfig {
    cleanUp: IDictionary<string>;
    byCombo: IDictionary<string>;
    byChar: IDictionary<string>;
}
declare const _default: ({ sentence, langConfig, customLangConfig, byCombo }: IGarshonifyProps) => string;
export default _default;
