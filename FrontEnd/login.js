  document.addEventListener("DOMContentLoaded", () => {
    checkForm();
});
function checkForm() {
    // ()=> This is arrow functions https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    document
        .querySelector("#btn-connect")
        .addEventListener("click", (event) => {
            event.preventDefault();
            const emailLogin = document.querySelector("#form-email").value;
            const passwordLogin =
                document.querySelector("#form-password").value;
            if (emailLogin === "" || passwordLogin === "") {
                return errorMessage(
                    "Veuillez entrer un mail et un mot de passe"
                );
            }
            return fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailLogin,
                    password: passwordLogin,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    //console.log(emailLogin)
                    //console.log(passwordLogin)
                    if (data.error || data.message === "user not found") {
                        return errorMessage("Utilisateur non trouve");
                    }
                    localStorage.setItem("token", JSON.stringify(data));
                    document.location.href = "index.html";
                })
                .catch((error) => {
                    console.log(error);
                });
        });

    //////////////fonction message d'erreur
    function errorMessage(message) {
        const errorMessage = document.querySelector("#error-message");
        errorMessage.textContent = message;
        errorMessage.classList.replace("hide", "show-message");
        setTimeout(() => {
            errorMessage.classList.replace("show", "hide");
            errorMessage.textContent = "";
        }, 4000);
    }
}


  