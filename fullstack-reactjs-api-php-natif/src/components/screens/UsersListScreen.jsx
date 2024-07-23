import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersListScreen = ({ appUrl }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(appUrl + "allUsers")
      .then((response) => {
        //console.log("API Response:", response.data);
        //console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Erreur lors de la récupération des données");
      });
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {error && <p>{error}</p>}
      <ul>
        {Array.isArray(users) ? (
          users.map((user) => <li key={user.id}>{user.pseudo}</li>)
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
};

export default UsersListScreen;
