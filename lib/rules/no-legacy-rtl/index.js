import stylelint from 'stylelint';

const ruleName = 'backpack/no-legacy-rtl';

const messages = {
  bpkRtlMixin:
    'Do not use the `bpk-rtl` mixin. Use CSS Logical Properties instead (e.g. `margin-inline-start` instead of `margin-left`).',
  rtlSelector:
    'Do not use `html[dir=rtl]` selectors. Use CSS Logical Properties instead (e.g. `margin-inline-start` instead of `margin-left`).',
};

const rule = (primaryOption) => (postcssRoot, postcssResult) => {
  const validOptions = stylelint.utils.validateOptions(
    postcssResult,
    ruleName,
    {
      actual: primaryOption,
      possible: [true, false],
    },
  );

  if (!validOptions || !primaryOption) {
    return;
  }

  postcssRoot.walkAtRules('include', (atRule) => {
    // Match bpk-rtl and bpk-rtl() in both direct and namespaced forms (e.g. utils.bpk-rtl)
    // but not bpk-rtl-foo or other suffixed variants
    if (/(?:^|\.)bpk-rtl(\s*\(|$)/.test(atRule.params)) {
      stylelint.utils.report({
        ruleName,
        result: postcssResult,
        message: messages.bpkRtlMixin,
        node: atRule,
        word: atRule.params,
      });
    }
  });

  postcssRoot.walkRules((ruleNode) => {
    // Matches html[dir=rtl] in all valid forms: optional quotes, spaces around =,
    // and the case-insensitive flag (e.g. html[dir='rtl' i])
    if (
      /html\s*\[\s*dir\s*=\s*['"]?rtl['"]?\s*(?:i\s*)?\]/i.test(
        ruleNode.selector,
      )
    ) {
      stylelint.utils.report({
        ruleName,
        result: postcssResult,
        message: messages.rtlSelector,
        node: ruleNode,
        word: ruleNode.selector,
      });
    }
  });
};

export default stylelint.createPlugin(ruleName, rule);
