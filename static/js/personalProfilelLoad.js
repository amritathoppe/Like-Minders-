function retrieveUserFromSession() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var msgElement = document.getElementById("msg");
                if (msg) {
                    var userObj = JSON.parse(this.responseText);
                    var logInfoElement = document.getElementById("userLogInfo");
                    if (logInfoElement) {
                        logInfoElement.innerHTML = " Welcome " + userObj.userName + "!";
                        logInfoElement.style.display = 'block';
                        }
                    var logoutElement = document.getElementById("logout");
                    logoutElement.style.display = 'block';
                    var HiddenUser=document.getElementById("userHidden");
                    HiddenUser.innerText = userObj.userName;

                }
            }
            if (this.status == 401) {
                var bodyElement = document.getElementById("personalProfileContainer");
                if (bodyElement) {
                    bodyElement.innerHTML = this.responseText;
                }
            }
        }
    };
    xhr.open("GET", "http://localhost:8080/user", true);
    xhr.send();
}