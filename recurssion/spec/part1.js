/* jshint esversion: 6 */

(function() {
  'use strict';

  describe('Exercises in Recursion', function() {

    describe('1. Sum of Integers', function() {
      var originalSum;

      before(function() {
        originalSum = sum;
        sum = sinon.spy(sum);
      });

      afterEach(function() {
        sum.reset();
      });

      after(function() {
        sum = originalSum;
      });

      it('should return a number', function() {
        expect(sum([1,2,3,4,5,6])).to.be.a('number');
      });

      it('should return the sum of an array of non-negative integers', function() {
        expect(sum([1,2,3,4,5,6])).to.equal(21);
        expect(sum([3,0,34,7,18])).to.equal(62);
      });

      it('should return the sum of an array of negative integers', function() {
        expect(sum([-1,-2,-3,-4,-5,-6])).to.equal(-21);
        expect(sum([-3,-0,-34,-7,-18])).to.equal(-62);
      });

      it('should return the sum of an array of mixed non-negative and negative integers', function() {
        expect(sum([1,-2,3,-4,5,-6])).to.equal(-3);
        expect(sum([-12,34,-56,78])).to.equal(44);
        expect(sum([3,0,-34,-7,18])).to.equal(-20);
      });

      it('should return 0 for empty array', function() {
        expect(sum([])).to.equal(0);
      });

      it('should accept an array with a single integer', function() {
        expect(sum([4])).to.equal(4);
        expect(sum([0])).to.equal(0);
        expect(sum([-37])).to.equal(-37);
      });

      it('should not mutate the input array', function() {
        var input = [1,2,3,4,5];
        sum(input);
        expect(input).to.eql([1,2,3,4,5]);
      });

      it('should use recursion by calling self', function() {
        sum([1,2,3,4,5,6]);
        expect(sum.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        sum([1,2,3,4,5,6]);
        sum.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });



    describe('2. Sum Integers in Array', function() {
      var originalArraySum;

      before(function() {
        originalArraySum = arraySum;
        arraySum = sinon.spy(arraySum);
      });

      afterEach(function() {
        arraySum.reset();
      });

      after(function() {
        arraySum = originalArraySum;
      });

      it('should return a number', function() {
        expect(arraySum([[1],[[2]],3,4])).to.be.a('number');
      });

      it('should not use flatten or native flat method', function() {
        var originalFlatten = flatten;
        flatten = sinon.spy(flatten);
        arraySum([[1],[2,3],[[4]],5]);
        expect(flatten.called).to.be.false;
        flatten = originalFlatten;
        // Spying on Array.prototype.flat in testSupport.js
        expect(Array.prototype.flat.called).to.be.false;
      });

      it('should return the sum of nested arrays containing non-negative integers', function() {
        expect(arraySum([[1],[2,3],[[4]],5])).to.equal(15);
        expect(arraySum([[12,[[34],[56]],78]])).to.equal(180);
        expect(arraySum([3,[0,[34,[7,[18]]]]])).to.equal(62);
      });

      it('should return the sum of nested arrays containing negative integers', function() {
        expect(arraySum([[-1],[-2,-3],[[-4]],-5])).to.equal(-15);
        expect(arraySum([[-12,[[-34],[-56]],-78]])).to.equal(-180);
        expect(arraySum([-3,[0,[-34,[-7,[-18]]]]])).to.equal(-62);
      });

      it('should return the sum of nested arrays containing both non-negative and negative integers', function() {
        expect(arraySum([[1],[-2,3],[[-4]],5,-6])).to.equal(-3);
        expect(arraySum([[-12,[[34],[-56]],78]])).to.equal(44);
        expect(arraySum([3,[0,[-34,[-7,[18]]]]])).to.equal(-20);
      });

      it('should return 0 for empty array', function() {
        expect(arraySum([])).to.equal(0);
      });

      it('should accept an array with a single integer', function() {
        expect(arraySum([4])).to.equal(4);
        expect(arraySum([0])).to.equal(0);
        expect(arraySum([-37])).to.equal(-37);
      });

      it('should not mutate the input array', function() {
        var input = [[1],[[2]],3,4];
        arraySum(input);
        expect(input).to.eql([[1],[[2]],3,4]);
      });

      it('should use recursion by calling self', function() {
        arraySum([[1],[[2]],3,4]);
        expect(arraySum.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        arraySum([[1],[[2]],3,4]);
        arraySum.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });



    describe('3. Check if Even', function() {
      var originalIsEven;

      before(function() {
        originalIsEven = isEven;
        isEven = sinon.spy(isEven);
      });

      afterEach(function() {
        isEven.reset();
      });

      after(function() {
        isEven = originalIsEven;
      });

      it('should return a boolean', function() {
        expect(isEven(5)).to.be.a('boolean');
        expect(isEven(8)).to.be.a('boolean');
      });

      it("should not use modulo", function() {
        var stringified = originalIsEven.toString();
        expect(stringified).to.not.contain('%');
        var originalModulo = modulo;
        modulo = sinon.spy(modulo);
        isEven(8);
        expect(modulo.called).to.be.false;
        modulo = originalModulo;
      });

      it('should return true for even numbers', function() {
        expect(isEven(48)).to.be.true;
        expect(isEven(0)).to.be.true;
      });

      it('should return false for odd numbers', function() {
        expect(isEven(17)).to.be.false;
        expect(isEven(1)).to.be.false;
      });

      it('should work with negative integers', function() {
        expect(isEven(-14)).to.be.true;
        expect(isEven(-31)).to.be.false;
      });

      it('should use recursion by calling self', function() {
        isEven(8);
        expect(isEven.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        isEven(8);
        isEven.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });


    describe('4. Reverse String', function() {
      var originalReverse;

      before(function() {
        originalReverse = reverse;
        reverse = sinon.spy(reverse);
      });

      afterEach(function() {
        reverse.reset();
      });

      after(function() {
        reverse = originalReverse;
      });

      it('should return a string', function() {
        expect(reverse('traf')).to.be.a('string');
      });

      it('should return a string in reverse', function() {
        var input = 'All my base are belong to you.';
        var tupni = '.uoy ot gnoleb era esab ym llA';
        expect(reverse(input)).to.equal(tupni);
      });

      it('should not use native reverse method', function() {
        // Spying on Array.prototype.reverse in testSupport.js
        reverse('traf');
        expect(Array.prototype.reverse.called).to.be.false;
      });

      it('should use recursion by calling self', function() {
        reverse('orangutan');
        expect(reverse.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        reverse('orangutan');
        reverse.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

    describe('5. Reverse an array', function() {
      var originalReverseArr;

      before(function() {
        originalReverseArr = reverseArr;
        reverseArr = sinon.spy(reverseArr);
      });

      afterEach(function() {
        reverseArr.reset();
      });

      after(function() {
        reverseArr = originalReverseArr;
      });

      it('should return an array', function() {
        expect(reverseArr([3,2,1])).to.be.an('array');
      });

      it('should return array in reversed order', function() {
        expect(reverseArr([1,2,3,4,5])).to.eql([5,4,3,2,1]);
        expect(reverseArr([8,6,4,2])).to.eql([2,4,6,8]);
      });

      it('should use recursion by calling self', function() {
        reverseArr([3,2,1]);
        expect(reverseArr.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        reverseArr([5,4,3]);
        reverseArr.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });



   

    describe('6. First n Fibonacci', function() {
      var originalFibonacci;

      before(function() {
        originalFibonacci = fibonacci;
        fibonacci = sinon.spy(fibonacci);
      });

      afterEach(function() {
        fibonacci.reset();
      });

      after(function() {
        fibonacci = originalFibonacci;
      });

      it('should return an array', function() {
        expect(fibonacci(5)).to.be.an('array');
      });

      it('should return first n Fibonacci numbers where n starts at index 1', function() {
        expect(fibonacci(1)).to.eql([0,1]);
        expect(fibonacci(2)).to.eql([0,1,1]);
        expect(fibonacci(3)).to.eql([0,1,1,2]);
        expect(fibonacci(4)).to.eql([0,1,1,2,3]);
        expect(fibonacci(5)).to.eql([0,1,1,2,3,5]);
        expect(fibonacci(8)).to.eql([0,1,1,2,3,5,8,13,21]);
      });

      it('should return null for zero and negative integers', function() {
        expect(fibonacci(0)).to.be.null;
        expect(fibonacci(-7)).to.be.null;
      });

      it('should use recursion by calling self', function() {
        fibonacci(5);
        expect(fibonacci.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        fibonacci(5);
        fibonacci.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });



    describe('7. Return nth Fibonacci', function() {
      var originalNthFibo;

      before(function() {
        originalNthFibo = nthFibo;
        nthFibo = sinon.spy(nthFibo);
      });

      afterEach(function() {
        nthFibo.reset();
      });

      after(function() {
        nthFibo = originalNthFibo;
      });

      it('should return a number', function() {
        expect(nthFibo(5)).to.be.a('number');
      });

      it('should return the nth nthFibo number', function() {
        expect(nthFibo(0)).to.equal(0);
        expect(nthFibo(1)).to.equal(1);
        expect(nthFibo(2)).to.equal(1);
        expect(nthFibo(3)).to.equal(2);
        expect(nthFibo(4)).to.equal(3);
        expect(nthFibo(5)).to.equal(5);
        expect(nthFibo(8)).to.equal(21);
      });

      it('should return null for negative integers', function() {
        expect(nthFibo(-5)).to.be.null;
        expect(nthFibo(-7)).to.be.null;
      });

      it('should use recursion by calling self', function() {
        nthFibo(5);
        expect(nthFibo.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        nthFibo(5);
        nthFibo.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });




    describe('8. Sum even numbers in nested objects', function() {
      var originalNestedEvenSum, input;

      before(function() {
        originalNestedEvenSum = nestedEvenSum;
        nestedEvenSum = sinon.spy(nestedEvenSum);
        input = {
          a: 2,
          b: {b: 2, bb: {b: 3, bb: {b: 2}}},
          c: {c: {c: 2}, cc: 'ball', ccc: 5},
          d: 1,
          e: {e: {e: 2}, ee: 'car'}
        };
      });

      afterEach(function() {
        nestedEvenSum.reset();
      });

      after(function() {
        nestedEvenSum = originalNestedEvenSum;
      });

      it('should return a number', function() {
        expect(nestedEvenSum(input)).to.be.a('number');
      });

      it('should sum even numbers', function() {
        expect(nestedEvenSum(input)).to.equal(10);
      });

      it('should use recursion by calling self', function() {
        nestedEvenSum(input);
        expect(nestedEvenSum.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        nestedEvenSum(input);
        nestedEvenSum.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });
  });
}());
