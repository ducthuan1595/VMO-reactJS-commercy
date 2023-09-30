import React from "react";

export default function Modal({ setOpen }) {
  const closed = () => {
    setOpen(false);
  };
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-[#000] opacity-75 z-20 cursor-pointer"
      onClick={closed}
    ></div>
  );
}
