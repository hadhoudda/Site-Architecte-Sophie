let modal = null
let workPicture = choicePhoto()

window.onload = () =>{
    //*** récupèration tous les boutons d'ouverture de modale
    const modalBtn = document.querySelectorAll("[class = js-modal]")
    for (let btn of modalBtn){
        btn.addEventListener("click", () => {
            openModal()
        })
    }
}

/**
 * fonction ouverture modal
 */
const openModal = function () {
    modal = document.querySelector('.modal')
    modal.style.display = null
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    functionModalVue2()
}

/**
 * fonction fermeture modal
 * @returns 
 */
const closeModal = function () {
    if (modal === null) return
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    document.querySelector(".js-container-modal").style.display = null
    document.querySelector(".container-add-photo-modal").style.display = "none"
    modal = null
}

/**
 * on éviter la propogation de click d'un enfant à son parent
 * @param {event} e 
 */
const stopPropagation = function (e) {
    e.stopPropagation()
}

/**
 * fonction pour afficher modal vue 2
 */
function functionModalVue2 (){
    document.getElementById("icone-return").addEventListener("click", btnRetourModalVue2)
    document.querySelector(".btn-add-photo-modal").addEventListener("click", closeModalVue2)
    document.querySelector('.js-close-modal-vue2').addEventListener('click', closeModal)
}

/**
 * fonction retour modal vue 2
 */
function btnRetourModalVue2(){
    workPicture = undefined;
    document.querySelector(".js-container-modal").style.display = null;
    document.querySelector(".container-add-photo-modal").style.display = "none"
    document.querySelector(".container-photo").style.display = null
    document.querySelector(".photo").textContent = null
}

/**
 * fonction ouvrir modal vue 2 : ajoujte photo
 */
 function closeModalVue2() {
    document.querySelector(".js-container-modal").style.display = "none";
    document.querySelector(".container-add-photo-modal").style.display =null
    sendProject()
}

/**
 *  affichage de modal avec les photos de projets et ses foncationalites
 * @param {Object} work 
 */
function displayModal(work) {
    const sectionGallery = document.querySelector(".js-galeri-modal")
    const worksElement = document.createElement("article")
    worksElement.setAttribute("id", work.id)
    const imageElement = document.createElement("img")
    imageElement.src = work.imageUrl
    imageElement.crossOrigin = 'anonymous'
    const titleElement = document.createElement("span")
    titleElement.textContent = `éditer`
    sectionGallery.appendChild(worksElement)
    worksElement.appendChild(imageElement)
    worksElement.appendChild(titleElement)
    //*** ajouter icone sur la photo de modale
    const divIcone = document.createElement('div')
    divIcone.classList.add('style-icone-photo-modal')
    //*** boutton supprime photo
    const btnDelet = document.createElement('i')
    btnDelet.classList.add( 'fa-solid',"fa-trash-can", "btn-delet","style-icone-photo" )
    //*** boutton agrandir photo
    const iconeEnlarge = document.createElement('i')
    iconeEnlarge.classList.add("fa-solid", "fa-up-down-left-right", "btn-enlarge", "style-icone-photo")
    iconeEnlarge.style.display = "none"
    worksElement.appendChild(divIcone)
    divIcone.appendChild(iconeEnlarge)
    divIcone.appendChild(btnDelet)
    //*** cacher et afficher l'icone agrandir image *****//
    worksElement.addEventListener("mouseover", function(){
        iconeEnlarge.style.display = null
    })
    worksElement.addEventListener("mouseout", function(){
        iconeEnlarge.style.display = "none"
    })
    //ecoute boutton supprime pour chaque photo modale
    deletProject(btnDelet,work.id)
}

/**
 * fonction pour supprime un projet
 * @param {event} btn 
 * @param {number} idProject 
 */
