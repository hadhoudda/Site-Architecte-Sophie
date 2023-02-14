//fonction pour récupérer des infos depuis API HTTP
const getData = async (url) => {
    try {
        const reponse = await fetch(url);
        console.log(reponse);

        if (!reponse.ok) {
            throw new Error(`an error occured with status: ${reponse.status}`);
        }
        const works = await reponse.json();
        afficherProject(works);
    } catch (error) {
        alert(error);
    }
    console.log();
};
getData("http://localhost:5678/api/works");
//ajouter les bouttons de filtre
const sectionFilter = document.querySelector(".filter");
sectionFilter.innerHTML =
    '<button id="button-all-works" class="filter-button" type= "button"> Tous</button>' +
    '<button id="button-object" class="filter-button"> Objets</button>' +
    '<button id="button-apartment" class="filter-button"> Appartements</button>' +
    '<button id="button-hotel" class="filter-button"> Hôtels & restaurants</button>';

const buttonAllCategory = document.getElementById("button-all-works");
buttonAllCategory.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    getData("http://localhost:5678/api/works");
});
const buttonCategory1 = document.getElementById("button-object");
buttonCategory1.addEventListener("click", function () {
    filtreProjects(1);
});
const buttonCategory2 = document.getElementById("button-apartment");
buttonCategory2.addEventListener("click", function () {
    filtreProjects(2);
});
const buttonCategory3 = document.getElementById("button-hotel");
buttonCategory3.addEventListener("click", function () {
    filtreProjects(3);
});
//fonction d'affichage des projets
const afficherProject=(works)=> {
    for (let elem in works) {
        const article = works[elem];
        const sectionGallery = document.querySelector(".gallery");
        const worksElement = document.createElement("article");
        const titleElement = document.createElement("h3");
        titleElement.innerText = article.title;
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        //imageElement.classList.add("active");
        const categorId = document.createElement("p")
        categorId.innerText= article.categoryId;
       // worksElement.setAttribute("data-cat", article.categoryId);
        sectionGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
        
    }
}


// //fonction de filtre des projets
const filtreProjects=(id)=> {
    document.querySelector(".gallery").innerHTML = "";
    const project = getData("http://localhost:5678/api/works")
    for (let elem in project){
        if(categorId != id){
           delete project[elem ]
        }
    }

}

