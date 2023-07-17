const form = document.querySelector("#join");
let btnSubmit = document.querySelector("input[type=submit]");
let pwd = document.querySelector("#pwd1");

btnSubmit.addEventListener("click", (e) => {
  if (!userid("userid")) e.preventDefault();
  if (!isPwd("pwd1", "pwd2", 5)) e.preventDefault();
});

function userid(el) {
  let input = form.querySelector(`[name=${el}]`);
  let txt = input.value;

  if (/@/.test(txt)) {
    const isErrMsg = input.closest("td").querySelectorAll("p");
    if (isErrMsg.length > 0) input.closest("td").querySelector("p").remove();
    return true;
  } else {
    const isErrMsg = input.closest("td").querySelectorAll("p");
    if (isErrMsg.length > 0) return false;

    const errMsg = document.createElement("p");
    errMsg.append("@를 포함한 전체 이메일 주소를 입력하세요");
    input.closest("td").append(errMsg);
    return false;
  }
}

function isPwd(el1, el2, len) {
  let pwd1 = form.querySelector(`[name=${el1}]`);
  let pwd2 = form.querySelector(`[name=${el2}]`);
  let pwd1_val = pwd1.value;
  let pwd2_val = pwd2.value;
  const num = /[0-9]/;
  const eng = /[a-zA-Z]/;
  const spc = /[~!@#$%^&*()_+?><]/;

  if (
    pwd1_val === pwd2_val &&
    pwd1_val.length >= len &&
    num.test(pwd1_val) &&
    eng.test(pwd1_val) &&
    spc.test(pwd1_val)
  ) {
    const isErrMsg = pwd1.closest("td").querySelectorAll("p");
    if (isErrMsg.length > 0) pwd1.closest("td").querySelector("p").remove();
    return true;
  } else {
    const isErrMsg = pwd1.closest("td").querySelectorAll("p");
    if (isErrMsg.length > 0) return false;

    const errMsg = document.createElement("p");
    errMsg.append(
      `비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 포함하여 동일하게 입력하세요`
    );
    pwd1.closest("td").append(errMsg);
    return false;
  }
}

function isPwd(el1, el2, len) {
  let pwd1 = form.querySelector(`[name=${el1}]`);
  let pwd2 = form.querySelector(`[name=${el2}]`);
  let pwd1_val = pwd1.value;
  let pwd2_val = pwd2.value;
  const num = /[0-9]/;
  const eng = /[a-zA-Z]/;
  const spc = /[~!@#$%^&*()_+?><]/;
  const errMsgWrap = pwd1.closest("td");

  function removeErrMsg() {
    const errMsg = errMsgWrap.querySelector("p");
    if (errMsg) {
      errMsg.remove();
    }
  }

  function addErrMsg(msg) {
    const errMsg = document.createElement("p");
    errMsg.textContent = msg;
    errMsgWrap.append(errMsg);
  }

  if (
    pwd1_val === pwd2_val &&
    pwd1_val.length >= len &&
    num.test(pwd1_val) &&
    eng.test(pwd1_val) &&
    spc.test(pwd1_val)
  ) {
    removeErrMsg();
    return true;
  } else {
    removeErrMsg();

    let err = "비밀번호는 ";
    if (pwd1_val.length < len) {
      err += `${len}글자 이상,`;
    }
    if (!num.test(pwd1_val)) {
      err += "숫자를 포함, ";
    }

    if (!eng.test(pwd1_val)) {
      err += "영문을 포함, ";
    }

    if (!spc.test(pwd1_val)) {
      err += "특수문자를 포함, ";
    }

    err += "동일하게 입력하세요";
    addErrMsg(err);

    return false;
  }
}
