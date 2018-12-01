let clock;
let nowTime;
const button = document.querySelectorAll('button');
const h1 = document.querySelector('h1');
const p = document.querySelector('p');

function setTime(leftTime){
    //把之前有設定的定時器清掉
    clearInterval(clock);
    //獲取關鍵時間
    nowTime = new Date();
    //顯示時間 開始倒數+倒數完預計時間
    displayLeftTime(leftTime);
    displayFinishTime(nowTime,leftTime);
    //定時器，用以倒數及顯示時間
    clock = setInterval(() => {
      leftTime = leftTime - 1;
      if(leftTime<0){return;};
      displayLeftTime(leftTime);
    } , 1000);
}

function displayLeftTime(leftTimeSec){
    const min = Math.floor(leftTimeSec / 60);
    let sec = leftTimeSec % 60;
    if(sec<10){
      sec = '0' + sec;
    }
    h1.textContent = `${min}:${sec}`;
}

function displayFinishTime(nowTime,leftTime){
    const nowTimeSec = nowTime.getTime();
    const finishSec = nowTimeSec + (leftTime * 1000);
    const finishDate = new Date();
    finishDate.setTime(finishSec);
    p.textContent = `Finish at ${finishDate.getHours()}:${finishDate.getMinutes()}:${finishDate.getSeconds()}`;
}

button.forEach(item => item.addEventListener('click',function(e){
  setLeftTime = this.dataset.time;
  setTime(setLeftTime);
}));

document.customForm.addEventListener('submit', function(e) {
  //因爲事件冒泡的關係會在觸發一次document被submit的事件
  e.preventDefault();
  const inputSec = this.minutes.value * 60;
  setTime(inputSec);
  this.reset();
});
