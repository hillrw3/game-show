import React, {Component} from 'react'
import './App.css'
import {questions} from "./questions"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions,
      selectedQuestionId: null,
      openQuestion: null
    }
  }

  spin = () => {
    const {questions} = this.state
    const unansweredTiles = questions.filter(tile => !tile.answered)

    const spinning = setInterval(() => {
      const randomIndex = parseInt(Math.random() * 1000 % unansweredTiles.length)
      this.setState({selectedQuestionId: unansweredTiles[randomIndex].id})
    }, 100)

    setTimeout(() => clearInterval(spinning), 2500)
  }

  showQuestion = (tile) => {
    const questions = this.state.questions.map(t => {
      if (tile.id === t.id) {
        t.answered = true
      }

      return t
    })

    this.setState({questions, openQuestion: tile})
  }

  closeQuestion = () => {
    this.setState({openQuestion: null})
  }

  render() {
    const {questions, selectedQuestionId, openQuestion} = this.state
    return (
      <div className="wrapper">
        <Question question={openQuestion} close={this.closeQuestion}/>
        <div className="question-grid">
          {
            questions.map(tile =>
              <div key={tile.id}
                   onClick={() => this.showQuestion(tile)}
                   className={`tile ${tile.id === selectedQuestionId ? 'active' : ''} ${tile.answered ? 'answered' : ''}`}
              />
            )
          }
          <div className="spinner-container">
            <button className='spinner' onClick={this.spin}>Spin</button>
          </div>
        </div>
      </div>
    )
  }
}

function Question({question, close}) {
  if (!question) return null

  return (
    <div className="question-wrapper">
      <div className="question-content">
        <span className="button-wrapper">
          <button className="question-close-button" onClick={close}>X</button>
        </span>
        <div className="question">{question.question}</div>
        <a className="answer" href={question.answerHref} target="_blank" onClick={close}>Answer</a>
      </div>
    </div>
  )
}

export default App
