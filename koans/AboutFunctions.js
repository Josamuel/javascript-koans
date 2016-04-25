describe("About Functions", function() {

  it("should declare functions", function() {

    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3);
  });

  it("should know internal variables override outer variables", function () {
    var message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      var message = "Inner";
      return message;
    }

    expect(getMessage()).toBe("Outer");
    expect(overrideMessage()).toBe("Inner");
    expect(message).toBe("Outer");
  });

  it("should have lexical scoping", function () {
    var variable = "top-level";
    function parentfunction() {
      var variable = "local";
      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).toBe("local");
  });

  it("should use lexical scoping to synthesise functions", function () {

    function makeMysteryFunction(makerValue)
    {
      var newFunction = function doMysteriousThing(param)
      {
        return makerValue + param;
      };
      return newFunction;
    }

    var mysteryFunction3 = makeMysteryFunction(3);  // this one was confusing to me and may
    var mysteryFunction5 = makeMysteryFunction(5); // need review.

    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(23);
  });

  it("should allow extra function arguments", function () {

    function returnFirstArg(firstArg) {
      return firstArg;
    }

    expect(returnFirstArg("first", "second", "third")).toBe("first");

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }

    expect(returnSecondArg("only give first arg", 'nothing')).toBe('nothing');

    function returnAllArgs() {
      var argsArray = [];
      for (var i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]); // adds an argument to the array for as long as the length
      } // of the arguments.  Confused as to where the argument variable is though.  
      return argsArray.join(", ");  // adds a "," between each element of the array.  Only evaluates
    }// after the array is full after iterating through the full 'for' function. 
    // there is no space in the .join 
    expect(returnAllArgs("first", "second", "third")).toBe('first, second, third'); // this is what you think it will come out as,
  });               // it really means nothing, if you edit the function it will change the expect and you will have to change
  it("should pass functions as values", function () {// your guess.  Note the expects is within the main function. 

    var appendRules = function (name) {
      return name + " rules!";
    };
// you should define functions by what you want them to do, and then mess with them.  Don't do anything beforehand as you will get confused. 
    var appendDoubleRules = function (name) {
      return name + " totally rules!";
    };
      // givePraise is a method of praiseSinger that is defined as appendRules here.
    var praiseSinger = { givePraise: appendRules }; //saying givePraise is a key to appendRules.  When you see givePraise, know it is calling the appendRules function.
    expect(praiseSinger.givePraise("John")).toBe("John rules!");
// the givePraise method is redefined as appendDoubleRules here.  the givePraise method calls the appendDoubleRules function and works from there.  It is operating as a shell.
    praiseSinger.givePraise = appendDoubleRules; // the givePraise method is now equal to appendDoubleRules, this is just a different way to say it. 
    expect(praiseSinger.givePraise("Mary")).toBe("Mary totally rules!");

  });
});
