import Image from "next/image";
import React from "react";
import styles from "./Section2.module.scss";

export default function Section2() {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.feature}>
          <div className={styles.text}>
            <h2>Point 1</h2>
            <p>
              일의 우선순위를 <br /> 관리하세요
            </p>
          </div>
          <Image
            src="/images/landing1.png"
            width={594}
            height={497.5}
            alt="landing1.png"
          />
        </div>

        <div className={styles.feature}>
          <Image
            src="/images/landing2.png"
            width={436}
            height={502}
            alt="landing2.png"
          />
          <div className={styles.text}>
            <h2>Point 2</h2>
            <p>
              해야 할 일을 <br />
              등록하세요
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
