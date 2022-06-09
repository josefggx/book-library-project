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

addBookToLibrary("The Hobbit", "J.R.R. Tolkien.", "295", "Read");
addBookToLibrary("The Hobbit2", "J.R.R. Tolkien.", "295", "Read");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien.", "295", "Read");
addBookToLibrary("The Hobbit2", "J.R.R. Tolkien.", "295", "Read");



const container = document.querySelector("#books-grid");
const cards = document.querySelectorAll(".book-card")

function clearContainer() {
    container.innerHTML = "";
    const card = document.createElement('div');
    card.classList.add('invisible-card');
    const card2 = document.createElement('div');
    card2.classList.add('invisible-card');
    const card3 = document.createElement('div');
    card3.classList.add('invisible-card');
    container.insertBefore(card, container.firstChild);
    container.insertBefore(card2, container.firstChild);
    container.insertBefore(card3, container.firstChild);
}

function displayBook() {
    clearContainer();
    myLibrary.forEach(function (element) {
        const card = document.createElement('div');
        card.classList.add('book-card');
        // @ts-ignore
        card.dataset.index = myLibrary.indexOf(element);
        container.insertBefore(card, container.firstChild);
        const data = document.createElement("p");
        data.classList.add("data");
        card.appendChild(data);
        data.textContent = `DOM: ${card.dataset.index} | Array: ${myLibrary.indexOf(element)}`
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
        pages.textContent = `${element.pages} pages`;
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

displayBook();

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
    console.log(myLibrary);
    // @ts-ignore
    form.reset();
});


// Romve from Array and DOM
const removeBtns = document.querySelectorAll('.remove');

removeBtns.forEach((button) => {
    button.addEventListener('click', () => {
        let card = button.parentElement;
        // @ts-ignore
        // button.parentElement.dataset.index = myLibrary.indexOf();
        let bookIndex = parseInt(button.parentElement.dataset.index);
        myLibrary.splice(bookIndex, 1);
        displayStats();
        displayBook();
        console.log(myLibrary);
    });
});

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

function clearData() {
    let divs = document.querySelectorAll(".card");
    divs.forEach(function (div) {
        div.remove;
    })
}

function serialize() {
    let chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        serialLength = 10,
        randomSerial = "", i, randomNumber;
    for(i = 0; i < serialLength; i = i + 1) {
        randomNumber = Math.floor(Math.random() * chars.length);
        randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    return randomSerial;
}

// Set Data
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}
