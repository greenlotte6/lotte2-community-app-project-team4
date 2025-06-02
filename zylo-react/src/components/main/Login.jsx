import { useState } from "react";
import { validator } from "../../lib/validator";
export const Login = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isIdValid = validator.isEmpty(formData.id);
    const isPasswordValid = validator.isEmpty(formData.password);

    const errors = {
      id: isIdValid,
      password: isPasswordValid,
    };

    const invalidFields = Object.entries(errors)
      .filter(([, isError]) => isError)
      .map(([field]) => field);

    if (invalidFields.length === 0) {
      // 모든 유효성 검사 통과
      alert(
        "[성공] TODO: Axios로 요청 보내기 & Server side validation error 핸들링"
      );
    } else {
      alert(`빈 문자열 입니다: ${invalidFields.join(", ")}`);
    }
  };

  return (
    <div id="sign-up-container">
      <form id="login-box" onSubmit={handleSubmit}>
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
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="비밀번호"
        />
        <button className="register-btn">로그인</button>
      </form>
    </div>
  );
};
