'use strict'

import  cards from './cards.js';
import  * as createObj from './createCategory.js';


let body = document.querySelector('body'),
    menu = document.createElement('div'),
    category = document.createElement('div');

let state = {
    main : true,
    
}    
    
category.classList.add('category');    

createObj.createCategory(body,cards);
createObj.createCardCategory(category,cards);

body.appendChild(category)

