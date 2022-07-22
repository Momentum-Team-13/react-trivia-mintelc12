import { useState, useEffect } from "react"
import App from "./App"
import axios from "axios"
import { render } from "@testing-library/react"
import SingleQuestion from "./SingleQuestion"

console.log("console is connected")

export default function SelectCategory ( {category} ) {
    const [triviaQuestions, setTriviaQuestions] = useState([])

    function decodeHtml(html) {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    // ajax call to retreive list of trivia questions based on the round you have selected
    useEffect(() => {
        axios
            .get(`https://opentdb.com/api.php?amount=10&category=${category.id}&type=multiple`)
            .then ((res) => setTriviaQuestions(res.data.results))
}, [] )


return (
<>

You have selected {category.name}! Let's begin.

{triviaQuestions ? 

    <div className="questions">
    {triviaQuestions.map ((question) => 
    <div className="single-question">
    
        <li key={question.question}> {decodeHtml(question.question)}
        <ul><input type="radio" value={question.correct_answer} name="answer"/>{decodeHtml(question.correct_answer)}</ul>
    <div>
        {question.incorrect_answers.map((answer) => (
            <ul><input type="radio" value={answer.incorrect_answers} name="answer"/>{decodeHtml(answer)}</ul>
    
    ))}
    </div>
    </li>
    
    </div>)}
    
    </div>: ("")}
    </>
    );

}