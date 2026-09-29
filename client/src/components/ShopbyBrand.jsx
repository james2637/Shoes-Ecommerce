import React from 'react'
import { assets } from '../assets/assets'

const brands = [
  { key: 'FILA', src: assets.fila },
  { key: 'VANS', src: assets.vans },
  { key: 'addidas', src: assets.addidas },
  { key: 'new balance', src: assets.newbalance },
  { key: 'Under Armour', src: assets.under },
  { key: 'Reebok', src: assets.rebook },
  { key: 'CHANEL', src: assets.channel },
  { key: 'PUMA', src: assets.puma }
]

export default function ShopbyBrand() {
  return (
    <section className="pt-12 bg-gray-100">
      <div className="px-16 mx-auto">
        <h3 className="text-center text-3xl text-gray-700 font-semibold mb-8">Trusted By Top Companies</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {brands.map((b) => (
            <div
              key={b.key}
              className="bg-gray-200 border border-gray-200 rounded-2xl p-8 flex items-center justify-center shadow-sm"
            >
              {b.src ? (
                <img src={b.src} alt={b.key} className="w-28 h-28 object-contain hover:scale-[1.4] transition-transform duration-300" />
              ) : (
                <div className="text-center">
                  <div className="text-white font-bold text-sm sm:text-base md:text-lg tracking-wide">
                    {b.key}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
