/**
 * Home route.
 *
 * @module
 */
import React from "react";
import { useReadQuery } from "@apollo/client";
import { Link, useLoaderData } from "react-router-dom";
import { Api, Util, cx } from "@liga/lib";
import { FaDownload, FaPlayCircle, FaWindows } from "react-icons/fa";

/**
 * The route data loader.
 *
 * @function
 */
function loader() {
  const variables = Api.getRepoInfo();
  return Api.preloadQuery(Api.Query.repository, { variables });
}

/**
 * The home route component.
 *
 * @function
 */
function Component() {
  const [playing, setPlaying] = React.useState(false);
  const { data } = useReadQuery(useLoaderData() as Api.Response["repository"]);
  const [release] = React.useMemo(
    () => data.repository?.releases.nodes || [],
    [data],
  );
  const asset = React.useMemo(
    () =>
      release?.releaseAssets.nodes?.find(
        (item) => item?.downloadUrl.indexOf("exe") >= 0,
      ),
    [release],
  );
  const version = React.useMemo(() => release?.name, [release]);
  const repoInfo = React.useMemo(() => Api.getRepoInfo(), []);

  function toggleVideo(event: React.MouseEvent<HTMLVideoElement, MouseEvent>) {
    setPlaying(!playing);
    if (event.currentTarget.paused) {
      event.currentTarget.play();
    } else {
      event.currentTarget.pause();
    }
  }

  return (
    <main className="prose max-w-none">
      <section>
        <h1>LIGA Esports Manager</h1>
        <article className="flex flex-col items-center justify-center gap-2 md:flex-row [&_img]:my-0">
          <a
            href={`https://discord.gg/${import.meta.env.VITE_DISCORD_INVITE_CODE}`}
            target="_blank"
          >
            <img
              alt="Discord"
              src="https://img.shields.io/discord/1296858234853789826?style=for-the-badge&label=Discord&logo=discord&logoColor=white"
            />
          </a>
          <a
            href={`https://${repoInfo.domain}/${repoInfo.owner}`}
            target="_blank"
          >
            <img
              alt="GitHub"
              src="https://img.shields.io/badge/view_on-github-black?style=for-the-badge&logo=github"
            />
          </a>
          <a
            href={`https://${repoInfo.domain}/${repoInfo.owner}/${repoInfo.name}/milestones`}
            target="_blank"
          >
            <img
              alt="Roadmap"
              src="https://img.shields.io/badge/view_the-roadmap-blue?style=for-the-badge&logo=rocket&logoColor=white"
            />
          </a>
        </article>
        <p>
          The world's first Esports simulator for Counter-Strike where you can
          play your matches in-game or simulate them, you choose!
        </p>
      </section>
      <section className="flex justify-center shadow-md shadow-black/50">
        <video muted loop playsInline onClick={toggleVideo} className="my-0!">
          <source src="/demo.mp4#t=0.1" type="video/mp4" />
        </video>
        <button
          className={cx(
            "center pointer-events-none absolute z-10 size-12 self-center",
            "rounded-full text-white opacity-90 backdrop-blur-md backdrop-filter",
            playing && "!hidden",
          )}
        >
          <FaPlayCircle className="size-12" />
        </button>
      </section>
      {!!version && !!asset && (
        <section>
          <h2>
            <Link id="download" to="#download">
              Download
            </Link>
          </h2>
          <button
            className="btn btn-lg btn-block"
            onClick={() => window.open(asset.downloadUrl)}
          >
            <FaDownload className="h-8" />
            <span>{version}</span>
          </button>
          <p className="space-x-4 md:text-center">
            <FaWindows className="inline-block" />
            <em>{asset.name}</em>
            <code>{Util.formatBytes(asset.size)}</code>
          </p>
        </section>
      )}
      <section>
        <h2>
          <Link id="install" to="#install">
            Install Instructions
          </Link>
        </h2>
        <p>
          The app doesn't have a code-signing certificate yet, so you'll see a
          warning when downloading or installing the app.
        </p>
        <p>
          To install, click on <code>More Info</code> and&nbsp;
          <code>Install Anyway</code>.
        </p>
      </section>
      <section>
        <h2>
          <Link id="features" to="#features">
            Features
          </Link>
        </h2>
        <ul>
          <li>
            <strong>All major versions of Counter-Strike are supported.</strong>
          </li>
          <li>
            The app launches Counter-Strike and connects you to a local server.
          </li>
          <li>
            Then it adds the teams and players to the server as bots with their
            customized names and stats, according to how they exist within the
            app.
          </li>
          <li>
            You can train your team to gain an edge over your opponents. The app
            will automatically adjust the bot difficulty to reflect these stat
            changes.
          </li>
          <li>
            Finally, once in-game, you type <code>.ready</code> in chat and the
            match will start. Once there is a winner, the app will record your
            results.
          </li>
          <li>
            As you win matches you can rise through the divisions in your league
            (open, intermediate, main, advanced, invite).
          </li>
          <li>
            Minors and Major competitions supported. But you'll have to qualify
            for these, of course!
          </li>
        </ul>
      </section>
    </main>
  );
}

/**
 * Exports this module.
 *
 * @exports
 */
export default { Component, loader };
