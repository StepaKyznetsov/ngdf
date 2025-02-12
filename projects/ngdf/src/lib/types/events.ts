import {
  FormResetEvent,
  FormSubmittedEvent,
  PristineChangeEvent,
  StatusChangeEvent,
  TouchedChangeEvent,
  ValueChangeEvent,
} from '@angular/forms';
import {
  HiddenChangeEvent,
  ValidatorsChangeEvent,
} from '../ngdf-control-events';

export const ngdfEventMap = {
  value: ValueChangeEvent,
  status: StatusChangeEvent,
  touched: TouchedChangeEvent,
  hidden: HiddenChangeEvent,
  validators: ValidatorsChangeEvent,
  formReset: FormResetEvent,
  formSubmitted: FormSubmittedEvent,
  pristine: PristineChangeEvent,
} as const;

export type NgdfEventKey = keyof typeof ngdfEventMap;
