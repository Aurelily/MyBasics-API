import React, { useEffect, useState } from "react";

const UsersListScreen = ({ appUrl }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(appUrl + "list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Erreur de récupération :", error);
        setError("Impossible de charger les utilisateurs.");
      });
  }, []);

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {Array.isArray(users) && users.length > 0 ? (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>#</th>
              <th>Pseudo</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.pseudo}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun utilisateur trouvé</p>
      )}
    </div>
  );
};

export default UsersListScreen;
