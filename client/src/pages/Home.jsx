import React from 'react'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import ShopbyBrand from '../components/ShopbyBrand'
import Hero from '../components/Hero'
import CategoryGrid from '../components/CategoryGrid'


const Home = () => {
  return (
    <div>
      <Hero />
      <ShopbyBrand />
      <CategoryGrid />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      {/* <NewsLetterBox /> */}
      
    </div>
  )
}

export default Home