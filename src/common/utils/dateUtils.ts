import invariant from 'invariant';
import { isAfter, isValid, format, isBefore } from 'date-fns';

export const validateDate = (value: string): boolean | Error => {
  const date = new Date(value);
  invariant(isValid(date), 'The date format must follow YYYY-MM-DD pattern.');
  invariant(!isAfter(date, Date.now()), 'The date cannot be future.');
  invariant(!isBefore(date, new Date('2003/1/1')), 'The date cannot be before 2003-01-01.');

  return true;
};

export const formatDate = (date: Date) => {
  return format(date.toString(), 'YYYY-MM-DD');
};
