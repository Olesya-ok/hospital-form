
    let btnSubmit = document.querySelector('#agree');
    let modal = document.querySelector('#modal');
    let modalBody = document.querySelector('#modal-body');
    let closeModal = document.querySelector('#close-modal');
    let confirmData = document.querySelector('#confirm-data');
    let editData = document.querySelector('#edit-data');
    let form = document.forms[0];
    let insuredRadio = document.getElementById('insured');
    let notInsuredRadio = document.getElementById('not-insured');
    let insuredNmbWrapper = document.querySelector('.insuredNmb');
    let insuredNmb = document.getElementById('insuredNmb');

    function validateRequiredFields() {
        let isValid = true;

        // Проверка радиокнопок "Стать"
        let genusGroup = form.elements["genus"];
        let isGenusSelected = Array.from(genusGroup).some(radio => radio.checked);
        let genusContainer = document.querySelector('.data');
        if (!isGenusSelected) {
            isValid = false;
            genusContainer.style.outline = "2px solid red";
        } else {
            genusContainer.style.outline = "";
        }

        // Проверка радиокнопок "Страхование"
        let insuranceGroup = form.elements["insured"];
        let isInsuranceSelected = Array.from(insuranceGroup).some(radio => radio.checked);
        let insuranceContainer = document.querySelector('.insurance');
            if (!isInsuranceSelected) {
            isValid = false;
            insuranceContainer.style.outline = "2px solid red";
        } else {
            insuranceContainer.style.outline = "";
        }

        // Проверка остальных обязательных полей
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value) {
                isValid = false;
                field.style.borderColor = "red";
            } else {
                field.style.borderColor = "";
            }
        });

        return isValid;
    }


    function validateInsuranceNumber() {
        if (insuredRadio.checked) {
            const pattern = /^\d{8}-[a-zA-Zа-яА-Я]{2}$/;
            if (!pattern.test(insuredNmb.value)) {
                alert('Неправильний формат номеру страхування!');
                insuredNmb.style.borderColor = 'red';
                return false;
            }
        }
        insuredNmb.style.borderColor = '';
        return true;
    }

    insuredRadio.addEventListener('change', () => {
        insuredNmbWrapper.style.display = 'block';
        insuredNmb.required = true;
    });

    notInsuredRadio.addEventListener('change', () => {
        insuredNmbWrapper.style.display = 'none';
        insuredNmb.required = false;
        insuredNmb.value = '';
    });

    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        if (validateRequiredFields() && validateInsuranceNumber()) {
            modalBody.innerHTML = '';

            const fieldTranslations = {
                lastname: 'Прізвище',
                firstname: 'Ім’я',
                surname: 'По батькові',
                genus: 'Стать',
                birthdate: `Дата народження`,
                visitDateTime: `Дата та час прийому`,
                insured: 'Страхування',
                insuranceNumber: 'Номер страхування',
                comment: `Коментар до прийому`
            };

            // Собираем данные из формы
            let data = new FormData(form);

            // Обрабатываем данные и выводим в модальное окно
            for (let [name, value] of data) {
                // Если поле является радиокнопкой или чекбоксом, получаем выбранное значение
                if (name === 'genus') {
                    // Получаем выбранное значение для гендера
                    value = document.querySelector('input[name="genus"]:checked')?.value || '';
                }

                if (name === 'doctor') {
                    // Получаем выбранное значение из select
                    let selectedOption = document.querySelector('select[name="doctor"] option:checked');
                    value = selectedOption ? selectedOption.textContent : '';
                }

                if (name === 'insured') {
                    // Получаем выбранное значение для страховки
                    value = document.querySelector('input[name="insured"]:checked')?.value || '';
                }

                // Переводим имя поля, если оно есть в fieldTranslations
                let translatedName = fieldTranslations[name] || name;

                // Создаем элемент с данными
                let p = document.createElement('p');
                p.innerHTML = `<strong>${translatedName}:</strong> ${value}`;
                modalBody.appendChild(p);
            }


            modal.classList.add('active');
        }
    });


    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    editData.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    confirmData.addEventListener('click', () => {
        alert('Ваш запис підтверджено!');
        form.submit();
    })
;


