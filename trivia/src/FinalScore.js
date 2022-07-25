import { useState } from "react"

export default function FinalScore ({ score }) {
    console.log("question is ", score)


    return (
        <>
        <p>Testing, testing! The game is over.</p>
        <p> You scored {score} points.</p>
        </>
    );
    
}