"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../src/api/api";

export default function RegisterPage() {
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordRepeat: "",
  });

  const router = useRouter();

  //유저가 입력한 값의 상태 저장
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //비밀번호동일한지 확인
    if (values.password !== values.passwordRepeat) {
      alert("비밀번호가 일치하지 않습니다.");
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
      });
  }

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <p>이메일</p>
        <input
          name="email" // ✅ name 추가
          type="email"
          onChange={handleChange}
          value={values.email}
        />
        <p>닉네임</p>
        <input
          name="nickname" // ✅ name 추가
          type="text"
          onChange={handleChange}
          value={values.nickname}
        />
        <p>비밀번호</p>
        <input
          name="password" // ✅ name 추가
          type="password"
          onChange={handleChange}
          value={values.password}
        />
        <p>비밀번호 확인</p>
        <input
          name="passwordRepeat" // ✅ name 추가
          type="password"
          onChange={handleChange}
          value={values.passwordRepeat}
        />
        <br />
        <button>회원가입하기</button>
      </form>
    </div>
  );
}
