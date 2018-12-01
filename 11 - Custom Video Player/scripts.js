const video = document.querySelector('video');
const toggle = document.querySelector('.toggle');
const skipbutton = document.querySelectorAll('[data-skip]');
const controlRange = document.querySelectorAll('[type="range"]');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

//方法
//播放
function playcondition(){
  if(video.paused){
    video.play();
    toggle.textContent="►";

  }else{
    video.pause();
    toggle.textContent="❚ ❚";
  };
}
//調整音量及速度
function changeControl(){
  video[this.name]=this.value;
}

//快進或倒退
//video.currentTime
function skip(e){
  // parseFloat 是因爲原本爲文字，需要轉成數字來操作
  video.currentTime += parseFloat(this.dataset.skip);
}

//更新播放進度
function  updateProgressBar(){
  var progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis=`${progressPercent}%`;
}

//按到哪裏播到哪裏
function gotoplay(e){
  var gototime = (e.offsetX / progress.offsetWidth)*video.duration;
  video.currentTime = gototime;
}


//監聽觸發事件
//播放或暫停
video.addEventListener('click', playcondition);
toggle.addEventListener('click', playcondition);
//快轉或倒退
skipbutton.forEach(item => item.addEventListener('click',skip));
//調整音量或播放速度
controlRange.forEach(item => item.addEventListener('change',changeControl));
controlRange.forEach(item => item.addEventListener('mousemove',changeControl));
//更新進度條
video.addEventListener('timeupdate', updateProgressBar);
//點按進度條
progress.addEventListener('click', gotoplay);
