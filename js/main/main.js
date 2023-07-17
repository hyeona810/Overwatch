// 마우스휠 이벤트에 대한 챗gpt의 설명

// var element = document.getElementById("myElement"); // 이벤트를 등록할 요소 선택

// // 이벤트 핸들러 함수 정의
// function handleMouseWheel(event) {
//   var delta = event.wheelDelta || -event.detail; // 크로스 브라우저 호환을 위한 속성 접근

//   /*
// delta는 마우스 휠 이벤트에서 발생한 스크롤량을 나타내는 값입니다. 스크롤 방향에 따라 양수 또는 음수 값을 가질 수 있습니다.

// 예를 들어, delta가 음수인 경우는 마우스 휠을 아래로 스크롤한 경우를 의미하고, 양수인 경우는 마우스 휠을 위로 스크롤한 경우를 의미할 수 있습니다.

// 이를 활용하여 원하는 동작을 구현할 수 있습니다.
// */

//   if (delta < 0) {
//     // 마우스 휠을 아래로 스크롤했을 때 실행할 코드
//     console.log("아래로 스크롤");
//   } else {
//     // 마우스 휠을 위로 스크롤했을 때 실행할 코드
//     console.log("위로 스크롤");
//   }
// }

// // 이벤트 등록
// if (element.addEventListener) {
//   // 대부분의 브라우저에서 지원하는 방법
//   element.addEventListener("mousewheel", handleMouseWheel, false); // 마우스 휠을 위로 또는 아래로 스크롤할 때 handleMouseWheel 함수 호출
//   element.addEventListener("DOMMouseScroll", handleMouseWheel, false); // Firefox에서 지원하는 방법
// } else {
//   // IE 8 및 하위 버전에서 지원하는 방법
//   element.attachEvent("onmousewheel", handleMouseWheel);
// }

// -----------------------------------------------------------

// --------------------------------------------

// // 선생님 코드

// const sections = document.querySelectorAll("section");
// const lis = document.querySelectorAll("ul li");

// const base = -500;
// const ul = document.querySelector("ul"); //6의추가
// const lis_arr = Array.from(lis); //6의 추가

// const h1 = document.querySelector("h1");
// const h2 = document.querySelector("h2");
// //5 posArr 시작
// let posArr = null;

// let enableClick = true; //7리사이즈

// setPos();
// function setPos() {
//   posArr = [];
//   for (let el of sections) {
//     posArr.push(el.offsetTop);
//   }
// }
// //5 posArr이 초기화되도록 하면서 함수로 만든다

// // for (let el of sections) {
// // 	posArr.push(el.offsetTop);
// // }

// //6 브라우저에서 마우스 휠만으로 하나의 섹션이 움직이도록 하는 함수 변수 몇가지를 더 선언
// window.addEventListener(
//   "mousewheel",
//   (e) => {
//     e.preventDefault();
//     //활성화된 버튼의 순서값을 구함
//     let active = ul.querySelector("li.on");
//     let active_index = lis_arr.indexOf(active);

//     if (e.deltaY < 0) {
//       //-100
//       console.log("마우스휠을 올렸습니다");
//       if (active_index == 0) return;
//       moveScroll(active_index - 1);
//     } else {
//       //100
//       console.log("마우스휠을 내렸습니다");

//       if (active_index == 3) return;
//       moveScroll(active_index + 1);
//     }
//   },
//   { passive: false }
// );

// //7 리사이즈, 재이벤트방지는 안해도되지만 굳이하자면
// //브라우저가 리사이즈 되었을 때
// window.addEventListener("resize", () => {
//   setPos();

//   /*
// 	리사이즈되었을 때 활성화된 섹션과 버튼이 매칭이 안되고 있다
// 	li.on이 버튼을 찾아서 순서값을 구하기
// 	문서 scrollY값을 posArr[활성화된순번]
// 	*/

//   const active = ul.querySelector("li.on");
//   const active_index = lis_arr.indexOf(active);

//   window.scroll(0, posArr[active_index]);
// });

// lis.forEach((li, index) => {
//   li.addEventListener("click", (e) => {
//     if (enableClick) {
//       moveScroll(index);
//     }
//   });
// });

// //3 밑의 활성화 함수를 지우고 이 안의 코드를 활성화 함수로 만든다

// function activation() {
//   let scroll = window.scrollY || window.pageYOffset;
//   sections.forEach((el, index) => {
//     if (scroll >= posArr[index] + base) {
//       for (let el of lis) {
//         el.classList.remove("on");
//       }
//       lis[index].classList.add("on");

//       for (let el of sections) {
//         el.classList.remove("on");
//       }
//       sections[index].classList.add("on");
//     }
//   });
// }

