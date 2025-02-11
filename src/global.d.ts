declare module 'aos' {
    export interface AOSOptions {
        disable?: boolean | "phone" | "tablet" | "mobile" | (() => boolean);
        startEvent?: string;
        initClassName?: string;
        animatedClassName?: string;
        useClassNames?: boolean;
        disableMutationObserver?: boolean;
        debounceDelay?: number;
        throttleDelay?: number;
        offset?: number;
        delay?: number;
        duration?: number;
        easing?: string;
        once?: boolean;
        mirror?: boolean;
        anchorPlacement?: "top-bottom" | "top-center" | "top-top" | "center-bottom" | "center-center" | "center-top" | "bottom-bottom" | "bottom-center" | "bottom-top";
      }
    }
  
    export default class AOS {
        static init(options?: AOSOptions): void;
        static refresh(): void;
      }
