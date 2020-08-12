import React, { Component, useState, useEffect } from 'react'

import movieInfo from '../../movieInfo'
import Cast from './Cast'
import Starships from './Starships'

import {withClient} from '../../api/AppoloContext';
import { gql } from '@apollo/client';

const Reviews = React.lazy(() => import('./Reviews'))

const Movie = (props) => {
  const {client} = props.context
  const [activeTab, setActiveTab] = useState('cast')
  const [film, setFilm] = useState({})

  //fetch movie
  useEffect(() => {
    client.query({
      query: gql`
        query {
          film(id: "${props.match.params.id}") {
            id
            title
            releaseDate
          }
        }
      `
    }).then(result => {
      const {data:{film}} = result
      setFilm(film);
    })
  },[])

  const { id } = props.match.params
  const movie = movieInfo['fighting-with-my-family']

  if (!movie) {
    return <h1>Movie not found!</h1>
  }

  return (
    <div className="movie-page">
      <div className="movie">
        <img className="movie-thumbnail"
        src={"https://lumiere-a.akamaihd.net/v1/images/og-generic_02031d2b.png?region=0%2C0%2C1200%2C1200"} />
        <div className="info">
          <h2>{film.title}</h2>
          <p>{movie.description}</p>
          <span className="year">{movie.year}</span>
          <span className="score">{movie.score}</span>
        </div>
      </div>
      <div className="tabs">
        <button
          className={activeTab === 'cast' ? 'active' : null}
          onClick={() => setActiveTab('cast')}
        >
          Characters
        </button>
        <button
          className={activeTab === 'starships' ? 'active' : null}
          onClick={() => setActiveTab('starships')}
        >
          Starships
        </button>
        <button
          className={activeTab === 'reviews' ? 'active' : null}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>
      <React.Suspense fallback={<div>Loadingzz...</div>}>
        <div>
          {activeTab === 'cast' && <Cast match={props.match}/>}
          {activeTab === 'starships' && <Starships match={props.match}/>}
          {activeTab === 'reviews' && <Reviews />}
        </div>
      </React.Suspense>
    </div>
  )
}

export default withClient(Movie)
