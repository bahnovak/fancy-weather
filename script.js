'use strict'

import  cards from './cards.js';
import  * as createObj from './createCategory.js';
import createMenu from './menu.js';


let body = document.querySelector('body'),
    category = document.createElement('div');
    


document.addEventListener('mousedown',e=> e.preventDefault())

createMenu(body,cards)    
category.classList.add('category');    

createObj.createCategory(body,cards);
createObj.createCardCategory(category,cards);

body.appendChild(category)

let collection = document.querySelectorAll('.collection'),
    cardCategory = document.querySelectorAll('.cardCategory'),
    imgCategory = document.querySelectorAll('.imgCategory'),
    nav = document.querySelectorAll('.nav'),
    navigation = document.querySelector('.navigation'),
    menu = document.querySelector('.menu'),
    icon = document.querySelectorAll('.icon'),
    burger = document.querySelector('.burger'),
    toggle = document.querySelector('.l'),
    word = document.querySelectorAll('.word'),
    img = document.querySelectorAll('.img'),
    card = document.querySelectorAll('.card')

let state = {
    position : 0,
    train: 0,


    elemVisible(){

        function reset(arr){
            arr.forEach(e => e.style.display = 'none')
            category.style.display = 'none';
        }

        function home(){
            category.style.display = 'flex';
        }
            
        if (this.position == 0){
            category.style.display = 'flex';
            
        }
        
        document.addEventListener('click', event => {

            if(!((event.target == burger) || (event.target == navigation))){
                navigation.style.transform = 'translateX(-100%)'
            }

            cardCategory.forEach((e,i)=>{
                if(e == event.target || event.target == imgCategory[i]) {
                    navigation.style.transform = 'translateX(-100%)'
                    collection[i].style.display = 'flex';
                    category.style.display = 'none';
                    this.position = i+1;
                }
            })

            nav.forEach((e,i)=>{
                if (e == event.target || event.target == icon[i]){
                    navigation.style.transform = 'translateX(-100%)'
                    if(i == 0){
                        reset(collection);
                        home();
                        this.position = 0; 
                    }else{
                        reset(collection);
                        collection[i-1].style.display = 'flex'
                        this.position = i;
                    }
                }

                e.classList.remove('navActive')
                   
            });

            nav[this.position].classList.add('navActive')
        })
        
    },

    trainMode(){
        document.addEventListener('click',(event)=>{
            

            if(event.target == toggle){
                if(this.train == 1){
                    this.train = 0 
                } else if (this.train == 0){
                    this.train = 1
                }
            }


            if(this.train == 1){
                word.forEach(e=> e.style.visibility = 'hidden');
                card.forEach(e=> e.style.overflow = 'hidden');
                img.forEach(e=> {
                    e.style.width = '360px';
                    e.style.height = '100%';
                    e.style.transform = 'translateX(-7%)';
                })

            }

            if(this.train == 0){
                word.forEach(e=> e.style.visibility = '')
                img.forEach(e=> {
                    e.style.width = '';
                    e.style.height = '';
                    e.style.transform = '';
                
                })
            }        
        })
    },

}

state.elemVisible();
state.trainMode();
