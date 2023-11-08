/*-------- IMPORTS -----*/
import { catsData } from '/data.js'
/*-------- Declaraciones -------- */
const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn= document.getElementById('meme-modal-close-btn')
/*-------- Listeners -------- */
emotionRadios.addEventListener('change', highlightCheckedOption)
getImageBtn.addEventListener('click', renderCat)
memeModalCloseBtn.addEventListener('click', closeModal)
/*-------- Opcion en el Radio -------- */
function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')// cambia de color la emocion elegida
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}
/*-------- Cierre de Modal-------- */
function closeModal(){
    memeModal.style.display= 'none'/// cierra el cuadro con el meme
}
/*-------- Render Cat Function -------- */
function renderCat(){
    
    const catObject = getSingleCatObject()
    
    memeModalInner.innerHTML = `
    <img 
    class="cat-img" 
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >
    `
    memeModal.style.display = 'flex'
}
/*--------Single Object Function-------- */
function getSingleCatObject(){
    
    const catsArray = getMatchingCatsArray()
    
    if (catsArray.length === 1){ // chekea si la array tiene un solo objeto
        return catsArray[0] // devuelve el objeto
    }
    else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber] // devuelve un objeto aleatorio dentro de la array de objetos
    }
    
}
/*-------- Matching Cats Function -------- */
function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value // agarra el valor seleccionado en el input radio
        const isGif = gifsOnlyOption.checked // checkea si es un gif (es un boolean)
        
        const matchingCatsArray = catsData.filter(function(cat){ // filtra en base a la funcion 
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif // devuelve un array de objetos con la emocion elegida que sea gif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)// devuelve un array de objetos con la emocion elegida que no sean gif
            }            
        })
        return matchingCatsArray 
    }   
}

 /*-------- Emotions Array Function -------- */
function getEmotionsArray(cats){
    const emotionsArray = [] // array vacia   
    for (let cat of cats){// uso del for of
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){// pregunta si no esta incluido en la array
                emotionsArray.push(emotion) // mete dentro de array
            }
        }
    }
    return emotionsArray
}

/*-------- Emotion Radios Function -------- */
function renderEmotionsRadios(cats){
        
    let radioItems = `` // espacio de radios vacios
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>` // crea los distintos espacios para seleccionar
    }
    emotionRadios.innerHTML = radioItems // modifica el div para mostrar los radios
}

renderEmotionsRadios(catsData) // llama a la funcion con los datos del js

