import { useState } from "react";
import { validator } from "../../lib/validator";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
    passwordConfirm: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isIdValid = validator.isValidId(formData.id);
    const isValidEmail = validator.isValidEmail(formData.email);
    const isPasswordValid = validator.confirmPasswords(
      formData.password,
      formData.passwordConfirm
    );
    const agreed = formData.agreed;

    const errors = {
      id: !isIdValid,
      email: !isValidEmail,
      password: !isPasswordValid,
      agreed: !agreed,
    };

    const invalidFields = Object.entries(errors)
      .filter(([, isError]) => isError)
      .map(([field]) => field);

    if (invalidFields.length === 0) {
      // 모든 유효성 검사 통과
      alert("[성공] TODO: Axios로 요청 보내기");
    } else {
      alert(
        `유효하지 않은 데이터 또는 빈 문자열이 포함되어 있습니다: ${invalidFields.join(
          ", "
        )}`
      );
    }
  };

  return (
    <>
      <div id="sign-up-container">
        <form id="sign-up-box" method="post" onSubmit={handleSubmit}>
          <h3 className="logo">zylo</h3>
          <input
            className="sign-up-input"
            type="text"
            name="id"
            onChange={handleChange}
            placeholder="아이디"
          />
          <input
            className="sign-up-input"
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="이메일"
          />
          <input
            className="sign-up-input"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="비밀번호"
          />
          <input
            className="sign-up-input"
            type="password"
            name="passwordConfirm"
            onChange={handleChange}
            placeholder="비밀번호 확인"
          />
          <div className="checkbox-area">
            <input type="checkbox" name="agreed" onChange={handleChange} />
            <span>
              <a href="/term">이용약관</a> 및{" "}
              <a href="/term">개인정보처리방침</a>에 동의합니다
            </span>
          </div>
          <button
            className={
              formData.agreed ? "register-btn" : "register-btn disabled"
            }
            disabled={!formData.agreed}
          >
            회원가입
          </button>
        </form>
      </div>
    </>
  );
};
