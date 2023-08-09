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
}

function renderBooksOnLoad() {
  const bookList = new BookList();
  bookList.renderBooks(); // Call renderBooks method here
}

document.addEventListener('DOMContentLoaded', renderBooksOnLoad);
