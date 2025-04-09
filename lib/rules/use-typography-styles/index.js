/*
 Copyright 2020-2022 Skyscanner Ltd
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import stylelint from 'stylelint';

const TYPOGRAPHY_PROPS = [
  'font-size',
  'line-height',
  'font-weight',
  'letter-spacing',
  'font',
];

const ruleName = 'backpack/use-typography-styles';

const rule = (primaryOption) => (postcssRoot, postcssResult) => {
  // If rule is disabled then we don't run the rule
  const validOptions = stylelint.utils.validateOptions(
    postcssResult,
    ruleName,
    {
      actual: primaryOption,
      possible: [true, false],
    },
  );

  if (!validOptions) {
    return;
  }

  if (!primaryOption) {
    return;
  }

  postcssRoot.walkDecls((decl) => {
    const { prop, value } = decl;

    if (TYPOGRAPHY_PROPS.includes(prop)) {
      const message = `You should not declare your own \`${prop}\`. Use a Backpack mixin instead.`;

      // Report back the violation
      stylelint.utils.report({
        ruleName,
        result: postcssResult,
        message,
        node: decl,
        word: value,
      });
    }
  });
};

export default stylelint.createPlugin(ruleName, rule);
