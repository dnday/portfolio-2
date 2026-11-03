"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "../content";

// One CV preview for the whole site (mounted in app/layout.js). Anything can open it by
// dispatching "cv:open"; CvLink does that and stays a plain link to the PDF without JavaScript.
export const openCv = () => dispatchEvent(new Event("cv:open"));

export function CvLink({ className, style, children }) {
  return (
    <a
      href={profile.cv}
      className={className}
      style={style}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey) return; // let new-tab clicks through
        event.preventDefault();
        openCv();
      }}
    >
      {children}
    </a>
  );
}

export default function CvDialog() {
  const dialog = useRef(null);
  // The PDF only loads once someone opens the preview.
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const open = () => {
      setOpened(true);
      dialog.current?.showModal();
    };
    addEventListener("cv:open", open);
    return () => removeEventListener("cv:open", open);
  }, []);

  return (
    <dialog
      ref={dialog}
      className="cv-dialog"
      aria-label="CV preview"
      onClick={(event) =>
        event.target === dialog.current && dialog.current.close()
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <p className="font-serif text-2xl italic">Curriculum vitae</p>
        <div className="flex gap-2">
          <a href={profile.cv} download className="btn-primary">
            Download PDF
          </a>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => dialog.current.close()}
          >
            Close
          </button>
        </div>
      </div>
      {/* Phones often can't show a PDF inline; the links above still work there */}
      {opened && (
        <iframe
          src={`${profile.cv}#view=FitH`}
          title="CV of Marcelinus Dinoglide Yoga Prakoso"
          className="cv-frame"
        />
      )}
    </dialog>
  );
}