// window.addEventListener("scroll", () => {
//   //4 활성화 함수로 만든 자리에 함수호출을 해서 스크롤시 이동하도록 한다
//   let scroll = window.scrollY || window.pageYOffset;
//   activation();
//   // h2.style.left = `${scroll - posArr[2]}px`;
//   // h1.style.transform = `translateX(${scroll - posArr[2] + 200}px)`;
//   // let scroll = window.scrollY || window.pageYOffset;
//   // sections.forEach((el, index) => {
//   // 	if (scroll >= posArr[index] + base) {

//   // 		for (let el of lis) {
//   // 			el.classList.remove('on');
//   // 		}
//   // 		lis[index].classList.add('on');

//   // 		for (let el of sections) {
//   // 			el.classList.remove('on');
//   // 		}
//   // 		sections[index].classList.add('on');
//   // 	}
//   // });
// });
// //1 이동하는 함수만들기
// //반복문 안의 anime를 이용한 코드를 빼서 함수로 만든다
// //이때 posArr에 index가 필요하므로 매개변수에는 index가 들어간다
// function moveScroll(index) {
//   window.scrollTo({ left: 0, top: posArr[index], behavior: "smooth" });
// }

// --------------------------------------------------------

// 챗gpt 코드

const sections = document.querySelectorAll("main>section");
console.log(sections);
let currentSectionIndex = 0;
let isScrolling = false;

// 섹션으로 스크롤 이동하는 함수
function scrollToSection(index) {
  // 이미 스크롤 중이면 함수 종료
  if (isScrolling) return;

  // 스크롤 중 상태로 변경
  isScrolling = true;

  // 이동할 섹션의 위치 계산
  const position = sections[index].offsetTop;

  // 부드러운 스크롤 이동
  window.scrollTo({
    top: position,
    behavior: "smooth",
  });

  // 스크롤 후 800ms 동안 추가 스크롤 막기 위해 isScrolling 상태 변경
  setTimeout(() => {
    isScrolling = false;
  }, 800);
}

// 스크롤 이벤트 처리
window.addEventListener("scroll", () => {
  // 현재 스크롤 위치
  const scrollPosition = window.scrollY;
  // console.log(scrollPosition);

  // 각 섹션의 위치와 크기 확인하여 현재 활성화된 섹션 결정
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    // 섹션의 중앙 위치 기준으로 스크롤 위치가 해당 섹션 내에 있는지 확인
    if (
      scrollPosition >= sectionTop - sectionHeight * 0.5 &&
      scrollPosition < sectionTop + sectionHeight * 0.5
    ) {
      for (let el of sections) {
        el.classList.remove("on");
      }

      sections[i].classList.add("on");

      // 현재 활성화된 섹션 인덱스 업데이트
      currentSectionIndex = i;

      break;
    }
  }
});

// 마우스 휠 이벤트 처리
window.addEventListener(
  "mousewheel",
  function (event) {
    event.preventDefault();

    // 마우스 휠 동작에 따라 섹션 인덱스 업데이트
    const delta = event.wheelDelta || -event.detail;

    if (delta < 0 && currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
    } else if (delta > 0 && currentSectionIndex > 0) {
      currentSectionIndex--;
    }

    // 스크롤 이동
    scrollToSection(currentSectionIndex);
  },
  { passive: false }
);

// league

let league = document.getElementById("league");
let leagueArticle = league.querySelectorAll(
  ".league_left_wrap, .league_right_wrap"
);
let leagueArrow = league.querySelector(".league_open_arrow");

leagueArrow.addEventListener("click", (e) => {
  e.preventDefault();

  for (let el of leagueArticle) {
    el.classList.remove("on");
  }

  leagueArticle[1].classList.add("on");
});

let btnClose = league.querySelector(".league_close_arrow");

btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  for (let el of leagueArticle) {
    el.classList.remove("on");
  }

  leagueArticle[0].classList.add("on");
});

// league - youtube api

// let key = "AIzaSyBHKOWYXR_gOZHv9LIAc-ZjeKQJcmFtQkA";
// let playlistId = "PL8UrqCBQmLzmkWezspZt2AoNC41-vJSiu";
// // let num = 4

// let league_video = document.querySelector(".league_video ul");
// const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${list}
// `;

// fetch(url)
//   .then((data) => {
//     // console.log(data);
//     return data.json();
//   })
//   .then((json) => {
//     // console.log(json);
//     let items = json.items;
//     console.log(items);

//     // a += c
//     // a = a + c

//     let result = "";

//     items.map((el) => {
//       result += `
//                 <li>
//                     <a href="${el.snippet.resourceId.videoId}">
//                     <img src="${el.snippet.thumbnails.medium.url}">
//                     <h1>${el.snippet.title}</h1>
//                 </li>
//             `;
//     });
//     league_video.innerHTML = result;
//   });

