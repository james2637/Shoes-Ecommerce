import React from 'react'
import { assets } from '../assets/assets'
import { Truck, Clock, Award } from 'lucide-react'

const OurPolicy = () => {
  return (
    <div className='py-16 px-4 bg-gray-100'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>We Supported By</h2>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
        {/* Card 1 */}
        <div className='bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300'>
          <div className='flex justify-center mb-4'>
            <Truck size={40} className='text-gray-900' />
          </div>
          <h3 className='font-bold text-lg md:text-xl text-gray-900 mb-2 tracking-wider'>FAST & FREE SHIPPING</h3>
          <p className='text-gray-600 text-sm md:text-base'>Every single order ships for free. No extra credit need.</p>
        </div>

        {/* Card 2 */}
        <div className='bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300'>
          <div className='flex justify-center mb-4'>
            <Clock size={40} className='text-gray-900' />
          </div>
          <h3 className='font-bold text-lg md:text-xl text-gray-900 mb-2 tracking-wider'>30 DAYS RETURNS POLICY</h3>
          <p className='text-gray-600 text-sm md:text-base'>Product returns are accepted within 30 days.</p>
        </div>

        {/* Card 3 */}
        <div className='bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300'>
          <div className='flex justify-center mb-4'>
            <Award size={40} className='text-gray-900' />
          </div>
          <h3 className='font-bold text-lg md:text-xl text-gray-900 mb-2 tracking-wider'>TOP QUALITY PRODUCTS</h3>
          <p className='text-gray-600 text-sm md:text-base'>We always provide high quality shoes</p>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy