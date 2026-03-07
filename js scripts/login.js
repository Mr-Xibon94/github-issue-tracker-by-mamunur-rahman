const btnSignIn = document.getElementById("btnSignIn");

btnSignIn.addEventListener('click', () => {
    const usernameInput = document.getElementById("usernameInput");
    const usernameValue = usernameInput.value;

    console.log(usernameValue);

    const passInput = document.getElementById("passInput");
    const passValue = passInput.value;

    console.log(passValue)

    if(usernameValue === "admin" && passValue === "admin123") {
        alert(`Sign in Successful`);
        window.location.assign("./home.html");
    } else {
        alert(` Sign in failed. Try Again.`)
    }
})