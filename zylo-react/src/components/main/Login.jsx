import { useState } from "react";
import { validator } from "../../lib/validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
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
      axios
        .post(
          /*"https://api.greenlotteon.com/v1/login"*/
          "http://localhost:8082/v1/login",
          formData,
          {
            headers: { "Content-Type": "application/json;utf-8" },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          alert(err);
        });
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
