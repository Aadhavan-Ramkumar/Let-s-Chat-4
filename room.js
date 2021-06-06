var firebaseConfig = {
      apiKey: "AIzaSyA0SGmW3tQaTQA8pAxPwwqqUSUuYFrSBpI",
      authDomain: "let-s-chat-f65b3.firebaseapp.com",
      databaseURL: "https://let-s-chat-f65b3-default-rtdb.firebaseio.com",
      projectId: "let-s-chat-f65b3",
      storageBucket: "let-s-chat-f65b3.appspot.com",
      messagingSenderId: "932305837996",
      appId: "1:932305837996:web:17684362e2a4f67b15e409"
    };
    firebase.initializeApp(firebaseConfig);

Username = localStorage.getItem("Username");
document.getElementById("Hello").innerHTML = "Hi " + Username + "!";

function AddRoom() {
      RoomName = document.getElementById("Room").value;
      firebase.database().ref("/" + RoomName).child(RoomName).update({
            purpose: "Add User"
      });
      localStorage.setItem("RoomName", RoomName);
      window.location = "page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("Output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Rooms = childKey;
                  console.log("Room " + Rooms);
                  Row = "<div class='roomname' id='" + Rooms + "'onclick='RedirectToRoom(this.id)'>#" + Rooms + "</div><hr>";
                  document.getElementById("Output").innerHTML += Row;
            });
      });
}
getData();

function RedirectToRoom(Name) {
      console.log(Name);
      localStorage.setItem("RoomName", Name);
      window.location = "page.html";
}

function LogOut() {
      localStorage.removeItem("Username");
      localStorage.removeItem("RoomName");
      window.location = "index.html";
}