describe("About Objects", function () {

  describe("Properties", function () {
    var megalomaniac;

    beforeEach(function () {
       megalomaniac = {  mastermind: "Joker", henchwoman: "Harley" };
    });

    it("should confirm objects are collections of properties", function () {
      expect(megalomaniac.mastermind).toBe('Joker');
    });

    it("should confirm that properties are case sensitive", function () {
      expect(megalomaniac.henchwoman).toBe('Harley');
      expect(megalomaniac.henchWoman).toBe(undefined);
    });
  });


  it("should know properties that are functions act like methods", function () {
    var megalomaniac = {
      mastermind : "Brain",
      henchman: "Pinky",
      battleCry: function (noOfBrains) {
        return "They are " + this.henchman + " and the" +
          Array(noOfBrains + 1).join(" " + this.mastermind); // noOfBrains = 4 in example
      }                               // so it goes through 0 +1, 1+ 1, 2+ 1, 3 +1, and adds 
    };                                // this.mastermind to the array each time.  

    var battleCry = megalomaniac.battleCry(4); // calls battlecry function four times, 0-3.
    expect('They are Pinky and the Brain Brain Brain Brain').toMatch(battleCry);    // then the + 1 means that it returns 'brain' four times.
  });

  it("should confirm that when a function is attached to an object, 'this' refers to the object", function () {
    var currentDate = new Date();
    var currentYear = (currentDate.getFullYear());
    var megalomaniac = {
      mastermind: "James Wood",
      henchman: "Adam West",
      birthYear: 1970,
      calculateAge: function () {
        return currentYear - this.birthYear;
      }
    };

    expect(currentYear).toBe(2016);
    expect(megalomaniac.calculateAge()).toBe(46);
  });

  describe("'in' keyword", function () {
    var megalomaniac;
    beforeEach(function () {
      megalomaniac = {
        mastermind: "The Monarch",
        henchwoman: "Dr Girlfriend",
        theBomb: true
      };
    });

    it("should have the bomb", function () {

      var hasBomb = "theBomb" in megalomaniac;  //allows you to test this easily by wrapping it in 
                                              // a variable. 

      expect(hasBomb).toBe(true);
    });

    it("should not have the detonator however", function () {

      var hasDetonator = "theDetonator" in megalomaniac;

      expect(hasDetonator).toBe(false);
    });
  });

  it("should know that properties can be added and deleted", function () {
    var megalomaniac = { mastermind : "Agent Smith", henchman: "Agent Smith" };

    expect("secretary" in megalomaniac).toBe(false);

    megalomaniac.secretary = "Agent Smith";
    expect("secretary" in megalomaniac).toBe(true);

    delete megalomaniac.henchman;
    expect("henchman" in megalomaniac).toBe(false);
  });


  it("should use prototype to add to all objects", function () {
      function Circle(radius)
      {
        this.radius = radius;
      }

      var simpleCircle = new Circle(10); // the ten is the value of this.radius.
      var colouredCircle = new Circle(5);  // the function argument becomes the property here.
      colouredCircle.colour = "red";

      expect(simpleCircle.colour).toBe(undefined);  // this is undefined, not false, because
      expect(colouredCircle.colour).toBe('red');    //we're not using in now, so 
                                                    // it's looking to an actual value.  
      Circle.prototype.describe = function () {
        return "This circle has a radius of: " + this.radius;
      };

      expect(simpleCircle.describe()).toBe('This circle has a radius of: 10');  // the prototype is doing something here.
      expect(colouredCircle.describe()).toBe('This circle has a radius of: 5'); //when calling the expect,
  });                                   // know that the full returned value will display.  so not just this.radius. but the sentence too. 

  
});
