let works;
let modal = null
const token = localStorage.getItem("token");

const cleToken = JSON.parse(localStorage.getItem("token")).token;
//console.log(token);
const getData = async () => {
    try {
        const response = await fetch("http://localhost:5678/api/works")
        console.log(response)
        if (!response.ok) {
            throw new Errr(`an error occured with status: ${response.status}`);
        }
        works = await response.json();
        afficherProject(works);
        affichModal(works);
    } catch (error) {
        alert(error);
    }
    console.log(works)
};

//****** tous les fonctions utilés de page *******//
getData();
//********* ajouter les bouttons de filtre *********//
const sectionFilter = document.querySelector(".filter");
sectionFilter.innerHTML =
    `<button id="button-all-works" class="style-button-filtre" type= "button"> Tous</button>
    <button id="button-object" class="style-button-filtre"> Objets</button>
    <button id="button-apartment" class="style-button-filtre"> Appartements</button>
    <button id="button-hotel" class="style-button-filtre"> Hôtels & restaurants</button>`;
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
//******** fonction pour affichager les projets **********//
const afficherProject = (works) => {
    document.querySelector(".gallery").innerHTML = null;
  
    for (let elem in works) {
        const sectionGallery = document.querySelector(".gallery");
        const worksElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = works[elem].imageUrl
        imageElement.crossOrigin = 'anonymous'
        const titleElement = document.createElement("h3");
        titleElement.innerText = works[elem].title;
        sectionGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
    }
}
//******* fonction filtre des projets ********//
const filtreProjects = (work, filterName) => {
    return works.filter((work) => {
        if (work?.category?.name === filterName) {
            return work;
        }
    });
}

//******* fonction connexion admin ********//
function connectAdmin(){
    const token = localStorage.getItem("token");
if(token !== null){
    //**** affichage modification page admin *****//
    //*** partie haute noir ***//
    document.querySelector('#header-black').classList.replace("hide","show-head-black");
    //*** boutton edit ***//
    document.querySelector('#button-edit-photo').classList.replace("hide","show-edit-photo");
    document.querySelector('#button-edit-text').classList.replace("hide","button-edit-text");
    document.querySelector('#button-edit-projet').classList.replace("hide","show-edit-projet");
    //*** affichage les boutons de la modale ***//
    sectionFilter.classList.replace("filter","hide")
    document.querySelector('#connect-admin').classList.replace("show", "hide")
    document.querySelector('#deconnect-admin').classList.replace("hide", "show");
    }
}
connectAdmin()

//***** ecouter boutton deconnexion *****//
document.querySelector('#deconnect-admin').addEventListener('click', function(){
    localStorage.removeItem("token")
    document.querySelector('#connect-admin').classList.replace("hide", "show")
    document.querySelector('#deconnect-admin').classList.replace("show", "hide");
})

//*************code modal ouverture et fermeture et ses fonctionnalites  ********//
//******** fonction ouverture modal *********//
const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector('.modal')
    //e.target.getAttribute('href')
    modal.style.display = null
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

//********* ecoute boutton ouvrir modale *********//
document.querySelector(".js-modal").addEventListener("click", openModal);

//******** fonction fermeture modal *********//
const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    document.querySelector(".js-container-modal").style.display = null;
    document.querySelector(".container-add-photo-modal").style.display = "none";
    modal = null
};

//******** on éviter la propogation de click d'un enfant à son parent *******//
const stopPropagation = function (e) {
    e.stopPropagation()
}
//********** ecouter boutton retour ***********//
document.getElementById("icone-return").addEventListener("click", function () {
    document.querySelector(".js-container-modal").style.display = null;
    document.querySelector(".container-add-photo-modal").style.display = "none";
});
//********** ecouter boutton fermeture modale vue 2 ***********//
document.querySelector('.js-close-modal-vue2').addEventListener('click', closeModal)

//******** ecoute boutton ouvrir modal vue 2 : ajoujte photo ********//
document.querySelector(".btn-add-photo-modal").addEventListener("click", function () {
    document.querySelector(".js-container-modal").style.display = "none";
    document.querySelector(".container-add-photo-modal").style.display =null;
});


