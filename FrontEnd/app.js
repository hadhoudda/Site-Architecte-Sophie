import {  affichModal} from "./modal.mjs";
var works;
const token = localStorage.getItem("token");
const getData = async () => {
    try {
        const response = await fetch("http://localhost:5678/api/works")
        console.log(response)
        if (!response.ok) {
            throw new Error(`an error occured with status: ${response.status}`);
        }
        works = await response.json();
        afficherProject(works);
        affichModal(works);
    } catch (error) {
        alert(error);
        //document.querySelector('.filter').innerHTML=('Impossible de télècharger les porjets essayer plus tard')
    }
    console.log(works)
};
getData();
//ajouter les bouttons de filtre
const sectionFilter = document.querySelector(".filter");
sectionFilter.innerHTML =
    '<button id="button-all-works" class="style-button-filtre" type= "button"> Tous</button>' +
    '<button id="button-object" class="style-button-filtre"> Objets</button>' +
    '<button id="button-apartment" class="style-button-filtre"> Appartements</button>' +
    '<button id="button-hotel" class="style-button-filtre"> Hôtels & restaurants</button>';
const buttonAllCategory = document.getElementById("button-all-works");
const buttonCategory1 = document.querySelector("#button-object");
const buttonCategory2 = document.querySelector("#button-apartment");
const buttonCategory3 = document.querySelector("#button-hotel");
buttonAllCategory.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    getData();
    return afficherProject(works);
});
buttonCategory1.addEventListener("click", function () {
    return afficherProject(filtreProjects(works, "Objets"));
});
buttonCategory2.addEventListener("click", function () {
    return afficherProject(filtreProjects(works, "Appartements"));
});
buttonCategory3.addEventListener("click", function () {
    return afficherProject(filtreProjects(works, "Hotels & restaurants"));
});
//fonction d'affichage des projets
const afficherProject = (works) => {
    document.querySelector(".gallery").innerHTML = null;
    for (let elem in works) {
        // for (let i = 0; i < data.length; i++) {
        //     const article = document.createElement("article");
        //     const imageElement = document.createElement("img");
        //     imageElement.setAttribute("crossorigin", "anonymous");
        //     imageElement.setAttribute("src", data[i].imageUrl);
        //     imageElement.setAttribute("alt", data[i].title);
        //     const titreElement = document.createElement("figcaption");
        //     titreElement.innerText = data[i].title;
        //     article.appendChild(imageElement);
        //     article.appendChild(titreElement);
        //     gallery.appendChild(article)
        // }
        const sectionGallery = document.querySelector(".gallery");
        const worksElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = works[elem].imageUrl
        const titleElement = document.createElement("h3");
        titleElement.innerText = works[elem].title;
        
        sectionGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
    }
};
//fonction de filtre des projets
const filtreProjects = (work, filterName) => {
    return works.filter((work) => {
        if (work?.category?.name === filterName) {
            return work;
        }
    });
}

function checkIsAdmin(){
    
  if(token !== null){
     //affichage modification page admin
     //partie haute noir
     document.querySelector('#header-black').classList.replace("hide","show-head-black");
    //boutton edit
    document.querySelector('#button-edit-photo').classList.replace("hide","show-edit-photo");
    document.querySelector('#button-edit-text').classList.replace("hide","button-edit-text");
    document.querySelector('#button-edit-projet').classList.replace("hide","show-edit-projet");
     // Je peux afficher les boutons de la modale
    sectionFilter.classList.replace("filter","hide")
    document.querySelector('#connect-admin').classList.replace("show", "hide")
    document.querySelector('#deconnect-admin').classList.replace("hide", "show");
  }
  }
  checkIsAdmin()
////// deconnexion ////////////
document.querySelector('#deconnect-admin').addEventListener('click', function(){
    localStorage.removeItem("token")
    document.querySelector('#connect-admin').classList.replace("hide", "show")
    document.querySelector('#deconnect-admin').classList.replace("show", "hide");
})

