let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
}

function addBookToLibrary(title, author, pages, read) {
    let x = new Book(title, author, pages, read);
    myLibrary.push(x);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien.", "295 pages", "Read");
addBookToLibrary("The Hobbit3", "J.R.R. Tolkien.", "295 pages", "Not Read");
addBookToLibrary("The Hobbit5", "J.R.R. Tolkien.", "295 pages", "Read");
addBookToLibrary("The Hobbit3", "J.R.R. Tolkien.", "295 pages", "Not Read");
addBookToLibrary("The Hobbit3", "J.R.R. Tolkien.", "295 pages", "Not Read");
addBookToLibrary("The Hobbit3", "J.R.R. Tolkien.", "295 pages", "Not Read");


const container = document.querySelector("#books-grid");

function displayBook() {
    myLibrary.forEach(function (element) {
        const card = document.createElement('div');
        card.classList.add('book-card');
        container.insertBefore(card, container.firstChild);
        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = element.title;
        card.appendChild(title);
        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = element.author;
        card.appendChild(author);
        const pages = document.createElement("p");
        pages.classList.add("pages");
        pages.textContent = element.pages;
        card.appendChild(pages);
        const read = document.createElement("button");
        read.classList.add("read");
        read.textContent = element.read;
        card.appendChild(read);
        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.textContent = "Remove";
        card.appendChild(remove);
    });
}

function displayStats() {
    let myLibraryLength = myLibrary.length;
    let myReadBooks = 0;
    let myUnreadBooks = 0;
    myLibrary.forEach(function (element) {
        if(element.read === "Read") {
            myReadBooks++;
        } else {
            myUnreadBooks++;
        }
    })
    const readBooks = document.querySelector("#read");
    readBooks.textContent = `Read: ${myReadBooks}`;
    const unreadBooks = document.querySelector("#unread");
    unreadBooks.textContent = `Unread: ${myUnreadBooks}`;
    const totalBooks = document.querySelector("#total");
    totalBooks.textContent = `Total: ${myLibraryLength}`;
}

displayBook();
displayStats();

// Working on this
const readBtn = document.querySelector(".read")
readBtn.addEventListener("click", () => {
    readBtn.textContent = "Not Read";
})