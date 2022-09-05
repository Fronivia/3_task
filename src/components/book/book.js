function renderBook(bookTitle = Store.title, text = Store.text, currentId = id, status, date) {

    // Создаем книжку и прокидываем все поля и аттрибуты
    const book = wrapElement(document.createElement('div'))
        .addClass('books-list__item')
        .addClass('book')
        .setAttrb('draggable', 'true')
        .addListener('drag', event => {
            console.log('drag')})
        .addListener('dragstart', (event) => {
            console.log('dragstart')})

    const title = wrapElement(document.createElement('h2'))
        .addClass('book__title')
        .setText(bookTitle);

    const buttonsContainer = wrapElement(document.createElement('div'))
        .addClass('book__buttons-container');

    const bookListArea = document.querySelector('.js__list-container');

    const editButton = createBookButton('book__edit-button', 'Ред.');
    const doneButton = createBookButton('book__done-button', 'Прочитал');
    const readButton = createBookButton('book__read-button', 'Читать');
    const deleteButton = createBookButton('book__delete-button', 'X');

    buttonsContainer.append(editButton.$el, doneButton.$el, readButton.$el, deleteButton.$el);
    book.append(title.$el, buttonsContainer.$el);

    if (status === 'done') doneButton.addClass('book__done-button_done');

    book.addListener('click', readBook);
    deleteButton.addListener('click', deleteBook);
    editButton.addListener('click', editBook);
    doneButton.addListener('click', changeStatus.bind(this, currentId))

    // При клике на книжку - она появляется в правом углу экрана
    function readBook(event) {
        console.log('проверка')
        event.preventDefault();
        const titleArea = document.querySelector('.js__screen-title');
        const textArea = document.querySelector('.js__screen-text');
        titleArea.innerText = bookTitle;
        textArea.innerText = text;
    }

    // При клике на кнопку редактирования - меняем содержимое
    function editBook(event) {
        event.preventDefault();
        event.stopPropagation();

        // Создаем модальное окно
        const background = wrapElement(document.createElement('div'))
            .addClass('modal-window')
            .addListener('click', (event) => {
                if (event.target === background.$el) {
                    background.$el.remove();
                }
            })

        const editTitleInput = wrapElement(document.createElement('input'))
            .addType('text')
            .setValue(bookTitle)
            .addClass('modal-window__title-input')
            .addListener('input', event => editStore.title = event.target.value);

        const editTextInput = wrapElement(document.createElement('textarea'))
            .setValue(text)
            .addClass('modal-window__text-input')
            .addListener('input',event => editStore.text = event.target.value);

        const saveButton = wrapElement(document.createElement('button'))
            .setText('Сохранить')
            .addClass('modal-window__save-button')
            .addListener('click', saveText.bind(this, currentId, background ));

        const inputsContainer = wrapElement(document.createElement('form'))
            .addClass('modal-window__inputs-container');

        editStore.title = editTitleInput.$el.value;
        editStore.text = editTextInput.$el.value;
        inputsContainer.append(editTitleInput.$el, editTextInput.$el, saveButton.$el);
        background.append(inputsContainer.$el);
        document.body.append(background.$el);
    }

    function deleteBook(event) {
        event.preventDefault();
        event.stopPropagation();
        const currentBook = library.findIndex( book => book.id === currentId);
        library.splice(currentBook, 1);
        setDataInStorage('books', library);
        clearBookListContainer();
        initialRender();
        clearReadingScreen();
    }
    bookListArea.append(book.$el);

    clearStore();
}

function createBookButton(className, text) {
    const button = wrapElement(document.createElement('button'))
        .addClass(className)
        .addClass('book__button')
        .setText(text);

    return button;
}


function changeStatus(currentId, event) {
    event.preventDefault();
    event.stopPropagation();
    const currentBook = library.findIndex(book => book.id === currentId);
    const editedBook = {
        title: library[currentBook].title,
        text: library[currentBook].text,
        id: currentId,
        date: library[currentBook].date,
        status: library[currentBook].status === 'unread' ? 'done' : 'unread'
    }

    library.splice(currentBook, 1, editedBook);
    setDataInStorage('books', library);
    clearBookListContainer();
    initialRender();
}

function saveText(currentId, container, event) {
    event.preventDefault();
    const currentBook = library.findIndex(book => book.id === currentId);

    const editedBook = {
        title: editStore.title,
        text: editStore.text,
        id: currentId,
        date: library[currentBook].date,
        status: library[currentBook].status,
    }

    library.splice(currentBook, 1, editedBook);
    setDataInStorage('books', library);
    clearBookListContainer();
    initialRender();
    container.$el.remove()
}



