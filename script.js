'use strict'

import  cards from './cards.js';
import  * as createObj from './createCategory.js';
import createMenu from './menu.js';


let body = document.querySelector('body'),
    menu = document.createElement('div'),
    category = document.createElement('div');


document.addEventListener('mousedown',e=> e.preventDefault())

createMenu(body,cards)    
category.classList.add('category');    

createObj.createCategory(body,cards);
createObj.createCardCategory(category,cards);

body.appendChild(category)

let state = {
    main : 1,

    elemVisible(){
        let collection = document.querySelectorAll('.collection'),
            category = document.querySelector('.category'),
            cardCategory = document.querySelectorAll('.cardCategory'),
            imgCategory = document.querySelectorAll('.imgCategory'),
            nav = document.querySelectorAll('.nav'),
            navigation = document.querySelector('.navigation'),
            menu = document.querySelector('.menu'),
            icon = document.querySelectorAll('.icon');

        function reset(arr){
            arr.forEach(e => e.style.display = 'none')
            category.style.display = 'none';
        }

        function home(){
            category.style.display = 'flex';
        }
            
        if (this.main == 1){
            category.style.display = 'flex';
            
        }
        
        document.addEventListener('click', event => {

            cardCategory.forEach((e,i)=>{
                if(e == event.target || event.target == imgCategory[i]) {
                    navigation.style.transform = 'translateX(-100%)'
                    collection[i].style.display = 'flex';
                    category.style.display = 'none';
                }
            })

            nav.forEach((e,i)=>{
                if (e == event.target || event.target == icon[i]){
                    navigation.style.transform = 'translateX(-100%)'
                    if(i == 0){
                        reset(collection);
                        home();
                    }else{
                        reset(collection);
                        collection[i-1].style.display = 'flex'
                    }
                }
            });
        })

    }


    
}

state.elemVisible();