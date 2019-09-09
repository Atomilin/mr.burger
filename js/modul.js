//***********************************************Функция заказа***************************************************/
function sendRequest() {
  event.preventDefault();
  console.log("обращение к функции");

  // проверка данных для отправки
  const form = document.querySelector('#form-delivery');
  const sendButton = document.querySelector('#sendButton');


  function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
      valid = false;
    }

    if (!validateField(form.elements.phone)) {
      valid = false;
    }

    if (!validateField(form.elements.comment)) {
      valid = false;
    }
    return valid;
  }

  function validateField(field) {
    if (!field.checkValidity()) {
      return false;
    } else {
      return true;
    }
  }

  //функция открытия модального окна
  function modulWindow(title, content) {

     // открытие модального окна
     var modul = document.getElementById("modul");
     modul.style.display = "flex";
     document.getElementsByClassName('modul__wrapper')[0].style.position = 'fixed';
     document.body.style.overflow = 'hidden';
     //задаем новый тектс заголовку
     document.getElementById("modul__title").textContent = title;
     document.getElementById("modul__text").textContent = content;

  }

  //отправка запроса на сервер
  sendButton.addEventListener('click', () => {

    console.log("клик прочитан");

    if (validateForm(form)) {

      //положительный запрос
      let url = 'https://webdev-api.loftschool.com/sendmail';

      //отрицательный запрос
      //let url = 'https://webdev-api.loftschool.com/sendmail/fail'

      let formData = new FormData();
      formData.append('name', form.elements.name.value);
      formData.append('phone', form.elements.phone.value);
      formData.append('comment', form.elements.comment.value);
      formData.append('to', 'mail@mail.com');

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = processReqChange;
      xhr.responseType = 'json';
      xhr.open('POST', url);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.send(formData);
      
      function processReqChange() {
        
        if (xhr.readyState == 4 && xhr.status == 200) {
          modulWindow("Спасибо!", "Ваш заказ принят!");
        }  
      }
    } else {
      modulWindow("Заказ не отправлен!", "Вы забыли указать необходимые данные: имя, телефон, комментарий");
    }
  });
}