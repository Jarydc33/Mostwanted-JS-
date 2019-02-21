/*
Build all of your functions for displaying and gathering information below (GUI).
*/


// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      // TODO: search by name
      searchByName(people);

      break;
    case 'no':
          searchByTrait(people);
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",chars);

  switch(displayOption){
    case "info":
      // TODO: get person's info
      displayPerson(person);

      break;

    case "family":
      // TODO: get person's family
      let familyTracker = familySearch(person, people);
      alert(familyTracker);

      break;
    case "descendants":
      // TODO: get person's descendants
      descendantSearchRecursive(person, people);
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.firstName.toLowerCase() === firstName.toLowerCase() && el.lastName.toLowerCase() === lastName.toLowerCase()) {
      return el;
    }
  });

  // TODO: What to do with filteredPeople?
  let filteredPeopleResult = filteredPeople[0];
  mainMenu(filteredPeopleResult, people);

}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
//displayPerson function is complete! -Jaryd
function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
function searchByTrait(peoplePool){
  let response = prompt("What trait would you like to search by?\n(1) Gender\n(2) Age\n(3) Height\n(4) Weight\n(5) Eye Color\n(6) Occupation");
  switch(response){
    case "1"://search by gender
      searchByGender(peoplePool);
      break;
    case "2":
      searchByAge(peoplePool);
      break;
    case "3"://search by height
      break;
    case "4"://search by weight
      break;
    case "5"://search by eye color
      break;
    case "6"://search by occupation
      break;
    case "7"://choose person
      break;
  }
}
function searchByGender(people){
  let genderFilter = prompt("What is the person's gender? M/F?");
  let filteredPeople = people.filter(function(el) {
    if(el.gender === genderFilter) {
      return el;
    }
  });
  searchByTrait(filteredPeople);//can further filter by other traits. 
}

function descendantSearchRecursive(person, people){

  let filteredDescendants = people.filter(function(el){

    if(el.parents[0] == person.id){
      return el;

    }
    else if(el.parents[0] == person.id)
      return el

  });
}

function familySearch(person, people){
  let familyTracker = "";

  people.filter(function(el){

    if(el.currentSpouse == person.id){
      familyTracker = "Spouse: " + el.firstName + ". ";
    }
  });

  people.filter(function(el){

    if(el.parents == person.id){
      familyTracker +="Child: " + el.firstName + ". ";
    }
  });

  people.filter(function(el){

    if(person.parents.includes(el.id)){

      familyTracker +="Parent: " + el.firstName + ". ";
    };

  });

  for(let i = 0; i < people.length; i++){

    if(people[i].parents[0] == person.id){
      familyTracker += "Child: " + people[i].firstName + ". ";
    }
  }
  for(let i = 0; i < people.length; i++){

    if(people[i].parents[1] == person.id){
      familyTracker += "Child: " + people[i].firstName + ". ";
    }
  }

  return familyTracker;
}

