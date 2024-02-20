// Components imports
import Input from "../elements/Input"
import { Form, Link } from "react-router-dom";

const LoginScreen = ()=>{

    return (
      
        <div className="centered-container">
            <h1>Login Screen</h1>
            <Form method="post">    
                <Input type="email" placeholder="Email" name="email" />
                <Input type="password" placeholder="Password" name="password" />
                <button type="submit">Login</button>
            </Form>
            <a href="./register">Please register here if you don't have account!</a>
        </div>
       
      );
    
}

export default LoginScreen