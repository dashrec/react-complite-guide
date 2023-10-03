const data = [
  {
    id: 1,
    title: 'The Lord of the Rings',
    publicationDate: '1954-07-29',
    author: 'J. R. R. Tolkien',
    genres: [
      'fantasy',
      'high-fantasy',
      'adventure',
      'fiction',
      'novels',
      'literature',
    ],
    hasMovieAdaptation: true,
    pages: 1020,
    translations: {
      spanish: 'El señor de los anillos',
      chinese: '魔戒',
      french: 'Le Seigneur des anneaux',
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },

  {
    id: 2,
    title: 'The Cyberiad',
    publicationDate: '1965-01-01',
    author: 'Stanislaw Lem',
    genres: [
      'science fiction',
      'humor',
      'speculative fiction',
      'short stories',
      'fantasy',
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 100,
      },
    },
  },
  {
    id: 3,
    title: 'Dune',
    publicationDate: '1965-01-01',
    author: 'Frank Herbert',
    genres: ['science fiction', 'novel', 'adventure'],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: '',
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: '1997-06-26',
    author: 'J. K. Rowling',
    genres: ['fantasy', 'adventure'],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: 'Harry Potter y la piedra filosofal',
      korean: '해리 포터와 마법사의 돌',
      bengali: 'হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন',
      portuguese: 'Harry Potter e a Pedra Filosofal',
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: 'A Game of Thrones',
    publicationDate: '1996-08-01',
    author: 'George R. R. Martin',
    genres: ['fantasy', 'high-fantasy', 'novel', 'fantasy fiction'],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: '왕좌의 게임',
      polish: 'Gra o tron',
      portuguese: 'A Guerra dos Tronos',
      spanish: 'Juego de tronos',
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

/** 


const [primaryGenre, secondaryGenre, ...otherGenres] = genres;

console.log(primaryGenre, secondaryGenre, otherGenres);

const newGenre = ['epic fantasy', ...genres];

newGenre;

const updatedBook = { ...book, moviePublicationDate: '2001-12-19', pages: 90 };

updatedBook;

const getYear3 = (str) => str.split('-')[0];
console.log(getYear3(publicationDate));

const summary = `${title} has ${pages}-pages and was published by ${author} in ${getYear3(
  publicationDate
)}.The book has ${hasMovieAdaptation ? '' : 'not '}been adapted as a movie`;

summary;

const pagesRange = pages > 99 ? 'over a hundred' : 'less then a hundred';

pagesRange;

console.log(`the book has ${pagesRange} pages`);

function getYear1(str) {
  return str.split('-')[1];
}
const getYear2 = (str) => {
  return str.split('-')[0];
};

console.log(true && 'some string');

console.log(false && 'some string');

console.log(hasMovieAdaptation && 'this book has a movie');
console.log('test' && 'some s');
console.log(0 && 'some str');

console.log(true || 'best');
console.log(false || 'best');
console.log(false || false);
console.log(book.translations.spanish);

const spanish = book.translations.spanish || 'not translated';

spanish;

console.log(book.reviews.librarything?.reviewsCount);

const countWrong = book.reviews.librarything?.reviewsCount || 'no data';

countWrong;

const count = book.reviews.librarything?.reviewsCount ?? 'no data'; //this Nullish coalescing operator returns no data when it is a null or undefined but not when its 0

count;

function getTotalReviewCount(book) {
  const goodreads = book.reviews.goodreads.reviewsCount;
  const librarything = book.reviews?.librarything?.reviewsCount ?? 0; // optional chaining and Nullish coalescing
  librarything;
  return goodreads + librarything;
}
console.log(getTotalReviewCount(book));
*/
function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

function getTotalReviewCount(book) {
  const goodreads = book.reviews?.goodreads?.reviewsCount ?? 0;
  const librarything = book.reviews?.librarything?.reviewsCount ?? 0; // optional chaining and Nullish coalescing
  librarything;
  return goodreads + librarything;
}

const books = getBooks();

books;

const titles = books.map((book) => book.title);

titles;

const essentialData = books.map((book) => {
  // function block
  return {
    title: book.title,
    author: book.author,
  };
});
essentialData;

const essentialData2 = books.map((book) => ({
  // when using parenthesis we don't need to return   // function block
  title: book.title,
  author: book.author,
  reviewsCount: getTotalReviewCount(book),
}));
essentialData2;

const longBooksWithMovieAdaptation = books
  .filter((book) => book.pages > 500 && book.reviews.librarything) //  filter out if the condition is not true + if book does not have librarything
  .filter((book) => book.hasMovieAdaptation); // and where it has a hasMovieAdaptation

longBooksWithMovieAdaptation;

const adventureBooks = books
  .filter(
    (books) => books.genres.includes('adventure') // filter out if includes is false
  )
  .map((book) => book.title); // get only titles

adventureBooks;

//sum is an accumulator a final value
// starts with 0
// at the end it makes a sum up of all elements like 0 + 10 + 32 + 42 + 22 + 45 where zero is a starting point in this case
const pagesAllBooks = books.reduce((sum, book) => sum + book.pages, 0);

pagesAllBooks;

//sort ascending way
const x = [15, 3, 8, 7, 4, 9, 1, 2];
const sortedAscending = x.slice().sort((a, b) => b - a); // to avoid original array mutation we need to use slice it will copy it

sortedAscending;
x;

// sort discending
const y = [15, 3, 8, 7, 4, 9, 1, 2];
const sortedDiscending = y.sort((a, b) => a - b); //  a is always current value and b is always the next value and in callback if we return the negative value it the small number come first and the big the
sortedDiscending;

var test = [15, 3, 8, 7, 4, 9, 1, 2];
var copy = test.slice();

test;
copy;

const sortedByPages = books.slice().sort((a, b) => b.pages - a.pages);

sortedByPages;

const newBook = {
  id: 6,
  title: 'hary poter and the shit',
  author: 'j k rowling',
};

// add new book
const booksAfterAdding = [...books, newBook];
booksAfterAdding;

// delete book obj from array
const booksAfterDelete = booksAfterAdding.filter((book) => book.id !== 3); // whenever it returns false it will be no included in the final array

booksAfterDelete;

// does not 1 equals 3 ? true. does not 2 equals 3 ? true. does not 3 equals 3 ? false because it equals 3

const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? { ...book, pages: 12 } : book
);

booksAfterUpdate;

/* const res = fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
  res.json()
);
res;

 */

async function getTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await res.json();
  // set state here
  return data;
}
const todos = getTodos();
console.log(todos); // here it gives the it a promise again instead of data
