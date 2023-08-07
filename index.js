const bookTitleInput = document.getElementById("bookTitle");
const bookAuthorInput = document.getElementById("bookAuthor");
const addButton = document.getElementById("addButton");
const bookList = document.getElementById("bookList");

const storedBooks = localStorage.getItem("books");
const books = storedBooks ? JSON.parse(storedBooks) : [];
/*
function addBook() {
    const title = bookTitleInput.value;
    const author = bookAuthorInput.value;
    if (title.trim() !== "" && author.trim() !== "") {
        const book = { title: title, author: author };
        books.push(book);

        saveBooksToLocalStorage();
        renderBooks();
        bookTitleInput.value = "";
        bookAuthorInput.value = "";
    }
}
*/
function deleteBook(index) {
    books.splice(index, 1);
    saveBooksToLocalStorage();
    renderBooks();
}

function saveBooksToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
}

function renderBooks() {
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        const li = document.createElement("li");
        
        const titleElement = document.createElement("p");
        titleElement.textContent = `${book.title}`;
        
        const authorElement = document.createElement("p");
        authorElement.textContent = `${book.author}`;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => deleteBook(index));
        
        li.appendChild(titleElement);
        li.appendChild(authorElement);
        li.appendChild(removeButton);
        
        bookList.appendChild(li);
    });
}

addButton.addEventListener("click", addBook);
renderBooks();
