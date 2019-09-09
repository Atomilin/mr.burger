//**********************************Функция открытия отзыва************************/
function openReview() {
    event.preventDefault();

    const review_one = document.querySelector('#review_one');
    const review_two = document.querySelector('#review_two');
    const review_three = document.querySelector('#review_three');
    const review_four = document.querySelector('#review_four');
    const review_five = document.querySelector('#review_five');
    const review_six = document.querySelector('#review_six');
    const review_seven = document.querySelector('#review_seven');
    const review_eight = document.querySelector('#review_eight');

    //функция открытия модального окна
  function modulWindow(name, review) {

    // открытие модального окна
    var modul = document.getElementById("modul");
    modul.style.display = "flex";
    document.getElementsByClassName('modul__wrapper')[0].style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    //задаем новый тектс заголовку
    document.getElementById("modul__title").textContent = name;
    document.getElementById("modul__text").textContent = review;
 }

 review_one.addEventListener('click', () => {
    modulWindow("Имя1", "Отзыв1");
 });
 review_two.addEventListener('click', () => {
    modulWindow("Имя2", "Отзыв2");
 });
 review_three.addEventListener('click', () => {
    modulWindow("Имя3", "Отзыв3");
 });
 review_four.addEventListener('click', () => {
    modulWindow("Имя4", "Отзыв4");
 });
 review_five.addEventListener('click', () => {
    modulWindow("Имя5", "Отзыв5");
 });
 review_six.addEventListener('click', () => {
    modulWindow("Имя6", "Отзыв6");
 });
 review_seven.addEventListener('click', () => {
    modulWindow("Имя7", "Отзыв7");
 });
 review_eight.addEventListener('click', () => {
    modulWindow("Имя8", "Отзыв8");
 });
}