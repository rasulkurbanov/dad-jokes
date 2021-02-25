import React from 'react'
import './Joke.css'

function Joke(props) {

  function getColor(votes) {
    if (votes <= -1) {
      return "#f44336"
    }
    if (votes >= 0 && votes < 2) {
      return "#FFEB3B"
    }
    if (votes >= 2 && votes < 7) {
      return "#FFC107"
    }
    if (votes >= 7 && votes < 10) {
      return "#FF9800"
    }
    if (votes >= 10 && votes < 12) {
      return "#CDDC39"
    }
    if (votes >= 12 && votes < 15) {
      return "#8BC34A"
    }
    if (votes >= 15) {
      return "#4CF50"
    }
  }

  function getEmoji(votes) {
    if (votes <= -5) {
      return "em em-disappointed_relieved"
    }
    if (votes <= -1) {
      return "em em-angry"
    }
    if (votes >= 0 && votes < 2) {
      return "em em-confused"
    }
    if (votes >= 2 && votes < 6) {
      return "em em-neutral_face"
    }
    if (votes >= 6 && votes < 10) {
      return "em em-slightly_smiling_face"
    }
    if (votes >= 10 && votes < 12) {
      return "em em-smiley"
    }
    if (votes >= 12 && votes < 15) {
      return "em em-laughing"
    }
    if (votes >= 15) {
      return "em em-rolling_on_the_floor_laughing"
    }
  }


  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i className="fa fa-arrow-down" onClick={props.downvote} />
        <span className="Joke-votes" style={{ borderColor: getColor(props.votes) }}>{props.votes}</span>
        <i className="fa fa-arrow-up" onClick={props.upvote} />
      </div>
      <div className="Joke-text">{props.text}</div>
      <div className="Joke-smiley">
        <i className={getEmoji(props.votes)}></i>
      </div>
    </div>
  )
}

export default Joke