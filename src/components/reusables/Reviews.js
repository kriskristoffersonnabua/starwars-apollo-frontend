import React, { Component } from 'react'
import movieReviews from '../../movieReviews'

export default () => {
  return (
    <div className="reviews-container">
      <div className="reviews-list">
        {movieReviews.map(review => (
          <div className="review" key={review.title}>
            <header>
              <p className="score">
                <strong>{review.score}</strong>/10
              </p>
              <div>
                <h6>{review.title}</h6>
                <span>{review.user}</span>
              </div>
            </header>
            <p className="content">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
