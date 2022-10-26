/* jshint esversion: 6 */

(function() {
  'use strict';

  describe('More Exercises in Recursion', function() {

    describe('9. Binary Search', function() {
      var originalBinarySearch, input1, input2, input3, input4, input5, primes;

      before(function() {
        originalBinarySearch = binarySearch;
        binarySearch = sinon.spy(binarySearch);
        input1 = [1,2,3,4,5,6];
        input2 = [1,2,3,4,5,6,7];
        input3 = [-5,-4,-3,-2,-1];
        input4 = [-6,-5,-4,-3,-2,-1];
        input5 = [-4,-3,-2,-1,0,1,2,3];
        primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43];
      });

      afterEach(function() {
        binarySearch.reset();
      });

      after(function() {
        binarySearch = originalBinarySearch;
      });

      it('should return a number', function() {
        expect(binarySearch(input1, 3)).to.be.a('number');
      });

      it('should not mutate the input array', function() {
        binarySearch(input1, 4);
        expect(input1).to.eql([1,2,3,4,5,6]);
      });

      it('should return index of target', function() {
        expect(binarySearch(input1, 1)).to.equal(0);
        expect(binarySearch(input1, 2)).to.equal(1);
        expect(binarySearch(input1, 3)).to.equal(2);
        expect(binarySearch(input1, 4)).to.equal(3);
        expect(binarySearch(input1, 5)).to.equal(4);
        expect(binarySearch(input1, 6)).to.equal(5);
        expect(binarySearch(input2, 1)).to.equal(0);
        expect(binarySearch(input2, 2)).to.equal(1);
        expect(binarySearch(input2, 3)).to.equal(2);
        expect(binarySearch(input2, 4)).to.equal(3);
        expect(binarySearch(input2, 5)).to.equal(4);
        expect(binarySearch(input2, 6)).to.equal(5);
        expect(binarySearch(input2, 7)).to.equal(6);
        expect(binarySearch(primes, 2)).to.equal(0);
        expect(binarySearch(primes,19)).to.equal(7);
        expect(binarySearch(primes,41)).to.equal(12);
      });

      it('should support negative numbers', function() {
        expect(binarySearch(input3,-5)).to.equal(0);
        expect(binarySearch(input3,-4)).to.equal(1);
        expect(binarySearch(input3,-3)).to.equal(2);
        expect(binarySearch(input3,-2)).to.equal(3);
        expect(binarySearch(input3,-1)).to.equal(4);
        expect(binarySearch(input4,-6)).to.equal(0);
        expect(binarySearch(input4,-5)).to.equal(1);
        expect(binarySearch(input4,-4)).to.equal(2);
        expect(binarySearch(input4,-3)).to.equal(3);
        expect(binarySearch(input4,-2)).to.equal(4);
        expect(binarySearch(input4,-1)).to.equal(5);
        expect(binarySearch(input5,-2)).to.equal(2);
        expect(binarySearch(input5, 2)).to.equal(6);
      });

      it('should return null if target not found', function() {
        expect(binarySearch(input1,-1)).to.be.null;
        expect(binarySearch(input1, 7)).to.be.null;
        expect(binarySearch(input2,-1)).to.be.null;
        expect(binarySearch(input2, 8)).to.be.null;
        expect(binarySearch(input3,-6)).to.be.null;
        expect(binarySearch(input3, 0)).to.be.null;
        expect(binarySearch(input4,-8)).to.be.null;
        expect(binarySearch(input4, 1)).to.be.null;
        expect(binarySearch(input5,-8)).to.be.null;
        expect(binarySearch(input5, 4)).to.be.null;
        expect(binarySearch(primes,32)).to.be.null;
      });

      it('should use recursion by calling self', function() {
        binarySearch(primes, 3);
        expect(binarySearch.callCount).to.be.above(1);
      });

      it('should be invoked with at most four arguments', function() {
        binarySearch(primes, 4);
        binarySearch.args.forEach(arg => {
          expect(arg).to.have.length.of.at.most(4);
        });
      });

      xit('should be invoked with two arguments', function() {
        binarySearch(primes, 4);
        binarySearch.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });



    describe('10. Merge Sort', function() {
      var originalMergeSort, numbers, sorted;

      before(function() {
        originalMergeSort = mergeSort;
        mergeSort = sinon.spy(mergeSort);
      });

      beforeEach(function() {
        numbers = [8,2,20,1,15];
      });

      afterEach(function() {
        mergeSort.reset();
      });

      after(function() {
        mergeSort = originalMergeSort;
      });

      it('should return an array', function() {
        sorted = mergeSort(numbers);
        expect(sorted).to.be.an('array');
      });

      it('should not mutate the input array', function() {
        sorted = mergeSort(numbers);
        expect(numbers).to.eql([8,2,20,1,15]);
        expect(numbers).to.not.equal(sorted);
      });

      it('should sort an array of numbers in order of least to greatest', function() {
        expect(mergeSort([])).to.eql([]);
        expect(mergeSort([0])).to.eql([0]);
        expect(mergeSort([1,0])).to.eql([0,1]);
        expect(mergeSort([0,1,2,3])).to.eql([0,1,2,3]);
        expect(mergeSort([5,4,3,2,1])).to.eql([1,2,3,4,5]);
        expect(mergeSort([10,1,8,5,0])).to.eql([0,1,5,8,10]);
        expect(mergeSort([8,2,20,1,15])).to.eql([1,2,8,15,20]);
      });

      it('should be able to handle negative numbers', function() {
        expect(mergeSort([-1])).to.eql([-1]);
        expect(mergeSort([0,-1])).to.eql([-1,0]);
        expect(mergeSort([0,1,-2,-3])).to.eql([-3,-2,0,1]);
        expect(mergeSort([8,-2,20,1,-15])).to.eql([-15,-2,1,8,20]);
        expect(mergeSort([0,-1,-2,-3,-4,-5,-10])).to.eql([-10,-5,-4,-3,-2,-1,0]);
      });

      it("should not use the native Array sort method", function() {
        // Spying on Array.prototype.sort in testSupport.js
        mergeSort(numbers);
        expect(Array.prototype.sort.called).to.equal(false);
      });

      it('should use recursion by calling self', function () {
        mergeSort(numbers);
        expect(mergeSort.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        mergeSort(numbers);
        mergeSort.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

  });
}());
