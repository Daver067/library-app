//getting the form info
const addBookBtn = document.getElementById("submitBtn");
const authorInput = document.getElementById("author");
const titleInput = document.getElementById("title");
const pageInput = document.getElementById("pages");
const readUnreadInput = document.getElementById("read-unread");
const putNewBooksHere = document.getElementById('books');
let toggleRead = document.querySelectorAll('img')

//Sample Book
let theHobbit = new Book ('Tolkien', 'The Hobbit', 420, 'Unread');

//my books
let myLibrary = [theHobbit]

//adding books in library to the page
function updateLibrary(){
    arrayNum = 0;
    myLibrary.forEach(book => {
    let thisBook = createBook(book, arrayNum);
    putNewBooksHere.appendChild(thisBook);
    ++arrayNum;
})};

//deletes all books from displaying
function clearLibrary(){
    let bookCount = myLibrary.length;
    for (i = 0; i < bookCount; i++) {
        putNewBooksHere.removeChild(putNewBooksHere.firstElementChild);
    }
}

//Checking whether the checkbox is checked or not
function checkedOrNot(checkbox){
    return ((readUnreadInput.checked == false) ? 'Unread' : 'Read');
}

//Book constructor
function Book(author, title, pages, read){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = checkedOrNot(read);
}

//add book to library
function addBookToLibrary(book){
    myLibrary.push(book);
}

//clicking the add a book button
addBookBtn.addEventListener('click', () => {
    let thisBook = new Book(authorInput.value, titleInput.value, pageInput.value, readUnreadInput.value);
    clearLibrary();
    addBookToLibrary(thisBook)
    updateLibrary();
})

//make a dom element book with object values
function createBook(libraryBook, libraryIndexNumber){
    let book = createNewDiv('book');
    book.setAttribute('name', libraryIndexNumber)
    book.appendChild(createNewDiv('author', libraryBook.author));
    book.appendChild(createNewDiv('title', libraryBook.title));
    let pagesRead = createNewDiv('pages-read');
    book.appendChild(pagesRead);
    pagesRead.appendChild(createNewDiv('pages', ('Pages: ' + libraryBook.pages)));
    pagesRead.appendChild(createNewDiv('readStatus', libraryBook.read));
    let readBtn = createNewDiv('readBtn');
    book.appendChild(readBtn);
    let svgDelete = createNewDiv('svg');
    let makeDeleteSVG = addTheSVG('cancel')
    addDeleteListener(makeDeleteSVG, libraryIndexNumber);
    svgDelete.appendChild(makeDeleteSVG);
    readBtn.appendChild(svgDelete)
    let svgCheck = createNewDiv('svg');
    let makeCheckSVG = addTheSVG('check')
    addCheckListener(makeCheckSVG, libraryIndexNumber)
    svgCheck.appendChild(makeCheckSVG);
    readBtn.appendChild(svgCheck)
    return book;
 }
 //making new divs, adding classes and content
function createNewDiv(newClass, divContent){
    let div = document.createElement('div');
    div.className = newClass;
    div.innerHTML = ((divContent) || (''));
    return div;
}
//for adding either check or cancel svgs
function addTheSVG(whichOne){
    let svg = document.createElement('img');
    svg.src = `./images/${whichOne}.svg`;
    return svg;
}

//adds the listener for clicking the delete button to newly created books
function addDeleteListener(node, libraryIndexNumber){
    node.addEventListener('click', () =>{
    clearLibrary();
    myLibrary.splice(libraryIndexNumber, 1)
    updateLibrary();
})};

//adds the listener for clicking the read button to newly created books
function addCheckListener(node, libraryIndexNumber){
    node.addEventListener('click', () => {
    clearLibrary();
    (myLibrary[libraryIndexNumber].read == "Unread") ? myLibrary[libraryIndexNumber].read = "Read" : myLibrary[libraryIndexNumber].read = "Unread";
    updateLibrary()
})};

updateLibrary();