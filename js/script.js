/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

//global constants
const maxDisplayItems = 9;
const maxPage = (data.length / maxDisplayItems) + 1;

//A class to control the page, starts off initializing the page and displaying it
//has helper functions to manupulate the page
class PageController {

   //private properties

   //the student list html builder
   #studentListHTML = null;
   //empty student array
   #studentList = [];

   //keep track of the last clicked button
   #lastClickedButton = null; 

   //keep track of pagination initialization, we dont want to redo it if its already happened
   #paginationOnce = false;

   //constructor, initializes the page HTML
   constructor() {
      this.#studentListHTML = document.querySelector('.student-list');
      //locally store the list in data.js
      this.#studentList = data;

   }

   isLastClickedButtonValid() {
      return (this.#lastClickedButton != null);
   }
   setLastClickedButtonClassName(className) {
      this.#lastClickedButton.className = className;
   }
   setLastClickedButtonObject(buttonObject) {
      this.#lastClickedButton = buttonObject;
   }
   getLastClickedButtonIndex() {
      return parseInt(this.#lastClickedButton.textContent);
   }

   //private function to build HTML list items
   #buildListItems(list, start, end) {
       //lets make sure we grabbed the correct element in the constructor
       if(this.#studentListHTML != null && list != null) {
          //make sure we have valid start and end
          if(start >= 0 && end > start) {
            // set the innerHTML property of the variable you just created to an empty string
            this.#studentListHTML.innerHTML = '';
            // loop over the length of the `list` parameter
            for(var index = 0; index < list.length; index++) {
               // inside the loop create a conditional to display the proper students
               if(index >= start && index < end) {
                  // inside the conditional:
                  // create the elements needed to display the student information

                  //the outer list element item
                  let studentItem = document.createElement("LI");
                  studentItem.className = "student-item cf";

                  //the div element
                  let divElement = document.createElement("DIV");
                  divElement.className = "student-details";

                  //the avatar image element
                  let imgElement = document.createElement("IMG");
                  imgElement.className = "avatar";

                  //the image itself and set attribute
                  const image = list[index].picture.large;
                  imgElement.setAttribute("src", `${image}`);

                  //the H3 element and context set
                  let h3Element = document.createElement("H3");
                  h3Element.textContent = `${list[index].name.first}  ${list[index].name.last}`;

                  //the span element and context set
                  let spanElement = document.createElement("SPAN");
                  spanElement.className = "email";
                  spanElement.textContent = `${list[index].email}`;

                  let divJoinElement = document.createElement("DIV");
                  divJoinElement.className = "joined-details";

                  let spanDateElement = document.createElement("SPAN");
                  spanDateElement.className = "date";
                  spanDateElement.textContent = `Joined: ${list[index].registered.date}`;

                  // insert the above elements
                  divElement.appendChild(imgElement);
                  divElement.appendChild(h3Element);
                  divElement.appendChild(spanElement);
                  studentItem.appendChild(divElement);
                  
                  divJoinElement.appendChild(spanDateElement);
                  studentItem.appendChild(divJoinElement);

                  this.#studentListHTML.appendChild(studentItem);
               }
            }

            return true;
         }
      }
      return false;
   }

   /*
   Create the `showPage` function
   This function will create and insert/append the elements needed to display a "page" of nine students
   */
   showPage(list, page) {

      //lets make sure we get valid data before processing
      if(page > 0 && page <= maxPage) {
         // create two variables which will represent the index for the first and last student on the page
         let startIndex = ((page * maxDisplayItems) - maxDisplayItems);
         let endIndex = (page * maxDisplayItems);

         let newList = list;

         if(newList === null) {
            newList = this.#studentList;
         }
         //call the build items function
         let result = this.#buildListItems(newList, startIndex, endIndex);

         if(result) {
            //make sure we only call the addPagination once
            if(this.#paginationOnce == false) {
               this.#addPagination(this.#studentList);
            }
         } else {
            alert("Failed to create list items.");
         }
      }
   }

   #LabelElementEventHandler(eventObject, self) {
      if(eventObject.target.nodeName === "BUTTON") {
         const textField = document.getElementById("search");
         
         if(textField != null) {
            const userText = textField.value.toLowerCase();
            
            //lets make sure we have a valid string
            if(userText.length > 0) {
               //declare new array
               var newList= [];
               //track how many were found
               let foundCount = 0;

               for(var index = 0; index < self.#studentList.length; index++) {
                  //get the last name string from the index in list, force the name to lowercase for easy searching
                  let name = self.#studentList[index].name.last.toLowerCase();
                  
                  //check if the name includes the user text
                  if(name.includes(userText)) {
                     newList[foundCount] = self.#studentList[index];
                     foundCount++;
                  }
               }
               //finally, show the new list
               if(foundCount > 0) {
                  self.showPage(newList, 1);
               }

            }
            else{
               alert("No Names found!");
            }
         }
         else {
            alert("invalid text field!")
         }
      }
   }

