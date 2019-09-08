//***********************************************Функция заказа***************************************************/
function sendRequest() {
  event.preventDefault();

  // проверка данных для отправки
  const form = document.querySelector('#form-delivery');
  const sendButton = document.querySelector('#sendButton');

  sendButton.addEventListener('click', event => {
    //event.preventDefault();

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

            // открытие модального окна
          var modul = document.getElementById("modul");
          modul.style.display = "flex";
          document.getElementsByClassName('modul__wrapper')[0].style.position = 'fixed';
          document.body.style.overflow = 'hidden';
          //задаем новый тектс заголовку
          document.getElementById("modul__title").textContent = "Заказ отправлен";
          document.getElementById("modul__text").textContent = "Ваш заказ принят!";
          
        }  
    }
      /*xhr.addEventListener('LOAD', () => {
        if (xhr.readyState == 4 && xhr.response.status == 200) {
          
          // открытие модального окна
          var modul = document.getElementById("modul");
          modul.style.display = "flex";
          document.getElementsByClassName('modul__wrapper')[0].style.position = 'fixed';
          document.body.style.overflow = 'hidden';
          //задаем новый тектс заголовку
          document.getElementById("modul__title").textContent = "Заказ отправлен";
          document.getElementById("modul__text").textContent = "Ваш заказ принят!";
        } 
      });*/
    } else {
      //вызоы модального окна с сообщением об ошибке и обязательными полями
      // открытие модального окна
      var modul = document.getElementById("modul");
      modul.style.display = "flex";
      document.getElementsByClassName('modul__wrapper')[0].style.position = 'fixed';
      document.body.style.overflow = 'hidden';
      //задаем новый тектс заголовку
      document.getElementById("modul__title").textContent = "Заказ не отправлен";
      document.getElementById("modul__text").textContent = "Вы забыли указать необходимые данные: имя, телефон, комментарий";
    }
  });

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
}