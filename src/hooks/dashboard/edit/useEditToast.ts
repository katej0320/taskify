import { useEffect, useState } from "react";

export function useEditToast() {
  const [isToast, setIsToast] = useState(false);

  useEffect(() => {
    if (isToast) {
      setTimeout(() => {
        setIsToast(false);
      }, 3000);
    }
  }, [isToast]);

  return { isToast, setIsToast };
}
