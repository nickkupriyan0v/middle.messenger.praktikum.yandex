export const validateName = (name: string): string | undefined => {
  if (/^[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ-]*$/u.test(name)) {
    return undefined;
  }

  return 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
};

export const validateLogin = (login: string): string | undefined => {
  if (/^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/.test(login)) {
    return undefined;
  }
  return 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)';
};

export const validateEmail = (email: string): string | undefined => {
  if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]*[a-zA-Z]\.[a-zA-Z0-9_-]+$/.test(email)) {
    return undefined;
  }

  return 'латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы';
};

export const validatePassword = (password: string): string | undefined => {
  if (/^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(password)) {
    return undefined;
  }

  return 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
};

export const validatePhone = (phone: string): string | undefined => {
  if (/^(?:\+?\d{10,15}|\+\d{9,14})$/.test(phone)) {
    return undefined;
  }

  return 'от 10 до 15 символов, состоит из цифр, может начинается с плюса';
};
