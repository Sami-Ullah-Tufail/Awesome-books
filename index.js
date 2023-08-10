class AwesomeBooksApp {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.bookShelf = document.getElementById('bookShelf');
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');
    this.addButton = document.getElementById('addButton');

    this.addButton.addEventListener('click', this.handleAddBookClick.bind(this));

    const listLink = document.getElementById('list');
    const addNewLink = document.getElementById('addNew');
    const contactLink = document.getElementById('contact');

    listLink.addEventListener('click', () => this.showSection('listSection'));
    addNewLink.addEventListener('click', () => this.showSection('addSection'));
    contactLink.addEventListener('click', () => this.showSection('contactSection'));

    this.showSection('listSection');
    this.renderBooks();
  }

  handleAddBookClick(event) {
    event.preventDefault();
    this.addBook();
    this.renderBooks();
    this.titleInput.value = '';
    this.authorInput.value = '';
  }

  addBook() {
    const title = this.titleInput.value.trim();
    const author = this.authorInput.value.trim();
    if (title !== '' && author !== '') {
      const book = { title, author };
      this.books.push(book);
      this.saveBooks();
    }
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveBooks();
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  renderBooks() {
    this.bookShelf.innerHTML = '';
    this.books.forEach((book, index) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      bookDiv.textContent = `${book.title} by ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-button');
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
        this.renderBooks();
      });

      bookDiv.appendChild(removeButton);
      this.bookShelf.appendChild(bookDiv);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  showSection(sectionId) {
    const sections = ['homePage', 'listSection', 'addSection', 'contactSection'];

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (id === sectionId) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }
}

function initializeApp() {
  // eslint-disable-next-line no-unused-vars
  const app = new AwesomeBooksApp();
}

document.addEventListener('DOMContentLoaded', initializeApp);
