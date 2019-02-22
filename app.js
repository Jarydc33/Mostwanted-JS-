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
      displayPerson(person);

      break;

    case "family":
      let familyTracker = familySearch(person, people);
      alert(familyTracker);
      break;
    case "descendants":
        displayDescendants(person, people);
      break;
    case "restart":
      app(people);
      break;
    case "quit":
      return; 
    default:
      return mainMenu(person, people);
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
  let filteredPeopleResult = filteredPeople[0];
  mainMenu(filteredPeopleResult, people);
}
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}
function chars(input){
  return true;
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
    default:
      alert("Invalid option selected, please try again!");
      searchByTrait(people, peoplePool);
  }
}
function searchByGender(people, peoplePool){
  let genderFilter = prompt("What is the person's gender? male/female?");
  let filteredPeople = peoplePool.filter(function(el) {
    if(el.gender === genderFilter) {
      return el;
    }
  });
  if(filteredPeople.length === 0){
    userValidation(people,filteredPeople,searchByEyeColor);
  }
  searchByTrait(people, filteredPeople);

  if(filteredPeople.length === 0){
    userValidation(people,filteredPeople,searchByEyeColor);
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

  if(filteredPeople.length === 0){
    userValidation(people,filteredPeople,searchByEyeColor);
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
function searchByHeight(people, peoplePool){
  let heightFilter = prompt("What is the person's height?");
  let filteredPeople = peoplePool.filter(function(el) {
    if(el.height == heightFilter) {
      return el;
    }
  });

  if(filteredPeople.length === 0){
    userValidation(people,filteredPeople,searchByEyeColor);
  }
  searchByTrait(people, filteredPeople);
}
function searchByWeight(people, peoplePool){
  let weightFilter = prompt("What is the person's weight?");
  let filteredPeople = peoplePool.filter(function(el) {
    if(el.weight == weightFilter) {
      return el;
    }
  });
  if(filteredPeople.length === 0){
    userValidation(people,filteredPeople,searchByEyeColor);
  }
  searchByTrait(people, filteredPeople);
}
function searchByEyeColor(people, peoplePool){
  let eyeColorFilter = prompt("What is the person's eye color?");
  let filteredPeople = peoplePool.filter(function(el) {
    if(el.eyeColor == eyeColorFilter) {
      return el;
    }
  });

  if(filteredPeople.length === 0){
    userValidation(people,filteredPeople,searchByEyeColor);
  }
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
function getDescendants(person, people){
  let list = [];
  let kids= people.filter(function(el) {
    if(el.parents.includes(person.id)) {
      return el;
    }
  });
  list = list.concat(kids);
  if(kids.length === 0){
    return list;
  }else{
    for(let i = 0; i<kids.length; i++){
      list = list.concat(getDescendants(kids[i], people));
    }
    return list;
  }
}
function displayDescendants(person, people){
  let dList = getDescendants(person, people);
  let descendantList = "Descendants: ";
  for(let i = 0; i <dList.length; i++){
    descendantList+= dList[i].firstName +" "+ dList[i].lastName + "\n";
  }
  alert(descendantList);
}

function familySearch(person, people){
  let familyTracker = "";
  for(let i = 0; i < people.length; i++){
    if(people[i].currentSpouse == person.id){
      familyTracker = "Spouse: " + people[i].firstName + " " + people[i].lastName + ".\n";
    }
  };

  for(let i = 0; i < people.length; i++){

    if(people[i].parents == person.id){
      familyTracker +="Child: " + people[i].firstName + " " + people[i].lastName + ".\n";
    }
  };

  for(let i = 0; i < people.length; i++){

    if(person.parents.includes(people[i].id)){

      familyTracker +="Parent: " + people[i].firstName + " " + people[i].lastName + ".\n";
    };

  };
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
function userValidation(people,filteredPeople,callback){
    alert("Invalid input. No one found.");
    callback(people,filteredPeople);
}

