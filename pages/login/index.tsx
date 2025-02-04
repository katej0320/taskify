"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from '../../src/api/api';
import loginlogo from '@/public/icons/loginlogo.png';
import Image from "next/image";
import style from './index.module.scss';

export default function LoginPage(){
    const [values, setValues] = useState({
        email: '',
        password: '',
       
    })

    const router = useRouter();

    //유저가 입력한 값의 상태 저장
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;

        setValues((prevValues) => (
            {...prevValues,
                [name]: value,
            }
        ));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

      

        const { email, password } = values;


        //axios 리퀘스트 보내기
        axios.post(
            "/auth/login", 
            { email, password }, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) => {
            console.log("✅ 로그인인 성공:", response.data);
            alert("로그인인이 완료되었습니다!");
            
        })
        .catch((error) => {
            console.error("❌ 로그인인 실패:", error.response?.data || error.message);
            alert(`로그인인 실패: ${error.response?.data?.message || "서버 오류"}`);
        });

        router.push('/mydashboard');
    }

      function handleClick (){
        router.push('/signup');
      }

    return(
        <div className={style.container}>
          
            <Image src={loginlogo} alt="loginlogo" />
            <p
             className={style.logotext}>오늘도 만나서 반가워요!</p>
          
            <form onSubmit={handleSubmit}>
                <p 
                 className={style.tag}>이메일</p>
                <input 
                 placeholder="이메일을 입력해주세요"
                 className={style.input}
                 name="email" // ✅ name 추가
                 type="email"
                 onChange={handleChange}
                 value={values.email}
                 />
                <p
                 className={style.tag}>비밀번호</p>
                <input 
                 placeholder="비밀번호를 입력해 주세요"
                 className={style.input}
                 name="password" // ✅ name 추가
                 type="password"
                 onChange={handleChange}
                 value={values.password} 
                 />
                <br />
                <button
                 className={style.loginbutton}
                >로그인</button>
                <p
                 className={style.signuptext}
                >회원이 아니신가요? <span className={style.signuptextbutton}onClick={handleClick}>회원가입하기</span></p>
            </form>
        </div>
    )
}