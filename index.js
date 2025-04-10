/*
 Copyright 2020-2021 Skyscanner Ltd
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

import useTypographyStylesPlugin from './lib/rules/use-typography-styles';
// These are known to cause false positives. They also need updates to work with Stylelint 15+.
// KOA-6223 to fix or delete completely

// import useColorsPlugin from './lib/rules/use-colors';
// import useTokensPlugin from './lib/rules/use-tokens';

export default [
  // useColorsPlugin,
  // useTokensPlugin,
  useTypographyStylesPlugin,
];
