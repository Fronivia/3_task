// Обернуть элемент в удобную форму управления
function wrapElement(elem) {
    return new Node(elem)
}

function initId() {
    library.forEach(book => {
        if (id <= book.id) id = book.id +1;
    })
}

// Очищает элемент
function clearContainer() {
    bookContainer.innerHTML = '';
}

// ЗАГРУЗКА ТЕКСТА
async function loadBook(event) {
    console.log('wtf')
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

        let result = await response.json();

        console.log(result);
    } else console.log(type);
}

// Запомнить введеное название
function createTitle(event) {
    Store.title = event.target.value;
}

// Запомнить введенный текст
function createText(event) {
    Store.text = event.target.value;
}

function clearStore() {
    Store.title = '';
    Store.text = '';
}

function setDataInStorage(type, data) {
    localStorage.setItem(type, JSON.stringify(data));
}


function clearReadingScreen() {
    console.log('wtf');
    document.querySelector('.js__screen-text').innerText = '';
    document.querySelector('.js__screen-title').innerText = '';
}

function clearBookListContainer() {
    const bookListArea = document.querySelector('.js__list-container');
    bookListArea.innerHTML = '';
}