//********** affichage de modal avec les photos de projets et ses foncationalites**********//
function affichModal(works) {
    console.log(works)
    document.querySelector(".js-galeri-modal").innerHTML = null;
    for (let elem in works) {
        const  idDelet = `${works[elem].id}`
        const sectionGallery = document.querySelector(".js-galeri-modal");
        const worksElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = works[elem].imageUrl;
        imageElement.crossOrigin = 'anonymous'
        const titleElement = document.createElement("span");
        titleElement.innerText = `éditer`;
        sectionGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
        //ajouter icone sur photo de modale
        const divIcone = document.createElement('div')
        divIcone.classList.add('style-icone-photo-modal')
        //boutton supprime photo
        const btnDelet = document.createElement('i')
        btnDelet.classList.add( 'fa-solid',"fa-trash-can", "btn-delet","style-icone-photo" )
        btnDelet.setAttribute("id", works[elem].id)
        //boutton agrandir photo
        const iconeRemov = document.createElement('i')
        iconeRemov.classList.add("fa-solid", "fa-up-down-left-right", "btn-move", "style-icone-photo")
        iconeRemov.style.display = "none"
        worksElement.appendChild(divIcone)
        divIcone.appendChild(iconeRemov)
        divIcone.appendChild(btnDelet)
        //***** cacher et afficher l'icone agrandir image *****//
        imageElement.addEventListener("mouseover", function(){
             iconeRemov.style.display = null;
        })
        //ecoute boutton supprime pour chaque photo modale
        deletProject(btnDelet,works[elem].id)
        
    }
}

//********** fonction pour supprime un projet **********//
function deletProject(btn, idProject){
    btn.addEventListener("click", function(){
        if (confirm("Désirez-vous vraiment supprimer ce projet ?") == true) {
            fetch(`http://localhost:5678/api/works/${idProject}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cleToken}`
            },
            })
            .then (response => {console.log(response)
                   if (response.status === 204 ) {
                       console.log('projet supprime')}
                   if (response.status === 404 ) {
                       console.log('problem adresse url')}
                })

            getData()


        } }
    )
}

//********** ecouter boutton ajouter photo **********//
function choicePhoto(){
    const file = document.querySelector("#file")
    file.addEventListener("change", function (event) {
    const pictureWork = event.target.files;
    const fileType = ["image/jpg", "image/png"];
    const pictureWorkFileType = pictureWork[0].type;
    if (fileType.includes(pictureWorkFileType) === false) {
        return alert("Veuillez choisir une image au format jpg ou png");
    }
    if (pictureWork[0].size > 4*1024*1024) {
        return alert("Veuillez choisir une image de taille moin de 4mo");
    }
    workPicture = event.target.files[0];
    document.querySelector(".container-photo").style.display = "none";
    const picture = document.querySelector(".add-photo");
    const image = document.createElement("img");
    image.src = window.URL.createObjectURL(pictureWork[0]);
    picture.appendChild(image);
    console.log(workPicture)
    return workPicture
    });
}
    // fin ecoute bou

//const file = document.querySelector("#file")
//choicePhoto()
let workPicture = choicePhoto()
// **********  fonction ajoute photo **********//
function addPhoto(event){
    event.preventDefault();
    const cleToken = JSON.parse(localStorage.getItem("token")).token;
    const titleValue = document.querySelector("#title").value;
    const categoryValue = document.querySelector("#category").value;
    if(titleValue === "" || categoryValue === "" || workPicture === undefined  || workPicture === ""){
        return alert("Veuillez remplir tous les champs.");
    }

    const categoriesChoices = ["objets", "appartements", "hotels-restaurants"];
    const categoryChoiceInteger = categoriesChoices.findIndex((choice)=>{
          return choice === categoryValue;

    });
    console.log(workPicture)
    console.log(titleValue)
    console.log(categoryChoiceInteger)

    const formData = new FormData();
    formData.append("image", workPicture);
    formData.append("title", titleValue);
    formData.append("category", categoryChoiceInteger + 1);

    fetch("http://localhost:5678/api/works",{

    method: "POST",
    headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${cleToken}`
    },
    body: formData

    }).then((response)=>{

       return response.json();
    }).then((result)=>{
        console.log(result)
        })
    //getData()
    // retour affichage de modale vue1 // 
    document.querySelector(".js-container-modal").style.display = null;
    document.querySelector(".container-add-photo-modal").style.display ="none";

}
//**********ecouter boutton valide pour ajouter photo **********//


affichNewProject()
////////////////////function affichage nouveau projet
function affichNewProject(){
    const newProject =  document.querySelector("#send-picture").addEventListener("click",addPhoto )
        // document.querySelector(".gallery").innerHTML += affichNewProject(newProject) ;
        // document.querySelector(".js-galeri-modal").innerHTML += affichModal(newProject)
        //affichNewProject(newProject)
        console.log("nouveau projet" + newProject)
    console.log ("un nouveau projet est ajouté " )
}

