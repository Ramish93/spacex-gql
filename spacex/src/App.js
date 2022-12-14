import React, { useState, useEffect, Fragment } from "react";
import { gql } from "@apollo/client";

import { apolloClient, apolloClientSave } from "./func_graph";
import Card from "./components/Card";
import Modal from "./components/Modal";
import SavedLaunches from "./components/SavedLaunches";
import "./App.css";

function App() {
  const [rockets, setRockets] = useState([]);
  const [savedData, setSavedData] = useState([]);

  // query for Gql
  const fetchQuery = async () => {
    const { data } = await apolloClient.query({
      query: gql`
        query getLaunches {
          launchesPast(limit: 10) {
            launch_date_local
            launch_site {
              site_name
            }
            ships {
              name
              image
            }
            id
            mission_name
            rocket {
              rocket_name
              rocket_type
              rocket {
                active
                mass {
                  kg
                }
                height {
                  feet
                }
              }
            }
          }
        }
      `,
    });
    setRockets(data.launchesPast);
  };

  const getAllSavedLaunces = async () => {
    const { data } = await apolloClientSave.query({
      query: gql`
        query getAllSavedLaunces {
          launchs {
            id
            title
          }
        }
      `,
    });
    setSavedData(data);
  };

  useEffect(() => {
    fetchQuery();
    getAllSavedLaunces();
  }, []);

  return (
    <div className="container">
      <h1 className="Main--header__class">SpaceX Encyclopedia</h1>
      <div className="row">
        {rockets.map((rocket) => (
          <Fragment key={rocket.id}>
            <Card rocket={rocket} />
            <Modal rocket={rocket} />
          </Fragment>
        ))}
        <SavedLaunches savedDataArr={savedData} />
      </div>
    </div>
  );
}

export default App;
