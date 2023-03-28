document.addEventListener("DOMContentLoaded", () => {
    console.log("connexion admin")
    connectForm();
});

//******* fonction connecte admin ******/
function connectForm() {
    document.querySelector("#btn-connect").addEventListener("click", (event) => {
        event.preventDefault();
        const emailLogin = document.querySelector("#form-email");
        const passwordLogin = document.querySelector("#form-password")
            if (emailLogin.value === "" || passwordLogin.value === "") {
                return errorMessage("Veuillez entrer un mail et un mot de passe");
            }
            if ((validEmail(emailLogin)) && (validPassword(passwordLogin))){
            return fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailLogin.value,
                    password: passwordLogin.value,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                    if (data.error || data.message === "user not found") {
                        return errorMessage("Utilisateur non trouve");
                    }
                    localStorage.setItem("token", JSON.stringify(data));
                    document.location.href = "index.html";
            })
            .catch((error) => console.log(error));
        }
    })
}

//******** fonction message d'erreur *********//
function errorMessage(message) {
    const errorMessage = document.querySelector("#error-message");
    errorMessage.textContent = message;
    errorMessage.classList.replace("hide", "show-message");
    setTimeout(() => {
        errorMessage.classList.replace("show", "hide");
        errorMessage.textContent = "";
        },4000);
}

//******** fonction validation email *********//
const validEmail = (inputEmail) => {
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$','g');
    let testEmail = emailRegExp.test(inputEmail.value)
    console.log(testEmail)
    let small = inputEmail.nextElementSibling;
    if(testEmail){
        small.innerHTML = 'adresse email valide'
        small.classList.remove('text-no-valide')
        small.classList.add('text-valide')
        return true;
    }
    else{
        small.innerHTML = 'Adresse Email Non valide'
        small.classList.remove('text-valide')
        small.classList.add('text-no-valide')
        return false;
    }
}

//******** fonction validation mot de passe *********//
const validPassword = (inputPassword) => {
    let msg;
    let valide = false;
    console.log(inputPassword.value)
  //au moin 6 caracter et au moin 1 majuscul et 1 minuscul et 1 chiffre

    if(inputPassword.value.length<6){
        msg = 'Le mot de passe doit contenir au moins 6 caracteres';
    }
    else if (!/[A-Z]/.test(inputPassword.value)){
        msg = 'Le mot de passe doit contenir au moin une majuscul';
    }
    else if (!/[a-z]/.test(inputPassword.value)){
        msg = 'Le mot de passe doit contenir au moin une minuscul';
    }
    else if (!/[0-9]/.test(inputPassword.value)){
        msg = 'Le mot de passe doit contenir au moin un chiffre';
    }
    else {
        msg = 'Le mot de passe est valide';
        valide = true;
    }
    console.log(msg)
    let small = inputPassword.nextElementSibling;
    if(valide){
        small.innerHTML = 'mot de passe valide';
        small.classList.remove('text-no-valide')
        small.classList.add('text-valide')
        return true;
    }
    else{
        small.innerHTML = msg;
        small.classList.remove('text-valide')
        small.classList.add('text-no-valide')
        return false
    }
 }
