function AddUser() {
    Username = document.getElementById("Username").value;
    console.log(Username);
    localStorage.setItem("Username", Username);
    window.location = "room.html";
}