   #ListItemEventHandler(eventObject, self) {
      // if the click target is a button:
      if(eventObject.target.nodeName === "BUTTON") {
         // remove the "active" class from the previous button
         if(self.isLastClickedButtonValid()) {
            self.setLastClickedButtonClassName('');
         }

         // add the active class to the clicked button
         self.setLastClickedButtonObject(eventObject.target);
         self.setLastClickedButtonClassName("active");

         // call the showPage function passing the `list` parameter and page to display as arguments
         const page = self.getLastClickedButtonIndex();
         self.showPage(page);
      }
   }
   /*
   Create the `addPagination` function
   This function will create and insert/append the elements needed for the pagination buttons
   */
   #addPagination(list) {

      //lets make sure the list is valid before processing it
      if(list != null) {

         //GOING FOR EXCEEDS
         const labelElement = document.createElement("LABEL");
         labelElement.setAttribute("for", "search");
         labelElement.className = "student-search";

         const inputElement = document.createElement("INPUT");
         inputElement.setAttribute("id", "search");
         inputElement.setAttribute("placeholder", "Search by name...");

         const searchButton = document.createElement("BUTTON");
         const searchBtnImg = document.createElement("IMG");
         searchBtnImg.setAttribute("src", "img/icn-search.svg");
         searchBtnImg.setAttribute("alt", "Search icon");
         searchButton.appendChild(searchBtnImg);

         labelElement.onclick = (eventObject) => {
            this.#LabelElementEventHandler(eventObject, this);
         }

         labelElement.appendChild(inputElement);
         labelElement.appendChild(searchButton);

         document.querySelector("h2").appendChild(labelElement);
         //END EXCEEDS


         // create a variable to calculate the number of pages needed
         const numOfPages = Math.ceil(list.length / maxDisplayItems);

         // select the element with a class of `link-list` and assign it to a variable
         let linkList = document.querySelector(".link-list");

         // set the innerHTML property of the variable you just created to an empty string
         linkList.innerHTML = '';

         // loop over the number of pages needed
         for(var index = 0; index < numOfPages; index++) {

            // create the elements needed to display the pagination button
            let listItem = document.createElement("LI");
            
            //create the button element
            let button = document.createElement("BUTTON");
            button.textContent = `${index + 1}`;

            // give the first pagination button a class of "active"
            if(index == 0) {
               button.className = "active";
               this.#lastClickedButton = button;
               this.#paginationOnce = true;
            }

            // insert the above elements
            listItem.appendChild(button);
            linkList.appendChild(listItem);
         }

         // create an event listener on the `link-list` element
         linkList.onclick = (eventObject) => {
              this.#ListItemEventHandler(eventObject, this);
         }

      } else {
         alert("Pagination failed: the list parameter is null!");
      }
   }
}
 
// Call functions
var page = new PageController();
page.showPage(null, 1);