// This IIFE will add a new module to Carlot in the
// namespace of CarLot.Inventory
var CarLot = (function (globalScopeCarLot) {

  // Define a private scope variable to store cars
  let _car_inventory = [];
  let stringForCarLotDiv = '';

  // Start building the Object that will be attached
  // to the CarLot.Inventory namespace
  let carLotDiv = document.getElementById('car-lot');

  let inventory = Object.create(null);

  inventory.loadInventory = function() {
    let load = new XMLHttpRequest();

    load.addEventListener("load", function() {
      let data = JSON.parse(event.target.responseText).cars;
      data.forEach(function(car){
        inventory.addCar(car);
      });
      inventory.buildCarLotString();
      inventory.insertCarLotStringIntoDom();
    });
    load.open("GET", "inventory.json");
    load.send();
  }

  inventory.addCarToInventory = function(carObject) {
    _car_inventory.push(carObject);
  }

  inventory.addCar = function(carObject) {
    inventory.addCarToInventory(carObject);
  }

  inventory.insertCarLotStringIntoDom = function() {
    carLotDiv.innerHTML = stringForCarLotDiv;
  }

  inventory.buildCarLotString = function() {
    let counter = 1;

    let cars = inventory.getCarInventory();

    cars.forEach(function(carObject){
      let carTemplate =
      `
        <div class="car col-sm-4" id="car${counter}">
          <h3>${carObject.year} ${carObject.make} ${carObject.model}</h3>
          <h4>$${carObject.price}</h4>
          <p>${carObject.description}</p>
        </div>
      `;

      if (counter === 1) {
        //first car needs to add open row div
        stringForCarLotDiv += `<div class="row">`;
        stringForCarLotDiv += carTemplate;
        counter++;
      } else if (counter % 3 === 0) {
        // every third row needs to close and open row div
        stringForCarLotDiv += carTemplate;
        stringForCarLotDiv += `</div>`;
        stringForCarLotDiv += `<div class="row">`;
        counter++
      } else if (counter === _car_inventory.length) {
        // final car should add final closing row div
        stringForCarLotDiv += carTemplate;
        stringForCarLotDiv += `</div>`;
      } else {
        // all other rows just add the car
        stringForCarLotDiv += carTemplate;
        counter++;
      }
    });
  }

  inventory.getCarInventory = function() {
    return _car_inventory;
  }

  inventory.clearSelectedClass = function() {
    let carCards = document.querySelectorAll('.car');
    carCards.forEach(function(carCard) {
      carCard.classList.remove('selected');
    });

  }

  globalScopeCarLot.Inventory = inventory;
  return globalScopeCarLot;

  // If this is the first module that gets evaluated,
  // CarLot will be `undefined` and a new empty object
  // will augmented.
})(CarLot || {});