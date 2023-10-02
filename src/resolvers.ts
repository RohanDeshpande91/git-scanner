import { getRepos } from "./service";
type repoDetails = {
    repoName: string
}
async function gtrep (){
  const data = await getRepos();
  console.log(data);
}
//gtrep();
/*const resolvers = {
    listRepo: async () => await getRepos(),
    repoDetails: async (_: any, { repoName }: repoDetails) => await getRepos(repoName)
}*/

const resolvers = {
  Query: {
    listRepo: async () => await getRepos(),
    repoDetails: async (_: any, { repoName }: repoDetails) => await getRepos(repoName)
  },
};

export { resolvers };