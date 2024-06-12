import { lint } from 'stylelint';

const config = {
  plugins: ['./index.js'],
  rules: {
    'backpack/use-typography-styles': [true],
  },
};

it('passes when setting non-typography props', async () => {
  const {
    results: [{ warnings }],
  } = await lint({
    code: 'a { color: $bpk-color-sky-blue; }',
    config,
  });

  expect(warnings).toHaveLength(0);
});

it('passes when using backpack mixins', async () => {
  const {
    results: [{ warnings }],
  } = await lint({
    code: '@import "~bpk-mixins/index"; a { @include bpk-caption; }',
    config,
  });

  expect(warnings).toHaveLength(0);
});

it('gives an error when setting font size', async () => {
  const {
    results: [{ warnings }],
  } = await lint({
    code: 'a { font-size: 14rem; }',
    config,
  });

  expect(warnings).toHaveLength(1);

  expect(warnings[0].text).toBe(
    'You should not declare your own `font-size`. Use a Backpack mixin instead.',
  );
});

it('gives an error when using typography tokens', async () => {
  const {
    results: [{ warnings }],
  } = await lint({
    code: '@import "~bpk-mixins/index"; a { font-weight: $bpk-font-weight-bold; }',
    config,
  });

  expect(warnings).toHaveLength(1);

  expect(warnings[0].text).toBe(
    'You should not declare your own `font-weight`. Use a Backpack mixin instead.',
  );
});

it('gives an error when using font shorthand', async () => {
  const {
    results: [{ warnings }],
  } = await lint({
    code: 'a { font: 20px Arial, sans-serif; }',
    config,
  });

  expect(warnings).toHaveLength(1);

  expect(warnings[0].text).toBe(
    'You should not declare your own `font`. Use a Backpack mixin instead.',
  );
});

it('should error on non-supported options', async () => {
  const {
    errored,
    results: [{ invalidOptionWarnings, warnings }],
  } = await lint({
    code: 'a { color: blue; font-size: 14rem }',
    config: {
      plugins: ['./index.js'],
      rules: {
        'backpack/use-typography-styles': 'warn',
      },
    },
  });

  expect(errored).toBeTruthy();
  expect(warnings).toHaveLength(0);
  expect(invalidOptionWarnings).toHaveLength(1);
});
