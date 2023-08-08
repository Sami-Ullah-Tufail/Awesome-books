/* eslint-disable */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookList {
  constructor() {
    this.books = this.loadBooksFromLocalStorage();
    this.bookTitleInput = document.getElementById('bookTitle');
    this.bookAuthorInput = document.getElementById('bookAuthor');
    this.addButton = document.getElementById('addButton');
    this.bookList = document.getElementById('bookList');

    this.renderBooks();
    this.setupEventListeners();
  }

  loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  renderBooks() {
    this.bookList.innerHTML = '';
    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      li.classList.add('book-item'); // Add a CSS class for styling
  
      // Create a <span> element for the book information
      const bookInfo = document.createElement('span');
      bookInfo.textContent = `${book.title} by ${book.author} `;
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => this.deleteBook(index));
  
      // Append both elements to the list item
      li.appendChild(bookInfo);
      li.appendChild(removeButton);
  
      this.bookList.appendChild(li);
    });
  }
  

  deleteBook(index) {
    this.books.splice(index, 1);
    this.saveBooksToLocalStorage();
    this.renderBooks();
  }

  addBook() {
    const title = this.bookTitleInput.value;
    const author = this.bookAuthorInput.value;
    if (title.trim() !== '' && author.trim() !== '') {
      const book = new Book(title, author);
      this.books.push(book);

      this.saveBooksToLocalStorage();
      this.renderBooks();

      this.bookTitleInput.value = '';
      this.bookAuthorInput.value = '';
    }
  }

  setupEventListeners() {
    this.addButton.addEventListener('click', () => this.addBook());
  }
}

// Create an instance of BookList to initialize the app
const bookList = new BookList();
