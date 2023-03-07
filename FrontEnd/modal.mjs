export {affichModal}
const modal = document.querySelector("#modal1")
    //////open modal///////////

     //////open modal///////////
   
    const openModal= function(e){
        e.preventDefault();
        modal.style.display = null;
        modal.removeAttribute('aria-hidden')
        modal.setAttribute('aria-modal','true')
    }
     ///////////close modal//////////
     const closeModal = function(e){
         e.preventDefault();
         if(modal=== null) return
         modal.style.display = "none";
         modal.setAttribute('aria-hidden')
         modal.removeAttribute('aria-modal')
        //  modal.removeEventListener('click',closeModal)
        }
      window.addEventListener('keydown', function(e){
         if((e.key === "Escape")||(e.key === "Esc")){
             closeModal(e)
         }
      })
      ///////arrete la propogation de la modal////////
      const stopPropagation = function(e){
        e.stopPropagation()
      }
     ////////////////////ecoute boutton open modal//////////
    document.querySelectorAll('.js-modal').forEach(a =>{
        a.addEventListener('click',openModal)
    })
    ////////// ecoute boutton return ////////////
   // document.getElementById('icone-return').addEventListener('click',rtn())
  
  ////// fonction return modal ///////////
  //   function rtn() {
  //     window.history.back();
  //  }
     //////////affichage photo au modal///////////////
     function affichModal (works){
        document.querySelector(".galeri-modal").innerHTML = null;
        for (let elem in works) {
            
            const sectionGallery = document.querySelector(".galeri-modal");
            const worksElement = document.createElement("article");
            const imageElement = document.createElement("img");
            imageElement.src = works[elem].imageUrl
            const titleElement = document.createElement("span");
            //titleElement.innerText = works[elem].title;
            titleElement.innerText =`éditer`
            sectionGallery.appendChild(worksElement);
            ///ajoute le boutton de supprime////
            worksElement.innerHTML = ` <div class= "icone-photo-modal">
            <button class="btn-move"><i class="fa-solid fa-up-down-left-right" style="color: black;"></i></button>
            <button type="button" class="btn-delet"><i class="fa-solid fa-trash-can" style="color: black;"></i></button></div>`
            worksElement.appendChild(imageElement);
            worksElement.appendChild(titleElement);
        }
        console.log(works)
    //     document.querySelector(".close-modal").addEventListener('click', closeModal);
    //     document.querySelector('.js-modal').addEventListener('click', openModal);
    // 
 }
 ///////ecoute boutton ouvrir modal ajoujte photo /////////
 document.querySelector(".btn-ad-photo-moda").addEventListener('click',function(){
    document.querySelector(".container-modal").style.display="none";
    document.querySelector(".container-ad-photo-modal").style.display = null;
 });
  ///////////////////  fonction ajout photo ///////////////
  function adPhoto(){
console.log('rr')
  }

  //////////ecout boutton ajouter photo ///////
  document.querySelector("#input-file").addEventListener('click', function(){
    console.log('rrmm')
  })