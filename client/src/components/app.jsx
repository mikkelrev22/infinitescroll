import React from 'react'
import axios from 'axios'
import Card from './Card.jsx'

class App extends React.Component {
  constructor () {
    super ()
    this.state = {
      color: 'white',
      CMC: '',
      cardArray: [],
      hasMore: false,
      loading: false,
      error: false,
      nextPage: '', 
      prevY: 0 
    }
    this.handleChangeCMC = this.handleChangeCMC.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getRequest = this.getRequest.bind(this)
  }
  handleChangeColor = (e) => {
    this.setState({color: e.target.value})
  }
  handleChangeCMC = (e) => {
    this.setState({CMC: e.target.value})
  }
  handleSubmit = (e) => {
  this.setState({cardArray: []})
   this.getRequest()
    e.preventDefault()

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  getRequest = () => {
    this.setState({error: false})
    this.setState({loading: true})
    let pageToGet = `https://api.scryfall.com/cards/search?q=c%3A${this.state.color}+cmc%3D${this.state.CMC}`
    if (this.state.hasMore) {
      pageToGet = this.state.nextPage
    }
    axios.get(pageToGet)
    .then((res)=>{
      console.log(res.data)
      const cardArray = res.data.data
      const mappedCardArray= cardArray.filter((card)=> {return !!(card.image_uris)}).map(card=> card.image_uris.small)      
      this.setState({cardArray: [...this.state.cardArray, ...mappedCardArray]})
      if (res.data.has_more) {
        this.setState({nextPage: res.data.next_page, hasMore: res.data.has_more})
      }
      else {
        this.setState({nextPage: null, hasMore: false})
      }
      this.setState({loading: false}) 
    })
    .catch(error=> {
      console.log(error)
      this.setState({loading: false})
      this.setState({error: true})
    })
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y
    if (this.state.prevY > y) {
      const lastCard = this.state.cardArray[this.state.cardArray.length - 1]
      const curPage = lastCard; 
      if(this.state.hasMore && !(this.state.loading)) {
        this.getRequest()
      }
      this.setState({ page: curPage })
    }
    this.setState({ prevY: y })
  }

  render() {
    return (
      <div>
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select a color:
            <select value={this.state.color} onChange={this.handleChangeColor}>
              <option value="white">white</option>
              <option value="red">red</option>
              <option value="black">black</option>
              <option value="blue">blue</option>
              <option value="green">green</option>
            </select>
          </label>
          <label>
              Converted mana cost:
              <input type="text" value={this.state.CMC} onChange={this.handleChangeCMC} />
          </label>
          <input type="submit" value="Search"/>
        </form>
      </div>
      
        <div>
          <Card cards={this.state.cardArray}/>
        </div>
        <div ref={loadingRef => (this.loadingRef = loadingRef)}>
          {this.state.loading && 'Loading...'}
        </div>
        <div>
          {this.state.error && 'An error occurred!'}
        </div>
     </div>
    );
  }; 
}
export default App