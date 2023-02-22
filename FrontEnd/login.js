const sectionConnect = document.querySelector(".form-login");
//Ecoute la modification de l'email
sectionConnect.email.addEventListener('change', function(){
    validEmail(this);
})
//fonction validEmail
const validEmail = (inputEmail) => {
    console.log(inputEmail.value)
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
//Ecoute la modification de password
sectionConnect.password.addEventListener('change', function(){
    validPassword(this);
})
//fonction validPassword
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
//ecouter la soumission de formulaire
sectionConnect.addEventListener('submit', function(e){
        e.preventDefault();
        if ((validEmail(sectionConnect.email))&&(validPassword(sectionConnect.password))){
           sectionConnect.submit(sectionConnect.email.value,sectionConnect.password.value )
        }
})
//fonction boutton de connexion
const submit = (mail , pwd)=> {
    let reponse =  fetch('http://localhost:5678/api/users/login', {
        method: 'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })
    if(mail==email && pwd==password){
       sectionConnect=  fetch('index.html')+= innerHTML('je le code apres')
    }
    else{
sectionConnect= innerHTML("Erreur dans l`identifiant ou le mot de passe")
    }
}
