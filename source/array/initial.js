import acid from '../namespace/index';
import { assign } from '../internal/object';
export const initial = (array) => {
  return array.slice(0, array.length - 1);
};
assign(acid, {
  initial
});
