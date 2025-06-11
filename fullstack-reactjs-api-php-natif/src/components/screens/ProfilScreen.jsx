// Components imports
import Input from "../elements/Input";
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfilScreen = ({ appUrl }) => {
  const [error, setError] = useState(null);

  const userDataString = sessionStorage.getItem("userData");
  const userData = JSON.parse(userDataString);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pseudo: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.pseudo ||
      !formData.email ||
      !formData.password ||
      !formData.passwordConf
    ) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (formData.password !== formData.passwordConf) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch(`${appUrl}update&id=${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }

      const data = await response.json();
      console.log("Réponse du serveur :", data);

      sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Erreur réseau :", error);
      setError("Une erreur réseau est survenue.");
    }
  };

  return (
    <div className="centered-container">
      <h1>Votre profil</h1>
      {error && <p className="error">{error}</p>}
      <Form method="post" onSubmit={handleSubmit}>
        <p>Pseudo actuel : {userData.pseudo}</p>
        <Input
          type="text"
          placeholder="Pseudo"
          name="pseudo"
          value={formData.pseudo}
          onChange={handleInputChange}
        />
        <p>Email actuel : {userData.email}</p>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <p>Entrez un mot de passe et sa confirmation :</p>
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
        <button type="submit">Mettre à jour</button>
      </Form>
    </div>
  );
};

export default ProfilScreen;
