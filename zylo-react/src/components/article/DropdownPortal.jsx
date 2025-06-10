import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function DropdownPortal({ children, targetRef }) {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [targetRef]);

  if (!coords) return null;

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: coords.top,
        left: coords.left,
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    document.body
  );
}
