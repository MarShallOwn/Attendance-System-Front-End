const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USERNAME = /r'^[\w.@+-]+\Z'/
const PHONE_NUMBER = /^01[0125]\d{1,8}$/
export const regex = {
    EMAIL,
    USERNAME,
    PHONE_NUMBER
  };