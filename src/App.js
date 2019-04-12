import React, {Component} from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tiles: [
        {id: 1, answerHref: 'https://docs.google.com/presentation/d/18zcdyO691L65kRlyTeRsIhur0MlBac-m-PB9M18nUzw/edit#slide=id.g563f44b236_0_4', question: 'All aboard the Agile Release Train. Unless you missed your sprint goals. In that case, get off my train.', answered: false},
        {id: 2, answerHref: 'https://google.com', question: 'question 2', answered: false},
        {id: 3, answerHref: 'https://google.com', question: 'question 3', answered: false},
        {id: 4, answerHref: 'https://google.com', question: 'question 4', answered: false},
        {id: 5, answerHref: 'https://google.com', question: 'question 5', answered: false},
        {id: 6, answerHref: 'https://google.com', question: 'question 6', answered: false},
      ],
      activeTileId: null,
      activeQuestion: null
    }
  }

  spin = () => {
    const spinning = setInterval(() => {
      const {tiles} = this.state
      const unansweredTiles = tiles.filter(tile => !tile.answered)


      const randomIndex = parseInt(Math.random() * 1000 % unansweredTiles.length)

      this.setState({activeTileId: unansweredTiles[randomIndex].id})
    }, 100)

    setTimeout(() => clearInterval(spinning), 3000)
  }

  showQuestion = (tile) => {
    const updatedTiles = this.state.tiles.map(t => {
      if (tile.id === t.id) {
        t.answered = true
      }

      return t
    })

    this.setState({tiles: updatedTiles, activeQuestion: tile})
  }

  closeQuestion = () => {
    this.setState({activeQuestion: null})
  }

  render() {
    const {tiles, activeTileId, activeQuestion} = this.state
    return (
      <div className="wrapper">
        {
          activeQuestion ?
            <Question question={activeQuestion} close={this.closeQuestion}/> :
            null
        }
        <div className="app">
          {
            tiles.map(tile =>
              <div key={tile.id}
                   onClick={() => this.showQuestion(tile)}
                   className={`tile ${tile.id === activeTileId ? 'active' : ''} ${tile.answered ? 'answered' : ''}`}
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