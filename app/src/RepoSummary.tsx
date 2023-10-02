import { useQuery, gql } from "@apollo/client";

type PropType = {
  repoName: string;
};

type RepoDetailsInterface = {
  name: string;
  private: boolean;
  fileCount: number;
  owner: string[];
  size: number;
  isWebhook: boolean;
  ymlContent: string;
};

const DETAILS_QUERY = gql`
  query RepoDetails($repoName: String!) {
    repoDetails(repoName: $repoName) {
      name
      private
      fileCount
      owner
      size
      isWebhook
      ymlContent
    }
  }
`;

const RepoSummary: React.FC<PropType> = ({ repoName }): JSX.Element => {
  const { loading, error, data } = useQuery<{
    repoDetails: RepoDetailsInterface;
  }>(DETAILS_QUERY, {
    variables: { repoName },
  });

  if (loading) return <center>loading...</center>;
  if (error) return <center className="error"> Error! {error.message}</center>;

  return (
    <div>
      <h2>{data?.repoDetails.name}</h2>
      <table className="repoList">
        <tr>
          <td>Size : </td>
          <td>{data?.repoDetails.size ? (data?.repoDetails.size / (1024*1024)).toFixed(2): 0} MB</td>
        </tr>
        <tr>
          <td>Owner: </td>
          <td>{data?.repoDetails.owner?.join(",")}</td>
        </tr>
        <tr>
          <td>Private\public: </td>
          <td>{data?.repoDetails.private ? "private" : "public"} </td>
        </tr>
        <tr>
          {" "}
          <td>Number of files : </td>{" "}
          <td>{data?.repoDetails.fileCount} </td>
        </tr>{" "}
        <tr>
          {" "}
          <td>Active webhooks: </td>{" "}
          <td>{data?.repoDetails.isWebhook ? "yes" : "No"} </td>
        </tr>
        <tr>
          <td>Content of 1 yml file : </td>{" "}
          <td>
            <pre>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.repoDetails.ymlContent || "",
                }}
              />{" "}
            </pre>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default RepoSummary;
