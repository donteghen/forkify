import icons from 'url:../../img/icons.svg' // parcel2
import View from './view.js';

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = "Couldn't get the recipe for the related query";
    _successMessage = '';

    _generateMarkUp(){
        return  this._data.map(data => {
          return  `<li class="preview">
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

export default new ResultView () ;