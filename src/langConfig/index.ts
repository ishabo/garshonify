import syrToAra from './syrToAra';
import araToSyr from './araToSyr';

import { ILangConfig } from '../garshonify';

const langConfig: { [key: string]: ILangConfig } = {
  'clSyr-to-clAra': syrToAra,
  'turSyr-to-clAra': syrToAra,
  'clAra-to-clSyr': araToSyr,
  'clAra-to-turSyr': araToSyr,
};

export default langConfig;
