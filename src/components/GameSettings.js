import React,{useState} from 'react'
import styled from 'styled-components'
import {categories, dificulties} from '../settings/settings.js'
import Game from './Game'
import RestartGame from './RestartGame'

const GameSettings = ({name, setFlag}) => {


    const [dataFetch, setDataFetch] = useState({});
    const [category, setCategory] = useState(0);
    const [difficulty, setDifficulty] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);
    const [warning, setWarning] = useState('')

    const handleAnswer = (answer) => {
        const newIndex = currentIndex +1;
        setCurrentIndex(currentIndex +1)

        if(answer == dataFetch.results[currentIndex].correct_answer){
            setPoints(points + 1)
        }

        if(newIndex >= dataFetch.results.length){
            setGameEnded(true)
        }

    }

    const request = (e) =>{
        e.preventDefault();
        difficulty !== '' && category !== 0 ? 
        
        fetch(
            `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}`
        )
        .then(res =>{
            return res.json();
        })
        .then(data =>{
            setDataFetch(data);
            console.log(dataFetch);

        })

        : setWarning('Please choose a category and a difficulty')
    }

    

    return (
        <Container>
            {
                gameEnded ? (
                    <RestartGame
                        name = {name}
                        points = {points}
                        setFlag = {setFlag}
                    />
                    
                ) :
                !dataFetch.results ? 
            
                    <GameSettingsContainer onSubmit={request}>
                        <GameHeader>
                            <h1>Game Settings</h1>
                        </GameHeader>
                        <GameCategory>
                            <select 
                                name="select"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option defaultValue="" >Choose here</option>
                                {categories.map(categories => {
                                    return(
                                    <option value={categories.value}>{categories.name}</option>
                                    )
                                })}
                            </select>
                        </GameCategory>
                        <WarningContainer>
                                <span>{warning}</span>
                        </WarningContainer>
                        <GameDifficulty>
                            {dificulties.map(dificulties =>{
                                return(
                                    <div>
                                        <input 
                                            className="radio__input"
                                            type="radio" 
                                            name={dificulties.name} 
                                            id={dificulties.value} 
                                            value={dificulties.value}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                        />
                                        <label 
                                            htmlFor={dificulties.value}
                                        >
                                                {dificulties.label}
                                        </label>
                                        
                                    </div>

                                )
                            })}
                            </GameDifficulty>
                            <Button>
                                Start game!
                            </Button>
                    </GameSettingsContainer>
            
                :
                 
                <Game
                    points = {points}
                    handleAnswer = {handleAnswer}
                    question = {dataFetch.results[currentIndex].question }
                    correct_answer = {dataFetch.results[currentIndex].correct_answer}
                    incorrect_answers = {dataFetch.results[currentIndex].incorrect_answers}
                />

                            
            }
        </Container>
    )
}

const Container = styled.div`
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: var(--lightest-black);
    color:white;
`
const GameSettingsContainer = styled.form`
    display:flex;
    flex-direction:column;
    background-color: var(--darkest-black);
    padding:30px;
    width:100%;
`

const GameHeader = styled.div`
    display:flex;
    justify-content:center;
    padding:20px 0;
`

const GameCategory = styled.div`
    display:flex;
    justify-content:center;
    padding:20px 0;
    select{
        border-radius:15px;
        padding:10px;
        outline:none;
        background-color: var(--lightest-black);
        border-color:var(--lightest-black);
        color:var(--gray);
        font-size:15px;
        cursor:pointer;
    }
`

const WarningContainer = styled.div`
    display:flex;
    justify-content:center;
    span{
        color:var(--warning);
        font-size:12px;
        margin:20px;
        text-align:center;
    }
`

const GameDifficulty = styled.div`
    display:flex;
    justify-content:center;

    div{
        border-radius:15px;
        margin:20px;
        width:auto;
        text-align:center;
        :first-child{
            background-color: var(--easy);
            
            input[type=radio]:checked + label{
                background-color: var(--selectedEasy);
            }
        }
        :nth-child(2n){
            background-color: var(--medium);

            input[type=radio]:checked + label{
                background-color: var(--selectedMedium);
            }
        }
        :nth-child(3n){
            background-color: var(--hard);

            input[type=radio]:checked + label{
                background-color: var(--selectedHard);
            }
        }
        label{

            border-radius:15px;
            display:flex;
            width:100%;
            padding:8px 14px;
            cursor:pointer;
            transition:300ms ease-in-out;
        }
    }

    input[type=radio]{
        display:none;
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

export default GameSettings
