import { gql, useMutation, useQuery } from "@apollo/client";

const DELETE_QUERY = gql`
  mutation delteLaunch($id: String) {
    delteLauch(id: $id) {
      id
    }
  }
`;

const GET_QUERY = gql`
  query getAllSavedLaunces {
    launchs {
      id
      title
    }
  }
`;

const SavedLaunches = () => {
  const [deleteData, deleteReternData] = useMutation(DELETE_QUERY);

  const { loading, error, data } = useQuery(GET_QUERY);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error</h1>;
  }
  let savedData = {};
  if (!error && data) {
    savedData = data;
  }

  if (deleteReternData.loading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (deleteReternData.error) {
    return (
      <div>
        <h3>Error..</h3>
        <p>{deleteReternData.error.message}</p>
      </div>
    );
  }
  return (
    <>
      <div class="container">
        <div class="row">
          <ul class="list-group col-sm-12">
            <h2>List of Saved Launches</h2>
            {savedData.launchs
              ? savedData.launchs.map((savedData) => (
                  <li class="list-group-item" key={savedData.id}>
                    ID:{savedData?.id}, Name:{savedData?.title}
                    <button
                      type="button"
                      class="btn btn-sm btn__delete btn-danger"
                      onClick={() => {
                        deleteData({ variables: { id: savedData.id } });
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SavedLaunches;
