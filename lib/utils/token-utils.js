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

import chain from 'lodash/chain';
import kebabCase from 'lodash/kebabCase';
import mapKeys from 'lodash/mapKeys';

import { props as WEB_TOKENS } from '@skyscanner/bpk-foundations-web/tokens/base.raw.json';

const TOKENS = mapKeys(WEB_TOKENS, (value, key) => `${key}`);

/*
 * Gets all tokens based on type e.g. `color` or  `media-query`
 */
export const tokensByCategory = (category) =>
  chain(TOKENS)
    .filter({ category })
    .map(({ name, value }) => ({
      name: `$bpk-${kebabCase(name)}`,
      value,
    }))
    .value();

/*
 * Gets all tokens based on type to ensure we capture all tokens
 * e.g. `color` spans different tokens but fall under other catergories
 */
export const tokensByType = (type) =>
  chain(TOKENS)
    .filter({ type })
    .map(({ name, value }) => ({
      name: `$bpk-${kebabCase(name)}`,
      value,
    }))
    .value();
