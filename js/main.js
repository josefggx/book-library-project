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

let book1 = new Book("The Hobbit", "J.R.R. Tolkien", "295 pages", "not read yet");

const book2 = new Book("The Hobbit 2", "J.R.R. Tolkien", "295 pages", "not read yet");

console.log(book1.info());

console.log(book2.info());


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
        // @ts-ignore
        card.dataset.index = myLibrary.indexOf(element);
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

const popup = document.querySelector(".popup");

function formPopup() {
    // @ts-ignore
    popup.style.display = "block"
}

window.onclick = function (event) {
    if(event.target == popup) {
        // @ts-ignore
        popup.style.display = "none";
    }
}

// Working on this
const readBtn = document.querySelector(".read")
readBtn.addEventListener("click", () => {
    readBtn.textContent = "Not Read";
})

const form = document.querySelector("#new-book-form");
const submit = document.querySelector("#submit");
const header = document.querySelector("#header-container");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // @ts-ignore
    popup.style.display = "none";
    // @ts-ignore
    let title = form.elements['title'].value;
    // @ts-ignore
    let author = form.elements['author'].value;
    // @ts-ignore
    let pages = form.elements['pages'].value;
    // @ts-ignore
    if(form.elements['read'].checked == true) {
        // @ts-ignore
        form.elements['read'].value = "Read"
    } else {
        // @ts-ignore
        form.elements['read'].value = "Not Read";
    }
    // @ts-ignore
    let read = form.elements['read'].value;
    let newBook = new Book(title, author, pages, read);
    console.log(newBook);
    myLibrary.push(newBook);
    setData();
    displayBook();
    displayStats();
    checkIndex();
    console.log(myLibrary);
    // @ts-ignore
    form.reset();
});

function checkIndex() {
    myLibrary.forEach(function (element) {
        element.index = myLibrary.indexOf(element);
    })
}


const remove = document.querySelector('.remove');

remove.addEventListener('click', (event) => {
    // card.dataset.index = myLibrary.indexOf(element);
})

// Set Data
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

