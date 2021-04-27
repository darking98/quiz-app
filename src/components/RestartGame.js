import React from 'react'
import styled from 'styled-components'

const RestartGame = ({points, name, setFlag}) => {
    return (
        <ResultContainer>
            <HeaderContainer>
                <h1>Congrats {name} you reached {points} {points > 1 ? "points" : "point"}🎉🎉🎉!</h1>
            </HeaderContainer>
            <Button
                onClick={() => setFlag(false)}
            >
               Restart quiz!
            </Button>
        </ResultContainer>
        
    )
}

const ResultContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    background-color: var(--darkest-black);
    width:500px;
    height:500px;
    padding:20px;
`

const HeaderContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    h1{
        font-size:25px;
    }
`
const Button = styled.button`
    padding:10px;
    background-color: var(--lightest-black);
    border:none;
    cursor: pointer;
    color:white;
    transition:300ms ease-in-out;
    :hover{
        background-color: var(--lightest-black-hover);
    }
`
export default RestartGame
