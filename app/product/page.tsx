'use client'

import { useState } from 'react'

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState('m')
  const [selectedColor, setSelectedColor] = useState('cream')

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
        {/* 左侧：产品图片 */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <p className="text-slate-500 dark:text-slate-400">主产品图片</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                className={`aspect-square rounded-lg overflow-hidden ${
                  i === 1 ? 'border-2 border-primary' : 'opacity-70 hover:opacity-100'
                } transition-opacity focus:outline-none focus:ring-2 focus:ring-primary bg-slate-200 dark:bg-slate-800 flex items-center justify-center`}
              >
                <p className="text-xs text-slate-500 dark:text-slate-400">图 {i}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 右侧：产品信息 */}
        <div className="flex flex-col">
          <div className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">
            <a className="hover:text-primary" href="#">Dogs</a>
            <span> / </span>
            <a className="hover:text-primary" href="#">Beds</a>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">Luxury Orthopedic Pet Bed</h1>
          <p className="text-sm md:text-md text-slate-500 dark:text-slate-400 mt-2">by The Pet Atelier</p>

          {/* 评分 */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex text-primary">
              {[...Array(4)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" opacity="0.5" />
              </svg>
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">(4.5)</span>
            <a className="text-sm font-medium text-primary hover:underline ml-2" href="#reviews">Read all 28 reviews</a>
          </div>

          <p className="text-2xl md:text-3xl font-bold text-primary mt-4">$149.00</p>

          {/* 尺寸选择 */}
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Size</h3>
            <div className="flex flex-wrap gap-3 mt-3">
              {['Small', 'Medium', 'Large'].map((size, index) => (
                <label key={size} className="cursor-pointer">
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value={['s', 'm', 'l'][index]}
                    checked={selectedSize === ['s', 'm', 'l'][index]}
                    onChange={() => setSelectedSize(['s', 'm', 'l'][index])}
                  />
                  <div className="px-5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary dark:peer-checked:border-primary transition-all duration-200">
                    {size}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 颜色选择 */}
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Color</h3>
            <div className="flex flex-wrap gap-4 mt-3">
              {[
                { name: 'cream', color: '#f2f2f2' },
                { name: 'grey', color: '#d9d9d9' },
                { name: 'charcoal', color: '#a6a6a6' },
              ].map((item) => (
                <label key={item.name} className="cursor-pointer">
                  <input
                    className="sr-only peer"
                    name="color"
                    type="radio"
                    value={item.name}
                    checked={selectedColor === item.name}
                    onChange={() => setSelectedColor(item.name)}
                  />
                  <div
                    className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark ring-transparent peer-checked:ring-primary transition-all duration-200"
                    style={{ backgroundColor: item.color }}
                  ></div>
                </label>
              ))}
            </div>
          </div>

          {/* 加入购物车 */}
          <div className="mt-10">
            <a href="/checkout" className="block w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center">
              Add to Cart
            </a>
          </div>

          {/* 产品详情 */}
          <div className="mt-12 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Product Details</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                This luxurious dog bed is crafted with the finest materials to provide your furry friend with the ultimate comfort and style. Made with a durable, yet soft fabric, it features a removable, machine-washable cover for easy cleaning.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Materials & Craftsmanship</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Our dog beds are made with high-quality, pet-safe materials. The outer cover is made from a durable, stain-resistant fabric, while the inner cushion is filled with a plush, hypoallergenic filling.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 用户评价 */}
      <section className="mt-16 md:mt-24 px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white mb-6 md:mb-8">Hear From Our Happy Customers!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md flex flex-col items-center justify-center">
            <div className="w-full aspect-video rounded-lg overflow-hidden mb-4 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">视频评价 1</p>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">"Truly a game-changer!"</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              "My dog has never slept better since we got this bed. It's truly a game-changer for his comfort and our peace of mind."
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">— Jessica M.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md flex flex-col items-center justify-center">
            <div className="w-full aspect-video rounded-lg overflow-hidden mb-4 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">视频评价 2</p>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">"Quality that lasts!"</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              "The craftsmanship is superb, and it stands up to daily use. I highly recommend this bed for its durability and design."
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">— David S.</p>
          </div>
        </div>
      </section>

      {/* 客户评价 */}
      <div className="mt-16 md:mt-24 px-4 sm:px-6" id="reviews">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white">Customer Reviews</h2>
        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[
            { rating: 5, title: 'Amazing Comfort!', content: 'My dog absolutely loves this bed! It&apos;s so soft and supportive, and he sleeps like a baby in it.', author: 'Sarah L.', date: 'January 15, 2024' },
            { rating: 4.5, title: 'Great Quality, Easy to Clean', content: 'Very happy with this purchase. The bed is well-made and the removable cover makes cleaning a breeze.', author: 'Mark T.', date: 'January 10, 2024' },
            { rating: 5, title: 'My cat is obsessed!', content: 'Even though it&apos;s a dog bed, my cat claimed it immediately. She loves to curl up in it for her naps.', author: 'Emily R.', date: 'January 8, 2024' },
            { rating: 4, title: 'Good Value', content: 'It&apos;s a really nice bed for the price. My older dog seems more comfortable now. Wish there were more color options.', author: 'John D.', date: 'January 3, 2024' },
          ].map((review, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-3">
                <div className="flex text-primary">
                  {[...Array(Math.floor(review.rating))].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  {review.rating % 1 !== 0 && (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" opacity="0.5" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">{review.rating}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{review.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{review.content}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">— {review.author} on {review.date}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors">
            Write a Review
          </button>
        </div>
      </div>

      {/* 推荐产品 */}
      <div className="mt-16 md:mt-24 px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white">You Might Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-6 md:mt-8">
          {[
            { name: 'Interactive Dog Toy', price: 29 },
            { name: 'Ceramic Dog Bowl', price: 49 },
            { name: 'Leather Dog Leash', price: 79 },
            { name: 'Cozy Knit Sweater', price: 59 },
          ].map((product, index) => (
            <div key={index} className="flex flex-col gap-4 group">
              <div className="overflow-hidden rounded-lg">
                <div className="w-full aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg transform group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400">Product {index + 1}</p>
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
