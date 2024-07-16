// Components imports
import Input from "../elements/Input";
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RegisterScreen = ({ appUrl }) => {
  // State qui stock les messages d'erreur qu'enverra le backend
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // State qui va contenir le contenu des champs du formulaire
  const [formData, setFormData] = useState({
    pseudo: "",
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

  // Fonction qui envoi les données à la route du backend : register

  const handleSubmit = async (e) => {
    axios
      .post(appUrl + "register", formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /*   const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (response.ok) {
        console.log("Register OK !");
        navigate("/login");
      } else {
        let errorMessage;
        try {
          errorMessage = await response.json();
        } catch (error) {
          errorMessage = {
            message: "Erreur lors de l'analyse de la réponse du serveur",
          };
        }
        setError(errorMessage.message);
      }
    } catch (error) {
      console.error("Error during register:", error);
      setError("Erreur de connexion au serveur");
    }
  }; */

  return (
    <>
      <div className="centered-container">
        <h1>Inscription</h1>
        {error && <p className="error">{error}</p>}
        <Form method="post" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Pseudo"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleInputChange}
          />
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
          <Input
            type="password"
            placeholder="Confirmation mot de passe"
            name="passwordConf"
            value={formData.passwordConf}
            onChange={handleInputChange}
          />
          <button type="submit">S'enregistrer</button>
        </Form>
        <a href="./login">Connectez vous ici si vous avez déjà un compte!</a>
      </div>
    </>
  );
};

export default RegisterScreen;
