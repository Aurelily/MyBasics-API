// Components imports
import Input from "../elements/Input"
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterScreen = ()=>{

    const navigate = useNavigate();

    // State qui va contenir le contenu des champs du formulaire
    const [formData, setFormData] = useState({
        pseudo: "",
        email: "",
        password: "",
    })

    // Fonction qui va set les données au moment où elles sont tapées dans les champs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    // Fonction qui envoi les données à la route du backend : http://localhost:5000/users/register

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("http://localhost:5000/users/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {

            console.log("Register OK !");
            navigate("/login");
          } else {

            console.error("register failed");
          }
        } catch (error) {
          console.error("Error during register:", error);
        }
      };

    return (
        <>
            <div className="centered-container">
                <h1>Register Screen</h1>
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
                        placeholder="Password"
                        name="password" 
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Register</button>
                </Form>
                <a href="./login">Please login here if you have account!</a>
            </div>
        </>
      );
    
}

export default RegisterScreen