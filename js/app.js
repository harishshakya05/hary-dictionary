let apiKey = '4ff3ed43-91e2-4e2a-b417-d980bd89f912';
let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let defBlock = document.querySelector(".def");
let audioBlock = document.querySelector(".audio");
let not_foundBlock = document.querySelector(".not_found");
let loadingBlock = document.querySelector(".loading");

searchBtn.addEventListener('click',function(e){
    not_foundBlock.innerText ='';
    defBlock.innerText = '';
    audioBlock.innerHTML ='';
    e.preventDefault();    
    // get input data
    let word = input.value;
    // call api get data
    if(word === ''){
        alert('word is required')
        return;
    }
    getData(word);
})

async function getData(word){    
    loadingBlock.style.display = 'block';

    let response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    let data = await response.json();
    // if no result
    if(!data.length){
        not_foundBlock.innerText ='No record found';
        return;
    }
    
    if(typeof data[0] === 'string'){     
        loadingBlock.style.display = 'none';   
       data.forEach(element => {
            console.log(element); 
            let suggestion = document.createElement("span");
            suggestion.classList.add('suggested');
            suggestion.innerText= element;
            not_foundBlock.appendChild(suggestion);

        });   
       return;
    }
    let def= data[0].shortdef[0];
    defBlock.innerText = def;    
    loadingBlock.style.display = 'none'; 
    //sound
    //console.log(data[0].hwi.prs[0])
    let audioName = data[0].hwi.prs[0].sound.audio;
    if(audioName){       
        displayAudio(audioName);
    }
    
}
function displayAudio(audioName){
    console.log(audioName)
    let subfolder = audioName.charAt(0);
    let url = `https://media.merriam-webster.com/soundc11/${subfolder}/${audioName}.wav?key=${apiKey}`;
    let audios = document.createElement('audio');
    audios.src = url;
    audios.controls=true;
    audioBlock.appendChild(audios)
}