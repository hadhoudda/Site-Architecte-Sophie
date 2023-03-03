
    //////open modal///////////
    const openModal= function(e){
        e.preventDefault();
         const modal = document.querySelector("#modal1")
         modal.classList.replace("hide", "modal");
         //return affichPhotoModal() 
     }
     ///////////close modal//////////
     const closeModal = function(e){
         e.preventDefault();
         const modal = document.querySelector("#modal1")
         modal.classList.replace("modal", "hide");
      }   
      window.addEventListener('keydown', function(e){
         if((e.key === "Escape")||(e.key === "Esc")){
             closeModal(e)
         }
      })
     ////////////////////ecoute boutton//////////
     document.querySelector(".close-modal").addEventListener('click', closeModal);
     document.querySelector('.js-modal').addEventListener('click', openModal);
     //////////affichage photo au modal///////////////
    export function affichPhotoModal (works){
         document.querySelector(".galeri-modal").innerHTML = null;
         for (let elem in works) {
             const articleModal = works[elem];
             const sectionGallery = document.querySelector(".galeri-modal");
             const worksElement = document.createElement("articleModal");
             const titleElement = document.createElement("h4");
             titleElement.innerText = articleModal.title;
             const imageElement = document.createElement("img");
             imageElement.src = articleModal.imageUrl;
             sectionGallery.appendChild(worksElement);
             worksElement.appendChild(imageElement);
             worksElement.appendChild(titleElement);
         }
         console.log(works)
     }
   
     