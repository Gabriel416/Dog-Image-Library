// Wrapped in IIFE so we don't interfere with the global execution context or other libraries
(function(global) {
  // function expression that generates a new object with methods attached to it
  var Dog = function(all, random, breed, subBreed, number) {
    return new Dog.create(all, random, breed, subBreed, number);
  };

  //Object that lives on dog that contains all methods
  Dog.prototype = {
    //Base url for the api we're hitting
    baseUrl: "https://dog.ceo/api/",

    // takes in values and checks if they were properly passed
    validate: function(...check) {
      for (var i = 0; i < check.length; i++) {
        if (check[i]) {
          continue;
        } else {
          throw "The correct parameter at position " + i + " was not passed";
        }
      }
      return;
    },
    // helper function that checks if random was passed in as an argument
    isRandomPassed: function(random) {
      var randomString = "";
      if (random) {
        randomString = "/random";
      }
      return randomString;
    },
    // helper function that handles all our network requests
    request: function(url) {
      var http = new XMLHttpRequest();

      http.open("GET", url, true);
      http.send();
      // One network request comes back
      http.onload = function() {
        if (http.status === 200) {
          console.log(JSON.parse(http.response), "here");
          return JSON.parse(http.response);
        } else {
          throw "Something went wrong with the network request. Make sure you have solid internet connection.";
        }
      };
    },
    // All method lists all breeds
    every: function() {
      this.all = true;
      this.validate(this.all);
      return this.request(this.baseUrl + "breeds/list/all");
    },
    // returns a random dog image
    random: function(number) {
      if (number) {
        this.number = Number(number);
      }
      this.irregular = true;
      this.validate(this.irregular, this.number);
      return this.request(this.baseUrl + "breeds/image/random/" + this.number);
    },
    // return an array of images based on certain breed
    breed: function(breed, random) {
      this.validate(breed);
      breed = breed
        .split(" ")
        .reverse()
        .join("-");
      this.specificBreed = breed;
      this.irregular = random || false;
      var randomParam = this.isRandomPassed(this.irregular);
      return this.request(
        this.baseUrl + "breed/" + this.specificBreed + "/images" + randomParam
      );
    },
    // return an array of images of a sub breed of a breed
    subBreed: function(breed, subBreed, random) {
      this.validate(breed, subBreed);
      breed = breed
        .split(" ")
        .reverse()
        .join("-");
      this.specificBreed = breed;
      this.specificSubBreed = subBreed;
      this.irregular = random || false;
      var randomParam = this.isRandomPassed(this.irregular);
      return this.request(
        this.baseUrl +
          "breed/" +
          this.specificBreed +
          "/" +
          this.specificSubBreed +
          "/images" +
          randomParam
      );
    },
    // Simply returns a list of all sub breeds of a breed
    subBreedList: function(breed) {
      this.validate(breed);
      this.specificBreed = breed;
      return this.request(
        this.baseUrl + "breed/" + this.specificBreed + "/list"
      );
    }
  };

  //Function constructor that returns an object with passed in primitive types
  Dog.create = function(
    all,
    irregular,
    specificBreed,
    specificSubBreed,
    number
  ) {
    // api number limit
    if (number > 50) {
      number = 50;
    }

    this.all = all || false;
    this.irregular = irregular || false;
    this.specificBreed = specificBreed || false;
    this.specificSubBreed = specificSubBreed || false;
    this.number = number || 1;
  };

  // On the contructed object set it's protoype to the Dogs prototype that contains all the methods
  Dog.create.prototype = Dog.prototype;

  // Check if Dog is take on the window. if not set it
  if (!global.Dog) {
    global.Dog = Dog();
  } else {
    throw "Another library is using the word Dog";
  }
})(window);
