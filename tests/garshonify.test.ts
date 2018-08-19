import garshonify from '../src/garshonify';

describe('garshonify', () => {
  describe('When using internal lang config', () => {
    it('converts syriac to arabic letters', () => {
      const langConfig = { source: 'clSyr', target: 'clAra' };
      const sentence = 'ܐܒܓܕ ܗܘܙ ܚܛܝ ܟܠܡܢ ܣܥܦܨ ܩܪܫܬ';
      const garshoni = 'ابجد هوز حطي كلمن سعفص قرشت';
      const garshoniByCombo = 'ابجد هوز حطي كلمن سعفص قرشت';

      expect(garshonify({ sentence, langConfig })).toEqual(garshoni);

      expect(garshonify({ sentence, langConfig, byCombo: true })).toEqual(garshoniByCombo);
    });

    it('converts arabic to syriac letters', () => {
      const langConfig = { source: 'clAra', target: 'clSyr' };

      const garshoni = 'ܐܒܓܕ ܗܘܙ ܚܛܝ ܟܠܡܢ ܣܥܦܨ ܩܪܫܬ';
      const sentence = 'ابجد هوز حطي كلمن سعفص قرشت';

      expect(garshonify({ sentence, langConfig })).toEqual(garshoni);
    });

    it('converts taskhil', () => {
      const langConfig = { source: 'clSyr', target: 'clAra' };
      const sentence = 'ܐܶܢܳܐ ܪܳܚܶܡ ܐ̱ܢܳܐ ܠܐܶܡܳܐ ܕܝܠܝ̱';
      const garshoni = 'اِنُا رُحِم ا̱نُا لاِمُا ديلي̱';
      const garshoniByCombo = 'إِنُا رُحِم-نُا لإِمُا ديل';

      expect(garshonify({ sentence, langConfig })).toEqual(garshoni);

      expect(garshonify({ sentence, langConfig, byCombo: true })).toEqual(garshoniByCombo);
    });

    it('converts combos and cleanup', () => {
      const langConfig = { source: 'clSyr', target: 'clAra' };
      const sentence =
        'ܒ̥ܪܻܫܺܝܬ̥ ܐܻܝܬ݂ܱܘܗ̄ܝ ܗ̄ܘܳܐ ܡܶܠܬ̥ܳܐ ܘܗܽܘ ܡܶܠܬ̥ܴܐ' +
        'ܐܻܝܬ݂ܱܘܗ̄ܝ ܗ̄ܘܳܐ ܠܘܳܬ̥ ܐܱܠܴܗܳܐ ' +
        'ܘܰܐܠܴܗܳܐ ܐܻܝܬ݂ܱܘܗ̄ܝ ܗ̄ܘܳܐ ܗܽܘ ܡܶܠܬ݂ܴܐ';

      const garshoni =
        'ڤرٍشٍيث إٍيثَو وُا مِلثُا وهٌو مِلثُا' + 'إٍيثَو وُا لوُث آلُهُا ' + 'وَالُهُا إٍيثَو وُا هٌو مِلثُا';

      const garshoniOptions = { sentence, langConfig, byCombo: true };
      expect(garshonify(garshoniOptions)).toEqual(garshoni);
    });
  });

  describe('When using special syriac chars', () => {
    it('converts rish without dot', () => {
      const langConfig = { source: 'clSyr', target: 'clAra' };

      const multipleOptions = [
        { sentence: 'ܐܺܝܬ̥ ܠܟ̥ܘܢ ܟܶܪ̈ܟܶܐ', garshoni: 'إٍيث لخون كِركِا' },
        { sentence: 'ܗܶܢܽܘܢ ܓܰܒ̥ܖ̈ܶܐ', garshoni: 'هِنٌون جَڤرِا' },
        { sentence: 'ܐܺܝܬ̥ ܠܗܶܝܢ ܡܰܠܦ̥ܳܢܺܝܬ̥ܳܐ ܛܳܒ̥ܬ̥ܳܐ', garshoni: 'إٍيث لهِين مَلفُنٍيثُا طُڤثُا' }
      ];

      for (let { garshoni, sentence } of multipleOptions) {
        const options = { sentence: sentence, langConfig, byCombo: true };
        expect(garshonify(options)).toEqual(garshoni);
      }
    });
  });

  describe('When using external lang config', () => {
    const customLangConfig = {
      byCombo: { sh: '$', ch: '£', th: '∂' },
      byChar: { s: '5', i: '1', e: '3', o: '0' },
      cleanUp: { '-': ' ', _: ' ' }
    };

    it('replaces chars & cleans-up by default', () => {
      const sentence = 'This is a test-of_chars';
      const garshoniOptions = { sentence, customLangConfig };

      expect(garshonify(garshoniOptions)).toEqual('Th15 15 a t35t 0f char5');
    });

    it('replaces combos', () => {
      const sentence = 'This should change with combos';
      const garshoniOptions = { sentence, customLangConfig, byCombo: true };

      expect(garshonify(garshoniOptions)).toEqual('Th15 $0uld £ang3 w1∂ c0mb05');
    });
  });
});
