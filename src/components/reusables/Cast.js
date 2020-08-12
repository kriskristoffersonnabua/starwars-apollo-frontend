import React, { Component, useState, useEffect } from 'react'
import movieCast from '../../movieCast'

import {withClient} from '../../api/AppoloContext';
import { gql } from '@apollo/client';

const Cast = (props) => {
  const {client} = props.context
  const [characters, setCharacters] = useState([])

  //fetch characters
  useEffect(() => {
    client.query({
      query: gql`
        query {
          film(id: "${props.match.params.id}") {
            characterConnection {
              characters {
                name
              }
            }
          }
        }
      `
    }).then(result => {
      const {data:{film:{characterConnection:{characters}}}} = result
      setCharacters(characters)
    })
  },[])

  console.log(characters)
  
  return (
    <div className="cast-container">
      <div className="cast-list">
        {characters.map(character => (
          <div className="cast" key={character.name}>
            <img className="castImage" alt={character.name} src={`https://api.adorable.io/avatars/220/${character.name}`}  />
            <h6>{character.name}</h6>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withClient(Cast)
