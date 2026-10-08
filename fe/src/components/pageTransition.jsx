import { ViewTransition } from "react";

// Wraps each page (not the layout: layouts persist, so enter/exit would never fire there).
// Styles: .page-in / .page-out in app/globals.css.
export default function PageTransition({ children }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
