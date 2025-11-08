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
    { name: 'Pet Product 18', price: 90, id: 18 },
    { name: 'Pet Product 19', price: 55, id: 19 },
    { name: 'Pet Product 20', price: 140, id: 20 },
    { name: 'Pet Product 21', price: 75, id: 21 },
    { name: 'Pet Product 22', price: 80, id: 22 },
    { name: 'Pet Product 23', price: 160, id: 23 },
    { name: 'Pet Product 24', price: 120, id: 24 },
    { name: 'Pet Product 25', price: 200, id: 25 },
    { name: 'Pet Product 26', price: 95, id: 26 },
    { name: 'Pet Product 27', price: 150, id: 27 },
    { name: 'Pet Product 28', price: 130, id: 28 },
    { name: 'Pet Product 29', price: 110, id: 29 },
    { name: 'Pet Product 30', price: 140, id: 30 },
    { name: 'Pet Product 31', price: 85, id: 31 },
    { name: 'Pet Product 32', price: 70, id: 32 },
    { name: 'Pet Product 33', price: 105, id: 33 },
    { name: 'Pet Product 34', price: 125, id: 34 },
    { name: 'Pet Product 35', price: 115, id: 35 },
    { name: 'Pet Product 36', price: 145, id: 36 },
    { name: 'Pet Product 37', price: 95, id: 37 },
    { name: 'Pet Product 38', price: 180, id: 38 },
    { name: 'Pet Product 39', price: 125, id: 39 },
    { name: 'Pet Product 40', price: 165, id: 40 },
    { name: 'Pet Product 41', price: 135, id: 41 },
    { name: 'Pet Product 42', price: 90, id: 42 },
    { name: 'Pet Product 43', price: 155, id: 43 },
    { name: 'Pet Product 44', price: 140, id: 44 },
    { name: 'Pet Product 45', price: 105, id: 45 },
    { name: 'Pet Product 46', price: 170, id: 46 },
    { name: 'Pet Product 47', price: 160, id: 47 },
    { name: 'Pet Product 48', price: 195, id: 48 },
    { name: 'Pet Product 49', price: 135, id: 49 },
    { name: 'Pet Product 50', price: 185, id: 50 },
    { name: 'Pet Product 51', price: 100, id: 51 },
    { name: 'Pet Product 52', price: 175, id: 52 },
    { name: 'Pet Product 53', price: 155, id: 53 },
    { name: 'Pet Product 54', price: 165, id: 54 },
    { name: 'Pet Product 55', price: 115, id: 55 },
    { name: 'Pet Product 56', price: 85, id: 56 },
    { name: 'Pet Product 57', price: 210, id: 57 },
    { name: 'Pet Product 58', price: 130, id: 58 },
    { name: 'Pet Product 59', price: 125, id: 59 },
    { name: 'Pet Product 60', price: 170, id: 60 },
    { name: 'Pet Product 61', price: 165, id: 61 },
    { name: 'Pet Product 62', price: 155, id: 62 },
    { name: 'Pet Product 63', price: 145, id: 63 },
    { name: 'Pet Product 64', price: 135, id: 64 },
    { name: 'Pet Product 65', price: 215, id: 65 },
    { name: 'Pet Product 66', price: 190, id: 66 },
    { name: 'Pet Product 67', price: 175, id: 67 },
    { name: 'Pet Product 68', price: 220, id: 68 },
    { name: 'Pet Product 69', price: 140, id: 69 },
    { name: 'Pet Product 70', price: 235, id: 70 },
    { name: 'Pet Product 71', price: 180, id: 71 },
    { name: 'Pet Product 72', price: 120, id: 72 },
    { name: 'Pet Product 73', price: 205, id: 73 },
    { name: 'Pet Product 74', price: 160, id: 74 },
    { name: 'Pet Product 75', price: 160, id: 75 },
    { name: 'Pet Product 76', price: 160, id: 76 },
    { name: 'Pet Product 77', price: 160, id: 77 },
    { name: 'Pet Product 78', price: 160, id: 78 },
    { name: 'Pet Product 79', price: 175, id: 79 },
    { name: 'Pet Product 80', price: 125, id: 80 },
    { name: 'Pet Product 81', price: 185, id: 81 },
    { name: 'Pet Product 82', price: 250, id: 82 },
    { name: 'Pet Product 83', price: 195, id: 83 },
    { name: 'Pet Product 84', price: 180, id: 84 },
    { name: 'Pet Product 85', price: 110, id: 85 },
    { name: 'Pet Product 86', price: 205, id: 86 },
    { name: 'Pet Product 87', price: 220, id: 87 },
    { name: 'Pet Product 88', price: 145, id: 88 },
    { name: 'Pet Product 89', price: 210, id: 89 },
    { name: 'Pet Product 90', price: 225, id: 90 },
    { name: 'Pet Product 91', price: 165, id: 91 },
    { name: 'Pet Product 92', price: 205, id: 92 },
    { name: 'Pet Product 93', price: 130, id: 93 },
    { name: 'Pet Product 94', price: 215, id: 94 },
    { name: 'Pet Product 95', price: 215, id: 95 },
    { name: 'Pet Product 96', price: 215, id: 96 },
    { name: 'Pet Product 97', price: 260, id: 97 },
    { name: 'Pet Product 98', price: 210, id: 98 },
    { name: 'Pet Product 99', price: 225, id: 99 },
    { name: 'Pet Product 100', price: 135, id: 100 },
    { name: 'Pet Product 101', price: 165, id: 101 },
    { name: 'Pet Product 102', price: 145, id: 102 },
    { name: 'Pet Product 103', price: 195, id: 103 },
    { name: 'Pet Product 104', price: 175, id: 104 },
    { name: 'Pet Product 105', price: 165, id: 105 },
    { name: 'Pet Product 106', price: 185, id: 106 },
    { name: 'Pet Product 107', price: 205, id: 107 },
    { name: 'Pet Product 108', price: 185, id: 108 },
    { name: 'Pet Product 109', price: 175, id: 109 },
    { name: 'Pet Product 110', price: 195, id: 110 },
    { name: 'Pet Product 111', price: 185, id: 111 },
    { name: 'Pet Product 112', price: 165, id: 112 },
    { name: 'Pet Product 113', price: 145, id: 113 },
    { name: 'Pet Product 114', price: 185, id: 114 },
    { name: 'Pet Product 115', price: 205, id: 115 },
    { name: 'Pet Product 116', price: 225, id: 116 },
    { name: 'Pet Product 117', price: 245, id: 117 },
    { name: 'Pet Product 118', price: 195, id: 118 },
    { name: 'Pet Product 119', price: 255, id: 119 },
    { name: 'Pet Product 120', price: 195, id: 120 },
    { name: 'Pet Product 121', price: 165, id: 121 },
    { name: 'Pet Product 122', price: 155, id: 122 },
    { name: 'Pet Product 123', price: 215, id: 123 },
    { name: 'Pet Product 124', price: 280, id: 124 },
    { name: 'Pet Product 125', price: 245, id: 125 },
    { name: 'Pet Product 126', price: 295, id: 126 },
    { name: 'Pet Product 127', price: 275, id: 127 },
    { name: 'Pet Product 128', price: 155, id: 128 },
    { name: 'Pet Product 129', price: 185, id: 129 },
    { name: 'Pet Product 130', price: 265, id: 130 },
    { name: 'Pet Product 131', price: 165, id: 131 },
    { name: 'Pet Product 132', price: 205, id: 132 },
    { name: 'Pet Product 133', price: 195, id: 133 },
    { name: 'Pet Product 134', price: 125, id: 134 },
    { name: 'Pet Product 135', price: 245, id: 135 },
    { name: 'Pet Product 136', price: 285, id: 136 },
    { name: 'Pet Product 137', price: 305, id: 137 },
    { name: 'Pet Product 138', price: 265, id: 138 },
    { name: 'Pet Product 139', price: 295, id: 139 },
    { name: 'Pet Product 140', price: 275, id: 140 },
    { name: 'Pet Product 141', price: 295, id: 141 },
    { name: 'Pet Product 142', price: 155, id: 142 },
    { name: 'Pet Product 143', price: 175, id: 143 },
    { name: 'Pet Product 144', price: 235, id: 144 },
    { name: 'Pet Product 145', price: 265, id: 145 },
    { name: 'Pet Product 146', price: 275, id: 146 },
    { name: 'Pet Product 147', price: 295, id: 147 },
    { name: 'Pet Product 148', price: 195, id: 148 },
    { name: 'Pet Product 149', price: 225, id: 149 },
    { name: 'Pet Product 150', price: 235, id: 150 },
    { name: 'Pet Product 151', price: 305, id: 151 },
    { name: 'Pet Product 152', price: 295, id: 152 },
    { name: 'Pet Product 153', price: 265, id: 153 },
    { name: 'Pet Product 154', price: 305, id: 154 },
    { name: 'Pet Product 155', price: 185, id: 155 },
    { name: 'Pet Product 156', price: 275, id: 156 },
    { name: 'Pet Product 157', price: 335, id: 157 },
    { name: 'Pet Product 158', price: 195, id: 158 },
    { name: 'Pet Product 159', price: 295, id: 159 },
    { name: 'Pet Product 160', price: 255, id: 160 },
    { name: 'Pet Product 161', price: 315, id: 161 },
    { name: 'Pet Product 162', price: 245, id: 162 },
    { name: 'Pet Product 163', price: 385, id: 163 },
    { name: 'Pet Product 164', price: 275, id: 164 },
    { name: 'Pet Product 165', price: 215, id: 165 },
    { name: 'Pet Product 166', price: 275, id: 166 },
    { name: 'Pet Product 167', price: 235, id: 167 },
    { name: 'Pet Product 168', price: 285, id: 168 },
    { name: 'Pet Product 169', price: 215, id: 169 },
    { name: 'Pet Product 170', price: 95, id: 170 },
    { name: 'Pet Product 171', price: 235, id: 171 },
    { name: 'Pet Product 172', price: 315, id: 172 },
    { name: 'Pet Product 173', price: 235, id: 173 },
    { name: 'Pet Product 174', price: 115, id: 174 },
    { name: 'Pet Product 175', price: 215, id: 175 },
    { name: 'Pet Product 176', price: 305, id: 176 },
    { name: 'Pet Product 177', price: 235, id: 177 },
    { name: 'Pet Product 178', price: 275, id: 178 },
    { name: 'Pet Product 179', price: 245, id: 179 },
    { name: 'Pet Product 180', price: 150, id: 180 },
    { name: 'Pet Product 181', price: 385, id: 181 },
    { name: 'Pet Product 182', price: 160, id: 182 },
    { name: 'Pet Product 183', price: 315, id: 183 },
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
