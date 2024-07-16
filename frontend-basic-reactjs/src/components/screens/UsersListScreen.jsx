import { useEffect, useState } from "react";

const UsersListScreen = ({ appUrl }) => {
  // State qui stock la liste des users
  const [users, setUsers] = useState(undefined);

  async function fetchAllUsers() {
    try {
      const response = await fetch(`${appUrl}users`, {
        method: "GET",
      });

      // Si la réponse n'est pas OK, lancer une erreur
      if (!response.ok) {
        throw new Error(
          `Erreur lors de la récupération des users : ${response.statusText}`
        );
      }

      // Extraire les données de la réponse JSON
      const result = await response.json();
      return result;
    } catch (err) {
      // Gérer les erreurs éventuelles
      console.error("Erreur lors de la récupération des utilisateurs:", err);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  }

  useEffect(() => {
    async function fetchAll() {
      let result = await fetchAllUsers();
      setUsers(result);
      console.log("we are in ");
    }

    // Appel initial pour récupérer les utilisateurs
    fetchAll();
  }, []); // Tableau de dépendances vide pour s'exécuter une seule fois

  return (
    <>
      <h2>Liste des pseudos des utilisateurs</h2>
      <ul>
        {users != undefined &&
          users.map((element, index) => {
            return <li key={index}>{element.pseudo}</li>;
          })}
      </ul>
    </>
  );
};

export default UsersListScreen;
