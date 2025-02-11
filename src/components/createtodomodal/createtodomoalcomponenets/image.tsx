"use client";
// import addimgbutton from "../../../public/images/addimgbutton.png";
import Image from "next/image";

export default function InputImage() {
  return (
    <div>
      <p>이미지</p>
      <Image src={"/images/addimgbutton.png"} alt="adddimgbutton" width={76} height={76} />
    </div>
  );
}
