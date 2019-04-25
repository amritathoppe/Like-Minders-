function ajaxSubmitForm() {
    console.log("Username: " + document.getElementById("username") + " Password: " + document.getElementById("password"));

    let usernameElement = document.getElementById("username");
    let passwordElement = document.getElementById("password");


    if (usernameElement && passwordElement) {
        let username = usernameElement.value;
        let password = passwordElement.value;
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        //Username Validation - not empty
        if (!username || username.length <= 0) {
           emailClientMessage.innerHTML= "Username required!";
        }
        else if (!username.match(mailFormat)) {
            //emailClientMessage.innerHTML="Username isnt in Email Format!";
            emailClientMessage.innerHTML="Enter in valid Email Format!";
        }
        //Password Validation - not empty
        else if (!password || password.length <= 0) {
            passwordClientMessage.innerHTML ="password required!";
        }

        else{
            console.log("AJAX!");
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                var msgElement = document.getElementById("msg");
                if (msg) {
                    msg.innerHTML = this.responseText;
                    if (this.status == 200) {
                        msg.innerHTML = msg.innerHTML + "You will be redirected to the Login Page in 15 seconds " +
                            "or <a href='http://localhost:8080/static/html/login.html'>click here</a>";
                        setTimeout(function () {
                            window.location.href = "http://localhost:8080/static/html/login.html";
                        }, 15000);
                    }
                }
            }
            };
            xhr.open("POST", "http://localhost:8080/save/registration", true);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.send("username=" + username + "&password=" + password);
    }
    }
}