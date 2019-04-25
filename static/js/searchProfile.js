function ajaxSearchProfileForm() {
   var searchByElement = document.querySelector('input[name = "searchBy"]:checked').value;
   var searchTermElement = document.getElementById("searchTerm");
   var userHiddenElement = document.getElementById("userHidden");

    if (searchByElement && searchTermElement) {
        var searchByThis = searchByElement;
        var searchTerm = searchTermElement.value;
        var sessionUser = userHiddenElement.innerText;
        console.log(sessionUser);
       // var sessionUser = sessionStorage.getItem("MyId");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                var msgElement = document.getElementById("msg");
                if (msg) {
                    msg.innerHTML = this.responseText;
                    if (this.status == 200) {
                        msg.innerHTML = msg.innerHTML;
                    }
                }
            }
        };
        xhr.open("POST", "http://localhost:8080/searchProfile", true);
        xhr.setRequestHeader("Content-type",
            "application/x-www-form-urlencoded");
        xhr.send("searchBy="+ searchByThis+"&searchTerm="+ searchTerm +"&sessionUser="+sessionUser);
    }
}