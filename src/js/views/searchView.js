class SearchView{
    _parentElement = document.querySelector('.search');

    getQuery(){
        const value = this._parentElement.querySelector('.search__field').value
        this._clearSearch();
        return value;
        
    }
    addHandlerSearch(handler){
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault()
            handler();
        });

    }
    _clearSearch(){
        this._parentElement.querySelector('.search__field').value = '';
    }
}
export default new SearchView()