import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript")
  
    // rules: {
    //   "@typescript-eslint/no-unused-vars": "off",         // 미사용 변수 경고 끄기
    //   "@typescript-eslint/no-explicit-any": "off",        // any 사용 허용
    //   "react-hooks/exhaustive-deps": "off",               // useEffect 의존성 경고 무시
    //   "react/jsx-key": "off",                             // JSX key 관련 경고 끄기
    //   "no-console": "off",                                // console.log 허용
    //   "react/react-in-jsx-scope": "off",                  // React import 필요 없음
    //   "@next/next/no-img-element": "off"                  // <img> 태그 사용 경고 끄기 (Next.js)
    
  
];

export default eslintConfig;
