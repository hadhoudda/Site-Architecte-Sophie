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

const boutonFiltreAllWorks = document.querySelector(".button-all-works");
buttonFiltreAllWork.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    descripitionWorks(works);

});
switch(works[0]){
    /// filtre les photos objets
    case 1:
        const boutonFiltreObject = document.querySelector(".button-object");
        buttonFiltreObject.addEventListener("click", function (){
            document.querySelector(".gallery").innerHTML = "";
            descripitionWorks(works);
        });
        break;
    // filtres les photos appartements
    case 2:
        const boutonFiltreApartement = document.querySelector(".button-apartment");
        buttonFiltreApartement.addEventListener("click", function (){
            document.querySelector(".gallery").innerHTML = "";
            descripitionWorks(works);
        });
        break;
    // filtres les photos hôtels
    case 3:
        const boutonFiltreHoitel = document.querySelector(".button-hotel");
        buttonFiltreObject.addEventListener("click", function (){
            document.querySelector(".gallery").innerHTML = "";
            descripitionWorks(works);   
        });
        break;

}
