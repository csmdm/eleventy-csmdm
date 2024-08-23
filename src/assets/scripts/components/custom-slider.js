// inspired by https://codepen.io/learosema/pen/yLdoEVY

class CustomSlider extends HTMLElement {
  constructor() {
    super();
    this.leftButton = this.querySelector('.left');
    this.rightButton = this.querySelector('.right');
    this.slideList = this.querySelector('.slides');
    this.pagination = this.querySelector('.pagination');
    this.current = null;
  }

  static register() {
    customElements.define('custom-slider', CustomSlider);
  }

  connectedCallback() {
    this.leftButton?.addEventListener('click', this.goLeft, false);
    this.rightButton?.addEventListener('click', this.goRight, false);
    this.updatePagination();
    window.addEventListener('resize', this.updatePagination, false);
    this.addEventListener('click', this.clickPagination, true);
    this.slideList.addEventListener('scroll', this.#setActiveStates, false);
  }

  disconnectedCallback() {
    this.leftButton?.removeEventListener('click', this.goLeft, false);
    this.rightButton?.removeEventListener('click', this.goRight, false);
    window.removeEventListener('resize', this.updatePagination, false);
    this.removeEventListener('click', this.clickPagination, true);
  }

  goLeft = () => {
    const width = this.querySelector('.slides li').getBoundingClientRect().width;
    this.slideList.scrollBy(-width, 0);
  };

  goRight = () => {
    const width = this.querySelector('.slides li').getBoundingClientRect().width;
    this.slideList.scrollBy(width, 0);
  };

  updatePagination = () => {
    const slides = [...this.querySelectorAll('.slides li')];
    const slideWidth = this.slideList.querySelector('li').clientWidth;
    const gap = parseInt(getComputedStyle(this.slideList).gap, 10);

    const listLength = slides.length * slideWidth + (slides.length - 1) * gap;

    const numPages = 2 + Math.floor(listLength / this.clientWidth);

    this.pagination.innerHTML = Array.from({length: numPages}, (_, idx) => {
      const id =
        slides[idx === numPages - 1 ? slides.length - 1 : Math.floor((idx * slides.length) / numPages)].id;
      return `<a href="#${id}"><span class="sr-only">Page ${idx}</span></a>`;
    }).join('');
    this.#setActiveStates();
  };

  #setActiveStates = () => {
    let nearest = Infinity;
    if (this.slideList.scrollLeft === 0) {
      const a = this.pagination.querySelector('a');
      this.pagination.querySelector('[aria-current]')?.removeAttribute('aria-current');
      a.setAttribute('aria-current', 'page');
      return;
    }
    this.pagination.querySelectorAll('a').forEach(a => {
      const slide = this.slideList.querySelector(a.getAttribute('href'));
      const rect = slide.getBoundingClientRect();
      const dist = Math.abs(rect.x - this.clientWidth / 2);

      if (dist < nearest) {
        nearest = dist;
        this.pagination.querySelector('[aria-current]')?.removeAttribute('aria-current');
        a.setAttribute('aria-current', 'page');
      }
    });
  };

  clickPagination = e => {
    if (e.target.nodeName === 'A') {
      e.preventDefault();
      e.stopPropagation();
      const id = e.target.getAttribute('href').slice(1);
      setTimeout(() => {
        const slide = document.querySelector('#' + id);
        this.#scrollToItem(slide);
      }, 0);
    }
  };

  #scrollToItem(slide) {
    const rect = slide.getBoundingClientRect();
    const dest = this.slideList.scrollLeft + rect.x - this.clientWidth / 2;
    window.setTimeout(() => this.slideList.scrollTo(dest, 0), 200);
  }
}

CustomSlider.register();
