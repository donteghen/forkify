import icons from 'url:../../img/icons.svg' // parcel2


export default class View{
    _data;
    /**
     * Renders the recieved data object in the DOM
     * @param {object | object[]} data The data to be rendered (e.g a recipe or and error message) 
     * @returns {null}
     */
    render(data){
      
        if(!data || (Array.isArray(data) && data.length === 0)) {
            this.renderError();
            return;
        }
        this._data = data;
        const markUp = this._generateMarkUp(); 
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp); 
    }

    renderUpdate(data){
      
      this._data = data;
      const newMarkUp = this._generateMarkUp(); 
      const newDOM = document.createRange().createContextualFragment(newMarkUp);
      const newElements = Array.from(newDOM.querySelectorAll('*'));
      const currElements = Array.from(this._parentElement.querySelectorAll('*'));
      newElements.forEach((newEl, i) =>{
        const currEl = currElements[i];
       // update text
        if(!newEl.isEqualNode(currEl) && newEl.hasChildNodes() && newEl.firstChild.nodeValue.trim() !== ''){
          currEl.textContent = newEl.textContent
        }
        //update attributes
        if(!newEl.isEqualNode(currEl)){
          Array.from(newEl.attributes).forEach(att => {
            currEl.setAttribute(att.name, att.value)
          })
        }
      })
      
    }
    renderSpinner(){
        this._clear();
        const markup = `
       <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> 
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup)
      }

      renderError(message = this._errorMessage){
        
        const markup = `
        <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
      }

      renderSuccess(message = this._successMessage){
        
        const markup = `
        <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
      }

    _clear(){
        this._parentElement.innerHTML = '';
    }
    addHandlerRender(handler){
        ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, handler))
      }
}