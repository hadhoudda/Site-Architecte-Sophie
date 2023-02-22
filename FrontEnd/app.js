let works;
const getData = async () => {
    try {
        const reponse = await fetch("http://localhost:5678/api/works")//(config.host + "/api/works");
        console.log(reponse)
        if (!reponse.ok) {
            throw new Error(`an error occured with status: ${reponse.status}`);
        }
        works = await reponse.json();
        afficherProject(works);
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
    '<button id="button-all-works" class="style-button" type= "button"> Tous</button>' +
    '<button id="button-object" class="style-button"> Objets</button>' +
    '<button id="button-apartment" class="style-button"> Appartements</button>' +
    '<button id="button-hotel" class="style-button"> Hôtels & restaurants</button>';
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
        const article = works[elem];
        const sectionGallery = document.querySelector(".gallery");
        const worksElement = document.createElement("article");
        const titleElement = document.createElement("h3");
        titleElement.innerText = article.title;
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
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