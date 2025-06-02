class Validator {
  isValidPassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return passwordRegex.test(password) && password !== "";
  }

  isValidId(id) {
    const idRegex = /^[a-zA-Z][a-zA-Z0-9]{5,15}$/;
    return idRegex.test(id) && id !== "";
  }

  isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email !== "";
  }

  confirmPasswords(password, passwordConfirm) {
    const isPasswordValid = this.isValidPassword(password);
    const isPasswordConfirmValid = this.isValidPassword(passwordConfirm);
    const isBothValid = isPasswordValid && isPasswordConfirmValid;
    return isBothValid && password === passwordConfirm;
  }

  isEmpty(value) {
    return value === "";
  }
}

export const validator = new Validator();
