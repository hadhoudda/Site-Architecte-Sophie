const authToken = JSON.parse(localStorage.getItem("token"));
console.log(authToken)
let modal = null
let file = document.querySelector("#file");
//////open modal///////////
const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'))
    modal.style.display = null
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener('click', closeModal)
    modal.querySelector('.close-modal').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    modal.querySelector('.btn-delet').addEventListener('click', stopPropagation)
}

  ///////////close modal//////////
  const closeModal = function (e) {
    e.preventDefault()
    if (modal === null) return
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute("aria-hidden", 'true')
    modal.removeAttribute("aria-modal")
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.close-modal').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
};
// on éviter la propogation de click d'un enfant à son parent
const stopPropagation = function(e) {
     e.stopPropagation();
}

///////ecoute boutton ouvrir modale vue ajoujte photo /////////
document.querySelector(".btn-ad-photo-moda").addEventListener("click", function () {
    document.querySelector(".container-modal").style.display = "none";
    document.querySelector(".container-ad-photo-modal").style.display =null;
});

////////// ecoute boutton retour ////////////
document.getElementById("icone-return").addEventListener("click", function () {
    document.querySelector(".container-modal").style.display = null;
    document.querySelector(".container-ad-photo-modal").style.display = "none";
});
///////ecoute boutton ouvrir modale /////////
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener('click', openModal)
})

//////////affichage photo au modal///////////////
function affichModal(works) {
    document.querySelector(".galeri-modal").innerHTML = null;
    for (let elem in works) {
        const sectionGallery = document.querySelector(".galeri-modal");
        const worksElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = works[elem].imageUrl;
        const titleElement = document.createElement("span");
        titleElement.innerText = `éditer`;
        sectionGallery.appendChild(worksElement);
        ///ajoute le boutton de supprime////
        worksElement.innerHTML = ` <div class= "icone-photo-modal">
            <button class="btn-move" style ="display :none;"><i class="fa-solid fa-up-down-left-right" style="color: white; "></i></button>
            <button type="button" class="btn-delet" id="btn-delet-${works[elem].id}" ><i class="fa-solid fa-trash-can" style="color: white;"></i></button></div>`
            worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
        // cacher et afficher l'icone move
        imageElement.addEventListener("mouseover", function(){
            modal.querySelector(".btn-move").style.display = null;
        })
        console.log(`${works[elem].id}`)
        //////////////////  fonction supprime projet ///////////////
        function deletPhoto(event) {
            event.preventDefault();
            if (confirm("Désirez-vous vraiment supprimer ce projet ?") === true) {
                fetch(`http://localhost:5678/api/works/${works[elem].id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken.token}`,
                        }
                    })
                }
        }
        /////////// ecouter boutton supprime photo ///////////
        const btnDelete = document.getElementById(`btn-delet-${works[elem].id}`)
        btnDelete.addEventListener("click",deletPhoto)
    }
    console.log(works);
}
//////////ecoute boutton ajouter photo ///////
file.addEventListener("change", function (event) {
    const pictureWork = event.target.files;
    const fileType = ["image/jpg", "image/png"];
    const pictureWorkFileType = pictureWork[0].type;
    if (fileType.includes(pictureWorkFileType) === false) {
        return alert("Veuillez choisir une image au format jpg ou png");
    }
    if (pictureWork[0].size > 4000000) {
        return alert("Veuillez choisir une image de taille moin de 4mo");
    }
    workPicture = event.target.files[0];
    document.querySelector(".container-photo").style.display = "none";
    const picture = document.querySelector(".add-photo");
    const image = document.createElement("img");
    image.src = window.URL.createObjectURL(pictureWork[0]);
    picture.appendChild(image);
});
///////////////////  fonction ajoute photo ///////////////
function addPhoto(event) {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("token")).token;
    const titleValue = document.querySelector("#name").value;
    const categoryValue = document.querySelector("#category").value;
    if (titleValue === "" || categoryValue === "" || workPicture === undefined ) {
        return alert("Veuillez remplir tous les champs.");
    }
    if (titleValue !== "" && categoryValue !== "" && workPicture !== undefined ) {
        modal.querySelector("#send-picture").classList.replace("btn-valid","btn-style-vert")
    }
    console.log(workPicture)
    const categoriesChoices = ["objets", "appartements", "hotels-restaurants"];
    const categoryChoiceInteger = categoriesChoices.findIndex((choice) => {
        return choice === categoryValue;
    });
    const formData = new FormData();
    formData.append("image", workPicture);
    formData.append("title", titleValue);
    formData.append("category", categoryChoiceInteger + 1);
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
        }); 
}
/////////// ecouter boutton valide pour ajouter photo ///////////
 document.querySelector("#send-picture").addEventListener("click", addPhoto);

