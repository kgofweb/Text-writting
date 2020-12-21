// DOM elements
const burger = document.querySelector('.burger');
const menu = document.querySelector('.main-menu');

burger.addEventListener('click', () => {
   menu.classList.toggle('active');
});

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// ES6 Class
class TypeWriter {
   constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      // txt for each letter
      this.txt = '';
      this.wordsIndex = 0;
      this.wait = parseInt(wait, 10);
      this.isDeleting = false;
      this.type();
   }

   // Prototype Method
   type() {
      // Get current index of words
      const current = this.wordsIndex % this.words.length;
      // Get full text of current words
      const fullTxt = this.words[current];

      // Check if deleting
      if (this.isDeleting) {
         // Remove character
         this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
         // Add character
         this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      // Insert txt into elements
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

      // Init type Speed
      let typeSpeed = 300;

      if (this.isDeleting) {
         typeSpeed /= 2;
      }

      // Check if word is completed
      if (!this.isDeleting && this.txt === fullTxt) {
         // Make pause at end
         typeSpeed = this.wait;
         // Set deleting to true
         this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
         this.isDeleting = false;
         // Move to the next word
         this.wordsIndex++;
         // Make pause before typing next word
         typeSpeed = 500;
      }
      setTimeout(() => this.type(), typeSpeed);
   }
}

// Init func
function init() {
   const txtElement = document.querySelector('.txt-type');
   const words = JSON.parse(txtElement.getAttribute('data-words'));
   const wait = txtElement.getAttribute('data-wait');
   // Init typeWriter
   new TypeWriter(txtElement, words, wait);
}