import icons from 'url:../../img/icons.svg' // parcel2
import PreviewView from './previewView.js';
import View from './view.js';


class ResultView extends PreviewView{
    _parentElement = document.querySelector('.results');
    _errorMessage = "Couldn't get the recipe for the related query";
    _successMessage = '';

}

export default new ResultView () ;