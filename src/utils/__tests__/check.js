import check from '../check';

describe('check utility', () => {
  describe('isArrayEmpty', () => {
    test('[] should be true', () => {
      const r = check.isArrayEmpty([]);
      expect(r).toBe(true);
    });

    test('[1,2,3] should be false', () => {
      const r = check.isArrayEmpty([1, 2, 3]);
      expect(r).toBe(false);
    });

    test('[undefined] should be false', () => {
      const r = check.isArrayEmpty([undefined]);
      expect(r).toBe(false);
    });

    test('[null] should be false', () => {
      const r = check.isArrayEmpty([null]);
      expect(r).toBe(false);
    });

    test('Array(2) should be false', () => {
      const r = check.isArrayEmpty(Array(2));
      expect(r).toBe(false);
    });

    test('Array(0) should be true', () => {
      const r = check.isArrayEmpty(Array(0));
      expect(r).toBe(true);
    });

    test('{} should be false', () => {
      const r = check.isArrayEmpty({});
      expect(r).toBe(false);
    });
  });
});
