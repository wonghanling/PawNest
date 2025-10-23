'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'

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
      <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Shop All</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {currentProducts.map((product, index) => {
              // 计算全局索引（考虑当前页码）
              const globalIndex = (currentPage - 1) * productsPerPage + index

              // 图片映射表 (使用优化后的WebP格式)
              const imageMap: { [key: number]: string } = {}

              // 1-120 按顺序映射到商品位置 0-119
              for (let i = 1; i <= 120; i++) {
                imageMap[i - 1] = `/optimized/${i}.webp`
              }

              const hasImage = imageMap[globalIndex]
              const useWhiteBg = globalIndex >= 0 && globalIndex <= 119 // 商品位置 1-120 使用白色背景

              return (
                <div key={product.id} className="group relative">
                  <div className={`aspect-square w-full overflow-hidden rounded-lg flex items-center justify-center ${
                    useWhiteBg ? 'bg-white' : 'bg-gray-100'
                  }`}>
                    {hasImage ? (
                      <Image
                        src={imageMap[globalIndex]}
                        alt={product.name}
                        width={400}
                        height={400}
                        className={`w-full h-full ${globalIndex === 0 ? 'object-cover' : 'object-contain'} group-hover:scale-105 transition-transform duration-200`}
                        loading={globalIndex < 8 ? 'eager' : 'lazy'}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Txz7/ACMZUqvSLSPJHHhkVpnHluxs5l/5+r/zZHfPafbhFNZ5EHCQcmnSAlQYl3JmP7m/2+nKQ9k3sxb"
                      />
                    ) : (
                      <div className="text-slate-400 text-sm">Product {product.displayNumber}</div>
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
    </main>
  )
}
