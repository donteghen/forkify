import icons from 'url:../../img/icons.svg' // parcel2
import View from './view.js';

export default class PreviewView extends View{
    _parentElement = '';
    _generateMarkUp(){
        const id = window.location.hash.slice(1)
        return  this._data.map(data => {
          return  `<li class="preview ${data.id === id ? 'preview__link--active' : ''}">
            <a class="preview__link " href="#${data.id}">
                <figure class="preview__fig">
                    <img src="${data.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${data.title}</h4>
                    <p class="preview__publisher">${data.publisher}</p>
                   
                </div>
            </a>
        </li>
        `
        }).join('')
      
    }
}
