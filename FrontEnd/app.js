<<<<<<< HEAD
let works;
=======

let works;

>>>>>>> 20880ed606570a25d9415fd17e284309555bab09
//fonction pour récupérer des infos depuis API HTTP
const getData = async () => {
    try {
<<<<<<< HEAD
        const reponse = await fetch("http://localhost:5678/api/works");
        console.log(reponse);
        if (!reponse.ok) {
            throw new Error(`an error occured with status: ${reponse.status}`);
        }
        works = await reponse.json();
        afficherProject(works);
        console.log(works);
=======
        const reponse = await fetch(url);

        if (!reponse.ok) {
            throw new Error(`an error occured with status: ${reponse.status}`);
        }

        works = await reponse.json();

        afficherProject(works);

>>>>>>> 20880ed606570a25d9415fd17e284309555bab09
    } catch (error) {

        alert(error);
    }
};
<<<<<<< HEAD
getData();
=======

getData("http://localhost:5678/api/works");
>>>>>>> 20880ed606570a25d9415fd17e284309555bab09
//ajouter les bouttons de filtre
const sectionFilter = document.querySelector(".filter");
sectionFilter.innerHTML =
    '<button id="button-all-works" class="filter-button" type= "button"> Tous</button>' +
    '<button id="button-object" class="filter-button"> Objets</button>' +
    '<button id="button-apartment" class="filter-button"> Appartements</button>' +
    '<button id="button-hotel" class="filter-button"> Hôtels & restaurants</button>';
<<<<<<< HEAD
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
    filtreProjects(1);
    return afficherProject(filtreProjects(works, "Objets"));
});
buttonCategory2.addEventListener("click", function () {
    filtreProjects(2);
    return afficherProject(filtreProjects(works, "Appartements"));
});
buttonCategory3.addEventListener("click", function () {
    filtreProjects(3);
    return afficherProject(filtreProjects(works, "Hotels & restaurants"));
=======

const buttonAllCategory = document.querySelector("#button-all-works");
const buttonCategory1 = document.querySelector("#button-object");
const buttonCategory2 = document.querySelector("#button-apartment");
const buttonCategory3 = document.querySelector("#button-hotel");

buttonAllCategory.addEventListener("click", function () {
    
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

>>>>>>> 20880ed606570a25d9415fd17e284309555bab09
});
//fonction d'affichage des projets
const afficherProject = (works) => {
    document.querySelector(".gallery").innerHTML = null;
    for (let elem in works) {
        const article = works[elem];
        const sectionGallery = document.querySelector(".gallery");
        const worksElement = document.createElement("article");
        const titleElement = document.createElement("h3");
        titleElement.innerText = article.title;
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        //const categorId = document.createElement("p");
        //categorId.innerText = article.categoryId;
        // worksElement.setAttribute("data-cat", article.categoryId);
        sectionGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
    }
};
<<<<<<< HEAD
//fonction de filtre des projets
const filtreProjects = (work, filterName) => {
    return works.filter((work) => {
        if (work?.category?.name === filterName) {
            return work;
        }
    });
=======

// //fonction de filtre des projets
const filtreProjects = (works, filterName) => {
      
       return works.filter((work)=>{

            if(work?.category?.name === filterName){

                return work;
            }

       });

>>>>>>> 20880ed606570a25d9415fd17e284309555bab09
};
