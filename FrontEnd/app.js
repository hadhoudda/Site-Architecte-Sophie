//fonction pour récupérer des infos depuis API HTTP
const getData = async (url) => {
    try {
        const reponse = await fetch(url);
        console.log(reponse);

        if (!reponse.ok) {
            throw new Error(`an error occured with status: ${reponse.status}`);
        }
        const works = await reponse.json();
        afficherPage(works);
    } catch (error) {
        alert(error);
    }
    console.log();
};
getData("http://localhost:5678/api/works");
//ajouter les bouttons de filtre
const sectionFilter = document.querySelector(".filter");
sectionFilter.innerHTML =
    '<button id="button-all-works" class ="filter-button" type= "button"> Tous</button>' +
    '<button id="button-object" class ="filter-button"> Objets</button>' +
    '<button id="button-apartment" class ="filter-button"> Appartements</button>' +
    '<button id="button-hotel" class ="filter-button"> Hôtels & restaurants</button>';

const buttonAllWorks = document.getElementById("button-all-works");
buttonAllWorks.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    getData("http://localhost:5678/api/works");
});
const buttonFiltreObject = document.getElementById("button-object");
buttonFiltreObject.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    filtreAffichager(1);
});
const buttonFiltreApartement = document.getElementById("button-apartment");
buttonFiltreApartement.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    filtreAffichager(2);
});
const buttonFiltreHotel = document.getElementById("button-hotel");
buttonFiltreHotel.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    filtreAffichager(3);
});
//fonction d'affichage des projets
function afficherPage(works) {
    for (let elem in works) {
        const article = works[elem];
        const sectionGallery = document.querySelector(".gallery");
        const worksElement = document.createElement("article");
        const titleElement = document.createElement("h3");
        titleElement.innerText = article.title;
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        worksElement.setAttribute("id-cat", article.categoryId);
        sectionGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
    }
}

//fonction de filtre des projets
function filtreAffichager(id) {
    const filtreWorks = array.from(getData("http://localhost:5678/api/works"));
    for (let elem of filtreWorks) {
        if (elem.categoryId == id) {
            afficherPage(works);
        }
    }
}
