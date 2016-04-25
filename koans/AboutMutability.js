describe("About Mutability", function() {

  it("should expect object properties to be public and mutable", function () {
    var aPerson = {firstname: "John", lastname: "Smith" };
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe('Alan');
  });

  it("should understand that constructed properties are public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    var aPerson = new Person ("John", "Smith");
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe('Alan');
  });

  it("should expect prototype properties to be public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    Person.prototype.getFullName = function () {
      return this.firstname + " " + this.lastname;  //this function is a part of the Person
    };                                    // function now.  

    var aPerson = new Person ("John", "Smith");
    expect(aPerson.getFullName()).toBe('John Smith');

    aPerson.getFullName = function () {  //the function is now reversed, but only for the 
      return this.lastname + ", " + this.firstname; //aPerson variable, not for the person
    };                                    // prototype, important distinction

    expect(aPerson.getFullName()).toBe('Smith, John'); // remember you can mutate individual
  });                             // variables or entire functions.

  it("should know that variables inside a constructor and constructor args are private", function () {
    function Person(firstname, lastname)
    {
      var fullName = firstname + " " + lastname;

      this.getFirstName = function () { return firstname; }; //constructed properties are mutable
      this.getLastName = function () { return lastname; }; // constructed functions and variables
      this.getFullName = function () { return fullName; }; // are not, don't forget this, could
    }                                                     // be very useful one day.
    var aPerson = new Person ("John", "Smith");

    aPerson.firstname = "Penny";
    aPerson.lastname = "Andrews";
    aPerson.fullName = "Penny Andrews";

    expect(aPerson.getFirstName()).toBe('John'); // evaluates inside of constructor, which is
    expect(aPerson.getLastName()).toBe('Smith'); // private, so it uses old values.
    expect(aPerson.getFullName()).toBe('John Smith');

    aPerson.getFullName = function () {  //evaluating outside of the function so it uses the
      return aPerson.lastname + ", " + aPerson.firstname;//new variables values
    };

    expect(aPerson.getFullName()).toBe('Andrews, Penny');
  });

});
