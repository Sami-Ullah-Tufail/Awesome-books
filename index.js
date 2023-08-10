class BookList {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.bookListElement = document.getElementById('bookList');
    this.bookTitleInput = document.getElementById('bookTitle');
    this.bookAuthorInput = document.getElementById('bookAuthor');
    this.addButton = document.getElementById('addButton');

    this.addButton.addEventListener('click', () => {
      this.addBook();
      this.renderBooks();
      this.bookTitleInput.value = '';
      this.bookAuthorInput.value = '';
    });

    this.renderBooks();
  }

  addBook() {
    const title = this.bookTitleInput.value.trim();
    const author = this.bookAuthorInput.value.trim();
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
    this.bookListElement.innerHTML = '';
    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-button');
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
        this.renderBooks();
      });

      li.appendChild(removeButton);
      this.bookListElement.appendChild(li);
    });
  }

  showSection(sectionId) {
    const sections = ['booksListSection', 'addBookFormSection', 'contactInfoSection'];

    sections.forEach(id => {
      const section = document.getElementById(id);
      if (id === sectionId) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }
}

function renderBooksOnLoad() {
  const bookList = new BookList();
  bookList.renderBooks(); // Call renderBooks method here

  // Attach event listeners to navigation links using the bookList instance
  const booksLink = document.getElementById('booksLink');
  const addBookLink = document.getElementById('addBookLink');
  const contactLink = document.getElementById('contactLink');

  booksLink.addEventListener('click', () => bookList.showSection('booksListSection'));
  addBookLink.addEventListener('click', () => bookList.showSection('addBookFormSection'));
  contactLink.addEventListener('click', () => bookList.showSection('contactInfoSection'));
}

document.addEventListener('DOMContentLoaded', renderBooksOnLoad);
class AwesomeBooksApp {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.bookShelf = document.getElementById('bookShelf');
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');
    this.addButton = document.getElementById('addButton');

    this.addButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.addBook();
      this.renderBooks();
      this.titleInput.value = '';
      this.authorInput.value = '';
    });

    this.renderBooks();
   

    const listLink = document.getElementById('list');
    const addNewLink = document.getElementById('addNew');
    const contactLink = document.getElementById('contact');

    listLink.addEventListener('click', () => this.showSection('listSection'));
    addNewLink.addEventListener('click', () => this.showSection('addSection'));
    contactLink.addEventListener('click', () => this.showSection('contactSection'));
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

  showSection(sectionId) {
    const sections = ['homePage', 'listSection', 'addSection', 'contactSection'];

    sections.forEach(id => {
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
  const app = new AwesomeBooksApp();
  app.renderBooks();
}

 document.addEventListener('DOMContentLoaded', initializeApp);
