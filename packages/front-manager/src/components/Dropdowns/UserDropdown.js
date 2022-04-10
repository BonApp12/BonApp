import React from "react";
import {createPopper} from "@popperjs/core";

const UserDropdown = () => {
  // Props du dropdown (pour le popper)
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <span
          className="text-blueGray-500 block cursor-pointer"
          ref={btnDropdownRef}
          onClick={() => {
            dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
          }}
      >
        <div className="items-center flex">
          <span
              className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
                alt="..."
                className="w-full rounded-full align-middle border-none shadow-lg"
                src="https://www.svgrepo.com/show/111216/user.svg"
            />
          </span>
        </div>
      </span>
      <div
          ref={popoverDropdownRef}
          className={
              (dropdownPopoverShow ? "block " : "hidden ") +
              "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
          }
      >
        <span
            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer">
          Action
        </span>
        <span
            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer">
          Another action
        </span>
        <span
            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer">
          Something else here
        </span>
        <div className="h-0 my-2 border border-solid border-blueGray-100"/>
        <span
            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer">
          Separated link
        </span>
      </div>
    </>
  );
};

export default UserDropdown;
