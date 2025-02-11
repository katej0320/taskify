"use client";
import styles from "./inputfield.module.scss";

interface inputFieldProps {
    children?: React.ReactNode;
    placeholder: string;
    className?: string;
    height: number;

}


export default function InputField({children, placeholder, className, height}: inputFieldProps){

    return(
        <div className={styles.inputcontainer}>
            <p>{children}</p>
            <input required placeholder={placeholder} className={`${styles.inputfield} ${className}`} style={{ height: `${height}px` }} />
            
        </div>
    )

}

   