import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../elements/Input";

const RegisterScreen = ({ appUrl }) => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    pseudo: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(appUrl + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'inscription");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Utilisateur enregistré :", data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setError("Échec de l'inscription. Veuillez réessayer.");
      });
  };

  return (
    <div className="centered-container">
      <h1>Inscription</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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
      </form>
      <a href="./login">Connectez-vous ici si vous avez déjà un compte !</a>
    </div>
  );
};

export default RegisterScreen;
