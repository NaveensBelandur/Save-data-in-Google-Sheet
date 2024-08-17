import React from "react";
import { useState } from "react";


const App = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");



  const handleClick = (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      title: title,
      text: text,
    };
  
    fetch('http://localhost:3060/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(formData), 
    })

    .then(response => response.json())
    .then(data => {
       if(data.success){
        
        setName('')
        setText('')
        setTitle('')
       }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };


  return (
    <>
      <section class="container">
        <div
          class="d-flex justify-content-center align-items-center "
          style={{ height: "100vh" }}
        >
          <div class="card py-4 px-4 w-75">
            <h2 class="lead text-start">Please Submit Your Queries</h2>
            <div class="form-floating mb-3 mt-2">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label for="floatingInput">Your Name</label>
            </div>
            <div class="form-floating mb-3 mt-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                class="form-control"
                id="floatingInput"
                placeholder="Title"
              />
              <label for="floatingInput">Title</label>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Please Enter Your Queries
              </label>
              <textarea
                class="form-control"
                value={text}
                onChange={(e) => setText(e.target.value)}
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div class="row">
              <button
                class="btn btn-dark lead mt-2 w-100"
                onClick={handleClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
