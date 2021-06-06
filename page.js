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
RoomName = localStorage.getItem("RoomName");

function SendMessage() {
    Message = document.getElementById("Message").value;
    firebase.database().ref(RoomName).push({
          Name: Username,
          Message: Message,
          Like: 0
    });

    document.getElementById("Message").value = "";
}

function getData() {
    firebase.database().ref("/" + RoomName).on('value', function (snapshot) {
          document.getElementById("Output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                if (childKey != "purpose") {
                      MessageID = childKey;
                      MessageData = childData;
                      console.log(MessageID);
                      console.log(MessageData);
                      Name = MessageData['Name'];
                      Message = MessageData['Message'];
                      Like = MessageData['Like'];
                      NameTag = "<h4>" + Name + "<img class='tick' src='Tick.png'</h4>";
                      MessageTag = "<h4 class='message'>" + Message + "</h4>";
                      LikeButton = "<button class='btn btn-warning' id='" + MessageID + "' value=" + Like + " onclick='UpdateLike(this.id)'>";
                      SpanTag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + Like + "</span></button><hr>";
                      Row = NameTag + MessageTag + LikeButton + SpanTag;
                      document.getElementById("Output").innerHTML += Row;
                }
          });
    });
}
getData();

function UpdateLike(MessageID) {
    console.log("Liked - " + MessageID);
    ButtonID = MessageID;
    Likes = document.getElementById(ButtonID).value;
    UpdatedLikes = Number(Likes) + 1;
    console.log(UpdatedLikes);

    firebase.database().ref(RoomName).child(MessageID).update({
          Like: UpdatedLikes
    });
}

function LogOut() {
    localStorage.removeItem("Username");
    localStorage.removeItem("RoomName");
    window.location = "index.html";
}