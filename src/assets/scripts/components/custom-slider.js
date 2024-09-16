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
      this.updateButtonState(); // Move button state update inside scroll logic
    }
  };

  goRight = () => {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex += 1;
      this.scrollToCurrentSlide();
      this.updateButtonState(); // Move button state update inside scroll logic
    }
  };

  scrollToCurrentSlide = () => {
    const targetSlide = this.slides[this.currentSlideIndex];
    const targetScrollPosition = targetSlide.offsetLeft; // Use the exact offsetLeft of the slide
    this.slideList.scrollTo({left: targetScrollPosition, behavior: 'smooth'});
  };

  updateButtonState = () => {
    // Disable the left button if we're on the first slide
    if (this.currentSlideIndex === 0) {
      this.leftButton.classList.add('disabled');
    } else {
      this.leftButton.classList.remove('disabled');
    }

    // Disable the right button if we're on the last slide
    if (this.currentSlideIndex === this.slides.length - 1) {
      this.rightButton.classList.add('disabled');
    } else {
      this.rightButton.classList.remove('disabled');
    }

    console.log(`Current Slide Index: ${this.currentSlideIndex}`);
  };
}

CustomSlider.register();
