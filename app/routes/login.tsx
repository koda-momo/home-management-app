import type { Route } from "./+types/home";
import { Page } from "../pages/login";
import { title } from "~/utils/const";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `ログイン${title}` },
    { name: "description", content: "ログインページ" },
  ];
}

/**
 * ログインページ.
 */
export default function Login() {
  return (
    <main>
      <Page />
    </main>
  );
}
