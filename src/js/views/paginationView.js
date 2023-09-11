import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkUp() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const generateMarkupButton = nav => {
      return nav === 'next'
        ? `<button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
        : `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    };
    // Page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return generateMarkupButton('next');
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return generateMarkupButton('prev');
    }
    //Other page
    if (curPage < numPages) {
      return `
      ${generateMarkupButton('prev')} 
      ${generateMarkupButton('next')}`;
    }
    // Page 1, there are NO other pages
    return '';
  }
}

export default new PaginationView();
