function ajaxLoginForm() {
    console.log("Username: " + document.getElementById("username") + " Password: " + document.getElementById("password"));

    var usernameElement = document.getElementById("username");
    var passwordElement = document.getElementById("password");



    if (usernameElement && passwordElement) {
        var username = usernameElement.value;
        var password = passwordElement.value;
        sessionStorage.setItem("MyId", username);
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        //Username Validation - not empty
        if (!username || username.length <= 0) {
            emailClientMessage.innerHTML= "username required!";
        }
        else if (!username.match(mailFormat)) {
            //emailClientMessage.innerHTML="Username isnt in Email Format!";
            emailClientMessage.innerHTML="Enter in valid Email Format";
        }
        //Password Validation - not empty
        else if (!password || password.length <= 0) {
            passwordClientMessage.innerHTML ="password required!";
        }

        else{
        console.log("AJAX!");

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                var msgElement = document.getElementById("msg");
                if (msg) {
                    msg.innerHTML = this.responseText;
                    if (this.status == 200) {
                        msg.innerHTML = msg.innerHTML + "You will be redirected to the Personal Profile Page in 15 seconds " +
                            "or <a href='http://localhost:8080/static/html/personalProfile.html'>click here</a>";
                        setTimeout(function() {
                            window.location.href = "http://localhost:8080/static/html/personalProfile.html";
                        }, 15000);
                    }
                }
            }
        };
        xhr.open("POST", "http://localhost:8080/login", true);
        xhr.setRequestHeader("Content-type",
            "application/x-www-form-urlencoded");
        xhr.send("username="+username+"&password="+password);
    }
    }
}