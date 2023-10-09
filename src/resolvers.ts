import { getRepos } from "./service";
type repoDetails = {
    repoName: string
}

const resolvers = {
  Query: {
    listRepo: async () => await getRepos(),
    repoDetails: async (_: any, { repoName }: repoDetails) => await getRepos(repoName)
  },
};

export { resolvers };