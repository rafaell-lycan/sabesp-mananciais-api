import { expect } from 'chai';
import { validateDate, formatDate } from '../../src/common/utils/dateUtils';

describe('Utils: DateUtils', () => {
  describe('validateDate', () => {
    it('should return true when a date is valid', () => {
      expect(validateDate('2019-1-1')).to.true;
    });

    it('should throw an error when has a wrong format', () => {
      expect(() => validateDate('somevalue')).to.throw(/The date format must follow YYYY-MM-DD/);
    });

    it('should throw an error when date is before 2003/1/1', () => {
      expect(() => validateDate('2000/1/1')).to.throw(/The date cannot be before 2003-01-01/);
    });

    it('should throw an error when date in the future', () => {
      expect(() => validateDate('2049/1/1')).to.throw(/The date cannot be future/);
    });
  });

  describe('formatDate', () => {
    it('should return a formated date YYYY-MM-DD', () => {
      expect(formatDate(new Date('2019/1/1'))).to.equal('2019-01-01');
    });

    it('should throw an error when has a wrong format', () => {
      // @ts-ignore
      expect(formatDate('somevalue')).to.eql('Invalid Date');
    });
  });
});
