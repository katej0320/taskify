import style from "./LandingMain.style.module.scss";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

export default function LandingMain() {
  return (
    <div className={style.container}>
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
}
