import { useState } from "react";
import supabaseClient from "../../lib/supabaseClients";

const SignupPage = () => {
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>("");
    const [successMessage, setsuccessMessage] = useState<string | null>("");
    
    // ? Beim Testen darauf achten, dass nur drei emails pro Stunde versendet werden
const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setsuccessMessage(null);
    
    // es ist nicht möglich selbst definierte Spalten bei supabase im Standard reinzugeben 
    // mehr Info in der Supabase Doku unter Managing User Data!
    const signupResponse = await supabaseClient.auth.signUp({
        email,
        password,
        // Die Option brauche ich, wenn ich Zusatzfelder bei deer Registrierung habe
        // diese müssen unter options.data
        // der Spaltenname in der Tabelle: first_name
        // der Wert aus unserem Formular: firsName, den der User angegeben hat
        options: {
            data: {
                first_name: firstName,
                last_name: lastName
            }
        }
    })
    if(signupResponse.error) {
        setErrorMessage(signupResponse.error.message);
        return;
    }
    if(signupResponse.data.user){
        setsuccessMessage('Signup successful. Please look into your emails.')
    }
};

return ( 
    <div className="signup-container">
        <form onSubmit={handleSignup}>
            <h2>Sign up to our Recipe App</h2>
            <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your Email"
            required />
            <input type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
            placeholder="Enter your first name"
            required />
            <input type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
            placeholder="Enter your last name"
            required />
        </form>
        {errorMessage && }
        <button>Login</button>
        <div className="reset_password">
            <button>Forgot password</button>
        </div>
        </div> );
}
 
export default SignupPage;