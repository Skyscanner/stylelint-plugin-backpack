import { checkValue, isAllowedValue, isBpkToken } from './utils';

export default function parseShorthand(value) {
  const shorthandValues = value.split(' ');
  let validValue = true;

  shorthandValues.forEach((val) => {
    if (isBpkToken(val) || isAllowedValue(val) || checkValue(val)) {
      return;
    }
    validValue = false;
  });
  return validValue;
}
