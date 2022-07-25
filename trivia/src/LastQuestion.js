import { useState } from "react"
import SelectCategory from "./Category"

export default function LastQuestion ({ question }) {
    const [onLastQuestion, setOnLastQuestion] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [triviaQuestions, setTriviaQuestions] = useState([])
    console.log("question is ", question)



    
}