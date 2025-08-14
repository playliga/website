/**
 * Header partial.
 *
 * @module
 */
import logo from "/favicon.svg";
import { FaClock, FaHome, FaRocket, FaRss } from "react-icons/fa";
import { useMatch, useNavigate } from "react-router-dom";
import { cx } from "@liga/lib";

/**
 * Exports this module.
 *
 * @exports
 */
export default function () {
  const navigate = useNavigate();

  return (
    <header
      className={cx(
        "dock dock-sm bg-base-200 z-20",
        "md:stack-y md:sticky md:top-0 md:h-screen md:items-start md:justify-normal md:p-0",
        "[&_button]:md:btn [&_button]:md:btn-lg [&_button]:md:btn-block",
        "[&_button]:md:mb-0 [&_button]:md:max-w-none [&_button]:md:basis-auto [&_button]:md:flex-row",
        "[&_span]:hidden [&_span]:md:inline",
      )}
    >
      <img
        src={logo}
        alt="LIGA Esports Manager"
        className="mx-auto my-4 hidden h-auto w-1/2 basis-auto md:block"
      />
      <button
        title="Home"
        className={cx(
          useMatch("/") &&
            "dock-active md:!bg-base-300 md:after:bg-transparent",
        )}
        onClick={() => navigate("/")}
      >
        <FaHome />
        <span>Home</span>
      </button>
      <button
        title="Changelog"
        className={cx(
          useMatch("changelog") &&
            "dock-active md:!bg-base-300 md:after:bg-transparent",
        )}
        onClick={() => navigate("changelog")}
      >
        <FaClock />
        <span>Changelog</span>
      </button>
      <button
        title="Features"
        className={cx(
          useMatch("features") &&
            "dock-active md:!bg-base-300 md:after:bg-transparent",
        )}
        onClick={() => navigate("features")}
      >
        <FaRocket />
        <span>Features</span>
      </button>
      <button
        title="Blog"
        className={cx(
          useMatch("blog") &&
            "dock-active md:!bg-base-300 md:after:bg-transparent",
        )}
        onClick={() => navigate("blog")}
      >
        <FaRss />
        <span>Blog</span>
      </button>
    </header>
  );
}
