//Récupération des infos depuis API HTTP
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

function descripitionWorks(works){
    for ( let i=0; i < works.length; i++){
        const article = works[i];
        const sectionGallery = document.querySelector(".gallery");
        const worksElement = document.createElement("article");
        //creation des balises
        const titleElement = document.createElement("h3");
        titleElement.innerText = article.title;
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        //On rattache la balise article a la section gallery
        sectionGallery.appendChild(worksElement);
        // image en position haut 
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
    }
}
descripitionWorks(works);
//filtre
const boutonFiltreAllWorks = document.querySelector("#all-works");
boutonFiltreAllWork.addEventListener("click", function () {
  
    document.querySelector(".gallery").innerHTML = "";
    descripitionWorks(works);

});


