// Modal Image Gallery
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}

// Change style of navbar on scroll
window.onscroll = function() {myFunction()};
function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function isRequire(val, msgid ,currentId)
{
    if(val == "")
    {
        document.getElementById(msgid).innerHTML = currentId + " required!";

    }
    else
    {
        if(msgid == 'passwordClientMessage') {
            document.getElementById(msgid).innerHTML = "";
        }

    }

}

function emailValidation(val){

    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(!val.match(mailFormat))
    {
        document.getElementById('emailClientMessage').innerHTML = "Enter in valid Email Format!";
       //return false;
    }
    else
    {
        document.getElementById('emailClientMessage').innerHTML = "";
        //return true;
    }

}

function chkLength(len,maxlen,id,msgid) {
    // alert(len +" "+id);


   if (len.length > maxlen) {
        document.getElementById(msgid).innerHTML = id +" maximum " + maxlen +" chars allowed!";

    } else {
        document.getElementById(msgid).innerHTML = "";

    }
}


document.addEventListener("DOMContentLoaded", function(event) {
    var fileBtn = document.getElementById("ImageUpload");
    var ProfileImageBtn = document.getElementById("profileImageUpload");
    var profileImageTxt = document.getElementById("profileImageText");
    if (ProfileImageBtn)
    {       ProfileImageBtn.addEventListener("click", function () {
            fileBtn.click();
        });
    }
    if(fileBtn){
    fileBtn.addEventListener("change", function () {
        if (fileBtn.value) {
            profileImageTxt.innerHTML = fileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        } else {
            profileImageTxt.innerHTML = "No file chosen,yet";
        }
    });}
});