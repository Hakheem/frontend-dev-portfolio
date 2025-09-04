import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Turn off or downgrade strict rules that crash your app
      "@next/next/no-img-element": "warn", // Image optimization warnings instead of errors
      "@typescript-eslint/no-unused-vars": "warn", // Unused variables as warnings
      "react-hooks/exhaustive-deps": "warn", // Hook dependency warnings
      "react/no-unescaped-entities": "warn", // Unescaped entities as warnings
      "@typescript-eslint/no-explicit-any": "warn", // Allow 'any' type with warning
      "prefer-const": "warn", // Let vs const preferences as warnings
      "@typescript-eslint/no-non-null-assertion": "warn", // Non-null assertions as warnings
      
      // Turn off rules that are too strict for development
      "import/no-unresolved": "off", // Don't crash on missing imports during development
      "@typescript-eslint/ban-ts-comment": "off", // Allow @ts-ignore comments
      "react/display-name": "off", // Don't require display names for components
      
      // Keep important errors that you want to catch
      "react/jsx-key": "error", // Missing keys in lists
      "@typescript-eslint/no-undef": "error", 
      "no-undef": "error", 
      "no-console": "warn", 
    },
  },
];

export default eslintConfig;