function deletProject(btn, idProject){
    const  cleToken = JSON.parse(localStorage.getItem("token"))
    btn.addEventListener("click", function(){
        if (confirm("Désirez-vous vraiment supprimer ce projet ?") == true) {
            fetch(`http://localhost:5678/api/works/${idProject}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cleToken.token}`
                },
            })
            .then (response => {console.log(response)
                if (response.status === 404 ) {
                    alert('problem de connexion au serveur')
                }
                if (response.status !== 204 ) {
                    alert("vous avez pas l'autorisation ")
                }
                if (response.status === 204 ) {
                    //****** supprime le projet à la modale ******//
                    let projectModalDelete = document.getElementById(`${idProject}`)
                    console.log( projectModalDelete )
                    projectModalDelete.remove()
                    //******* supprime le projet à la page d'accueil *******//
                    let projectDelete =  document.getElementById(`${idProject}`)
                    console.log( projectDelete )
                    projectDelete.remove()
                    console.log("le projet numero "  + idProject + " est bien supprimé")
                }
            })
        }
    })
}

/**
 * fonction pour supprimer tous les projets
 * @param {number} id 
 */
function deletAllProject(id){
    const  cleToken = JSON.parse(localStorage.getItem("token"))
    document.querySelector(".style-btn-delete-gallery").addEventListener('click', function(){
        fetch(`http://localhost:5678/api/works/${idProject}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cleToken.token}`
            },
        })
        .then (response => {console.log(response)
            if (response.status === 404 ) {
                alert('problem de connexion au serveur')
            }
            if (response.status !== 204 ) {
                alert("vous avez pas l'autorisation ")
            }
            if (response.status === 204 ) {
                //****** supprime le projet à la modale ******//
                let projectModalDelete = document.getElementById(`${idProject}`)
                console.log( projectModalDelete )
                projectModalDelete.remove()
                //******* supprime le projet à la page d'accueil *******//
                let projectDelete =  document.getElementById(`${idProject}`)
                console.log( projectDelete )
                projectDelete.remove()
                console.log("les projet sont bien supprimé")
            }
        })
    })
}

/**
 * fonction envoye nouveau projet au serveur
 */
function sendProject(){
    document.querySelector("#send-picture").addEventListener("click", addPhoto)
}

/**
 * fonction ajoute photo
 * @param {event} event 
 * @returns 
 */
function addPhoto(event){
    event.preventDefault();
    const cleToken = JSON.parse(localStorage.getItem("token"));
    const titleValue = document.querySelector("#title").value;
    const categoryValue = document.querySelector("#category").value;
    if(titleValue === "" || categoryValue === "" || workPicture === undefined){
        return alert("Veuillez remplir tous les champs.");
    }
    const categoriesChoices = ["objets", "appartements", "hotels-restaurants"]
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
        "Authorization": `Bearer ${cleToken.token}`
    },
    body: formData
    }).then((response)=>{
       return response.json();
    }).then(result=>{result
        result.category = {id: result.categoryId }
        displayProject(result)
        displayModal(result)
    })
    console.log("le projet est bien ajouté au serveur")
    //***** retour à l' affichage de modale vue 1
    document.querySelector(".js-container-modal").style.display = null;
    document.querySelector(".container-add-photo-modal").style.display ="none";
    document.querySelector("#send-picture").classList.replace('btn-add-photo-modal','btn-valid')
    //***** vider les contenus de modale
    workPicture = undefined;
    document.querySelector("#title").value = ""
    document.querySelector("#category").value = ""
    document.querySelector(".container-photo").style.display = null
    document.querySelector(".photo").textContent = null
    closeModal()
}

/**
 * fonction choisir photo ajoutée
 */
function choicePhoto(){
    const file = document.querySelector("#file")
    file.addEventListener("change", function (event) {
    const pictureWork = event.target.files;
    const fileType = ["image/png", "image/jpg"];
    const pictureWorkFileType = pictureWork[0].type;
    if (fileType.includes(pictureWorkFileType) === false) {
        return alert("Veuillez choisir une image au format jpg ou png")
    }
    if (pictureWork[0].size > 4*1024*1024) {
        return alert("Veuillez choisir une image de taille moin de 4mo")
    }
    workPicture = event.target.files[0];
    document.querySelector(".container-photo").style.display = "none"
    const picture = document.querySelector(".photo")
    const image = document.createElement("img");
    image.src = window.URL.createObjectURL(pictureWork[0]);
    picture.appendChild(image);
    document.querySelector("#send-picture").classList.replace('btn-valid','btn-add-photo-modal')
    console.log(workPicture)
    return workPicture
    });
}