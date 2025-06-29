import { useState } from "react";
import { validator } from "../../lib/validator";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    userId: "",
    email: "",
    password: "",
    passwordConfirm: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setuserInfo((prev) => ({
      ...prev,
      [name]: value,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isIdValid = validator.isValidId(userInfo.userId);
    const isValidEmail = validator.isValidEmail(userInfo.email);
    const isPasswordValid = validator.confirmPasswords(
      userInfo.password,
      userInfo.passwordConfirm
    );
    const agreed = userInfo.agreed;

    const errors = {
      userId: !isIdValid,
      email: !isValidEmail,
      password: !isPasswordValid,
      agreed: !agreed,
    };

    const invalidFields = Object.entries(errors)
      .filter(([, isError]) => isError)
      .map(([field]) => field);

    if (invalidFields.length === 0) {
      // 모든 유효성 검사 통과
      axios
        .post(
          "https://api.greenlotteon.com/v1/signup",
          /*"http://localhost:8082/v1/signup"*/ userInfo,
          {
            headers: { "Content-Type": "application/json;utf-8" },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            alert("회원가입이 성공적으로 완료되었습니다");
            navigate("/login");
          }
        })
        .catch((err) => {
          alert(err);
        });
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
            name="userId"
            onChange={handleChange}
            placeholder="아이디"
          />
          <input
            className="sign-up-input"
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="실명"
          />
          <input
            className="sign-up-input"
            type="text"
            name="dept"
            onChange={handleChange}
            placeholder="부서명"
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
              <Link to="/term?id=1">이용약관</Link> 및&nbsp;
              <Link to="/term?id=2">개인정보처리방침</Link>에 동의합니다
            </span>
          </div>
          <button
            className={
              userInfo.agreed ? "register-btn" : "register-btn disabled"
            }
            disabled={!userInfo.agreed}
          >
            회원가입
          </button>
        </form>
      </div>
    </>
  );
};
