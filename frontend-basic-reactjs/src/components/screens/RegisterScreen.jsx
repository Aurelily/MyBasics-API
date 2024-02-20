// Components imports
import Input from "../elements/Input"
import { Form } from "react-router-dom";

const RegisterScreen = ()=>{

    return (
        <>
            <div className="centered-container">
                <h1>Register Screen</h1>
                <Form method="post">
                    <Input type="pseudo" placeholder="Pseudo" name="pseudo" />
                    <Input type="email" placeholder="Email" name="email" />
                    <Input type="password" placeholder="Password" name="password" />
                    <button type="submit">Register</button>
                </Form>
                <a href="./login">Please login here if you have account!</a>
            </div>
        </>
      );
    
}

export default RegisterScreen