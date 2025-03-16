/**
 * GitHub's GraphQL interface.
 *
 * @module
 */
import { graphql } from "@liga/generated";
import { RepositoryQuery } from "@liga/generated/graphql";
import {
  ApolloClient,
  ApolloProvider,
  createQueryPreloader,
  InMemoryCache,
  QueryRef,
} from "@apollo/client";

/**
 * ApolloProvider wraps the React app and
 * places Apollo Client on the context.
 *
 * @constant
 */
export const Provider = ApolloProvider;

/**
 * ApolloClient instance.
 *
 * @constant
 */
export const client = new ApolloClient({
  uri: `${getRepoInfo().protocol}://api.${getRepoInfo().domain}/graphql`,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

/**
 * Allows queries to be run outside of the React tree
 * for easier integration with React Router loaders.
 *
 * @constant
 */
export const preloadQuery = createQueryPreloader(client);

/** @constant */
export const Query = {
  repository: graphql(`
    query repository(
      $owner: String!
      $name: String!
      $numReleases: Int = 5
      $numDiscussions: Int = 50
    ) {
      repository(owner: $owner, name: $name) {
        releases(first: $numReleases) {
          nodes {
            description
            createdAt
            isLatest
            name
            releaseAssets(first: $numReleases) {
              nodes {
                downloadUrl
                name
                size
              }
            }
          }
        }
        discussions(
          first: $numDiscussions
          categoryId: "DIC_kwDOAWsnks4CkwUt"
        ) {
          nodes {
            author {
              login
            }
            body
            createdAt
            title
          }
        }
      }
    }
  `),
};

/** @interface */
export interface Response {
  repository: QueryRef<RepositoryQuery>;
}

/**
 * Extrapolates useful repository information
 * from the application's git repository url.
 *
 * @function
 */
export function getRepoInfo(): {
  protocol: string;
  domain: string;
  owner: string;
  name: string;
} {
  const repoInfo = import.meta.env.VITE_APPLICATION_REPO_URL.match(
    /(?<protocol>.+):\/\/(?<domain>.+)\/(?<owner>\w+)\/(?<name>.+)\.git/,
  );

  if (!repoInfo || !repoInfo.groups) {
    return {
      protocol: "",
      domain: "",
      owner: "",
      name: "",
    };
  }

  return repoInfo.groups as ReturnType<typeof getRepoInfo>;
}
