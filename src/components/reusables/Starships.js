import React, { Component, useState, useEffect } from 'react'
import movieCast from '../../movieCast'

import {withClient} from '../../api/AppoloContext';
import { gql } from '@apollo/client';

const Starships = (props) => {
  const {client} = props.context
  const [starships, setStarships] = useState([])

  //fetch starships
  useEffect(() => {
    client.query({
      query: gql`
        query {
          film(id: "${props.match.params.id}") {
            starshipConnection {
              starships {
                name
                crew
                passengers
              }
            }
          }
        }
      `
    }).then(result => {
      const {data:{film:{starshipConnection:{starships}}}} = result
      setStarships(starships)
    })
  },[])

  console.log(starships)
  
  return (
    <div className="cast-container">
      <div className="cast-list">
        {starships.map(starship => (
          <div className="cast" key={starship.name}>
            <img className="castImage" alt={starship.name} 
            src={"https://www.denofgeek.com/wp-content/uploads/2019/02/star-wars-rebels-ghost.png"}  />
            <div>
              <h5 style={{marginLeft: 10, marginBottom: 5, marginTop:0}}>{starship.name}</h5>
              <span style={{marginLeft: 10,marginRight: 10}}>crew: {starship.crew}</span>
              <span>passengers: {starship.passengers}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withClient(Starships)
