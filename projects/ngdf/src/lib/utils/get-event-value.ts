import {
  ControlEvent,
  PristineChangeEvent,
  StatusChangeEvent,
  TouchedChangeEvent,
  ValueChangeEvent,
} from '@angular/forms';
import {
  HiddenChangeEvent,
  ValidatorsChangeEvent,
} from '../ngdf-control-events';

export function getEventValue(event: ControlEvent): unknown {
  if (event instanceof ValueChangeEvent) {
    return event.value;
  }

  if (event instanceof StatusChangeEvent) {
    return event.status;
  }

  if (event instanceof TouchedChangeEvent) {
    return event.touched;
  }

  if (event instanceof HiddenChangeEvent) {
    return event.hidden;
  }

  if (event instanceof ValidatorsChangeEvent) {
    return event.validators;
  }

  if (event instanceof PristineChangeEvent) {
    return event.pristine;
  }

  return;
}
