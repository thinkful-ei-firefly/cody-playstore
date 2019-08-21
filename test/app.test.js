const app = require('../app')
const { expect } = require('chai')
const request = require('supertest')

describe('GET /apps test', () => {
  // test that it returns 400 error when param on sort
  it('sort param is empty returns 400', () => {
    return request(app)
      .get('/apps')
      .query({ sort: null })
      .expect(400)
  })
  // sort sorts properly by rating
  it('returns array of apps in order by RATING checks 3', () => {
    return request(app)
    .get('/apps')
    .query({sort: 'rating'})
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array')
      expect(res.body[0].App).to.equal('Solitaire')
      expect(res.body[7].App).to.equal('Sonic Dash')
      expect(res.body[19].App).to.equal('Block Puzzle Classic Legend !')
    })
  })

  // sort sorts properly by app name
  it('returns array of apps in order by NAME checks 3', () => {
    return request(app)
    .get('/apps')
    .query({sort: 'app'})
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array')
      expect(res.body[0].App).to.equal('Angry Birds Rio')
      expect(res.body[7].App).to.equal('Clash of Clans')
      expect(res.body[19].App).to.equal('slither.io')
    })
  })

  // genres filters properly by genres 
  it('returns array of apps filtered by Genre', () => {
    return request(app)
    .get('/apps')
    .query({genres: 'Casual'})
    .then(res => expect(200, res.body.length === 5)  
    )
  })
})
