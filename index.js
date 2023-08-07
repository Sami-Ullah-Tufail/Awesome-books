/* eslint-disable */
const bookTitleInput = document.getElementById('bookTitle');
const bookAuthorInput = document.getElementById('bookAuthor');
const addButton = document.getElementById('addButton');
const bookList = document.getElementById('bookList');

const storedBooks = localStorage.getItem('books');
const books = storedBooks ? JSON.parse(storedBooks) : [];

function saveBooksToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}
/* jshint node:true */
/* eslint no-use-before-define: "error" */
function renderBooks() {
  bookList.innerHTML = '';
  books.forEach((book, index) => {
    const li = document.createElement('li');

    const titleElement = document.createElement('p');
    titleElement.textContent = `${book.title}`;

    const authorElement = document.createElement('p');
    authorElement.textContent = `${book.author}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => deleteBook(index));

    li.appendChild(titleElement);
    li.appendChild(authorElement);
    li.appendChild(removeButton);

    bookList.appendChild(li);
  });
}
function deleteBook(index) {
  books.splice(index, 1);
  saveBooksToLocalStorage();
  renderBooks();
}
function addBook() {
  const title = bookTitleInput.value;
  const author = bookAuthorInput.value;
  if (title.trim() !== '' && author.trim() !== '') {
    const book = { title, author };
    books.push(book);

    saveBooksToLocalStorage();
    renderBooks();
    bookTitleInput.value = '';
    bookAuthorInput.value = '';
  }
}

addButton.addEventListener('click', addBook);
renderBooks();
