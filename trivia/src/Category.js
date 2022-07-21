import { useState, useEffect } from "react"
import App from "./App"
import axios from "axios"
import { render } from "@testing-library/react"

console.log("console is connected")

export default function SelectCategory ( {category} ) {
    const [triviaQuestions, setTriviaQuestions] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryURL, setCategoryURL] = useState()


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

{/* The line below glitches and reproduces the headings of my "home" page. idk why. Ask Amy in class.*/}
{/* <App category={selectedCategory}/> */}
You have selected {category.name}! Let's begin.
{triviaQuestions ? 

    <div className="questions">
    {triviaQuestions.map ((question) => 
    <div className="single-question">
    
        <li key={question.question}> {decodeHtml(question.question)}
        <ul><input type="radio" value={question.correct_answer} name="answer"/>{question.correct_answer}</ul>
    <div>
        {question.incorrect_answers.map((answer) => (
            <ul><input type="radio" value={answer.incorrect_answers} name="answer"/>{answer}</ul>
    
    ))}
    </div>
    </li>
    
    </div>)}
    
    </div>: ("")}
    </>
    );

}