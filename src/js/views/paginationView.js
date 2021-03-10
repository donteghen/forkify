import View from "./view";
import icons from 'url:../../img/icons.svg' // parcel2

class PaginationView extends View  {
    _parentElement = document.querySelector('.pagination'); 
    addHandlerClick(handler){

        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline')
            if(!btn) return
            const gotoPage = Number.parseInt(btn.dataset.goto)
            handler(gotoPage);
        })
    }
    _generateMarkUp(){
        const totalPages = Math.ceil(this._data.result.length / this._data.pageSize);
        // page 1 and there are other pages
        if(this._data.pageNumber === 1 && totalPages > 1){
            console.log('first', this._data.pageNumber + 1)
            return `
            <button data-goto="${this._data.pageNumber + 1}" class="btn--inline pagination__btn--next">
                <span>page ${this._data.pageNumber + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }
        // last page amongst other pages
        if (this._data.pageNumber === totalPages && totalPages > 1){
            console.log('last')
            return `
            <button data-goto="${this._data.pageNumber - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>page ${this._data.pageNumber - 1}</span>
            </button>
            `;
        }
        // between first and last page
        if (this._data.pageNumber < totalPages){
            console.log('between')
            return `
            <button data-goto="${this._data.pageNumber - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>page ${this._data.pageNumber - 1}</span>
            </button>
            <button data-goto="${this._data.pageNumber + 1}" class="btn--inline pagination__btn--next">
                <span>page ${this._data.pageNumber + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
          `;
        }
            return '';
    }
}
   
export default new PaginationView()