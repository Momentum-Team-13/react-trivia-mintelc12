import { useState } from "react"
import SelectCategory from "./Category"

export default function SingleQuestion ({ question }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [onLastQuestion, setOnLastQuestion] = useState(false)
    console.log("question is ", question)


    function decodeHtml(html) {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    
    const handleNext = () => {
        setCurrentQuestion(currentQuestion + 1)
        if (currentQuestion === question.length - 2) {
            setOnLastQuestion(true)
        }
    }


    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }


    const handleRestart = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(0)
            setOnLastQuestion(false)
        }
    }

    return (
        <div className="container">
            <div className="slide">
                <h3>{question[currentQuestion].question}</h3>
                <p>{question[currentQuestion].correct_answer}</p>
                {question[currentQuestion].incorrect_answers.map((answer) => ( <p>
            {decodeHtml(answer)}</p>
            ))}
            </div>
        </div>
    )
}