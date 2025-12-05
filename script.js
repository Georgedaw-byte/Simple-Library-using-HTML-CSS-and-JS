const myLibrary = [];

function Books(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Books.prototype.isRead = null;

function addBookToLibrary(title, author, pages, read) {
  let book = new Books(title, author, pages, read)
  book.id = crypto.randomUUID()
  book.isRead = (read === "read")
  myLibrary.push(book)
}

addBookToLibrary("Title1", "author", 55, "not read")
addBookToLibrary("Title2", "author", 55, "not read")
addBookToLibrary("Title3", "author", 55, "not read")

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector(".close");
const add = document.querySelector(".close + button")
const title_input = document.querySelector("#title")
const author_input = document.querySelector("#author")
const pages_input = document.querySelector("#pages")
const radio = document.querySelectorAll("[name='readorno']")

showButton.addEventListener("click", (event) => {
    event.preventDefault()
    dialog.showModal();
});

closeButton.addEventListener("click", (event) => {
    event.preventDefault()
    dialog.close();
});

add.addEventListener("click", (event) => {
    event.preventDefault()
    addBookToLibrary(title_input.value, author_input.value, pages_input.value, (Array.from(radio)).filter((one) => one.checked)[0].value)
    DisplayBooks(myLibrary.slice(-1))
    console.log(myLibrary)
})

function DisplayBooks(array)
{
    for (let i = 0; i < array.length; i++) 
    {
        let div = document.createElement("div")
        let title = document.createElement("span")
        title.textContent = array[i].title
        title.classList.add("title")
        div.appendChild(title)
        let read = document.createElement("button")
        read.classList.add("read")
        read.textContent = array[i].read
        div.appendChild(read)
        let author = document.createElement("span")
        author.textContent = `Author: ${array[i].author}`
        author.classList.add("author")
        div.appendChild(author)
        let pages = document.createElement("span")
        pages.textContent = `Pages: ${array[i].pages}`
        pages.classList.add("pages")
        div.appendChild(pages)
        let delete_btn = document.createElement("button")
        delete_btn.classList.add("delete")
        delete_btn.textContent = "Delete"
        div.appendChild(delete_btn)
        div.setAttribute("data-index-number", array[i].id)
        document.body.appendChild(div)
        if (!array[i].isRead)
        {
            read.className = 'notread'
        }
        else {
            read.className = 'read'
        }
        read.addEventListener("click", () => {
            console.log("You clicked index:", i);
            read.classList.add("pressed")
            setTimeout(() => {
            read.classList.remove('pressed');
            }, 150);
            array[i].isRead = !array[i].isRead
            if (array[i].isRead)
            {
                array[i].read = "read"
                read.textContent = "read"
                read.className = 'read'
            }
            else 
            {
                array[i].read = "not read"
                read.textContent = "not read"
                read.className = 'notread'
            }
        })
        console.log(myLibrary)
        delete_btn.addEventListener("click", (event) => {
            event.preventDefault()
            myLibrary.splice(i, 1)
            div.remove()
            console.log(myLibrary)
        })
    }
}

DisplayBooks(myLibrary)
