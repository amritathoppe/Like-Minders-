function ajaxProfileForm() {

    var firstNameElement = document.getElementById("firstName");
    var lastNameElement = document.getElementById("lastName");
    var interestElement = document.getElementById("interest");
    var stateElement = document.getElementById("state");
    var profileImageElement = document.getElementById("profileImageText");
    var ImageUploadElement = document.getElementById("ImageUpload");
    var userHiddenElement = document.getElementById("userHidden");

    if (firstNameElement && lastNameElement) {
        var firstName = firstNameElement.value;
        var lastName = lastNameElement.value;
        var interest = interestElement.value;
        var state = stateElement.value;
        var profileImage = profileImageElement.value;
        var ImageUpload = ImageUploadElement.value;
        var sessionUser = userHiddenElement.innerText;

        console.log(sessionUser);
        if (firstName.length > 50) {
            document.getElementById("firstNameMessage").innerHTML = "First Name max 50 chars!";
            document.getElementById("msg").innerHTML = "Update unsuccessful! ";
        }
        if (lastName.length > 50) {
            document.getElementById("lastNameMessage").innerHTML = "Last Name max 50 chars!";
            document.getElementById("msg").innerHTML = "Update unsuccessful! ";
        }
        if (interest.length > 2000) {
            document.getElementById("interestsMessage").innerHTML = "Interest max 2000 chars!";
            document.getElementById("msg").innerHTML = "Update unsuccessful! ";
        }

        else{
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                var msgElement = document.getElementById("msg");
                if (msg) {
                    msg.innerHTML = this.responseText;
                    if (this.status == 200) {
                        msg.innerHTML = msg.innerHTML + "You can Search Profiles  " +
                            "by <a href='http://localhost:8080/static/html/searchProfile.html'> clicking here</a>";
                    }
                }
            }
        };
        xhr.open("POST", "http://localhost:8080/personalProfile", true);
        xhr.setRequestHeader("Content-type",
            "application/x-www-form-urlencoded");
        xhr.send("firstName=" + firstName + "&lastName=" + lastName + "&interest=" + interest + "&state=" + state + "&profileImageText=" + profileImage + "&ImageUpload=" + ImageUpload + "&sessionUser=" + sessionUser);
    }
    }
}