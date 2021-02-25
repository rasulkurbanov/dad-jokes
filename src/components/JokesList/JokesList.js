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
    let previosArr = []
    let newJokesArr = []

    while (newJokesArr.length < defJokesNum) {
      let response = await axios.get(`https://icanhazdadjoke.com/`, {
        headers: { Accept: 'application/json' }
      })
      newJokesArr.push({ id: uuidv4(), text: response.data.joke, vote: 0 })
    }
    previosArr = [...jokes, ...newJokesArr]
    setJokes(previosArr)

    window.localStorage.setItem('jokes', JSON.stringify(previosArr))
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

  const sortedJokes = jokes.sort((a, b) => a.vote - b.vote)

  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title"><span>Dad </span>Jokes</h1>
        <img alt="smile" src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
        <button className="Jokelist-getmore" onClick={handleNewJokes}><span>New Jokes</span></button>
      </div>

      <div className="JokeList-jokes">
        {sortedJokes.slice(0).reverse().map((joke, index) => {
          return <Joke
            key={joke.id}
            votes={joke.vote}
            text={joke.text}
            upvote={() => handleVote(joke.id, 1)}
            downvote={() => handleVote(joke.id, -1)}
          />
        })}
      </div>
    </div>
  )

}

export default JokesList