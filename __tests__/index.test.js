const { getMean, getMedian, getMode }  = require('../index');

describe('index math function test', () => {
    it('getMean should return the mean of an array of numbers', () => {
        expect(getMean([1, 2, 3, 4, 5])).toBe(3);
    });

    it('getMedian should return the median of an array of numbers', () => {
        expect(getMedian([1, 2, 3, 4, 5])).toBe(3);
    });

    it('getMode should return the mode of an array of numbers', () => {
        expect(getMode([1, 2, 2, 3, 4, 5])).toBe('2');
    });
}); 
