import { TestBed } from '@angular/core/testing';
import {
  ngdfFormArray,
  ngdfFormControl,
  ngdfFormGroup,
} from '../src/lib/model';
import { NgdfFormBuilder } from './../src/lib/ngdf-form-builder';

describe('NgdfFormBuilder', () => {
  let service: NgdfFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgdfFormBuilder);
  });

  describe('[buildGroup]', () => {
    it('returns NgdfFormGroup with no controls', () => {
      const group = ngdfFormGroup({}, []);
      const buildGroup = service.group({
        type: 'group',
        controls: {},
      });

      expect(JSON.stringify(buildGroup)).toBe(JSON.stringify(group));
    });

    it('returns correct controls', () => {
      const group = ngdfFormGroup(
        {
          a: ngdfFormControl('123'),
          b: ngdfFormGroup({}),
          c: ngdfFormArray([]),
        },
        [],
      );

      const buildGroup = service.group({
        type: 'group',
        controls: {
          a: {
            type: 'text',
            value: '123',
          },
          b: {
            type: 'group',
            controls: {},
          },
          c: {
            type: 'array',
            controls: [],
          },
        },
      });

      expect(buildGroup.controls['a']).toEqual(group.controls['a']);
    });
  });

  //   describe('[buildFormArray]', () => {});

  //   describe('[buildControl]', () => {});

  //   describe('[resolveValidators]', () => {});
});