// let btnSubmit = document.querySelector('#agree');
// let modal = document.querySelector('#modal');
// let modalBody = document.querySelector('#modal-body');
// let closeModal = document.querySelector('#close-modal');
// let confirmData = document.querySelector('#confirm-data');
// let editData = document.querySelector('#edit-data');
// let form = document.forms[0];
// let insuredRadio = document.getElementById('insured');
// let notInsuredRadio = document.getElementById('not-insured');
//
// // Функция проверки обязательных полей
// function validateRequiredFields() {
//     let isValid = true;
//
//     // Проверка выбора врача
//     let doctorSelect = form.elements["doctor"];
//     if (!doctorSelect.value) {
//         isValid = false;
//         alert('Будь ласка, виберіть лікаря!');
//         doctorSelect.style.borderColor = "red";
//     } else {
//         doctorSelect.style.borderColor = "";
//     }
//
//     // Проверка выбора пола
//     let genusRadios = form.elements["genus"];
//     let genusSelected = Array.from(genusRadios).some(radio => radio.checked);
//     if (!genusSelected) {
//         isValid = false;
//         alert('Будь ласка, виберіть стать!');
//         genusRadios.forEach(radio => (radio.style.outline = "2px solid red"));
//     } else {
//         genusRadios.forEach(radio => (radio.style.outline = ""));
//     }
//
//     return isValid;
// }
//
// // Функция проверки номера страхования
// function validateInsuranceNumber() {
//     if (insuredRadio.checked) {
//         const insuredNmbInput = document.getElementById('insuredNmb');
//         const pattern = /^\d{8}-[a-zA-Z]{2}$/;
//
//         if (!pattern.test(insuredNmbInput.value)) {
//             alert('Неправильний формат номеру страхування! Формат: 8 цифр, тире, 2 букви (наприклад, 12345678-AB)');
//             insuredNmbInput.value = '';
//             insuredNmbInput.style.borderColor = "red";
//             return false;
//         } else {
//             insuredNmbInput.style.borderColor = "";
//         }
//     }
//     return true;
// }
//
// // Открытие модального окна и заполнение данными
// btnSubmit.addEventListener('click', (e) => {
//     e.preventDefault(); // Отменяем стандартное отправление формы
//
//     let isValid = validateRequiredFields() && validateInsuranceNumber();
//
//     if (!isValid) {
//         return; // Если форма не прошла валидацию, не продолжаем
//     }
//
//     // Очищаем содержимое модального окна перед заполнением
//     modalBody.innerHTML = '';
//
//     // Считываем данные из формы
//     let insuranceStatus = insuredRadio.checked ? 'Застрахований' : 'Не застрахований';
//     let insuranceNumber = insuredRadio.checked ? form.elements["insuredNmb"].value : '—';
//
//     let data = [
//         { label: 'Прізвище', value: form.elements["lastname"].value },
//         { label: "Ім'я", value: form.elements["firstname"].value },
//         { label: 'По батькові', value: form.elements["surname"].value },
//         { label: 'Стать', value: Array.from(form.elements["genus"]).find(radio => radio.checked).value },
//         { label: 'Дата народження', value: form.elements["birthdate"].value },
//         { label: 'Лікар', value: doctorSelect.options[doctorSelect.selectedIndex].textContent },
//         { label: 'Дата і час візиту', value: form.elements["visitDateTime"].value },
//         { label: 'Коментар', value: form.elements["comment"].value },
//         { label: 'Страхування', value: insuranceStatus },
//         { label: 'Номер страхування', value: insuranceNumber }
//     ];
//
//     // Формируем содержимое модального окна
//     data.forEach((item) => {
//         let p = document.createElement('p');
//         p.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
//         modalBody.append(p);
//     });
//
//     // Показываем модальное окно
//     modal.style.display = 'flex';
// });
//
// // Закрытие модального окна
// closeModal.addEventListener('click', () => {
//     modal.style.display = 'none';
// });
//
// // Обработка кнопки "Так, правильно"
// confirmData.addEventListener('click', () => {
//     alert("Ваш запис підтверджено!");
//     modal.style.display = 'none';
//     form.reset(); // Сброс формы
// });
//
// // Обработка кнопки "Змінити"
// editData.addEventListener('click', () => {
//     modal.style.display = 'none';
// });


