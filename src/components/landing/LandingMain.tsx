import style from "./LandingMain.style.module.scss";
import Section1 from "./Section1";
import Section2 from "./Section2";

export default function LandingMain() {
  return (
    <div className={style.container}>
      <Section1 />
      <Section2 />
    </div>
  );
}
