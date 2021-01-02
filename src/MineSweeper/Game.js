import React, {Component} from 'react'

import Grid from './Grid'

export default class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      width: 9,
      height: 9,
      mineCount: 10,
      key: 0,
      hasWon: false,
      hasLost: false,
      option: "beginner",
      minesLeft: 0,
      customData: [],
      aiSpeed: 500,
    }
  }

  componentDidMount() {
    // set data after loading
    const {mineCount} = this.state
    const customData = [9, 9, 10]
    this.setState({loading: false, minesLeft: mineCount, customData: customData})
  }

  // Called when receiving data from grid
  Callback = (data) => {
    const {from} = data
    if (from === 'grid-win') {
      this.setState({hasWon: true})
    } else if (from === 'grid-minecount') {
      const {minesLeft} = data
      this.setState({minesLeft: minesLeft})
    } else if (from === 'grid-loss') {
      this.setState({hasLost: true})
    }
  }

  // Handles the gamemode selection
  handleOptionChange = (e) => {
    this.setState({option: e.target.value})
  }

  // inserts the data from the custom game options
  handleCustomGame = (e, index) => {
    const {customData} = this.state
    const newData = customData
    newData[index] = parseInt(e.target.value)
    this.setState({customData: newData})
  }

  // Handler for changing the AI speed
  changeAISpeed = (e) => {
    e.preventDefault()
    this.setState({aiSpeed: 1000 - e.target.value})
    this.Restart()
  }

  // When new game is created
  handleNewGame = (e) => {
    e.preventDefault()
    const {option, customData} = this.state
    if (option === "beginner") {
      this.setState({width: 9, height: 9, mineCount: 10, minesLeft: this.state.mineCount})
    } else if (option === "intermediate") {
      this.setState({width: 16, height: 16, mineCount:40, minesLeft: this.state.mineCount})
    } else if (option === "expert") {
      this.setState({width: 30, height: 16, mineCount: 99, minesLeft: this.state.mineCount})
    } else if (option === "custom") {
      if (customData.every(atr => !isNaN(atr))) {
        const bombs = this.Verifybomb(customData)
        this.setState({width: customData[0], height: customData[1], mineCount: bombs, minesLeft: this.state.mineCount})
      } else return
    }
    this.Restart()
  }

  // Will verify that its possible to make this grid
  Verifybomb(data) {
    if (data[0] * data[1] < 2) return (0)
    if (data[0] * data[1] - 1 >= data[2]) {
      return (data[2])
    } else {
      return (data[0] * data[1] - 1)
    }
  }

  // reset the game
  Restart = () => {
    let {key} = this.state
    key++
    this.setState({key: key, hasWon: false, hasLost: false, minesLeft: this.state.mineCount})
  }

  // Handles styles for the gamemodes
  ButtonClassName(value) {
    const {option} = this.state
    if (option === value) {
      return ("regularbtn checked")
    } else {
      return ("regularbtn")
    }
  }

  customInput() {
    if (this.state.option !== 'custom') {
      return null
    }

    return (
      <div className="regularbtn buttons">
        <label>
          Width:&nbsp;&nbsp;
          <input className="custom-input" type="number" name="width" 
            autoComplete="off" min={1} max={25} onChange={(e) => this.handleCustomGame(e, 0)}/>
        </label>
        <label>
          <br/>Height:&nbsp;
          <input className="custom-input" type="number" name="height" 
            autoComplete="off" min={1} max={25} onChange={(e) => this.handleCustomGame(e, 1)}/>
        </label>
        <label> 
          <br/>Bombs:
          <input className="custom-input" type="number" name="bombs" 
            autoComplete="off" min={0} max={1000} onChange={(e) => this.handleCustomGame(e, 2)}/>
        </label>
      </div>
    )
  }

  // text if game has been won
  winText() {
    if (this.state.hasWon)
      return 'You Win!'
  }

  // text if game has been lost
  LossText() {
    if (this.state.hasLost) 
      return 'You Lost!'
  }
  
  render() {
    const {key, loading, option, width, height, mineCount, aiSpeed} = this.state
    if (loading) {
      return ('Loading...')
    }
    return (
      <>
      {/* all IO*/ }
      
      <div className="IO">
        <form onSubmit={this.handleNewGame}>
          <div className="buttons">
            {/**gamemode selector */}
            <label className={this.ButtonClassName("custom")}>
              <input type="radio" value="custom" checked={option === "custom"} onChange={this.handleOptionChange}/>
              Custom
            </label>
            <label className={this.ButtonClassName("beginner")}> Beginner
              <input type="radio" value="beginner" checked={option === "beginner"} onChange={this.handleOptionChange}/>
            </label>
            <label className={this.ButtonClassName("intermediate")}> Intermediate
              <input type="radio" value="intermediate" checked={option === "intermediate"} onChange={this.handleOptionChange}/>
            </label>
            <label className={this.ButtonClassName("expert")}>
              <input type="radio" value="expert" checked={option === "expert"} onChange={this.handleOptionChange}/>
              Expert&nbsp;<br/>
            </label>
          </div>
          {/**custom input form */}
          {this.customInput()}
          <button className="newgame" type="submit">
            New Game
          </button>
          <div className="ai">
            AI speed<br/>
            <input className="slider" type="range" name="points" min="100" max="990" step="10" 
              defaultValue="550" onChange={this.changeAISpeed}></input>
          </div>
          
        </form>
      </div>
      {/**extra text for certain gamestates */}
      <div className="win">
        {this.winText()}
      </div>
      <div className="loss">
        {this.LossText()}
      </div>
      {/**Renders the grid */}
        <div key={key}>
          <Grid
            onContextMenu={this.handleClick}
            parentCallback = {this.Callback}
            width={width}
            height={height}
            mineCount={mineCount}
            aiSpeed={aiSpeed}
          ></Grid>
        </div>
      </>
    )
  }
}
