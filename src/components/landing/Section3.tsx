import Image from "next/image";
import styles from "./Section3.module.scss";
import AOS from "aos";
import 'aos/dist/aos.css'; 
import { useEffect } from "react";

export default function Section3() {

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
    
    <div className={styles.container} data-aos="fade-up"
     data-aos-duration="1000">
      <h2 className={styles.title}>생산성을 높이는 다양한 설정 ⚡</h2>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/landing3.png"
              width={300}
              height={200}
              alt="대시보드 설정"
            />
          </div>
          <div className={styles.text}>
            <h3>대시보드 설정</h3>
            <p>대시보드 사진과 이름을 변경할 수 있어요.</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/landing4.png"
              width={300}
              height={200}
              alt="초대 기능"
            />
          </div>
          <div className={styles.text}>
            <h3>초대</h3>
            <p>새로운 팀원을 초대할 수 있어요.</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/landing5.png"
              width={300}
              height={200}
              alt="구성원 관리"
            />
          </div>
          <div className={styles.text}>
            <h3>구성원</h3>
            <p>구성원을 초대하고 내보낼 수 있어요.</p>
          </div>
        </div>
      </div>
      </div>

  );
}
