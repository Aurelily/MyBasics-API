// Components imports
import Input from "../elements/Input";
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LoginScreen = ({ appUrl }) => {
  // State qui stock les messages d'erreur qu'enverra le backend
  const [error, setError] = useState("");

  // Le hook useNavigate servira aux redirections de pages
  const navigate = useNavigate();

  // State qui va contenir le contenu des champs du formulaire
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Fonction qui va set les données au moment où elles sont tapées dans les champs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fonction qui envoi les données à la route du backend : login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(appUrl + "login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);
      if (response.status === 200) {
        const user = await response.data; // Récupérer l'objet utilisateur du corps de la réponse
        console.log("Login OK! User:", user);

        // Stocker l'objet utilisateur dans sessionStorage : les données dans sessionStorage sont limitées à la durée de vie de la session de navigation
        sessionStorage.setItem("userData", JSON.stringify(user));

        navigate("/"); // Redirection vers la page d'accueil
      }
    } catch (error) {
      setError("Email ou mot de passe incorrect");
      console.error("Erreur lors de la soumission du formulaire:", error);
    }
  };

  return (
    <div className="centered-container">
      <h1>Connexion</h1>
      {error && <p className="error">{error}</p>}
      <Form method="post" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Se connecter</button>
      </Form>
      <a href="./register">
        Créez un compte ici si vous n'en avez pas encore !
      </a>
    </div>
  );
};

export default LoginScreen;
