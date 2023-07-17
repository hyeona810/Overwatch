// main_slide

const frame = document.querySelector("#main_slide");
const panels = frame.querySelectorAll(".panel li");
const btns = frame.querySelectorAll(".btns li");
const btnPlay = frame.querySelector(".fa-play");
const btnStop = frame.querySelector(".fa-stop");
const bar = frame.querySelector(".slide_bar");
// 유지보수를 위해 len을 변수로 담음
const mainslideLen = panels.length - 1;
// 전역변수에서 사용 될 인덱스
let num = 1;
const interval = 5000;
let timer = null;

// 초기 자동실행
startRoling();

btns.forEach((el, index) => {
  el.addEventListener("click", () => {
    activation(index);
    stopRolling();
  });
});

/*
콜백함수 자리에 함수 이름 자체만 사용되어있음

버튼을 클릭했을 때 함수를 호출해서 동작이 되게 함
*/

btnPlay.addEventListener("click", (e) => {
  if (e.target.classList.contains("on")) {
    return;
  } else {
    startRoling();
  }
});
// play버튼이 활성화 되어있을때는 return으로 클릭을 막고 그렇지 않을 때는 startRolling을 진행함

/* 
cf) 콜백함수 자리에 함수를 호출한 결과 값이 적혀 있는 것 
버튼을 클릭했을 때 함수의 결과 값을 이벤트 리스너에 전달하고 한다는 뜻
따라서 일반적으로 쓰지 않습니다.

// btnPlay.addEventListener("click", startRoling());
*/

btnStop.addEventListener("click", stopRolling);

function startRoling() {
  // 진행바를 보이게 하고
  bar.style.display = "block";
  //   비동기 실행(동시에 실행되게하기)을 위해서, setTiomeout을 사용하되, 0초내로
  setTimeout(progrss, 0);

  //   활성화 함수 호출로 롤링이 시작
  activation(num);

  //   지정한 시간에 맞춰서 rolling함수를 호출해야 합니다
  timer = setInterval(rolling, interval);

  btnPlay.classList.add("on");
  btnStop.classList.remove("on");
}

function stopRolling() {
  // 진행바를 보이지 않게 함
  bar.style.display = "none";

  // setInterval을 클리어하는 코딩
  clearInterval(timer);

  btnPlay.classList.remove("on");
  btnStop.classList.add("on");
}

// 버튼과 패널을 활성화시키는 기능
// index를 받아와야하니까 매개변수에 index 입력
function activation(index) {
  // 모든 panle과 btns의 on을 지우고
  for (let el of panels) {
    el.classList.remove("on");
  }
  for (let el of btns) {
    el.classList.remove("on");
  }

  // 해당순번에 on을 붙임
  panels[index].classList.add("on");
  btns[index].classList.add("on");
  // 인수로 전달받은 순번을 전역 변수로 순번 갱신해줘야한다
  // 왜냐하면 activation함수는 이 곳 뿐 아니라 rolling에서도 호출되며 rolling에서 변경되기 때문에 싱크를 맞춰야 합니다.
  num = index;

  // 패널이 활성화 될 때 진행bar의 너비를 초기화하는 코드
  bar.style.width = "0%";
}

// 롤링을 종합적으로 진행하게 하는 기능
// 자동롤링기능의 핵심
function rolling() {
  if (num < mainslideLen) {
    num++;
  } else {
    num = 0;
  }
  activation(num);
  progrss();
}

// bar로 진행상황을 보여주는 기능
function progrss() {
  // 초기화 시킴(0이아니라 0.0xx 가 나올 수도 있기 때문에)
  const init = parseInt(bar.style.width) || 0;
  const targetValue = 100;
  const unit = "%";
  //   로드되고 함수가 시작하기까지의 시간
  const startTime = performance.now();

  function animate(time) {
    const realTime = time - startTime;
    // prog는 항상 1미만
    const prog = realTime / interval;
    // 시간이 지남에 따라 값이 달라짐
    const currentValue = init + (targetValue - init) * prog;

    bar.style.width = `${currentValue}${unit}`;

    if (prog < 1) {
      requestAnimationFrame(animate);
    } else {
      bar.style.width = "0%";
      if (typeof callback === "function") callback;
    }
  }

  requestAnimationFrame(animate);
}
