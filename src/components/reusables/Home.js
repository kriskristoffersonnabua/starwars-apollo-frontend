import React, { Component, useEffect, useState } from 'react'

import movieList from '../../movieList'
import { Link } from 'react-router-dom'
import {withClient} from '../../api/AppoloContext';
import { gql } from '@apollo/client';

const Home = (props) => {
  const {client} = props.context
  const [films, setFilms] = useState([])
  
  //fetch movies
  useEffect(() => {
    client.query({
      query: gql`
        query {
          allFilms {
            films {
              id
              title
              releaseDate
            }
          }
        }
      `
    }).then(result => {
      const {data:{allFilms:{films}}} = result
      setFilms(films);
    })
  },[])

  
  const movie = movieList[0];
  return (
    <div className="movie-list">
      {films.map(film => (
        <div className="movie" key={film.id}>
          <img class="movie-thumbnail" 
          src={"https://lumiere-a.akamaihd.net/v1/images/og-generic_02031d2b.png?region=0%2C0%2C1200%2C1200"} 
          alt={film.title} />
          <div className="info">
            <h2>
              <Link to={`movie/${film.id}`}>{film.title}</Link>
            </h2>
            <p>{movie.description}</p>
            <span className="year">{movie.year}</span>
            <span className="score">{movie.score}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default withClient(Home);
