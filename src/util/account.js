// users must be at least 18
export const getMinBirthdate = () => (new Date((new Date()).getFullYear()-18, (new Date()).getMonth(), (new Date()).getDate()));

// password requirements to check
export const passwordReqts = [
  {
    msg: "Must contain 8 characters",
    fulfilled: (password) => (password.length >= 8),
  },
  {
    msg: "Must contain an uppercase letter",
    fulfilled: (password) => (/[A-Z]/.test(password)),
  },
  {
    msg: "Must contain a lowercase letter",
    fulfilled: (password) => (/[a-z]/.test(password)),
  },
  {
    msg: "Must contain a number",
    fulfilled: (password) => (/\d/.test(password)),
  },
  {
    msg: "Must contain a special character",
    fulfilled: (password) => (/[\^\$\*\.\[\]\{\}\(\)\?\-"!@#\%\&\/\\,><':;\|_~`\+=)]/.test(password)),
  },
];