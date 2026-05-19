import stylelint from 'stylelint';

const config = {
  plugins: ['./index.js'],
  rules: {
    'backpack/no-legacy-rtl': [true],
  },
};

it('passes when using CSS logical properties', async () => {
  const {
    results: [{ warnings }],
  } = await stylelint.lint({
    code: 'a { margin-inline-start: 8px; }',
    config,
  });

  expect(warnings).toHaveLength(0);
});

it('passes when using unrelated mixins', async () => {
  const {
    results: [{ warnings }],
  } = await stylelint.lint({
    code: '@import "~bpk-mixins/index"; a { @include bpk-caption; }',
    config,
  });

  expect(warnings).toHaveLength(0);
});

it('gives an error when using the bpk-rtl mixin', async () => {
  const {
    results: [{ warnings }],
  } = await stylelint.lint({
    code: 'a { @include bpk-rtl() { margin-left: 8px; } }',
    config,
  });

  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(
    'Do not use the `bpk-rtl` mixin. Use CSS Logical Properties instead (e.g. `margin-inline-start` instead of `margin-left`). (backpack/no-legacy-rtl)',
  );
});

it('gives an error when using the namespaced utils.bpk-rtl mixin', async () => {
  const {
    results: [{ warnings }],
  } = await stylelint.lint({
    code: 'a { @include utils.bpk-rtl { margin-left: 8px; } }',
    config,
  });

  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(
    'Do not use the `bpk-rtl` mixin. Use CSS Logical Properties instead (e.g. `margin-inline-start` instead of `margin-left`). (backpack/no-legacy-rtl)',
  );
});

it("gives an error when using html[dir='rtl'] selector with single quotes", async () => {
  const {
    results: [{ warnings }],
  } = await stylelint.lint({
    code: "html[dir='rtl'] a { margin-left: 0; }",
    config,
  });

  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(
    'Do not use `html[dir=rtl]` selectors. Use CSS Logical Properties instead (e.g. `margin-inline-start` instead of `margin-left`). (backpack/no-legacy-rtl)',
  );
});

it('gives an error when using html[dir="rtl"] selector with double quotes', async () => {
  const {
    results: [{ warnings }],
  } = await stylelint.lint({
    code: 'html[dir="rtl"] a { margin-left: 0; }',
    config,
  });

  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(
    'Do not use `html[dir=rtl]` selectors. Use CSS Logical Properties instead (e.g. `margin-inline-start` instead of `margin-left`). (backpack/no-legacy-rtl)',
  );
});

it('gives an error when using html[dir=rtl] selector with spaces around =', async () => {
  const {
    results: [{ warnings }],
  } = await stylelint.lint({
    code: 'html[dir = rtl] a { margin-left: 0; }',
    config,
  });

  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(
    'Do not use `html[dir=rtl]` selectors. Use CSS Logical Properties instead (e.g. `margin-inline-start` instead of `margin-left`). (backpack/no-legacy-rtl)',
  );
});

it("gives an error when using html[dir='rtl' i] case-insensitive selector", async () => {
  const {
    results: [{ warnings }],
  } = await stylelint.lint({
    code: "html[dir='rtl' i] a { margin-left: 0; }",
    config,
  });

  expect(warnings).toHaveLength(1);
  expect(warnings[0].text).toBe(
    'Do not use `html[dir=rtl]` selectors. Use CSS Logical Properties instead (e.g. `margin-inline-start` instead of `margin-left`). (backpack/no-legacy-rtl)',
  );
});

it('should error on non-supported options', async () => {
  const {
    errored,
    results: [{ invalidOptionWarnings, warnings }],
  } = await stylelint.lint({
    code: 'a { color: blue; }',
    config: {
      plugins: ['./index.js'],
      rules: {
        'backpack/no-legacy-rtl': 'warn',
      },
    },
  });

  expect(errored).toBeTruthy();
  expect(warnings).toHaveLength(0);
  expect(invalidOptionWarnings).toHaveLength(1);
});
