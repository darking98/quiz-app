import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import GameSettings from './GameSettings'
const Home = () => {

    const [name, setName] = useState('');
    const [flag, setFlag] = useState(false);
    const [warning, setWarning] = useState('')

    const handleSubmit = (e) =>{    
        e.preventDefault();
        if(name !== ''){
            setFlag(true)
            setWarning('')
        }else{
            setWarning('Please, put your username above.')
        }
    }

    return (
        <Container>
                {
                    !flag ? 
                    <div>
                        <LoginContainer
                    onSubmit={handleSubmit}                      
                >
                 <LoginHeader>
                    <h1>Login</h1>
                </LoginHeader>
                <LoginUsername>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Enter your username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </LoginUsername>
                <WarningContainer>
                    <span>{warning}</span>
                </WarningContainer>
                <LoginButton 
                    type="submit"

                >
                    Log In
                </LoginButton>
            </LoginContainer>
                    </div>
                :
                <GameSettings
                    name = {name}
                    setFlag ={setFlag}
                />
                }
                
        </Container>
    )
}

const Container = styled.div`
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;    
    background-color: var(--lightest-black);
    @media (max-width:600px){
        display:block;
        padding:20px;
    }
`

const LoginContainer = styled.form`
    display:flex;
    flex-direction:column;
    justify-content:center;
    background-color: var(--darkest-black);
    border-radius:7px;
    padding:30px;
    width:500px;
    height:400px;

    @media (max-width:600px){
        width:100%;
        margin-top:100px;

    }
`

const LoginHeader = styled.div`
    display:flex;
    justify-content:center;
    padding-bottom:30px;

    h1{
        color:white;
        font-size:20px;
        font-weight:400;
    }

`


const WarningContainer = styled.div`
    margin:20px;
    color:var(--warning);
    font-size:12px;
`

const LoginUsername = styled.div`
    display:flex;
    flex-direction:column;
    padding-bottom:30px;

    label{
        margin:10px 0px;
        color:white;
    }

    input{
        padding:15px 10px;
        background-color: var(--lightest-black);
        outline:none;
        border:1px solid var(--gray);
        color:var(--gray);
        ::placeholder{
            color:var(--gray);
        }
    }
`

const LoginButton = styled.button`
    width:100%;
    padding:20px 0px;
    background-color: var(--violet);
    border:1px solid var(--gray);
    color:white;
    cursor:pointer;
    font-size:18px;
`

export default Home
