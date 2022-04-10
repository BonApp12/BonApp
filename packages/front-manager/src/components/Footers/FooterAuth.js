import React from "react";

export default function FooterAuth({absolute}) {
  return (
      <>
        <footer
            className={
                (absolute
                    ? "absolute w-full bottom-0 bg-orange-300"
                    : "relative") + " pb-6"
            }
        >
          <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-white" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-white font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()} {" "}
                <a
                  href="https://www.creative-tim.com?ref=nr-footer-small"
                  className="text-white hover:text-blueGray-600 text-sm font-semibold py-1"
                >
                  BonApp
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href="/"
                    className="text-white hover:text-blueGray-600 text-sm font-semibold block py-1 px-3"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
