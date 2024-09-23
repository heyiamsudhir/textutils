import React, { useState } from 'react'


export default function TextForm(props) {
    const handleUpClick = () => {
        //console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase", "success");
    }
    const handleLoClick = () => {
        //console.log("Uppercase was clicked" + text);
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to lowercase", "success");
    }
    const handleClearClick = () => {
        //console.log("Uppercase was clicked" + text);
        let newText = '';
        setText(newText)
        props.showAlert("Text Cleared", "success");
        
    }
    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
      }
      const cancelSpeech=()=>{
        speechSynthesis.cancel()

    }
    const copy = () => {
        navigator.clipboard.writeText(text)
        .then(() => {
            console.log("Text copied to clipboard!");
            props.showAlert("Text copied to clipboard!", "success");
        })
        
        
    }
    const handleOnChange = (event) => {
        //console.log("On change");
        setText(event.target.value);
    }
    const handleExtraSpaces = ()=>{
        let newText = text.split(/\s+/);
        setText(newText.join(" "));
        props.showAlert("Removed Extra Spaces", "success");
    }

    const [text, setText] = useState('');

    return (
        <>
            <div className="container" style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode === 'dark' ? 'grey' : 'white',color: props.mode === 'dark' ? 'white' : 'black'}} id="myBox" rows="8"></textarea>
                </div>
                <button className="btn btn-primary mx-1" onClick={handleUpClick}>convert to Uppercase</button>
                <button className="btn btn-primary mx-1" onClick={handleLoClick}>convert to Lowercase</button>
                <button className="btn btn-primary mx-1" onClick={handleClearClick}>clear text</button>
                <button type = "submit" onClick={speak}className="btn btn-info mx-1">Speak</button>
                <button type = "submit" onClick={cancelSpeech}className="btn btn-warning mx-1">Stop</button>
                <button type = "submit" onClick={copy}className="btn btn-primary mx-1">Copy</button>
                <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                

            </div>
            <div className="container my-3" style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>
                <h2>Your text summary</h2>
                <p>{text.split(" ").length} words and {text.length} characters</p>

                <p>{0.008 * text.split(" ").length} Minutes read</p>
                <h2>Preview</h2>
                <p>{text.length>0?text:"Enter something in the textbox to preview it here"}</p>
            </div>
        </>
    )
}
