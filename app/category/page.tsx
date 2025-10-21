'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function CategoryPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { addToCart } = useCart()

  // 生成产品数据（每页8个产品）
  const productsPerPage = 8
  const totalProducts = 152 // 19页 x 8个产品（足够容纳88个图片）

  const products = [
    { name: 'Cat Bed Cushion', price: 75 },
    { name: 'Organic Cotton Cat Bed', price: 120 },
    { name: 'Hand-Knitted Pet Sweater', price: 90 },
    { name: 'Silk Pet Bandana', price: 45 },
    { name: 'Designer Dog Bowl', price: 60 },
    { name: 'Plush Cat Tree', price: 250 },
    { name: 'Travel Pet Carrier', price: 150 },
    { name: 'Interactive Pet Toy', price: 30 },
  ]

  // 获取当前页的产品
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage
    return Array.from({ length: productsPerPage }, (_, i) => {
      const productIndex = (startIndex + i) % products.length
      const productNumber = startIndex + i + 1
      return {
        ...products[productIndex],
        id: productNumber,
        displayNumber: productNumber
      }
    })
  }

  const currentProducts = getCurrentPageProducts()

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-8">
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
        {/* 左侧过滤器 */}
        <aside className="w-full lg:w-1/4 xl:w-1/5 space-y-6 md:space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Filter</h2>
            <div className="space-y-6">
              {/* 价格滑块 */}
              <div>
                <h3 className="font-semibold mb-3">Price</h3>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between text-sm text-muted-light dark:text-muted-dark">
                    <div>$0</div>
                    <div>$1000</div>
                  </div>
                  <div className="h-2 rounded-full bg-border-light dark:bg-border-dark">
                    <div className="h-2 rounded-full bg-primary" style={{width: '75%', marginLeft: '10%'}}></div>
                    <div className="absolute -ml-2 -mt-3.5 h-4 w-4 rounded-full bg-primary border-2 border-background-light dark:border-background-dark" style={{left: '10%'}}></div>
                    <div className="absolute -ml-2 -mt-3.5 h-4 w-4 rounded-full bg-primary border-2 border-background-light dark:border-background-dark" style={{left: '85%'}}></div>
                  </div>
                </div>
              </div>

              {/* 产品类型 */}
              <div>
                <h3 className="font-semibold mb-3">Product Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input className="h-4 w-4 rounded border-border-light dark:border-border-dark text-blue-600 focus:ring-blue-500/50 bg-background-light dark:bg-background-dark" type="checkbox"/>
                    <div className="text-sm">
                      <div className="font-medium">Comfort Living</div>
                      <div className="text-xs text-muted-light dark:text-muted-dark">舒适生活</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input className="h-4 w-4 rounded border-border-light dark:border-border-dark text-blue-600 focus:ring-blue-500/50 bg-background-light dark:bg-background-dark" type="checkbox"/>
                    <div className="text-sm">
                      <div className="font-medium">Travel & Safety</div>
                      <div className="text-xs text-muted-light dark:text-muted-dark">出行与安全</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input className="h-4 w-4 rounded border-border-light dark:border-border-dark text-blue-600 focus:ring-blue-500/50 bg-background-light dark:bg-background-dark" type="checkbox"/>
                    <div className="text-sm">
                      <div className="font-medium">Care & Hygiene</div>
                      <div className="text-xs text-muted-light dark:text-muted-dark">清洁与护理</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input className="h-4 w-4 rounded border-border-light dark:border-border-dark text-blue-600 focus:ring-blue-500/50 bg-background-light dark:bg-background-dark" type="checkbox"/>
                    <div className="text-sm">
                      <div className="font-medium">Toys & Play</div>
                      <div className="text-xs text-muted-light dark:text-muted-dark">玩具与互动</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input className="h-4 w-4 rounded border-border-light dark:border-border-dark text-blue-600 focus:ring-blue-500/50 bg-background-light dark:bg-background-dark" type="checkbox"/>
                    <div className="text-sm">
                      <div className="font-medium">Smart & Home</div>
                      <div className="text-xs text-muted-light dark:text-muted-dark">智能与家居</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input className="h-4 w-4 rounded border-border-light dark:border-border-dark text-blue-600 focus:ring-blue-500/50 bg-background-light dark:bg-background-dark" type="checkbox"/>
                    <div className="text-sm">
                      <div className="font-medium">Style & Wear</div>
                      <div className="text-xs text-muted-light dark:text-muted-dark">时尚穿搭</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* 右侧产品列表 */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Shop All</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {currentProducts.map((product, index) => {
              // 计算全局索引（考虑当前页码）
              const globalIndex = (currentPage - 1) * productsPerPage + index

              // 图片映射表
              const imageMap: { [key: number]: string } = {
                0: '/6.jpg',
                1: '/16.jpg',
                2: '/17.jpg',
                3: '/18.jpg',
                4: '/19.jpg',
                5: '/宠物房子1.jpg',
                6: '/宠物房子2.jpg',
                7: '/20.jpg',
              }

              // 20-45的图片 (位置8-33)
              for (let i = 20; i <= 45; i++) {
                imageMap[i - 12] = `/${i}.jpg`
              }

              // 46-91的图片 (从位置34开始，即第35个商品)
              for (let i = 46; i <= 91; i++) {
                imageMap[i - 12] = `/${i}.jpg`
              }

              // 特殊位置：第10页下面一排放置88-91的图片
              imageMap[76] = '/88.jpg'  // 第10页第5个位置 (globalIndex 76)
              imageMap[77] = '/89.jpg'  // 第10页第6个位置 (globalIndex 77)
              imageMap[78] = '/90.jpg'  // 第10页第7个位置 (globalIndex 78)
              imageMap[79] = '/91.jpg'  // 第10页第8个位置 (globalIndex 79)

              const hasImage = imageMap[globalIndex]
              const useWhiteBg = globalIndex >= 1 && globalIndex <= 79 // 更新白色背景范围

              return (
                <div key={product.id} className="group relative">
                  <div className={`aspect-square w-full overflow-hidden rounded-lg flex items-center justify-center ${
                    useWhiteBg ? 'bg-white' : 'bg-slate-200 dark:bg-slate-800'
                  }`}>
                    {hasImage ? (
                      <img
                        src={imageMap[globalIndex]}
                        alt={product.name}
                        className={`w-full h-full ${globalIndex === 0 ? 'object-cover' : 'object-contain'} group-hover:scale-105 transition-transform duration-300`}
                      />
                    ) : (
                      <p className="text-slate-500 dark:text-slate-400">Product {product.displayNumber}</p>
                    )}
                  </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-xs md:text-sm font-medium">
                      <a href="/product" className="hover:text-blue-600 transition-colors">{product.name}</a>
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-muted-light dark:text-muted-dark">${product.price}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    addToCart({ id: product.id, name: product.name, price: product.price })
                  }}
                  className="absolute bottom-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-700"
                >
                  <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
                </button>
              </div>
            )
            })}
          </div>

          {/* 翻页导航 */}
          <div className="mt-12 md:mt-16 space-y-4 md:space-y-6">
            {/* 页码指示器 */}
            <div className="flex items-center justify-center gap-2">
              {[...Array(19)].map((_, index) => {
                const pageNum = index + 1
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                      currentPage === pageNum
                        ? 'w-6 md:w-8 bg-primary'
                        : 'w-1.5 md:w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                  />
                )
              })}
            </div>

            {/* 上一页/下一页按钮 */}
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="group flex items-center gap-1 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-slate-300 dark:border-slate-600 hover:border-primary dark:hover:border-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-300 dark:disabled:hover:border-slate-600"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 group-hover:text-primary transition-colors"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                </svg>
                <span className="text-sm md:font-medium group-hover:text-primary transition-colors hidden sm:inline">Previous</span>
              </button>

              <div className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                <span className="text-xs md:text-sm font-semibold">
                  <span className="hidden sm:inline">Page </span><span className="text-primary">{currentPage}</span> <span className="hidden sm:inline">of 19</span><span className="sm:hidden">/ 19</span>
                </span>
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(19, prev + 1))}
                disabled={currentPage === 19}
                className="group flex items-center gap-1 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-slate-300 dark:border-slate-600 hover:border-primary dark:hover:border-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-300 dark:disabled:hover:border-slate-600"
              >
                <span className="text-sm md:font-medium group-hover:text-primary transition-colors hidden sm:inline">Next</span>
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 group-hover:text-primary transition-colors"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </button>
            </div>

            {/* 快速跳转 */}
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <span className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Quick jump:</span>
              <div className="flex gap-2">
                {[1, 5, 10, 15, 19].map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2.5 md:px-3 py-1 text-xs md:text-sm rounded-md transition-all ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
