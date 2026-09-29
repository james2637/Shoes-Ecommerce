import React from 'react'
import { assets } from '../assets/assets'

export default function CategoryGrid() {

    const shoes = [
        {
            id: 1,
            name: "The Legacy",
            price: "$120",
            image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5"
        },
        {
            id: 2,
            name: "The Marshal",
            price: "$140",
            image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28"
        },
        {
            id: 3,
            name: "The Apex",
            price: "$160",
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"
        },
        {
            id: 4,
            name: "The Runner",
            price: "$150",
            image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb"
        }
    ];

    return (
        <section className="py-4 bg-gray-50">
            <div className="max-w-9xl mx-auto ">
                <div className="py-4 ">
 <p className='text-3xl font-bold text-gray-800 text-center'>Women's Collections</p>
                    <div className="flex gap-2">

                        {/* GRID OF SHOES */}
                        <div className="flex-1 grid grid-cols-2 gap-3 my-4 md:my-8 ml-3">
                            {shoes.map((shoe) => (
                                <div
                                    key={shoe.id}
                                    className="relative rounded-2xl overflow-hidden group cursor-pointer"
                                >
                                    {/* Image */}
                                    <img
                                        src={`${shoe.image}?auto=format&fit=crop&w=800&q=80`}
                                        alt={shoe.name}
                                        className="w-full h-[150px] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-[#c89b7b]/30 group-hover:bg-[#c89b7b]/30 transition duration-300" />

                                    {/* Text */}
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-xl font-semibold">{shoe.name}</h3>
                                        <p className="text-sm opacity-90">{shoe.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* LEFT CONTENT */}
                        <div className="w-[65%] h-[450px] p-4 md:p-8 z-10 flex flex-col justify-center bg-gradient-to-r from-[#c89b7b] to-[#f5efe9] rounded-2xl my-8 mx-3">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight relative bottom-[-220px]">
                                Performance Meets Comfort
                            </h2>

                            <p className="mt-6 text-white max-w-xl text-base md:text-lg relative bottom-[-260px]">
                                Explore our collection of high-performance activewear designed to keep you comfortable and stylish during every workout. From moisture-wicking fabrics to ergonomic designs, our gear is built to enhance your performance and help you reach your fitness goals with confidence.
                            </p>

                            <p className="mt-4 font-semibold text-lg text-white relative bottom-[-260px]">
                                Specifically designed for athletes and fitness enthusiasts
                            </p>

                            <button className="mt-8 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition duration-300 hover:scale-105 w-fit relative bottom-[-280px]">
                                Shop Now
                            </button>
                            {/* RIGHT IMAGE */}
                            <div className=" relative top-[-120px] right-[-300px] h-[550px] flex justify-center items-end">
                                <img
                                    src={assets.Hero2}
                                    alt="Hero Shoe"
                                    className="h-full object-contain"
                                />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    )
}
