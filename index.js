/* eslint-disable */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
class BookList {
  constructor() {
    this.books = JSON.parse(localStorage.getItem("books")) || [];
  }
 
  addBook(title, author) {
    if (title.trim() !== "" && author.trim() !== "") {
      const book = new Book(title, author);
      this.books.push(book);
      this.saveBooks();
    }
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveBooks();
  }

  saveBooks() {
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  renderBooks(bookListElement) {
    bookListElement.innerHTML = "";
    this.books.forEach((book, index) => {
      const li = document.createElement("li");
      li.textContent = `"${book.title}" by ${book.author}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        this.removeBook(index);
        this.renderBooks(bookListElement);
      });

      li.appendChild(removeButton);
      bookListElement.appendChild(li);
    });
  }
}

const bookTitleInput = document.getElementById("bookTitle");
const bookAuthorInput = document.getElementById("bookAuthor");
const addButton = document.getElementById("addButton");
const bookList = new BookList();

addButton.addEventListener("click", () => {
  bookList.addBook(bookTitleInput.value, bookAuthorInput.value);
  bookList.renderBooks(document.getElementById("bookList"));
  bookTitleInput.value = "";
  bookAuthorInput.value = "";
});

// Render the existing books on page load
bookList.renderBooks(document.getElementById("bookList"));
