export const email = (input) => {
  const regex = /^[0-9a-zA-Z](?!.*?[\-\_\.]{2})[a-zA-Z0-9\-\_\.]{3,63}@[0-9a-zA-Z](?!.*?[\-\_\.]{2})[a-zA-Z0-9\-\_\.]{3,63}\.[a-zA-Z]{2,3}$/;
  
  if(!input) {
    return '이메일은 필수입니다.';
  }

  if(!regex.test(input)) {
    return '이메일 양식이 올바르지 않습니다.'
  }

  return '';
}

export const password = (input) => {
  const regex = /^[a-zA-Z0-9!@#$]{6,20}$/;
  
  if(!input) {
    return '비밀번호는 필수입니다.';
  }

  if(!regex.test(input)) {
    return '비밀번호 양식이 올바르지 않습니다.[(]영어대소문자, 숫자, 특수기호(!, @, #, $) 허용]'
  }

  return '';
}
