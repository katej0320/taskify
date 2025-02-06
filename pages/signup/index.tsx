"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../src/api/axios";
import passwordeye from "@/public/images/passwordeye.png";
import passwordeyeopen from "@/public/images/passwordeyeopen.png";
import loginlogo from "@/public/icons/loginlogo.png";
import Image from "next/image";
import style from "./index.module.scss";
import CustomModal from "@/src/components/modal/CustomModal";

export default function RegisterPage() {
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordRepeat: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isPasswordRepeatVisible, setIsPasswordRepeatVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const router = useRouter();

  //유저가 입력한 값의 상태 저장
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    setErrorMessage("");
    setPasswordError("");
    setPasswordRepeatError("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //비밀번호동일한지 확인
    if (values.password !== values.passwordRepeat) {
      setPasswordRepeatError('비밀번호가 동일하지 않습니다다');
    }

    const { email, nickname, password } = values;

    console.log(
      "🚀 회원가입 요청 데이터:",
      JSON.stringify({ email, nickname, password })
    );

    //axios 리퀘스트 보내기
    axios
      .post(
        "/users", // 📌 Swagger 문서에서 올바른 엔드포인트 확인 필요!
        { email, nickname, password }, // ✅ Swagger에 맞게 수정
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("✅ 회원가입 성공:", response.data);
        alert("회원가입이 완료되었습니다!");
      })
      .catch((error) => {
        console.error(
          "❌ 회원가입 실패:",
          error.response?.data || error.message
        );
        alert(`회원가입 실패: ${error.response?.data?.message || "서버 오류"}`);
        setIsModalOpen(true);
      });
  }
  //로고누르면 마이대쉬보드로 이동동
  function handleLogoClick() {
    router.push("/mydashboard");
  }
  //비밀번호 눈알
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  //비밀번호 확인 눈알
  const togglePasswordRepeatVisibility = () => {
    setIsPasswordRepeatVisible(!isPasswordRepeatVisible);
  };

  return (
    <div className={style.container}>
       <Image
        className={style.logo}
        onClick={handleLogoClick}
        src={loginlogo}
        alt="loginlogo"
      />
      <p className={style.logotext}>첫 방문을 환영합니다!</p>


      <form onSubmit={handleSubmit}>
        <p className={style.tag}>이메일</p>
        <input
          placeholder="이메일을 입력해 주세요"
          className={`${style.input} ${errorMessage ? style.inputError : ""}`}
          name="email" // ✅ name 추가
          type="email"
          onChange={handleChange}
          value={values.email}
        />
         {errorMessage && <span className={style.error}>{errorMessage}</span>}
        <p className={style.tag}>닉네임</p>
        <input
          placeholder="닉네임을 입력해 주세요"
          name="nickname" // ✅ name 추가
          type="text"
          onChange={handleChange}
          value={values.nickname}
          className={style.input}
        />

        {/* 비밀번호 */}
        <p className={style.tag}>비밀번호</p>
        <div className={style.passwordWrapper}>
          <input
            className={`${style.passwordinput} ${
            passwordError ? style.inputError : ""
          }`}
          placeholder="비밀번호를 입력해 주세요"
            name="password" // ✅ name 추가
            onChange={handleChange}
            value={values.password}
            type={isPasswordVisible ? "password" : "text"}
          />
          <span className={style.eyeIcon1} onClick={togglePasswordVisibility}>
              <Image
                className={isPasswordVisible ? style.passwordeye : style.passwordeyeopen} 
                src={isPasswordVisible ? passwordeye : passwordeyeopen}
                alt="Toggle Password Visibility"
                
              />
          </span>

          
          {/* 비밀번호 확인 */}
          <p className={style.tag}>비밀번호 확인</p>
          <input
            name="passwordRepeat" // ✅ name 추가
            type={isPasswordRepeatVisible ? "password" : "text"}
            onChange={handleChange}
            value={values.passwordRepeat}
            className={`${style.passwordinput} ${
              passwordRepeatError ? style.inputRepeatError : ""
            }`}
            placeholder="비밀번호를 한번 더 입력해주세요"
          />
          {errorMessage && <span className={style.error}>{errorMessage}</span>}
          <span className={style.eyeIcon2} onClick={togglePasswordRepeatVisibility}>
              <Image
                className={isPasswordRepeatVisible ? style.passwordeye : style.passwordeyeopen} 
                src={isPasswordRepeatVisible ? passwordeye : passwordeyeopen}
                alt="Toggle Password Visibility"
                
              />
          </span>
        </div>
          {passwordRepeatError && <span className={style.error}>{passwordError}</span>}
        <p>이용약관에 동의합니다.</p>
        <br />
        <button>회원가입하기</button>
      </form>

      {/* 모달 컴포넌트 */}
      <CustomModal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
        <p>비밀번호가 일치하지 않습니다.</p>
        <button onClick={() => setIsModalOpen(false)}>확인</button>
      </CustomModal>
    </div>
  );
}
