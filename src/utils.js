// Обернуть элемент в удобную форму управления
function wrapElement(elem) {
    return new Node(elem)
}

// Инициализируем айди, что бы он ни у кого не повторялся
function initId() {
    library.forEach(book => {
        if (id <= book.id) id = book.id +1;
    })
}

// Очищает элемент
function clearContainer() {
    const containers = document.querySelectorAll('.js__new-bock-container');
    for (let container of containers) {
        container.style.display = 'none';
    }

    document.querySelector('.js__create-book-input').value = '';
    document.querySelector('.js__create-book-textarea').value = '';
}

// ЗАГРУЗКА ТЕКСТА
async function loadBook(event) {
    const file = event.target.files[0];
    const type = file.type;

    if (file.type === 'text/plain') {
        const formData = new FormData();
        formData.append('login', 'Artem');
        formData.append('file', file, 'testText.txt')
        let response = await fetch('https://apiinterns.osora.ru/' , {
            method: 'POST',
            body: formData,
        })

        const result = await response.json();
        const date = Date.now();

        library.push({
            title: result.title,
            text: result.text,
            id: id,
            date: date,
            status: 'unread'
        })

        setDataInStorage('books', library);
        renderBook(result.title, result.text, id, date, 'unread');

        id+=1;
    } else throw new Error('У вас не текстовый формат файла');
}

// Запомнить введеное название
function createTitle(event) {
    Store.title = event.target.value;
}

// Запомнить введенный текст
function createText(event) {
    Store.text = event.target.value;
}

// Очистка стора
function clearStore() {
    Store.title = '';
    Store.text = '';
}

// Заносим данные в локал сторейдж
function setDataInStorage(type, data) {
    localStorage.setItem(type, JSON.stringify(data));
}

// Очистка правого фрейма для чтения
function clearReadingScreen() {
    document.querySelector('.js__screen-text').innerText = '';
    document.querySelector('.js__screen-title').innerText = '';
}

// Очистить контейнер с книгами
function clearBookListContainer(type) {

    const bookListArea = type === 'favorite'
        ? document.querySelector('.js__favorite-books')
        : document.querySelector('.js__list-container');
    bookListArea.innerHTML = '';
}

// Сортировка по статусу прочтения и времени
function sortBooks(a, b) {
    if (a.status === b.status) {
        return a.date > b.date ? -1 : 1;
    }

    if (a.status === 'unread') {
        return -1;
    }
}
