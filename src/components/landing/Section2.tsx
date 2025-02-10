import Image from "next/image";
import React from "react";
import styles from "./Section2.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


export default function Section2() {
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
    <>
      <section className={styles.container}>
        <div className={styles.feature}
          data-aos="fade-right"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000"
        >
          
            <div className={styles.text}>
              <div className={styles.point1}>
                <div>
                 <h2>Point 1</h2>
                </div>
                <p>
                  일의 우선순위를 <br /> 관리하세요
                </p>
              </div>
            </div>
            <Image
              src="/images/landing1.png"
              width={594}
              height={497.5}
              alt="landing1.png"
              className={styles.img1}
            />
          </div>

        <div className={styles.feature}
          data-aos="fade-left"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000"
        >
          <Image
            src="/images/landing2.png"
            width={436}
            height={502}
            alt="landing2.png"
            className={styles.img2}
          />
          <div className={styles.text}>
            <div className={styles.point2}>
              <h2>Point 2</h2>
              <p>
                해야 할 일을 <br />
                등록하세요
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
