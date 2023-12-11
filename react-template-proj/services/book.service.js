import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

const BOOK_KEY = "bookDB";
var gFilterBy = { title: "", minPrice: 0 };
_createBooks();

export const bookService = {
  query,
  get,
  remove,
  save,
  getNextBookId,
  getFilterBy,
  setFilterBy,
  getDefaultFilter,
  getById,
};

function query(gFilterBy) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (gFilterBy.title) {
      const regex = new RegExp(gFilterBy.title, "i");
      books = books.filter((book) => regex.test(book.title));
    }
    if (gFilterBy.minPrice) {
      books = books.filter((book) => book.listPrice.amount >=gFilterBy.minPrice);
    }
    return Promise.resolve(books) ;
  });
}


function get(bookId) {
  return storageService.get(BOOK_KEY, bookId);
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId);
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book);
  } else {
    return storageService.post(BOOK_KEY, book);
  }
}

function getById(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

// function getEmptyBook(title = '', description = '') {
//     return { id: '', title, maxSpeed }
// }
function getDefaultFilter() {
  return { title: "", minPrice: 0 };
}

function getFilterBy() {
  return { ...gFilterBy };
}

function setFilterBy(filterBy = {}) {
  console.log(filterBy)
  if (filterBy.title !== undefined) gFilterBy.title = filterBy.title;
  if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed;
  return gFilterBy;
}

function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let nextbookIdx = books.findIndex((book) => book.id === bookId) + 1;
    if (nextbookIdx === books.length) nextbookIdx = 0;
    return books[nextbookIdx].id;
  });
}
function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY);
  if (!books || !books.length) {
    const ctgs = ["Love", "Fiction", "Poetry", "Computers", "Religion"];
    books = [];
    for (let i = 0; i < 20; i++) {
      const book = {
        id: utilService.makeId(),
        title: utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors: [utilService.makeLorem(1)],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [
          ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)],
        ],
        thumbnail: `https://www.coding-academy.org/books-photos/${i + 1}.jpg`,
        language: "en",
        listPrice: {
          amount: utilService.getRandomIntInclusive(80, 500),
          currencyCode: "EUR",
          isOnSale: Math.random() > 0.7,
        },
      };
      books.push(book);
    }
    utilService.saveToStorage(BOOK_KEY, books)
  }
  console.log("books", books);
}
// function _createBooks() {
//     let books = utilService.loadFromStorage(BOOK_KEY)
//     if (!books || !books.length) {
//         books = []
//         books.push(_createbook('Gwent', 1,120))
//         books.push(_createbook('Between Here And Gone', 2,100))
//         books.push(_createbook('Magic Lantern',3,80))
//         books.push(_createbook('Its Just A Dog', 4,110))
//         utilService.saveToStorage(BOOK_KEY, books)
//     }
// }

// function _createbook( title,imgNum,amount) {
//     const book = {
//       id: utilService.makeId(),
//       title,
//       description: "placerat nisi sodales suscipit tellus",
//       thumbnail: `https://www.coding-academy.org/books-photos/${imgNum}.jpg`,
//       listPrice:{
//         amount:amount,
//         currencyCode:"EUR",
//         isOnSale:false,
//     }

//     }
//     return book
// }
