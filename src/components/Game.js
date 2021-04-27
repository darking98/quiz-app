import React, { useState, useEffect } from "react";
import styled from 'styled-components'

const Game = ({question, correct_answer, incorrect_answers ,handleAnswer, points}) => {

  const shuffledAnswers = [correct_answer, ...incorrect_answers].sort(() => Math.floor(Math.random() - 0.5));

  return (
    <GameContainer>
        <PointsContainer>
            <h2>Points: {points}</h2>
        </PointsContainer>
        <QuestionContainer>
            <h2
                dangerouslySetInnerHTML={{ __html:question}}
            />
        </QuestionContainer>
        <AnswersContainer>
            
            {shuffledAnswers.map(answer => (
                <Button

                    onClick={ () => handleAnswer(answer)}
                    dangerouslySetInnerHTML={{ __html:answer}}
                />
            ))}
        </AnswersContainer>
    </GameContainer>
  );
};

const GameContainer = styled.div`
    display:flex;
    flex-direction:column;

`

const QuestionContainer = styled.div`
    text-align:center;
    padding:30px;
    border-radius:10px;
    background-color: var(--darkest-black);
    margin-bottom:20px;
    color:var(--gray);
    @media (max-width:600px){
        font-size:12px;
    }
`

const AnswersContainer = styled.div`
    width:100%;
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:20px;

`

const Button = styled.button`
    border-radius:10px;
    padding:20px;
    background-color: var(--darkest-black);
    border:none;
    cursor:pointer;
    color:white;
    font-size:20px;
    transition:300ms ease-in-out;
    :hover{
        background-color: var(--lightest-black-hover);
    }

    @media (max-width:600px){
        font-size:15px;
    }
`
const PointsContainer = styled.div`
    margin-bottom:20px;
`

export default Game;
