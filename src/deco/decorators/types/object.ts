import { TypeDecorator } from './type-decorator';
import { validateString, validateInteger, validateFloat, validateBoolean, validateDate } from './basics';
import { getLogger, Logger } from 'aurelia-logging';
let log: Logger = getLogger('decorators:type:object');

export let validateObject = (value: any, options: any) => {
  if (value === null || value === undefined) return true;
  if (typeof value !== 'object') return false;
  if (options && options.keys) {
    let allowOtherKeys = (options.allowOtherKeys === true);

    // validate required fields
    for (let key of Object.keys(options.keys)) {
      let keySettings = options.keys[key];
      if (keySettings.required === true && !value[key]) return false;
    }

    for (let key of Object.keys(value)) {
      let keySettings = options.keys[key];
      if (!keySettings && !allowOtherKeys) return false;
      if (!keySettings) continue;
      if (keySettings.type === 'string' && !validateString(value[key])) return false;
      if (keySettings.type === 'integer' && !validateInteger(value[key])) return false;
      if (keySettings.type === 'float' && !validateFloat(value[key])) return false;
      if (keySettings.type === 'boolean' && !validateBoolean(value[key])) return false;
      if (keySettings.type === 'date' && !validateDate(value[key])) return false;
    }
  }
  return true;
}
export let objectDecorator = new TypeDecorator('object');
objectDecorator.validate = (value: any, obj: any, options: any) => {
  return validateObject(value, options);
};
export const object = objectDecorator.decorator();
