export function createCard(arr,parent){
    for(let i = 0 ; i < arr.length ; i++){
       let cardProt = document.createElement('div'),
           cardProtBack = document.createElement('div'),
           cardProtFace = document.createElement('div'),
           img = document.createElement('img'),
           word = document.createElement('div'),
           translate = document.createElement('img'),
           imgBack = document.createElement('img'),
           wordBack = document.createElement('div');
           
       
       cardProt.classList.add(`${arr[i].word}`);
       cardProt.classList.add(`card`);
       cardProtFace.classList.add(`front`);
       cardProtBack.classList.add(`back`);
       word.classList.add('word');
       wordBack.classList.add('wordBack');
       translate.classList.add('translate');
       img.classList.add('img');
       imgBack.classList.add('img');

       img.src = `./img/${arr[i].word}.jpg`;
       imgBack.src = `./img/${arr[i].word}.jpg`;

       word.innerHTML = `${arr[i].word}`;
       wordBack.innerHTML = `${arr[i].translation}`;

       translate.src = './img/rotate.svg';
       translate.style.height = '30px';

       cardProt.addEventListener('mousedown',(e)=>{e.preventDefault()})

        cardProt.addEventListener('click',(e)=>{
            if(e.target == translate){
                cardProt.style.transform = 'rotateY(180deg)';
            }
        })
        cardProt.addEventListener('mouseleave',(e)=>{
            if(e.target == cardProt){
                cardProt.style.transform = 'rotateY(0deg)';
            }
            
        })

       img.addEventListener('click',()=>{
           let audio = new Audio(`./audio/${arr[i].word}.mp3`);
           audio.play();
       });

       word.appendChild(translate);
       cardProtBack.appendChild(imgBack);
       cardProtBack.appendChild(wordBack);
       cardProtFace.appendChild(img);
       cardProtFace.appendChild(word);
       cardProt.appendChild(cardProtFace);
       cardProt.appendChild(cardProtBack);
       parent.appendChild(cardProt);
    }
}

export function createCategory (parent,collection){
    let names = Object.keys(collection);

    for(let i = 1; i < names.length; i++){
        let category = document.createElement('div');

        category.classList.add(`collection`);
        category.classList.add(`${i}`);

        createCard(collection[i],category);

        parent.appendChild(category);
    }
}

export function createCardCategory(parent,collection){
    let names = Object.keys(collection);


    for(let i = 1; i < names.length ; i++){

        let div = document.createElement('div'),
            img = document.createElement('img');
            

        img.classList.add('imgCategory');
        div.classList.add('cardCategory');

        img.src = collection[i][3].image;

        div.appendChild(img);
        div.innerHTML += collection[0][i-1];


        parent.appendChild(div);
    }
}