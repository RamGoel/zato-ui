import { codeToHtml } from "shiki";

export async function highlight(code: string, lang: string = "tsx") {
  return codeToHtml(code, {
    lang,
    theme: "vitesse-dark",
  });
}
