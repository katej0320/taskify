import style from "./LandingMain.style.module.scss";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import AOS from "aos";
import 'aos/dist/aos.css'; 
import { useEffect } from "react";


export default function LandingMain() {
  // useEffect(() => {
  //   AOS.init({
  //     disable: false, 
  //     startEvent: "DOMContentLoaded",
  //     initClassName: "aos-init",
  //     animatedClassName: "aos-animate",
  //     useClassNames: false,
  //     disableMutationObserver: false,
  //     debounceDelay: 50,
  //     throttleDelay: 99,
  //     offset: 120,
  //     delay: 0,
  //     duration: 400,
  //     easing: "ease",
  //     once: false,
  //     mirror: false,
  //     anchorPlacement: "top-bottom",
  //   });
  // }, []);
  
  return (
    <div className={style.container}>
   
       <Section1 />
       <Section2 />
       <Section3 />
    </div>
  );
}
