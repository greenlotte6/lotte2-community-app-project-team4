import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function DropdownPortal({ children, targetRef }) {
  const [coords, setCoords] = useState(null);

  const updateCoords = () => {
  if (targetRef?.current) {
    const rect = targetRef.current.getBoundingClientRect();
    console.log("Dropdown 위치 계산 rect:", rect);
    setCoords({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  } else {
    console.log("targetRef.current가 null입니다");
  }
};

  useEffect(() => {
    updateCoords();

    window.addEventListener("scroll", updateCoords);
    window.addEventListener("resize", updateCoords);

    return () => {
      window.removeEventListener("scroll", updateCoords);
      window.removeEventListener("resize", updateCoords);
    };
  }, [targetRef]);

  if (!coords) return null;

  return createPortal(
  <div
    style={{
      position: "absolute",
      top: coords.top,
      left: coords.left,
      zIndex: 9999,
      background: "white",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      borderRadius: "8px",
      pointerEvents: "auto",
    }}
    onClick={(e) => {
      e.stopPropagation();
      console.log("Dropdown clicked");
    }}
  >
    {children}
  </div>,
  document.body
);
}
