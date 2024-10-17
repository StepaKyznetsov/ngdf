import {
  NgdfControlConfig,
  NgdfFormArrayConfig,
  NgdfFormGroupConfig,
} from '../src/lib/types/config';
import {
  findControlInConfig,
  isFormArrayConfig,
  isFormControlConfig,
  isFormGroupConfig,
  isValidatorKeyWithWrapperFn,
} from '../src/lib/utils';

describe('utils', () => {
  describe('[findControlInFormGroupConfig]', () => {
    it('returns control config in flat and nested structure, undefined otherwise', () => {
      const formGroup: NgdfFormGroupConfig = {
        type: 'group',
        controls: {
          email: {
            type: 'text',
            value: '',
            validators: {
              email: true,
            },
          },
          password: {
            type: 'password',
            value: '',
          },
          nestedGroup: {
            type: 'group',
            controls: {
              login: {
                type: 'text',
                value: '123',
              },
            },
          },
        },
      };

      expect(findControlInConfig('password', formGroup)).toEqual({
        type: 'password',
        value: '',
      });

      expect(findControlInConfig('login', formGroup, true)).toEqual({
        type: 'text',
        value: '123',
      });

      expect(findControlInConfig('age', formGroup, true)).toBeUndefined();
    });
  });
  describe('type narrowing fns', () => {
    it('returns correct narrow type with similar data types', () => {
      const formControlConfig: NgdfControlConfig = {
        type: 'text',
        value: '',
      };

      const formArrayConfig: NgdfFormArrayConfig = {
        type: 'array',
        controls: [],
      };

      const formGroupConfig: NgdfFormGroupConfig = {
        type: 'group',
        controls: {},
      };

      expect(isFormControlConfig(formControlConfig)).toBeTrue();
      expect(isFormArrayConfig(formControlConfig)).toBeFalse();
      expect(isFormGroupConfig(formControlConfig)).toBeFalse();

      expect(isFormControlConfig(formArrayConfig)).toBeFalse();
      expect(isFormArrayConfig(formArrayConfig)).toBeTrue();
      expect(isFormGroupConfig(formArrayConfig)).toBeFalse();

      expect(isFormControlConfig(formGroupConfig)).toBeFalse();
      expect(isFormArrayConfig(formGroupConfig)).toBeFalse();
      expect(isFormGroupConfig(formGroupConfig)).toBeTrue();

      expect(isValidatorKeyWithWrapperFn('min')).toBeTrue();
      expect(isValidatorKeyWithWrapperFn('nullValidator')).toBeFalse();
    });
  });
});
