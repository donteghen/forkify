import icons from 'url:../../img/icons.svg' // parcel2
import View from './view.js';

class AddRecipeView extends View{
    _parentElement = document.querySelector('.upload');
    _windowElement = document.querySelector('.add-recipe-window');
    _overlayElement = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    constructor (){
        super();
        this._addHandlerShowModal();
        this._addHandlerCloseModal();

    }
    _addHandlerShowModal(){
        this._btnOpen.addEventListener('click', this.toggleModal.bind(this));
    }
    _addHandlerCloseModal(){
        this._btnClose.addEventListener('click', this.toggleModal.bind(this));
        this._overlayElement.addEventListener('click', this.toggleModal.bind(this));
    }
    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault()
            
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr) ;
            handler(data)
        })
    }
    toggleModal(){
        this._overlayElement.classList.toggle('hidden');
        this._windowElement.classList.toggle('hidden')
    }
    _generateMarkUp(){
      
    }
}
export default new AddRecipeView()