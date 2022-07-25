import { useState, useEffect } from "react"
import App from "./App"
import axios from "axios"
import FinalScore from "./FinalScore"

console.log("console is connected")

export default function SelectCategory ( {category} ) {
    const [triviaQuestions, setTriviaQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [count, setCount] = useState(0)
    const [endGame, setEndGame] = useState(false)


    //makes html readable for actual humans 
    function decodeHtml(html) {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    // makes a new array for randomized answers
    function getShuffledArray(arr) {
        const newArray = arr.slice()
        for (let i = newArray.length - 1; i > 0; i--) {
            const random = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[random]] = [newArray[random], newArray[i]];
        }
        return newArray
    }

    // ajax call to retreive list of trivia questions based on the round you have selected
    useEffect(() => {
        axios
            .get(`https://opentdb.com/api.php?amount=10&category=${category.id}&type=multiple`)
            .then ((res) => setTriviaQuestions(res.data.results))
}, [] )

// organize answer list
function getAnswerList () {
    let incorrectAnswers = triviaQuestions[currentQuestionIndex].incorrect_answers
    let correctAnswers = triviaQuestions[currentQuestionIndex].correct_answer
    console.log(triviaQuestions)
    let combinedAnswers = [...incorrectAnswers, correctAnswers]
    let shuffledArray = getShuffledArray(combinedAnswers)
    return shuffledArray
}

// user input answer
function handleUserAnswer(answer) {
    if (answer === triviaQuestions[currentQuestionIndex].correct_answer) {
        console.log("it is working")
        alert("Correct! Good work.")
        { setCount(count + 1) }
    } else {
        console.log("whoopsie!")
        alert("Try again!")
    }
    { setCurrentQuestionIndex(currentQuestionIndex + 1)}
}

if (currentQuestionIndex === 9 ) {
    console.log("you are on the last question.")
}

function handleEndGame(question) {
    if (currentQuestionIndex > 9) {
        setEndGame(true)
    }
    
}


return (
    <>
    {currentQuestionIndex < 10 ? (
    <div className="questions-list">
        {triviaQuestions.length > 0 && 
            <>
                <h1>Question {currentQuestionIndex + 1}:</h1> <br/>
                    <h3>{decodeHtml(triviaQuestions[currentQuestionIndex].question)}</h3>
                

                    {getAnswerList().map(
                        (answer, index) => <ul key={index}>
                            <button className="answerButtons" onClick={() => {handleUserAnswer(answer) }}>{decodeHtml(answer)}   
                            </button>
                            <br />
                        </ul>
                    )}
                
                <br/>
                You have {count} right answers.
            </>}
            </div>
        ) : (
            <>
            <FinalScore />
            <h3>You scored {count} points.</h3>
            </>
    )}
    </>
    );

}