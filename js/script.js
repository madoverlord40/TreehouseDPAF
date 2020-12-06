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

//keep track of the last clicked button
var lastClickedButton = null;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {

   //lets make sure we get valid data before processing
   if(list != null && page > 0 && page <= maxPage) {
      // create two variables which will represent the index for the first and last student on the page
      let startIndex = ((page * maxDisplayItems) - maxDisplayItems);
      let endIndex = (page * maxDisplayItems);

      // select the element with a class of `student-list` and assign it to a variable
      const studentList = document.querySelector('.student-list');
      //lets make sure we grabbed the correct element
      if(studentList != null) {
         // set the innerHTML property of the variable you just created to an empty string
         studentList.innerHTML = '';

         // loop over the length of the `list` parameter
         for(var index = 0; index < list.length; index++) {
            // inside the loop create a conditional to display the proper students
            if(index >= startIndex && index < endIndex) {
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

               //studentList.insertAdjacentHTML('beforeend', studentItem);
               studentList.appendChild(studentItem);
            }
         }

      } else {
         alert("Failed to get student list element!");
      }
   } else if(list === null) {
      alert("invalid list item passed to first parameter!");
   }
   else if(page < 1) {
      alert("please enter a page number that is at least 1 or greater!");
   }
   else if(page > maxPage) {
      alert("Page number is greater than the number of pages that can be displayed!");
   }
 }
 


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {

   //lets make sure the list is valid before processing it
   if(list != null) {
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
            lastClickedButton = button;
         }

         // insert the above elements
         listItem.appendChild(button);
         linkList.appendChild(listItem);
      }

      // create an event listener on the `link-list` element
      linkList.addEventListener('click', (eventObject) => {
         // if the click target is a button:
         if(eventObject.target.nodeName === "BUTTON") {
            // remove the "active" class from the previous button
            if(lastClickedButton != null) {
               lastClickedButton.className = '';
            }

            // add the active class to the clicked button
            lastClickedButton = eventObject.target;
            lastClickedButton.className = "active";

            // call the showPage function passing the `list` parameter and page to display as arguments
            const page = parseInt(lastClickedButton.textContent);
            showPage(list, page);
         }
      });

   } else {
      alert("Pagination failed: the list parameter is null!");
   }
 }
 


// Call functions
addPagination(data);
showPage(data, 1);