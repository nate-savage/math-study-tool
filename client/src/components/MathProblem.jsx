import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MathProblem = (props) => {
    const { user, setUser,usersFlag,setUsersFlag } = props
    const [answer, setAnswer] = useState(0)
    const [correct, setCorrect] = useState(5)
    const [problem, setProblem] = useState("4+1")
    const [add, setAdd] = useState(true)
    const [mult, setMult] = useState(false)
    const [deriv, setDeriv] = useState(false)
    const [integ, setInteg] = useState(false)
    const [algebra, setAlgebra] = useState(false)
    const [difficulty, setDifficulty] = useState(100)
    const [msg, setMsg] = useState("")


    //make probs
    //later return as an array with problem first and answer 2nd
    const addFunc = () => {
        const num1 = Math.floor(Math.random() * 100)
        const num2 = Math.floor(Math.random() * 100)
        const rand = Math.random()
        let result = 0
        let operator = ""
        if (rand > .5) {
            operator = "+"
            result = num1 + num2
        }
        else {
            operator = "-"
            result = num1 - num2
        }

        return [`${num1} ${operator} ${num2} =`, result, 500]
    }
    const multFunc = () => {
        const num1 = Math.ceil(Math.random() * 100)
        const num2 = Math.ceil(Math.random() * 100)
        const rand = Math.random()
        let result = 0
        let operator = ""
        if (rand > .5) {
            operator = "x"
            result = num1 * num2
        }
        else {
            operator = "/"
            result = (num1 / num2)
        }

        return [`${num1} ${operator} ${num2} =`, result, 600]
    }
    const derivFunc = () => {
        const num1 = Math.ceil(Math.random() * 10)
        const num2 = Math.ceil(Math.random() * 10)
        const num3 = Math.ceil(Math.random() * 10)

        let prob = `find d/dx @ x=${num3} for ${num1}x^${num2}`
        const ans = (num2 * num1) * (num3 ** (num2 - 1))
        return [prob, ans, 1200]
    }
    const integFunc = () => {
        const num1 = Math.ceil(Math.random() * 10)
        const num2 = Math.ceil(Math.random() * 10)
        const num3 = Math.ceil(Math.random() * 10)
        const num4 = Math.ceil(Math.random() * 10)
        const num5 = Math.ceil(Math.random() * 10)
        const num6 = Math.ceil(Math.random() * 10)
        const prob = `integrate ${num1}x^${num2} dx from ${num3} to ${num4}`
        const result = (num1 * (1 / (num2 + 1)) * num4 ** (num2 + 1)) - (num1 * (1 / (num2 + 1)) * num3 ** (num2 + 1))
        return [prob, result, 1500]

        return "integral"
    }
    const algebraFunc = () => {
        return ["answer is 3", 3, 10000]
    }
    //dictionary to give func (helpful later)
    const problemDict = {
        "add": addFunc,
        "mult": multFunc,
        "deriv": derivFunc,
        "integ": integFunc,
        "algebra": algebraFunc
    }
    const typeSelect = (e) => {
        e.preventDefault();
        genProb()
    }
    const submitProblem = (e) => {
        e.preventDefault();
        // console.log(answer)
        let newElo = 0
        if (answer == correct) {
            // console.log("correct")
            newElo = eloAdjustment(user.elo, difficulty, true)

        }
        else {
            // console.log("WRONG")
            newElo = eloAdjustment(user.elo, difficulty, false)
        }
        //only do this if the problem is correcct
        // console.log("new elo is " + newElo)
        //update users elo
        axios.put(`http://localhost:8000/api/users/${user._id}`,{"elo":newElo})
        .then(res=>{
            // console.log(res.data)
            setUser(res.data.user)
            setUsersFlag(usersFlag+1)
        })
        .catch(err=>{
            console.log(err)
        })
        genProb()
    }
    const eloAdjustment = (currentElo, probScore, score) => {
        const winChance = 1.0 / (1 +  10 ** ((currentElo - probScore) / 400))
        const loseChance =  1.0 / (1 + 10 ** ((probScore - currentElo) / 400))
        let finalElo = 0
        //correct answer
        if (score) {
            finalElo = currentElo + 10 * (1 - loseChance)
        }
        else {
            finalElo = currentElo + 10 * (0 - loseChance)
        }
        return Math.round(finalElo)
    }



    const genProb = () => {
        const types = []
        if (add) {
            types.push("add")
        }
        if (mult) {
            types.push("mult")
        }
        if (deriv) {
            types.push("deriv")
        }
        if (integ) {
            types.push("integ")
        }
        if (algebra) {
            types.push("algebra")
        }
        if (types.length == 0) {
            console.log("must select at least one type")
            setMsg("Must select at least one type")
            return
        }
        setMsg("")
        const type = types[Math.floor(Math.random() * types.length)]
        // console.log(type)
        // console.log(problemDict[type])
        // console.log(problemDict[type])
        const probAnswer = problemDict[type]()
        setProblem(probAnswer[0])
        setCorrect(Math.round(probAnswer[1] * 100) / 100)
        setDifficulty(probAnswer[2])
        //this shows the answer in the log to verify
        // console.log(probAnswer[1])

        return
    }
    return (
        <div>
            <div>

                <form onSubmit={(e) => { submitProblem(e) }}>
                    <p>{problem}</p>
                    <p>round to 2 decimal places</p>
                    <input type="text" value={answer} onChange={(e) => { setAnswer(e.target.value) }} />
                    <button>Attempt</button>
                </form>
            </div>
            <div>

                <form onSubmit={(e) => { typeSelect(e) }}>
                    {msg}
                    <p>add and sub <input type="checkbox" checked={add} onChange={(e) => { setAdd(e.target.checked) }} /></p>

                    <p>mult and div <input type="checkbox" checked={mult} onChange={(e) => { setMult(e.target.checked) }} /></p>
                    <p>derivatives <input type="checkbox" checked={deriv} onChange={(e) => { setDeriv(e.target.checked) }} /></p>
                    <p>integrals <input type="checkbox" checked={integ} onChange={(e) => { setInteg(e.target.checked) }} /></p>
                    {/* <p>algebra <input type="checkbox" checked={algebra} onChange={(e) => { setAlgebra(e.target.checked) }} /></p> */}
                    <button>New Problem</button>
                </form>
            </div>
        </div>
    )
};

export default MathProblem;
