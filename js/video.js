var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Инициализация плеера
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '500',
      playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo': 0, 'rel': 0},
      width: '850',
      videoId: 'nxevcb3x0qM',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
});
}
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
// Обработчик готовность
/*function onPlayerReady() {
    iframe = document.getElementById('player');
    setupListener(); 			  
    updateTimerDisplay();
    updateProgressBar();
                
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 6000);	 
}*/

/*Слушать события*/
function setupListener (){
  document.getElementById('full').addEventListener('click', playFullscreen);
}
/*Включение фуллскрина*/
function playFullscreen (){
  player.playVideo();//won't work on mobile
            
    var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(iframe)();
    }
}

/*Громкость*/
function editVolume () {				
  if (player.getVolume() == 0) {
      player.setVolume('100');
  } else {
      player.setVolume('0');
  }
  console.log(player.getVolume());
}

// Обновляем время на панельке - счетчик
function updateTimerDisplay(){
  document.getElementById('time').innerHTML = formatTime(player.getCurrentTime());
}
/*Формат времени*/
function formatTime(time){
  time = Math.round(time);
  var minutes = Math.floor(time / 60),
  seconds = time - minutes * 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return minutes + ":" + seconds;
}

// Обновляем прогресс
function updateProgressBar(){

  var line_width = jQuery('#line').width();
  var persent = (player.getCurrentTime() / player.getDuration());
  jQuery('.viewed').css('width', persent * line_width);
  per = persent * 100;
  jQuery('#fader').css('left', per+'%');
}

/*Линия прогресса*/
function progress (event) {
              
  var line_width = jQuery('#line').width();
  // положение элемента
  var pos = jQuery('#line').offset();
  var elem_left = pos.left;		
  // положение курсора внутри элемента
  var Xinner = event.pageX - elem_left;
  var newTime = player.getDuration() * (Xinner / line_width);
  // Skip video to new time.
  player.seekTo(newTime);
}