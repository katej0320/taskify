"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../src/api/axios";
import loginlogo from "@/public/icons/loginlogo.png";
import Image from "next/image";
import style from "./index.module.scss";
import passwordeye from "@/public/images/passwordeye.png";
import passwordeyeopen from "@/public/images/passwordeyeopen.png";
import CustomModal from "@/src/components/modal/CustomModal";



export default function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();



  // 유저가 입력한 값의 상태 저장
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // 이메일 형식 실시간 검증
    if (name === "email") {
      if (value === "") {
        setErrorMessage(""); // 이메일이 빈 값이면 에러 메시지 초기화
      } else if (!validateEmail(value)) {
        setErrorMessage("이메일 형식으로 입력해주세요");
      } else {
        setErrorMessage("");
      }
    }

    // 비밀번호 길이 검증
    if (name === "password") {
      if (value === "") {
        setPasswordError("");
      } else if  (value.length < 8)
        setPasswordError("비밀번호는 8자 이상이어야 합니다");
      } else {
        setPasswordError("");
      }
    

    //로그인 버튼 비활성화/활성화화
    if (validateEmail(values.email) && values.password.length > 8) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }

  // 이메일 형식 검증 함수
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { email, password } = values;

    // axios 리퀘스트 보내기

    try {
        const response = await axios.post('/auth/login',
             {email, password},
           //이거 확인하기기
             { withCredentials :true});
        console.log("로그인 성공", response.data);
        router.push("/dashboard"); 

        const { token } = response.data;

        sessionStorage.setItem('token', token);

    } catch (error: any){
        console.error("로그인 실패:", error.response?.data || error.message);
        setIsModalOpen(true);
            
    }

  

  }

  function handleSignupClick() {
    router.push("/signup");
  }

  function handleLogoClick() {
    router.push("/mydashboard");
  }

  const passwordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  return (
    <div className={style.container}>
      <Image
        className={style.logo}
        onClick={handleLogoClick}
        src={loginlogo}
        alt="loginlogo"
      />
      <p className={style.logotext}>오늘도 만나서 반가워요!</p>

      <form onSubmit={handleSubmit}>
        <p className={style.tag}>이메일</p>
        <input
          placeholder="이메일을 입력해주세요"
          className={`${style.input} ${errorMessage ? style.inputError : ""}`}
          name="email"
          type="email"
          onChange={handleChange}
          value={values.email}
        />
        {errorMessage && <span className={style.error}>{errorMessage}</span>}

        <p className={style.tag}>비밀번호</p>
        <div className={style.passwordWrapper}>
          <div className={style.passwordinputandtext}>
            <input
              className={`${style.passwordinput} ${
                passwordError ? style.inputError : ""
              }`}
              placeholder="비밀번호를 입력해 주세요"
              name="password"
              onChange={handleChange}
              value={values.password}
              type={isPasswordVisible ? "password" : "text"}
            />
            {passwordError && <span className={style.error}>{passwordError}</span>}
           </div>
          
          <Image
            onClick={passwordVisible}
            className={!isPasswordVisible ? style.passwordeyeopen : style.passwordeye} 
            src={!isPasswordVisible ? passwordeyeopen : passwordeye}
            alt="Toggle Password Visibility"
          />
           
        
       </div>


        
       

     
        {/* 로그인버튼튼 */}
        <button
          className={`${style.loginbutton} ${
            !isButtonDisabled ? style.buttonActivated : ""
          }`}
          disabled={isButtonDisabled}
        >
          로그인
        </button>


        {/* 회원가입페이지로이동버튼튼 */}
        <p className={style.signuptext}>
          회원이 아니신가요?{" "}
          <span className={style.signuptextbutton} onClick={handleSignupClick}>
            회원가입하기
          </span>
        </p>
      </form>

      {/* 모달 컴포넌트 */}
      <CustomModal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
        <p>비밀번호가 일치하지 않습니다.</p>
        <button onClick={() => setIsModalOpen(false)}>확인</button>
      </CustomModal>
    </div>
  );
}
