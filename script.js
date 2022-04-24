//getting the form info
const addBookBtn = document.getElementById("submitBtn");
const authorInput = document.getElementById("author");
const titleInput = document.getElementById("title");
const pageInput = document.getElementById("pages");
const readUnreadInput = document.getElementById("read-unread");
const putNewBooksHere = document.getElementById('books');
let toggleRead = document.querySelectorAll('img')

//Checking whether the checkbox is checked or not
function checkedOrNot(checkbox){
    return ((readUnreadInput.checked == false) ? 'Unread' : 'Read');
}

//clicking the add a book button
addBookBtn.addEventListener('click', () => {
    let book = new newBook(authorInput.value, titleInput.value, pageInput.value, readUnreadInput.value);
    let thisBook = createBook(book);
    console.log(typeof(thisBook))
    putNewBooksHere.appendChild(thisBook);
    toggleRead = document.querySelectorAll('img');
    EraseBookAndChangeReadStatus();
})

//making a new book object with form info
function newBook(authorInput, titleInput, pageInput, readUnreadInput) {
    this.author = authorInput;
    this.title = titleInput;
    this.pages = pageInput;
    this.read = checkedOrNot(readUnreadInput);
}


//make a dom element book with object values
function createBook(newBook){
   let book = createNewDiv('book');
   book.appendChild(createNewDiv('author', newBook.author));
   book.appendChild(createNewDiv('title', newBook.title));
   let pagesRead = createNewDiv('pages-read');
   book.appendChild(pagesRead);
   pagesRead.appendChild(createNewDiv('pages', ('Pages: ' + newBook.pages)));
   pagesRead.appendChild(createNewDiv('readStatus', newBook.read));
   let readBtn = createNewDiv('readBtn');
   book.appendChild(readBtn);
   let svgDelete = createNewDiv('svg');
   svgDelete.appendChild(addTheSVG('cancel'));
   readBtn.appendChild(svgDelete)
   let svgCheck = createNewDiv('svg');
   svgCheck.appendChild(addTheSVG('check'));
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

//clicking checkmark to toggle read and cancel to delete book
function EraseBookAndChangeReadStatus() {toggleRead.forEach(img => img.addEventListener('click', () => {
        let attribute = img.getAttribute("src")
        if (attribute == "./images/cancel.svg"){
            let parentSvg = img.parentNode;
            let parentreadBtn = parentSvg.parentNode;
            let parentBook = parentreadBtn.parentNode;
            let parentBooks = parentBook.parentNode;
            parentBooks.removeChild(parentBook);
        }
        else {
        let parentSvg = img.parentNode;
        let parentreadBtn = parentSvg.parentNode;
        let siblingPagesRead = parentreadBtn.previousSibling.previousSibling;
        let readOrUnread = siblingPagesRead.lastChild.previousSibling;
        readOrUnread.innerHTML == "Unread" ? readOrUnread.innerHTML = "Read" : readOrUnread.innerHTML = "Unread";
    }
        }))}

        EraseBookAndChangeReadStatus()