// league_video.addEventListener("click", (e) => {
//   e.preventDefault();

//   let vidId = e.target
//     .closest("article")
//     .querySelector("a")
//     .getAttribute("href");
//   // currentTarget을 쓰면 안됩니다.
//   // main에 이벤트위임으로 안의 article들에 클릭이벤트가 부여되도록 하기때문에
//   // currentTarget은 main입니다. tartget은 클릭한 그 대상을 말합니다.
//   let pop = document.createElement("figure");
//   pop.innerHTML = `
//         <iframe src = "https://www.youtube.com/embed/${vidId}">
//         `;

//   league_video.append(pop);
// });

let league_video = document.querySelector(".league_video ul");

let key = "AIzaSyBHKOWYXR_gOZHv9LIAc-ZjeKQJcmFtQkA";
// api 주소

let playlistId = "PL8UrqCBQmLzkzUY2PNWC26g_31YamChe7";
// playlist 주소

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}`;
// api > 참조 > playlist > list > get 부분 복사
// +
// ?part=snippet&key=${key}&playlistId=${playlistId}

fetch(url)
  .then((data) => {
    console.log(data);
    return data.json();
  })
  .then((json) => {
    // console.log(json);
    let items = json.items;
    // console.log(items);
    let result = "";

    items.map((el) => {
      let title = el.snippet.title;
      // 특정 글자수를 넘어가면 "..." 으로 표현되게 하는 코드
      // if (title.length > 30) {
      //   title = title.substr(0, 30) + "...";
      // }

      // let des = el.snippet.description;
      // if (des.length > 100) {
      //   des = des.substr(0, 100) + "...";
      // }

      // let date = el.snippet.publishedAt;
      // // 날짜만 필요하고 T부터의 값은 필요하지 않기때문에 잘라내는 코드
      // date = date.split("T")[0];
      // // split은 (구분한문자)를 기준으로 분할해서 배열로 반환합니다.
      // // 반환된 배열에서 [2020.05.01, 953501041]

      result += `
            <li>
                <a href="${el.snippet.resourceId.videoId}" class="pic">
                    <img src="${el.snippet.thumbnails.medium.url}">
                </a>
            </li>
            
            `;
    });
    league_video.innerHTML = result;
  });

// a 태그인 섬네일을 클릭하면 비디오가 팝업돼서 보이게 함
league_video.addEventListener("click", (e) => {
  // 리얼돔에 작성된 vidList에 이벤트 위임을 걸어서
  // 동적으로 생성된 요소들에게도 이벤트가 전달 될 수 있도록
  e.preventDefault();

  // 이벤트 위임의 단점인 이벤트 범위가 커져서 부작용이 발생하는데 해결방안으로
  // 이벤트 발생의 목표가 아니라면 return으로 방지하도록 함

  if (!e.target.closest("a")) return;

  const vidId = e.target.closest("li").querySelector("a").getAttribute("href");

  console.log(vidId);

  let pop = document.createElement("figure");
  pop.classList.add("pop");

  pop.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
            <span class="btnClose">close</span>    
        `;
  league_video.append(pop);
});

// 팝업창의 close를 누르면 닫히게 함
// 이벤트 위임을 통해서 닫기를 구현
// 이유는 닫기 버튼은 미래시에 있는 버튼이기 때문에 이벤트 위임으로만 해결할 수 있습니다.

league_video.addEventListener("click", (e) => {
  const pop = league_video.querySelector(".pop");
  // pop이 존재하면 if문 안으로 들어가고
  // pop이 존재하지 않으면 무시되어 적용되지 않음
  if (pop) {
    const close = pop.querySelector("span");
    //  위의 이벤트와 이 이벤트가 충돌되는 상황
    //  위에서는 pop를 만들고 이 이벤트는
    //  pop을 지우는 이벤트이므로 충돌
    if (e.target == close) pop.remove();
  }
});
// ranking

// // gnb

// // 자바스크립트 - sub 전체가 내려오게 하는 코드

// let gnb = document.querySelector("#gnb");
// let gnbBg = document.querySelector(".BGgnb");

// gnb.addEventListener("mouseenter", (e) => {
//   // mouseenter 이벤트가 발생한 a태그(mainmenu)에서 gnb를 찾은 뒤
//   // gnb에서 .sub 4개를 모두 찾아줍니다
//   let sub = e.currentTarget.closest("ul").querySelectorAll(".sub");
//   // closest => 가장 가까운.. closest("ul") => gnb
//   // sub 전체를 내려오게 할려면 부모인 ul(gnb)을 찾아야함

