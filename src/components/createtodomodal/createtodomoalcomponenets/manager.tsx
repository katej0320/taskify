"use client";
import InputField from "./inputfield";
import Image from "next/image";
import styles from "./manager.module.scss";
import { useState } from "react";



export default function InputManager(){

  const [isDropdown, setIsToggleDropdown]=useState(false);

  const toggleDropdown = () => {
    setIsToggleDropdown((prev)=>!prev);
  }




return(
  <div className={styles.container}>
    <InputField
      text={'담당자'}
      placeholder={"이름을 입력해 주세요"}
      height={48}
      className={styles.input}
    >
    {/* <Image onClick={toggleDropdown} className={styles.img} src="/icons/todomodalmanagertoggle.png" alt="togglebutton" width={8} height={4}/> */}
    </InputField>
     
     {/* 드롭다운 리스트 */}
     {isDropdown && (
        <ul className={styles.dropdown}>
          <li>담당자 1</li>
          <li>담당자 2</li>
          <li>담당자 3</li>
        </ul>
      )}
</div>

)
}
