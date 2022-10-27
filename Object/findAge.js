// Create a function called findAge that takes in the
// animal object and returns the age.

var animal;
var findAge;

function findAge(animal){
    for(var key in animal){
        return animal.key;
    }
}
