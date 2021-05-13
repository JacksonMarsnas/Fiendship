
// for tab display
function storeChoice(evt, choiceName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(choiceName).style.display = "grid";
    evt.currentTarget.className += " active";
  }

document.getElementById("defaultOpen").click();

// for display user coin balance
function displayBalance() {
  db.collection("users").get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        // console.log(doc.data().name)
        // console.log(doc.data().coins)
        if (doc.data().name == sessionStorage.name) {
          console.log(doc.data().coins)
          $('#balance-goes-here').text(doc.data().coins);    
        }
      })

    })
}
displayBalance();

function displayProfilePicsInStore() {
  db.collection("profile_pictures").get()
  .then(function(snap) {
    snap.forEach(function (doc) {
      // console.log('doc: ', doc.data())
      // console.log('name: ', doc.data().name)
      let name = doc.data().name;
      let price = doc.data().price;
      let pic_url = doc.data().url;
      // console.log(name);
      // console.log(price);
      console.log(pic_url);

      $('.tabcontent').append("<div class='pic-container'></div>");
      $('.pic-container:last').append("<img class='profile-pic' src=' " + pic_url + " ' alt='Avatar'>");
      $('.pic-container:last').append("<p class='price'> price " + price + "</p>");
      $('.pic-container:last').append("<button>buy</button>");
    })
  })
}
displayProfilePicsInStore();
