import React from 'react'
import WebLayout from '../layout/WebLayout'
import Hero from '../components/Hero'
import Explore from '../components/Explore'
import Benefits from '../components/Benefits'
import TravelDeals from '../components/TravelDeals'
import Reviews from '../components/Reviews'
import FAQ from '../components/FAQ'
import BookAdv from '../components/BookAdv'

const Home = () => {
  return (
    <WebLayout>
      <Hero />
      <Explore />
      <Benefits />
      <BookAdv />
      <TravelDeals />
      <Reviews />
      <FAQ />
    </WebLayout>
  )
}


export default Home
