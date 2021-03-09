import View from "./view";
import icons from 'url:../../img/icons.svg' // parcel2

class PaginationView extends View  {
   // _parentElement = document.querySelector('.pagination');

    _generateMarkUp(){
        const totalPages = Math.ceil(this._data.result.length / this._data.pageSize);
        if(this._data.pageNumber === 1 && totalPages > 1){

        }
        else if (this._data.pageNumber > 1 && totalPages > this._data.pageNumber + 1){

        }
        else if (this._data.pageNumber === totalPages){

        }
        console.log(totalPages)
    }
}
   
export default new PaginationView()