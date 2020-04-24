const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// on submitting the form the event will take place
searchForm.addEventListener("submit", e => {
  //Getting Search Term
  const searchTerm = searchInput.value;
  console.log(searchTerm);
  //Getting sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  console.log(sortBy);
  //Getting Limit
  const searchLimit = document.getElementById("limit").value;
  console.log(searchLimit);

  // if the search input is empty display alert with function showmessage
  if (searchTerm === "") {
    //show message
    showMessage("Please add a search term", "alert-danger");
  }

  // clear the search term after submitting so that once can search again
  searchInput.value = "";

  //searching Reddit using reddit variable taht we declared on top while importing the file
  search(searchTerm, searchLimit, sortBy).then(results => {
    let output = '<div class="card-columns">'; // creating a div for the detailes fetched
    // loop through posts
    results.forEach(post => {
      //check image
      const image = post.preview
        ? post.preview.images[0].source.url
        : "https://cdn.technadu.com/wp-content/uploads/2019/12/Reddit-Logo-1024x576.jpg";

      output += `
          <div class="card">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${text_truncate(post.selftext)}</p>
    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
  <hr>
  <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
  <span class="badge badge-dark">Score: ${post.score}</span>
    </div>
</div>
          `;
    });

    output += "</div>";
    document.getElementById("results").innerHTML = output; //putting a;ll the output post structure inside the div tag having results id
  });

  e.preventDefault();
});

//showMessage Function that will creat alert div from srcatch using dom manipulations
function showMessage(message, className) {
  // creating div
  const newDiv = document.createElement("div");
  // adding classes to that div
  newDiv.className = `alert ${className}`; // `` because giving a variable, its a template string part of ES6 $ because we are using an arguement thats coming a veriable
  // Adding text to the div thats message
  newDiv.appendChild(document.createTextNode(message)); // appendchild used to put cpontent inside the div thatwe created
  // get PARENT div in which the new created div wants to be placed
  const searchContainer = document.getElementById("search-container");
  // get Child div before which the new created div wants to be placed
  const search = document.getElementById("search");
  // Insert new created div before search div inside searchcontainer div
  searchContainer.insertBefore(newDiv, search);

  // removing the message after some time
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}

//truncate text

function text_truncate(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length) + ending;
  } else {
    return str;
  }
}

function search(searchTerm, searchLimit, sortBy) {
  return fetch(
    `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
  )
    .then(res => res.json()) // getting response in json form
    .then(data => data.data.children.map(data => data.data)) // now getting data
    .catch(err => console.log(err));
}
