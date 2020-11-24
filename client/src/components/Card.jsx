import React from 'react'

const Card = (props) => {
  const cardList = props.cards
  const mappedCards = cardList.map((card, i)=>
  <li key={i}> 
  <div className="card-container"><img src={card}></img>{i+1}</div>
  </li>)
  return (
    <ul>
      {mappedCards}
    </ul>
  )
}

export default Card