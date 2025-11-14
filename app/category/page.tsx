'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'

function CategoryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // 直接从URL初始化页码，避免闪烁
  const initialPage = parseInt(searchParams.get('page') || '1')
  const [currentPage, setCurrentPage] = useState(initialPage)

  // 监听URL变化
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1')
    if (page !== currentPage) {
      setCurrentPage(page)
    }
  }, [searchParams])

  // 更新页码并保存到URL
  const changePage = (newPage: number) => {
    setCurrentPage(newPage)
    router.push(`/category?page=${newPage}`)
  }

  // 生成产品数据（每页8个产品）
  const productsPerPage = 8
  const totalProducts = 152 // 19页 x 8个产品（足够容纳88个图片）

  const products = [
    { name: 'Graphene Waterproof Pet Down Jacket', price: 39, id: 1 },
    { name: 'Pet Waterproof Windbreaker', price: 17, id: 2 },
    { name: 'Wedding Celebration Pet Clothing', price: 19, id: 3 },
    { name: 'Pet Winter Cotton Coat', price: 22, id: 4 },
    { name: 'Christmas Pet Costume', price: 13, id: 5 },
    { name: 'Pet Pajamas', price: 14, id: 6 },
    { name: 'Winter Striped Clothing', price: 19, id: 7 },
    { name: 'Pet Cute Vest', price: 16, id: 8 },
    { name: 'Pet Bed', price: 39, id: 9 },
    { name: 'Pet Bed', price: 31, id: 10 },
    { name: 'Pet Mat', price: 34, id: 11 },
    { name: 'Pet Tent', price: 125, id: 12 },
    { name: 'Pet Dryer Box', price: 73.9, id: 13 },
    { name: 'Panoramic Breathable Pet Backpack', price: 22, id: 14 },
    { name: 'Tree Nest', price: 135, id: 15 },
    { name: 'Pet Feeding & Drinking Supplies', price: 11, id: 16 },
    { name: 'Pet Nail Clipper', price: 4, id: 17 },
    { name: 'Pet Automatic Water Dispenser', price: 11.9, id: 18 },
    { name: 'Ferris Wheel Cat Scratch Ball', price: 13, id: 19 },
    { name: 'Pet Hair Dryer and Deshedding Tool', price: 85, id: 20 },
    { name: 'Pet Premium Polished Bowl', price: 6.9, id: 21 },
    { name: 'Cat Scratching Post with Double Layer House', price: 13, id: 22 },
    { name: 'Fashion Pet Carrier Bag', price: 34, id: 23 },
    { name: 'Pet Outdoor Shoulder Bag', price: 15, id: 24 },
    { name: 'Pet Product 25', price: '20-78', id: 25 },
    { name: 'Pet Anti-Bite Muzzle', price: 12.7, id: 26 },
    { name: 'Pet Rolling Suitcase', price: 145, id: 27 },
    { name: 'Automatic Water Fountain', price: 21, id: 28 },
    { name: 'Folding Tent', price: '18.8-37', id: 29 },
    { name: 'Cat Leash', price: 14.5, id: 30 },
    { name: 'Cat Climbing Frame', price: '20-25', id: 31 },
    { name: 'Cat Castle Cat Cage', price: '128-165', id: 32 },
    { name: 'Snack Freeze-Dried Storage', price: 13.6, id: 33 },
    { name: 'Space Capsule Backpack', price: 55, id: 34 },
    { name: 'Chest Pet Carrier', price: '14.5-18.5', id: 35 },
    { name: 'Pet Villa', price: '37.5-50.8', id: 36 },
    { name: 'Small Shoulder Bag', price: 228, id: 37 },
    { name: 'Cat Handbag', price: '29-41', id: 38 },
    { name: 'Pet Scoop', price: 3, id: 39 },
    { name: 'Pet Hood', price: '12.87-16.83', id: 40 },
    { name: 'Cat Litter Box', price: 16.56, id: 41 },
    { name: 'Four Season Pet Bed', price: '10.88-27.88', id: 42 },
    { name: 'Adjustable Harness Leash', price: 4, id: 43 },
    { name: 'Cat Carrier', price: 55, id: 44 },
    { name: 'Cat Scratching Board', price: 25, id: 45 },
    { name: 'Cat Feeder Water Dispenser', price: 16.5, id: 46 },
    { name: 'Pet Stroller', price: 138, id: 47 },
    { name: 'Pet Nest', price: '40-61', id: 48 },
    { name: 'Pet Mat', price: '3.5-18', id: 49 },
    { name: 'Pet Thick Mat', price: '3.9-18', id: 50 },
    { name: 'Pet Rolling Suitcase', price: 455, id: 51 },
    { name: 'Pet Folding Stroller', price: 74, id: 52 },
    { name: 'Halloween Pet Costume', price: 31, id: 53 },
    { name: 'Pet Stroller', price: 104, id: 54 },
    { name: 'Pet Leash', price: 15, id: 55 },
    { name: 'Pet Leash', price: 14, id: 56 },
    { name: 'Reflective Harness Leash', price: '7-11.79', id: 57 },
    { name: 'Vintage Chest Harness Leash', price: 22.8, id: 58 },
    { name: 'Harness Leash Clothing', price: 16.64, id: 59 },
    { name: 'Korean Denim Harness Clothing', price: 15, id: 60 },
    { name: 'Tactical Chest Harness Clothing', price: 35, id: 61 },
    { name: 'Spring Summer Vest Harness', price: 12.8, id: 62 },
    { name: 'Pet Clothing', price: 22, id: 63 },
    { name: 'Pet Overalls', price: 22.8, id: 64 },
    { name: 'Pet Rolling Suitcase', price: 105, id: 65 },
    { name: 'Cat Handbag', price: '35-45', id: 66 },
    { name: 'Fashion Pet Carrier Bag', price: 22, id: 67 },
    { name: 'Pet Bag', price: 36, id: 68 },
    { name: 'Pet Backpack Trolley', price: '87-147', id: 69 },
    { name: 'Pet Grooming Clipper', price: 41, id: 70 },
    { name: 'Pet Toothbrush Set', price: 6.3, id: 71 },
    { name: 'Pet Nail Clipper', price: 4, id: 72 },
    { name: 'Pet Spray Massage Brush', price: 13, id: 73 },
    { name: 'Cat Deodorizing Care Bath Set', price: 51, id: 74 },
    { name: 'Dog Deodorizing Care Bath Set', price: 51.5, id: 75 },
    { name: 'Pet Fragrance', price: 10, id: 76 },
    { name: 'Dog Bath Liquid', price: 15.9, id: 77 },
    { name: 'Cat Bath Liquid', price: 11.9, id: 78 },
    { name: 'Electric Nail Grinder', price: 25.5, id: 79 },
    { name: 'Pet Wipes', price: 11.8, id: 80 },
    { name: 'Dog Waterproof Raincoat', price: '54-82', id: 81 },
    { name: 'Pet Cotton Coat', price: '30.8-41.8', id: 82 },
    { name: 'Pet Raincoat', price: '24-50', id: 83 },
    { name: 'Pet Raincoat', price: '27-37', id: 84 },
    { name: 'Cat Striped Sweater', price: 6.5, id: 85 },
    { name: 'Assault Raincoat', price: '68-123', id: 86 },
    { name: 'Pet Grooming Kit', price: 35.8, id: 87 },
    { name: 'Pet Warm Sweater', price: 32, id: 88 },
    { name: 'Winter Warm Thick Cotton Coat', price: 18.8, id: 89 },
    { name: 'Pet Outdoor Stroller', price: 210, id: 90 },
    { name: 'Pet Tent', price: 85, id: 91 },
    { name: 'Assault Raincoat', price: 205, id: 92 },
    { name: 'Pet Tent', price: '28-43', id: 93 },
    { name: 'Pet Triangle Tent', price: 52, id: 94 },
    { name: 'Pet Triangle Tent with Mat', price: 62, id: 95 },
    { name: 'Pet Triangle Tent with Mat', price: 62, id: 96 },
    { name: 'Pet Foam Steps', price: '48.51-83.16', id: 97 },
    { name: 'Anti-Spill Bowl', price: 12.5, id: 98 },
    { name: 'Double Layer Pet Stroller', price: 260, id: 99 },
    { name: 'Pet Wipes', price: 3, id: 100 },
    { name: 'Expandable Pet Backpack', price: 35, id: 101 },
    { name: 'Single Shoulder Cat Bag', price: 38, id: 102 },
    { name: 'Pet Grooming Vacuum Kit', price: 300, id: 103 },
    { name: 'Multifunctional Pet Grooming Tool', price: 230, id: 104 },
    { name: 'Pet Bath Foam Machine', price: 27, id: 105 },
    { name: 'Automatic Foam Machine', price: 16, id: 106 },
    { name: 'Pet Ultrasonic Dental Cleaner', price: 53, id: 107 },
    { name: 'Cleaning Foam All-in-One Machine', price: 45, id: 108 },
    { name: 'Smart Electric Grooming Blow Dryer All-in-One', price: 23, id: 109 },
    { name: 'Pet Washing and Care 2-in-1', price: 49, id: 110 },
    { name: 'Pet Electric Clipper', price: 80, id: 111 },
    { name: 'Electric Clipper Nail Grooming Set', price: 44.65, id: 112 },
    { name: 'Shadowless Light Pet Nail Clipper', price: 45, id: 113 },
    { name: 'Automatic Water Dispenser', price: 135.11, id: 114 },
    { name: 'Pet Smart Water Machine', price: '53-68', id: 115 },
    { name: 'Pet Toy Training Reward Food Dispenser', price: 37, id: 116 },
    { name: 'Automatic Circulating Water Dispenser', price: 34.5, id: 117 },
    { name: 'Automatic Feeder', price: 22.5, id: 118 },
    { name: 'Smart Feeder', price: 122, id: 119 },
    { name: 'Teeth Grinding Toy', price: 8, id: 120 },
    { name: 'Warm Cat Mat', price: 47, id: 121 },
    { name: 'Pet Carpet', price: '15-60', id: 122 },
    { name: 'Foldable Pet Bed', price: 34, id: 123 },
    { name: 'Cat Villa', price: '200-300', id: 124 },
    { name: 'Pet Bed', price: '45.97-77.64', id: 125 },
    { name: 'Pet Villa', price: '29-78.5', id: 126 },
    { name: 'Four Season Pet Bed', price: '27.5-177.8', id: 127 },
    { name: 'Quick-Dry Carpet', price: '14.4-32.4', id: 128 },
    { name: 'Outdoor Assistance Stretcher Riding Bag', price: '36-45', id: 129 },
    { name: 'Cat Bag', price: '25-35', id: 130 },
    { name: 'Cat Chest Bag', price: 36, id: 131 },
    { name: 'Double Shoulder Bag Large Capacity', price: 62, id: 132 },
    { name: 'Pet Villa', price: '200-300', id: 133 },
    { name: 'Two-Layer Cat Climbing Frame', price: 125, id: 134 },
    { name: 'Waterproof Pet Bed', price: 245, id: 135 },
    { name: 'Automatic Cat Litter Box', price: 285, id: 136 },
    { name: 'Smart Pet Feeder', price: 305, id: 137 },
    { name: 'Pet Grooming Station', price: 265, id: 138 },
    { name: 'Front Cat Bag', price: '19-36.5', id: 139 },
    { name: 'Pet Stroller Four Wheels', price: '76-94', id: 140 },
    { name: 'Cat Scratching Post Tower', price: 295, id: 141 },
    { name: 'Pet Outdoor Camping Tent', price: '32.4-36', id: 142 },
    { name: 'Airline Approved Pet Carrier', price: 175, id: 143 },
    { name: 'Pet Safety Car Harness', price: 235, id: 144 },
    { name: 'Heated Pet Bed', price: '30-33', id: 145 },
    { name: 'Pet Chest Backpack', price: 275, id: 146 },
    { name: 'Automatic Pet Water Fountain', price: 295, id: 147 },
    { name: 'Pet Travel Rolling Bag', price: 195, id: 148 },
    { name: 'Interactive Pet Toy Set', price: 225, id: 149 },
    { name: 'Premium Pet Exercise Pen', price: 235, id: 150 },
    { name: 'Transparent Small Crossbody Handbag', price: 44, id: 151 },
    { name: 'Breathable Backpack', price: 48.8, id: 152 },
    { name: 'Breathable Outdoor Backpack', price: 115, id: 153 },
    { name: 'Pet Rolling Suitcase', price: 91, id: 154 },
    { name: 'Expandable Large Capacity Carrier', price: 59, id: 155 },
    { name: 'Expandable Medium Carrier', price: 57.8, id: 156 },
    { name: 'Transparent Backpack', price: 26.5, id: 157 },
    { name: 'Pet Large Capacity Luggage', price: 166, id: 158 },
    { name: 'Disabled Pet Mobility Cart', price: 130, id: 159 },
    { name: 'Pet Stroller', price: 105, id: 160 },
    { name: 'Pet Stroller', price: 170, id: 161 },
    { name: 'Pet Stroller', price: 520, id: 162 },
    { name: 'Pet Stroller', price: 248, id: 163 },
    { name: 'Small to Medium Disabled Mobility Cart', price: 125, id: 164 },
    { name: 'Small Stroller', price: 68, id: 165 },
    { name: 'Stroller', price: 188, id: 166 },
    { name: 'Cat Climbing Frame', price: 92, id: 167 },
    { name: 'Cat Nest', price: '24-52', id: 168 },
    { name: 'Mushroom House', price: '48-58', id: 169 },
    { name: 'Pet Villa', price: '29-78.5', id: 170 },
    { name: 'Cat Nest Tree Climbing Frame', price: '26-39', id: 171 },
    { name: 'Outdoor Sunshade Tent', price: '29.8-37.8', id: 172 },
    { name: 'Round Cat Nest', price: '33.95-50.51', id: 173 },
    { name: 'Pumpkin Thick Tent', price: '18.9-46.5', id: 174 },
    { name: 'Pumpkin Warm Cat Nest', price: '21.8-33.3', id: 175 },
    { name: 'Autumn Winter Pet Nest', price: '27.5-115.8', id: 176 },
    { name: 'Tree Hole Cat Nest', price: '18.5-27', id: 177 },
    { name: 'Cat Nest', price: '31.17-174.19', id: 178 },
    { name: 'Lucky Cat Nest', price: '28-44', id: 179 },
    { name: 'Pet Product 180', price: 150, id: 180 },
    { name: 'Cat Cage Villa', price: '90-198', id: 181 },
    { name: 'Pet Product 182', price: 160, id: 182 },
    { name: 'Pet Vest Cotton Coat', price: 37, id: 183 },
  ]

  // 获取当前页的产品
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage
    return Array.from({ length: productsPerPage }, (_, i) => {
      const productIndex = (startIndex + i) % products.length
      const productNumber = startIndex + i + 1
      return {
        ...products[productIndex],
        displayNumber: productNumber
      }
    })
  }

  const currentProducts = getCurrentPageProducts()

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-8 relative">
      {/* 左侧翻页按钮 */}
      <button
        onClick={() => changePage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/70 hover:bg-white/90 dark:bg-slate-800/70 dark:hover:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/70 dark:disabled:hover:bg-slate-800/70"
        aria-label="Previous page"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 text-slate-700 dark:text-slate-200"
          fill="currentColor"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
        </svg>
      </button>

      {/* 右侧翻页按钮 */}
      <button
        onClick={() => changePage(Math.min(23, currentPage + 1))}
        disabled={currentPage === 23}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/70 hover:bg-white/90 dark:bg-slate-800/70 dark:hover:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/70 dark:disabled:hover:bg-slate-800/70"
        aria-label="Next page"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 text-slate-700 dark:text-slate-200"
          fill="currentColor"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M90.34,53.66a8,8,0,0,1,11.32-11.32l80,80a8,8,0,0,1,0,11.32l-80,80a8,8,0,0,1-11.32-11.32L164.69,128Z"></path>
        </svg>
      </button>

      <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Shop All</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {currentProducts.map((product, index) => {
              // 计算全局索引（考虑当前页码）
              const globalIndex = (currentPage - 1) * productsPerPage + index

              // 图片映射表 (使用优化后的WebP格式)
              const imageMap: { [key: number]: string } = {}

              // 1-183 按顺序映射到商品位置 0-182
              for (let i = 1; i <= 183; i++) {
                imageMap[i - 1] = `/optimized/${i}.webp`
              }

              const hasImage = imageMap[globalIndex]
              const useWhiteBg = globalIndex >= 0 && globalIndex <= 182 // 商品位置 1-183 使用白色背景

              // 商品180和182使用商品15的链接
              const productId = (product.id === 180 || product.id === 182) ? 15 : product.id

              return (
                <a key={product.displayNumber} href={`/product?id=${productId}`} className="group relative block">
                  <div className={`aspect-square w-full overflow-hidden rounded-lg flex items-center justify-center ${
                    useWhiteBg ? 'bg-white' : 'bg-gray-100'
                  }`}>
                    {hasImage ? (
                      <Image
                        src={imageMap[globalIndex]}
                        alt={product.name}
                        width={800}
                        height={800}
                        className={`w-full h-full ${globalIndex === 0 ? 'object-cover' : 'object-contain'} group-hover:scale-105 transition-transform duration-200`}
                        loading={globalIndex < 16 ? 'eager' : 'lazy'}
                        priority={globalIndex < 8}
                      />
                    ) : (
                      <div className="text-slate-400 text-sm">Product {product.displayNumber}</div>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xs md:text-sm font-medium hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-muted-light dark:text-muted-dark">${product.price}</p>
                  </div>
                </a>
              )
            })}
          </div>

          {/* 翻页导航 */}
          <div className="mt-12 md:mt-16 space-y-4 md:space-y-6">
            {/* 页码指示器 */}
            <div className="flex items-center justify-center gap-2">
              {[...Array(23)].map((_, index) => {
                const pageNum = index + 1
                return (
                  <button
                    key={pageNum}
                    onClick={() => changePage(pageNum)}
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
                onClick={() => changePage(Math.max(1, currentPage - 1))}
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
                  <span className="hidden sm:inline">Page </span><span className="text-primary">{currentPage}</span> <span className="hidden sm:inline">of 23</span><span className="sm:hidden">/ 23</span>
                </span>
              </div>

              <button
                onClick={() => changePage(Math.min(23, currentPage + 1))}
                disabled={currentPage === 23}
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
                    onClick={() => changePage(page)}
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

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <main className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Shop All</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    }>
      <CategoryContent />
    </Suspense>
  )
}
