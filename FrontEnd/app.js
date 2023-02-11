//Récupération des infos depuis API HTTP
const getData = async () => {
    try {
        const reponse = await fetch("http://localhost:5678/api/works");
        console.log(reponse);
        
        if (!reponse.ok) {
            throw new Error(`an error occured with status: ${reponse.status}`);
        }
        const works = await reponse.json();
        descripitionWorks(works);
        //console.log(works);
    } catch (error) {
        alert(error);
    }
    console.log();
    
};
const sectionFilter = document.querySelector(".filter");
sectionFilter.innerHTML='<button id="button-all-works" class ="filter-button"> Tous</button>'
+'<button id="button-object" class ="filter-button"> Objets</button>'
+'<button id="button-apartment" class ="filter-button"> Appartements</button>'
+'<button id="button-hotel" class ="filter-button"> Hôtels & restaurants</button>';


const buttonFiltreObject = document.querySelector(".button-object");
buttonFiltreObject.addEventListener("click", tri(1));
const buttonFiltreApartement =document.querySelector(".button-apartment");
buttonFiltreApartement.addEventListener("click", tri(2) );
const buttonFiltreHotel = document.querySelector(".button-hotel");
buttonFiltreHotel.addEventListener("click", tri(3));
getData();

function descripitionWorks(works){
    for ( let i in works){
        const article = works[i];
        const sectionGallery = document.querySelector(".gallery");
        const worksElement = document.createElement("article");
        const titleElement = document.createElement("h3");
        titleElement.innerText = article.title;
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        //On rattache la balise article a la section gallery
        sectionGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
    }
}

function tri(i) {
    let works=[]; 
    getData();
   let workTri =  descripitionWorks(works);
  
   console.log(workTri);
      
}








