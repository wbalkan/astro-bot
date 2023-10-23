import React from "react";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Back from '../../components/Back/Back';

import './Advice.css';

const Advice = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sign = queryParams.get('sign');
    const system_prompt = `<s>[INST]You are a Zodiac Expert. You know all about zodiac signs, their personalities, and what actions they should and shouldn't take. Answer questions and give advice based only on zodiac signs. The current user you are talking about has the zodiac sign ${sign}. Be helpful and offer any advice you can based on zodiac signs. Answer questions as directly as possible, starting with your advice and ending with why it makes sense for a ${sign}. Introduce yourself as a Zodiac Expert[/INST]</s>`;

    const [outputs, setOutputs] = useState([]);
    const [currResponse, setCurrResponse] = useState("");

    const [continued, setContinued] = useState(false);

    const [inputs, setInputs] = useState('')
    // const API_TOKEN = "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";
    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
            {
                headers: { 
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json"
             },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }
    
    useEffect(() => {query({"inputs": `${system_prompt} ${inputs}`}).then((response) => {
        try {
            let res = response.error;
            if (typeof res !== 'undefined'){
                setCurrResponse("My Zodiac intuitions are failing me, try again later... (API rate limit reached, come back later!)")
            }
        } catch (error) {
        }
        let res = response[0].generated_text;

        const lastIndex = res.lastIndexOf("[/INST]");
        if (lastIndex !== -1) {
            // Use slicing to keep only LLM response after the last occurrence of "[/INST]"
            const end = res.slice(lastIndex + "[/INST]".length);
            const resultString = end.replace(/^<\/s> /, '');
            setCurrResponse(resultString);
        } else {
            console.log("bad response");
        }

        });
    }, [system_prompt, inputs] )


    useEffect(() => {
        let convo = [...outputs];
        if (continued) {
            convo.pop();
        }
        convo.push(currResponse);
        setOutputs(convo);
    }, [currResponse]);

    const [ques, setQues] = useState('');
    const handleInput = (event) => {
        setQues(event.target.value);
      };
    

    const queryLLM = (event) => {
        event.preventDefault();
        let new_q = inputs + "[INST]" + ques + "[/INST]";
        setInputs(new_q);

        let convo = [...outputs];
        convo.push(ques);
        setOutputs(convo);
        setContinued(false);

        console.log(outputs);

        setQues('');
    }

    const handleContinue = () => {
        const lastIndex = inputs.lastIndexOf("[/INST]");
        if (lastIndex !== -1) {
            // Use slicing to keep only LLM response after the last occurrence of "[/INST]"
            const resultString = inputs.slice(0, lastIndex + "[/INST]".length);
            setInputs(resultString + currResponse);
        } else {
            console.log("bad continue");
            setInputs(currResponse);
        }
        setContinued(true);

    }

    return (
        <div>
            <Back path={ {pathname: "/choice", search: `?sign=${sign}`} } />
            <div className="chat-header">Chat with an expert...</div>
            <div className="convo">{outputs.map((key, id) => {
                if (id !== 0){
                    return(
                        <div>{(id % 2 == 0) ? <div className="user-output">You: {key}</div> : <div className="bot-output">Zodiac Expert: {key}</div>}</div>
                    )
                }
            })}</div>
            <button className="continue-button" onClick={handleContinue}>Keep generating...</button>
            <form className="chat-form">
                <input className="chat-input" type="text" value={ques} placeholder="Ask about your zodiac sign..." onChange={handleInput}></input>
                <button className="chat-ask" onClick={queryLLM}> > </button>
            </form>
        </div>
    )

}

export default Advice;