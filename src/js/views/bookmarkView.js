import View from "./view";
import icons from 'url:../../img/icons.svg' // parcel2
import previewView from "./previewView";

class BookmarkView extends previewView{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = "No recipe found. start adding some items";
    _successMessage = '';

}
export default new BookmarkView();