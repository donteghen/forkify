import icons from 'url:../../img/icons.svg' // parcel2


export default class View{
    _data;
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