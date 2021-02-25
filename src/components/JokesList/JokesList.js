import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import Joke from '../Joke/Joke'
import './JokesList.css'


function JokesList(props) {

  const [jokes, setJokes] = useState(JSON.parse(window.localStorage.getItem("jokes") || "[]"))

  //useEffect hook to fetch data from an external API
  useEffect(() => {

    //Agar localStorage da jokes lar arrayi yo'q bo'lsa fetch qiladi
    if (!JSON.parse(window.localStorage.getItem('jokes'))) {
      fetchData()
    }
  }, [])


  //function to fetch from icanhasdadjoke.com
  async function fetchData() {
    let defJokesNum = 10
    let jokesArr = []
    while (jokesArr.length < defJokesNum) {
      let response = await axios.get(`https://icanhazdadjoke.com/`, {
        headers: { Accept: 'application/json' }
      })
      jokesArr.push({ id: uuidv4(), text: response.data.joke, vote: 0 })
    }
    setJokes(jokesArr)
    window.localStorage.setItem('jokes', JSON.stringify(jokesArr))
  }

  //function to upvote or downvote the joke
  function handleVote(id, delta) {
    let newJokes = [...jokes]
    newJokes.map(joke => {
      if (joke.id === id) {
        joke.vote += delta
      }
      window.localStorage.setItem('jokes', JSON.stringify(newJokes))
      return setJokes(newJokes)
    })
  }

  function handleNewJokes() {
    fetchData()
  }



  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title"><span>Dad </span>Jokes</h1>
        <img alt="smile" src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
        <button className="Jokelist-getmore" onClick={handleNewJokes}>New Jokes</button>

      </div>

      <div className="JokeList-jokes">
        {jokes.map((joke, index) => {
          return <Joke
            key={joke.id}
            votes={joke.vote}
            text={joke.text}
            index={index+1}
            upvote={() => handleVote(joke.id, 1)}
            downvote={() => handleVote(joke.id, -1)}
          />
        })}
      </div>
    </div>
  )

}

export default JokesList