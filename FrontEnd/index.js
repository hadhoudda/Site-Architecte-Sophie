document.addEventListener("DOMContentLoaded", () => {
    console.log("page d'accueil");
    getData()
});
//********fonction recupere les donneees de l'api **********/

const getData = async () => {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        console.log(response);
        if (!response.ok) {
            throw new Errr(`an error occured with status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        document.querySelector(".js-galeri-modal").innerHTML = null;
        document.querySelector(".gallery").innerHTML = null;
        for (let work of data) {
            afficheProject(work);
        }
        displayButtonFilter();
        connectAdmin();
        for (let work of data) {
            affichModal(work);
        }
    } catch (error) {
        alert(error);
    }
};

//******** fonction pour affichager les projets **********//
const afficheProject = (work) => {
    const sectionGallery = document.querySelector(".gallery");
    const worksElement = document.createElement("article");
    worksElement.setAttribute("data-category",`${work.category.id}`);
    worksElement.setAttribute("id", work.id);
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.crossOrigin = 'anonymous'
    const titleElement = document.createElement("h3");
    titleElement.innerText = work.title;
    sectionGallery.appendChild(worksElement);
    worksElement.appendChild(imageElement);
    worksElement.appendChild(titleElement);
};

//********* fonction pour ajouter les bouttons de filter *********//
async function displayButtonFilter() {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    console.log(data);
    const sectionFilter = document.querySelector(".filter");
    const btnAllCategory = document.createElement("button");
    btnAllCategory.setAttribute("data-cat", 0);
    btnAllCategory.setAttribute("id", "Tous");
    btnAllCategory.classList.add("style-button-filter");
    const btnName = document.createElement("p");
    btnName.innerText = "Tous";
    btnAllCategory.appendChild(btnName);
    sectionFilter.appendChild(btnAllCategory);
    console.log(btnAllCategory);
    //*** creation des boutons de filter ***/
    for (let elem of data) {
        const btnCategory = document.createElement("button");
        btnCategory.setAttribute("data-cat", elem.id);
        btnCategory.setAttribute("id", elem.name);
        btnCategory.classList.add("style-button-filter");
        const btnName = document.createElement("p");
        btnName.innerText = elem.name;
        btnCategory.appendChild(btnName);
        sectionFilter.appendChild(btnCategory);
        console.log(btnCategory);
    }
}

//******* fonction connexion admin ********//
function connectAdmin() {
    const token = localStorage.getItem("token");
    if (token !== null) {
        document.querySelector(".filter").style.display = "none";
        //**** affichage modification page admin *****//
        //*** partie haute noir ***//
        document.querySelector("#header-black").classList.replace("hide", "show-head-black");
        //*** boutton edit ***//
        document.querySelector("#button-edit-photo").classList.replace("hide", "show-edit-photo");
        document.querySelector("#button-edit-text").classList.replace("hide", "button-edit-text");
        document.querySelector("#button-edit-projet").classList.replace("hide", "show-edit-projet");
        document.querySelector("#connect-admin").classList.replace("show", "hide");
        document.querySelector("#deconnect-admin").classList.replace("hide", "show");
        document.querySelector("#deconnect-admin").addEventListener("click", deconnectAdmin);
    }
}
//***** fonction deconnect admin deconnexion *****//
function deconnectAdmin() {
        localStorage.removeItem("token");
        document.querySelector("#connect-admin").classList.replace("hide", "show");
        document.querySelector("#deconnect-admin").classList.replace("show", "hide");

}