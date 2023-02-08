import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextWrapper";
import styled from "styled-components";
import LOCAL_STORAGE_JWT_TOKEN_KEY from "../../constants";
import Input from "../../components/Input";
import Button from "../../components/Button";

const MainContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`

const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    width: 30vw;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135,0.37);
    backdrop-filter: blur(8.5px);
    border-radius: 10px;
`;

const EventsOrganizerText = styled.h1`
    margin: 3rem 0 2rem 0;
`;

const StyledForm = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 20%;
    width: 100%;
    /* justify-content: space-around; */
`;

const ErrorStyled = styled.div`
    color: red;
    font-weight: bold;
    letter-spacing: 5px;
    text-align: center;
`;


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res) => {
            if (res.status === 401) {
                throw new Error ('Incorrect email or password');
            }
            
            if (!res.ok) {
                throw new Error ('Something went wrong');
            }
            
            return res.json();
        })
        .then((data) => {
            const { id, email, token } = data;
            localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
            setUser({ id, email });
            setIsLoading(false);
            setError('');
            navigate('/')
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    }

    return (
        <MainContainer>
            <LoginContainer>
                <EventsOrganizerText>Events Organizer</EventsOrganizerText>
                    <StyledForm onSubmit={handleLogin} disabled={isLoading} >
                        <Input 
                            placeholder="Email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <Input 
                            placeholder="Password"
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {error && <ErrorStyled>{error}</ErrorStyled>}
                        <Button>Login</Button>
                        <Link to="/register">Register</Link>
                    </StyledForm>
            </LoginContainer>
        </MainContainer>
    )
}