//   // sub를 반복을 돌면서
//   for (let el of sub) {
//     slideDown(el);
//   }

//   gnbBg.slideDown(el);
//   gnbBg.style.display = "block";
// });

// function slideDown(el) {
//   // 각각의 .sub를 보이게 하면 됩니다.
//   let isBlock = window.getComputedStyle(el).getPropertyValue("display");
//   // console.log(isBlock); // => none;
//   /*
//     getComputedStyle : 자바스크립트의 메서드로 특정 요소의 계산된 스타일을 가져옵니다
//     1. 이미 스타일 시트에 작성 된 값을 가져오기
//     2. 동적 스타일을 계산해서 가져오기
//     3. 만약 스타일이 없는 경우 상속된 스타일을 가져오기

//     getPropertyValue : getComputedStyle과 같이 사용해서 속성 값을 가지고 오는데 사용합니다
//     ()안에 어떤 속성을 가져올지를 적습니다
//     */

//   el.style.height = "0";
//   // 기준점

//   if (isBlock == "none") {
//     el.style.display = "block";
//     let subHeight = el.scrollHeight;

//     // height 값이 200px 이라고 하면 scrollHeight를 사용해서 0~200px 로 스크롤다운 되는 것처럼 보이게 함
//     // 동적인 height 값을 계산해줌
//     el.style.height = subHeight + "px";
//   }

//   /*
//     scrollHeight : 요소의 컨텐츠가 실제로 차지하는 높이를 나타냅니다.
//     이 속성은 요소의 높이를 동적으로 조정할 수 있습니다.
//     */
// }

// gnb.addEventListener("mouseleave", (e) => {
//   let sub = e.currentTarget.closest("ul").querySelectorAll(".sub");

//   for (let el of sub) {
//     slideUp(el);
//   }
// });

// function slideUp(el) {
//   let isBlock = window.getComputedStyle(el).getPropertyValue("display");
//   el.style.height = "0";

//   if ((isBlock = "block")) {
//     el.style.height = "0";
//     el.addEventListener("transitionend", function end() {
//       // transitionend : transition이 끝나고 나면
//       // end 라는 함수를 실행(함수 이름을 만든 이유는 또 쓸거라서)
//       el.removeEventListener("transitionend", end);
//       /* removeEventListener가 지우는 이벤트는??
//                 처음에는 mouseleave 이벤트를 지움
//                 두번째는 transitioned 이벤트를 지움
//             */
//       el.style.display = "none";
//     });
//   }
// }

// ranking

let rankingBox = document.querySelector("#ranking");
let rankingPositon = rankingBox.querySelectorAll(".ranking_box>div");
let rankingTab = rankingBox.querySelectorAll(".ranking_tab");
let rankingPrevBtn = document.querySelector(".fa-solid.fa-angle-left");
let rankingNextBtn = document.querySelector(".fa-solid.fa-angle-right");
let len = rankingPositon.length;
let currentIndex = 0;

for (let i = 0; i < len; i++) {
  rankingTab[i].addEventListener("click", (e) => {
    e.preventDefault();

    for (let el of rankingTab) {
      el.classList.remove("on");
    }

    for (let el of rankingPositon) {
      el.classList.remove("on");
    }

    rankingTab[i].classList.add("on");
    rankingPositon[i].classList.add("on");
    currentIndex = i;
  });
}

// rankingNextBtn.addEventListener("click", (e) => {
//   e.preventDefault();

//   for (let el of rankingTab) {
//     el.classList.remove("on");
//   }

//   for (let el of rankingPositon) {
//     el.classList.remove("on");
//   }

//   rankingTab[i].classList.add("on");
//   rankingPositon[i].classList.add("on");
// });

rankingNextBtn.addEventListener("click", () => {
  if (currentIndex < len - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  for (let el of rankingTab) {
    el.classList.remove("on");
  }

  for (let el of rankingPositon) {
    el.classList.remove("on");
  }

  rankingTab[currentIndex].classList.add("on");
  rankingPositon[currentIndex].classList.add("on");
});

rankingPrevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = len - 1;
  }

  for (let el of rankingTab) {
    el.classList.remove("on");
  }

  for (let el of rankingPositon) {
    el.classList.remove("on");
  }

  rankingTab[currentIndex].classList.add("on");
  rankingPositon[currentIndex].classList.add("on");
});

// hero

const heroTab = document.querySelectorAll(".hero_tab>ul>li");
const heroDes = document.querySelectorAll(".hero_description>ul>li");

heroTab.forEach((el, index) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();

    for (let el of heroTab) {
      el.classList.remove("on");
    }

    for (let el of heroDes) {
      el.classList.remove("on");
    }

    heroTab[index].classList.add("on");
    heroDes[index].classList.add("on");
  });
});
