let btnSubmit = document.querySelector('#agree');
let modal = document.querySelector('#modal');
let modalBody = document.querySelector('#modal-body');
let closeModal = document.querySelector('#close-modal');
let confirmData = document.querySelector('#confirm-data');
let editData = document.querySelector('#edit-data');
let form = document.forms[0];

// Открытие модального окна и заполнение данными
btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    // Считываем данные из формы
    let lastName = form.elements["lastname"].value;
    let firstName = form.elements["firstname"].value;
    let surname = form.elements["surname"].value;
    let gender = form.elements["genus"].options[form.elements["genus"].selectedIndex].textContent;
    let birthdate = form.elements["birthdate"].value;
    let doctor = form.elements["doctor"].options[form.elements["doctor"].selectedIndex].textContent;
    let visitDateTime = form.elements["visitDateTime"].value;
    let insurance = form.elements["insured"].checked ? "Застрахований" : "Не застрахований";
    let comment = form.elements["comment"].value;

    // Формируем содержимое модального окна
    modalBody.innerHTML = `
        <p><strong>Прізвище:</strong> ${lastName}</p>
        <p><strong>Ім'я:</strong> ${firstName}</p>
        <p><strong>По батькові:</strong> ${surname}</p>
        <p><strong>Стать:</strong> ${gender}</p>
        <p><strong>Дата народження:</strong> ${birthdate}</p>
        <p><strong>Лікар:</strong> ${doctor}</p>
        <p><strong>Дата і час візиту:</strong> ${visitDateTime}</p>
        <p><strong>Коментар:</strong> ${comment}</p>
        <p><strong>Страхування:</strong> ${insurance}</p>
    `;

    // Показываем модальное окно
    modal.style.display = 'flex';
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Обработка кнопки "Так, правильно"
confirmData.addEventListener('click', () => {
    alert("Ваш запис підтверджено!");
    modal.style.display = 'none';
    form.reset(); // Сброс формы
});

// Обработка кнопки "Змінити"
editData.addEventListener('click', () => {
    modal.style.display = 'none';
});
