/**
 * Download partial.
 *
 * @module
 */
import React from "react";
import logo from "/favicon.svg";
import { Link, useLoaderData } from "react-router-dom";
import { GitHub } from "@liga/lib";
import { FaDownload, FaExclamationCircle, FaRocket } from "react-icons/fa";

/**
 * Exports this module.
 *
 * @exports
 */
export default function () {
  const [release] = useLoaderData() as Array<GitHub.ReleaseResponse>;
  const downloadUrl = React.useMemo(
    () => GitHub.Releases.installer(release?.assets || []),
    [release],
  );
  const downloadVersion = React.useMemo(() => release?.name, [release]);

  return (
    <section id="download">
      <header>
        <img src={logo} className="h-32" />
        <h2>Download</h2>
      </header>
      <p>
        The&nbsp;
        <code>world's first esports simulator</code>
        &nbsp;that let's you play your matches&nbsp;
        <code>inside CS:GO</code>.
      </p>
      <article className="grid w-full grid-cols-1 gap-2 sm:w-1/2 sm:grid-cols-2">
        <Link className="btn btn-lg" to="/#how-it-works">
          <FaRocket className="h-8" />
          <span>How does it work?</span>
        </Link>
        <a
          role="button"
          className="btn btn-lg"
          onClick={() => window.open(downloadUrl)}
        >
          <FaDownload className="h-8" />
          {!!downloadVersion ? (
            <span>Download {downloadVersion}</span>
          ) : (
            <span>Loading...</span>
          )}
        </a>
      </article>
      <article className="alert alert-warning sm:w-1/2">
        <FaExclamationCircle className="size-6 shrink-0" />
        <footer className="space-y-4">
          <p>
            The app doesn't have a code-signing certificate yet so you might see
            a warning when downloading or installing the app.
          </p>
          <p>
            To install, click on <code>More Info</code> and&nbsp;
            <code>Install Anyway</code>.
          </p>
        </footer>
      </article>
    </section>
  );
}