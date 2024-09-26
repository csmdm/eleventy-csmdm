class CustomSlider extends HTMLElement {
  constructor() {
    super();
    this.leftButton = this.querySelector('.left');
    this.rightButton = this.querySelector('.right');
    this.slideList = this.querySelector('.slides');
    this.slides = this.querySelectorAll('.slides li');
    this.currentSlideIndex = 0;
  }

  static register() {
    customElements.define('custom-slider', CustomSlider);
  }

  connectedCallback() {
    this.leftButton?.addEventListener('click', this.goLeft, false);
    this.rightButton?.addEventListener('click', this.goRight, false);
    this.updateButtonState();
  }

  disconnectedCallback() {
    this.leftButton?.removeEventListener('click', this.goLeft, false);
    this.rightButton?.removeEventListener('click', this.goRight, false);
  }

  goLeft = () => {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex -= 1;
      this.scrollToCurrentSlide();
      this.updateButtonState();
    }
  };

  goRight = () => {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex += 1;
      this.scrollToCurrentSlide();
      this.updateButtonState();
    }
  };

  scrollToCurrentSlide = () => {
    const targetSlide = this.slides[this.currentSlideIndex];
    const targetScrollPosition = targetSlide.offsetLeft;
    this.slideList.scrollTo({left: targetScrollPosition, behavior: 'smooth'});
  };

  updateButtonState = () => {
    this.leftButton.classList.toggle('disabled', this.currentSlideIndex === 0);
    this.rightButton.classList.toggle('disabled', this.currentSlideIndex === this.slides.length - 1);

    this.slides.forEach((slide, index) => {
      const button = slide.querySelector(':scope > button'); // Select only the direct child button
      if (button) {
        if (index === this.currentSlideIndex) {
          button.setAttribute('tabindex', '0');
          console.log(`Tabindex set to 0 for button on slide index: ${index}`);
        } else {
          button.setAttribute('tabindex', '-1');
          console.log(`Tabindex set to -1 for button on slide index: ${index}`);
        }

        console.log(
          `Current tabindex for button on slide index ${index}: ${button.getAttribute('tabindex')}`
        );
      }
    });
  };
}

CustomSlider.register();
