"use client";

import { useState } from "react";
import { useEffect } from "react";
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
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isPasswordRepeatVisible, setIsPasswordRepeatVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };



  useEffect(() => {
    const isValid =
      validateEmail(values.email) &&
      values.nickname.trim() !== "" &&
      values.nickname.length <= 10 &&
      values.password.length >= 8 &&
      values.password === values.passwordRepeat
      isChecked;
  
    setIsButtonDisabled(!isValid);
  }, [values, isChecked]); // values가 변경될 때마다 실행
  

  //유저가 입력한 값의 상태 저장
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    setErrorMessage("");
    setPasswordError("");
    setPasswordRepeatError("");
    setNicknameError("");

    // 이메일 형식 실시간 검증
    if (name === "email") {
      if (value === "") {
        setErrorMessage(""); // 이메일이 빈 값이면 에러 메시지 초기화
      } else if (!validateEmail(value)) {
        setErrorMessage("이메일 형식으로 입력해주세요");
      } else {
        setErrorMessage("");
      }
    }; 


    //닉네임 형식 검증
    if(name === "nickname"){
      {if( value === "")
      setNicknameError("");
     } if (value.length > 10){
      setNicknameError("열 자 이하로 작성해주세요");
      } else {
      setNicknameError("");
      }
    }
    

 

     // 비밀번호 길이 검증
     if (name === "password"){
      if (value === "") {
        setPasswordError("");
      } if (value.length < 8){
        setPasswordError("비밀번호는 8자 이상이어야 합니다");
      } else {
        setPasswordError("");
      }
    }

      //비밀번호동일한지 확인
      if (name === "passwordRepeat"){
        if(value===""){
          setPasswordRepeatError("");
        } if (values.password !== value) {
          setPasswordRepeatError('비밀번호가 동일하지 않습니다');
        } else {
          setPasswordRepeatError("");
        }}

    //회원가입 버튼 활성화/ 비활성화


    

  }
    // 이메일 형식 검증 함수
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

   

    const { email, nickname, password } = values;

    console.log(
      "🚀 회원가입 요청 데이터:",
      JSON.stringify({ email, nickname, password })
    );

    //axios 리퀘스트 보내기
    try {
      const response = await axios.post('/users',
        { email, nickname, password });
        console.log("로그인 성공", response.data);
        router.push("/login");
        
        
    } catch(error:any){
      console.error("회원가입실패:", error.response?.data || error.message);

    }

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

      {/* 이메일일 */}
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

         {/* 닉네임 */}
        <p className={style.tag}>닉네임</p>
        <input
          placeholder="닉네임을 입력해 주세요"
          name="nickname" // ✅ name 추가
          type="text"
          onChange={handleChange}
          value={values.nickname}
          className={`${style.input} ${nicknameError ? style.inputError : ""}`}
        />
          {nicknameError && <span className={style.error}>{nicknameError}</span>}
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
           {passwordError && <span className={style.error}>{passwordError}</span>}
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
          {passwordRepeatError && <span className={style.error}>{passwordRepeatError}</span>}
          <span className={style.eyeIcon2} onClick={togglePasswordRepeatVisibility}>
              <Image
                className={isPasswordRepeatVisible ? style.passwordeye : style.passwordeyeopen} 
                src={isPasswordRepeatVisible ? passwordeye : passwordeyeopen}
                alt="Toggle Password Visibility"
                
              />
          </span>
        </div>
          {passwordRepeatError && <span className={style.error}>{passwordError}</span>}
        <label className={style.agreementlabel}>
          <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={style.customcheckbox}
          />
          <p>이용약관에 동의합니다.</p>
        </label>
        
        {/* 회원가입 버튼 */}
        <button 
        className={`${style.registerbutton} ${
          !isButtonDisabled ? style.buttonActivated : ""
        }`}
        disabled={isButtonDisabled}>회원가입하기</button>
      </form>

      {/* 모달 컴포넌트 */}
      <CustomModal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
        <p>비밀번호가 일치하지 않습니다.</p>
        <button onClick={() => setIsModalOpen(false)}>확인</button>
      </CustomModal>
    </div>
  );
}
