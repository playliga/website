/**
 * Header partial.
 *
 * @module
 */
import React from "react";
import cx from "classnames";
import logo from "/favicon.svg";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

/** @constant */
const navItems: Array<{ title: string; url: string }> = [
  { title: "Download", url: "/#download" },
  { title: "How it Works", url: "/#how-it-works" },
  { title: "Features", url: "/#features" },
  { title: "Release Notes", url: "/#changelog" },
];

/** @function */
function handleOnScroll() {
  const header = document.querySelector("#root > header") as HTMLElement;
  const page = document.documentElement;
  const difference = page.clientHeight - page.scrollTop - header.offsetHeight;
  header.classList.toggle("fixed-header", difference < 0);
}

/**
 * Exports this module.
 *
 * @exports
 */
export default function () {
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("scroll", handleOnScroll);
    return () => window.removeEventListener("scroll", handleOnScroll);
  }, []);

  return (
    <React.Fragment>
      {/** NAVIGATION OVERLAY */}
      <dialog className={cx("modal", modalOpen && "modal-open")}>
        <button
          className="btn btn-square btn-ghost absolute right-8 top-4 z-10"
          onClick={() => setModalOpen(false)}
        >
          <FaTimes className="text-2xl" />
        </button>
        <section className="fixed inset-0 grid grid-rows-2 place-items-center gap-4 bg-base-100">
          <header className="flex justify-center">
            <img src={logo} className="h-32" />
          </header>
          <nav>
            <ul>
              {navItems.map(({ title, url }) => (
                <li key={title + "__modal"}>
                  <Link
                    className="block py-4 text-center text-2xl"
                    to={url}
                    onClick={() => setModalOpen(false)}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </dialog>

      {/** NAVIGATION BAR */}
      <header className="absolute bottom-0 z-20 flex w-full items-center justify-between border-b border-transparent px-8 py-4 text-white">
        <a className="flex items-center gap-3" href="#">
          <img
            src={logo}
            className="-ml-20 h-10 scale-0 transition-all duration-500"
          />
        </a>
        <nav className="hidden items-center gap-6 sm:flex">
          <ul className="flex items-center gap-6">
            {navItems.map(({ title, url }) => (
              <li key={title + "__navbar"}>
                <Link className="text-sm" to={url}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="btn btn-square btn-ghost sm:hidden"
          onClick={() => setModalOpen(!modalOpen)}
        >
          <FaBars className="text-2xl" />
        </button>
      </header>
    </React.Fragment>
  );
}