const library = JSON.parse(localStorage.getItem('books')) || [];

let id = 0;
initId();
// РЕНДЕР ПОЛЯ ДЛЯ ВВОДА

const bookContainer = document.querySelector('.js__new-bock-container');
const loadRadio = document.querySelector('.js__load-book');
const createRadio = document.querySelector('.js__create-book');
loadRadio.addEventListener('change', chooseLoadType);
createRadio.addEventListener('change', chooseLoadType);

function chooseLoadType(event) {
    const { target } = event;
    clearContainer();

    if (target.value === 'load') {
        createLoadForm();
    } else {
        createBookForm();
    }
}

function createLoadForm() {
    const loadBookInput = wrapElement(document.createElement('input'));
    loadBookInput.addType('file')
        .addListener('change', loadBook);
    bookContainer.append(loadBookInput.$el);
    clearStore();
}

function createBookForm() {
    const bookTitle = wrapElement(document.createElement('input'));
    const bookText = wrapElement(document.createElement('textarea'));
    const submitButton = wrapElement(document.createElement('button'));

    // ОФОРМЛЯЕМ ПОЛЕ ЗАГОЛОВКА
    bookTitle.addClass('book-form__book-title')
        .addListener('input', createTitle);
    bookText.addClass('book-form__book-text')
        .addListener('input', createText);

    submitButton.setText('Отправить')
        .addListener('click', createBook)
    bookContainer.append(bookTitle.$el);
    bookContainer.append(bookText.$el);
    bookContainer.append(submitButton.$el);
}

function createBook(event) {
    event.preventDefault();

    if (!Store.title || !Store.text) {
        throw new Error('У вас не заполнено одно из полей');
        return;
    }

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

function initialRender() {
    library.sort(sortBooks);
    library.map( book => {
        renderBook(book.title, book.text, book.id, book.status, book.date);
    });
}

initialRender();

function sortBooks(a, b) {
    if (a.status === b.status) {
        return a.date > b.date ? -1 : 1;
    }

    if (a.status === 'unread') {
        return -1;
    }
}

