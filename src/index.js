// Массив с данными хранящимися  в локал сторейдже
const library = JSON.parse(localStorage.getItem('books')) || [];
const favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks')) || [];

// id для комфортного управления элементами
let id = 0;
initId();

// Находим нужные нам элементы и добавляем прослушку событий
const loadRadio = document.querySelector('.js__load-book');
const createRadio = document.querySelector('.js__create-book');

loadRadio.addEventListener('change', chooseLoadType);
createRadio.addEventListener('change', chooseLoadType);

// Функция отвечающая за то, какая форма будет предложена: отправка файла или создание своей книги
function chooseLoadType(event) {
    const { target } = event;
    clearContainer();

    if (target.value === 'load') {
        createLoadForm();
    } else {
        createBookForm();
    }
}

// Создание формы для отправки файла
function createLoadForm() {

    const loadBookInput = document.querySelector('.js__load-book-form');
    loadBookInput.style.display = 'flex';
    loadBookInput.addEventListener('change', loadBook);

    clearStore();
}

// форма для создания книги
function createBookForm() {
    const createForm = document.querySelector('.js__create-book-form');
    createForm.style.display = 'flex';

    const bookTitle = document.querySelector('.js__create-book-input');
    const bookText = document.querySelector('.js__create-book-textarea');
    const submitButton = document.querySelector('.js__create-book-button')

    bookTitle.addEventListener('input', createTitle);
    bookText.addEventListener('input', createText);
    submitButton.addEventListener('click', createBook);
}

// Функция с помощью которой создается книжка
function createBook(event) {
    event.preventDefault();
    // валидация
    if (!Store.title || !Store.text) {
        throw new Error('У вас не заполнено одно из полей');
        return;
    }
    // Создание объекта для local storage
    // Закидывает в хранилище и рендерим новую книгу
    library.push({
        title: Store.title,
        text: Store.text,
        id: id,
        date: Date.now(),
        status: 'unread'
    })

    setDataInStorage('books', library);
    renderBook();

    id+=1;

    document.querySelector('.book-form__book-title').value = '';
    document.querySelector('.book-form__book-text').value = '';
}

// Функция для рендера книг из массива с данными
function initialRender(type = '') {

    if (type === 'favorite') {
        favoriteBooks.sort(sortBooks);
        favoriteBooks.map( book => {
            renderBook(book.title, book.text, book.id, book.status, book.date, 'favorite');
        });
        return
    }

    library.sort(sortBooks);
    library.map( book => {
        renderBook(book.title, book.text, book.id, book.status, book.date);
    });
}
// Вызываем первый рендер
initialRender();
initialRender('favorite');

const dropZone = document.querySelector('.js__favorite-books-drop');

dropZone.addEventListener('dragover', event => {
    event.preventDefault();
})

dropZone.addEventListener('drop', event => {
    const currentId = +event.dataTransfer.getData('book');

    const currentBook = library.find(book => {
        return book.id === currentId
    });

    if (favoriteBooks.find(book => book.id === currentId)) return;

    favoriteBooks.push(currentBook);
    setDataInStorage('favoriteBooks', favoriteBooks);
    clearBookListContainer('favorite');
    initialRender('favorite')
})
