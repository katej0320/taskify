"use client";
import styles from "./inputfield.module.scss";
import Image from "next/image";

interface inputFieldProps {
    children?: React.ReactNode;
    placeholder: string;
    className?: string;
    height: number;
    src?: string;
    width?: number;
    text: string;

}


export default function InputField({src, text, children, placeholder, className, width, height}: inputFieldProps){

    return(
        <div className={styles.inputcontainer}>
            <p className={styles.label}>{text}</p>
            <input required placeholder={placeholder} className={`${styles.inputfield} ${className}`} style={{ height: `${height}px` }} />
        </div>
    )

}

   