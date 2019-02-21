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
          searchByTrait(people, people);
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
function searchByTrait(people, peoplePool){
  let response = prompt("What trait would you like to search by?\n(1) Gender\n(2) Age\n(3) Height\n(4) Weight\n(5) Eye Color\n(6) Occupation\n(7) Show list\n(0) Name");
  switch(response){
    case "0":
      searchByName(people);
      break;
    case "1"://search by gender
      searchByGender(people, peoplePool);
      break;
    case "2":
      searchByAge(people, peoplePool);
      break;
    case "3":
      searchByHeight(people, peoplePool);
      break;
    case "4"://search by weight
      searchByWeight(people, peoplePool);
      break;
    case "5"://search by eye color
      searchByEyeColor(people, peoplePool);
      break;
    case "6"://search by occupation
      searchByOccupation(people, peoplePool);
      break;
    case "7":
      console.log(displayPeople(peoplePool));
      searchByTrait(people, peoplePool);
      break;
  }
}
function searchByGender(people, peoplePool){
  let genderFilter = prompt("What is the person's gender? male/female?");
  let filteredPeople = peoplePool.filter(function(el) {
    if(el.gender === genderFilter) {
      return el;
    }
  });
  searchByTrait(people, filteredPeople);

  if(filteredPeople.length == 0){
    alert("Invalid input. Please try again.")
    searchByGender(people,peoplePool);
  } 
}
function searchByAge(people, peoplePool){
  let ageFilter = prompt("What is the person's age?");
  let filteredPeople = peoplePool.filter(function(el) {
    if(getAge(el.dob) == ageFilter) {
      return el;
    }
  });
  searchByTrait(people, filteredPeople);

  if(filteredPeople.length == 0){
    alert("Invalid input. Please try again.")
  searchByGender(people,peoplePool);
  } 
}
function getAge(dob){
  let birthday = dob.split("/"); 
  let today = new Date();
  let age = today.getFullYear() - birthday[2]; 
  if(today.getMonth()<birthday[0]){
    age--;
  }else if(today.getMonth()==birthday[0] && today.getday > birthday[1]){
    age--;
  }
  console.log(age);
  return age; 
}
//"dob": "4/1/1947",
function searchByHeight(people, peoplePool){
  let heightFilter = prompt("What is the person's height?");
  let filteredPeople = peoplePool.filter(function(el) {
    if(el.height == heightFilter) {
      return el;
    }
  });
  searchByTrait(people, filteredPeople);

}
function searchByWeight(people, peoplePool){
  let weightFilter = prompt("What is the person's weight?");
  let filteredPeople = peoplePool.filter(function(el) {
    if(el.weight == weightFilter) {
      return el;
    }
  });
  searchByTrait(filteredPeople);

}
function searchByEyeColor(people, peoplePool){
  let eyeColorFilter = prompt("What is the person's eye color?");
  let filteredPeople = peoplePool.filter(function(el) {
    if(el.eyeColor == eyeColorFilter) {
      return el;
    }
  });
  searchByTrait(people, filteredPeople);
 
}
function searchByOccupation(people, peoplePool){
  let occupationFilter = prompt("What is the person's occupation?");
  let filteredPeople = peoplePool.filter(function(el) {
    if(el.occupation == occupationFilter) {
      return el;
    }
  });
  searchByTrait(people, filteredPeople);

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
      familyTracker = "Spouse: " + el.firstName + " " + el.lastName + ".\n";
    }
  });

  people.filter(function(el){

    if(el.parents == person.id){
      familyTracker +="Child: " + el.firstName + " " + el.lastName + ".\n";
    }
  });

  people.filter(function(el){

    if(person.parents.includes(el.id)){

      familyTracker +="Parent: " + el.firstName + " " + el.lastName + ".\n";
    };

  });

  for(let i = 0; i < people.length; i++){

    if(people[i].parents[0] == person.id){
      familyTracker += "Child: " + people[i].firstName + " " + people[i].lastName + ".\n" ;
    }
  }
  for(let i = 0; i < people.length; i++){

    if(people[i].parents[1] == person.id){
      familyTracker += "Child: " + people[i].firstName + " " + people[i].lastName + ".\n";
    }
  }

  return familyTracker;
}


