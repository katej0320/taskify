import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomButton from "../button/CustomButton";
import styles from "./Section1.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Section1() {
  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 0,
      duration: 400,
      easing: "ease",
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div className={styles.container}>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <Image
          src="/images/landing_hero.png"
          width={722}
          height={422}
          alt="landing_hero.png"
          priority
          className={styles.img}
        />
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <div className={styles.title}>
          <span>새로운 일정 관리 </span> 
          <div className={styles.taskifymotion}>  
            <TypeAnimation
              sequence={["Taskify", 1000, "", 1000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className={styles.taskify}
            />
          </div>
        </div>
        <CustomButton width={280} height={54} className={styles.button}>
          <Link className={styles.link} href="/login">
            로그인하기
          </Link>
        </CustomButton>
      </div>
    </div>
  );
}
