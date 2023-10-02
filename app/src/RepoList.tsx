import React from "react";
import Table from "react-bootstrap/Table";
import { useQuery, gql } from "@apollo/client";

type PropType = {
  setRepoName(name: string): void;
};

type RepoDetailsType = {
  name: string;
  private: boolean;
  fileCount: number;
  owner: string[];
  size: number;
  isWebhook: string[];
  ymlContent: string;
};

const GET_REPO_DETAILS = gql`
  query listRepo {
    listRepo {
      name
      size
      owner
    }
  }
`;

const RepoList: React.FC<PropType> = ({ setRepoName }): JSX.Element => {
  const { loading, error, data } = useQuery<{
    listRepo: RepoDetailsType[];
  }>(GET_REPO_DETAILS);

  if (loading) return <center>loading...</center>;
  if (error) return <center className="error"> Error! {error.message}</center>;
  return (
    <div>
      <h2>List of repository</h2>
      <div className="list" nonce="">
        <table className="repoList">
          <thead>
            <th>Name</th>
            <th>Owner</th>
            <th>Size (in KB)</th>
            <th></th>
          </thead>
          <tbody>
        {data?.listRepo.map((d, i) => (
          <tr>
          <td>{d?.name}</td>
          <td>{d?.owner?.join(",")}</td>
          <td>{(d?.size / (1024)).toFixed(2) }</td>
          <td><button onClick={() => setRepoName(d?.name)}>View</button></td>
          </tr>
        ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepoList;
