# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 2.0.0 - Node 16 upgrade

## Breaking
- Drops support for Node versions < 16. No new functionality is introduced, but from this point forwards it should not be assumed Node 12 will work.
- Updated `@skyscanner/eslint-config-skyscanner` to latest version.

## 1.3.0 - Update dependencies

**Changed:**

- Updated `stylelint` peer version to new v14 to align with `stylelint-config-skyscanner`.

## 1.2.1 - Fix dependencies

**Fixed:**

- Moved `stylelint` dependency to `devDeps` instead of `dependencies` as this requirement is fulfiled by the `stylelint-config-skyscanner` when installed and prevents npm installing two different versions and causing conflicts in running.

## 1.2.0 - Create a rule to send warnings when typography props are used

**Added:**

Created `use-typography-styles` rule that is fired whenever `font-size`, `line-height`, `font-weight` or `letter-spacing` are declared, or when the `font` shorthand is used. This enforces the use of backpack typography mixins which ensure consistent typography across all of Skyscanner.

**Changed:**

Spring clean updates:
  - Migrated to Backpack Foundations.
  - Upgraded lodash to latest
  - Updated postcss-values-parser to latest
  - Updated tinycolor2 to latest

## 1.1.3 - Fix secondary issue with disabling rules

**Fixed:**
`use-colors`
`use-tokens` - Previous version fixed rule validation, this version fixes allowing rules to be correctly disabled using `false` option.

## 1.1.2 - Fix issue with disabling rules

**Fixed:**
`use-colors`
`use-tokens` - Fixed an issue where the rule couldn't be disabled and was not validating the rule as expected.

## 1.1.1 - Fix linting rules for token multiples

**Fixed:**

- `use-tokens`
  - Fixed issue where multiplications of tokens threw errors instead of passing.

## 1.1.0 - Updated linting rules

ADDED:
`use-tokens` - Added an exception for values that don't have Bpk values such as `auto` and `0` - Added an exception when using the `%` unit as these don't have Bpk replacements - This rule now supports shorthand CSS props `margin`, `padding`, `border-radius` and `border-width` for linting.

FIXED:
`use-colors`: - Added checking against full list of possible colors - such as badge colors or banner alert colors

`use-tokens`: - Changed token props to use correct css selectors as they previously were using React Native selectors.

## 1.0.0 - Added token linting rules

- Added linting rules for testing colour tokens in use.
- Added linting rules for testing spacing, radii and border tokens when not in binary expressions.
