//@ts-nocheck
export const UPDATE_ATTRIBUTE_VALUE = 'UPDATE_ATTRIBUTE_VALUE';

export function updateAttribute(index, value) {
  return {
    type: UPDATE_ATTRIBUTE_VALUE,
    index,
    value,
  };
}
