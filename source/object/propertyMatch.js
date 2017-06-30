import acid from '../namespace/index';
import { assign } from '../internal/object';
import { eachWhile } from '../array/each';
export const propertyMatch = (object, compareObject, properties) => {
  let result = false;
  eachWhile(properties, (property) => {
    result = object[property] === compareObject[property];
    return result;
  });
  return result;
};
assign(acid, {
  propertyMatch,
});
