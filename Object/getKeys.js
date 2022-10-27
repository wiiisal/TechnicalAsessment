// Create a function called getKeys that takes in the animal object and returns all
// of the key names.

var animal;
var getKeys;
function getKeys(animal){
    for(var key in animal){
    keys+= key;
    }
    return keys;
}

