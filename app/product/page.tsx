'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useSearchParams } from 'next/navigation'

// 商品配置数据
const productData: { [key: number]: {
  name: string
  price: number
  detailImages: string[]
  specifications?: { id: number; image: string; name: string }[]
  colors?: { id: string; name: string; color: string }[]
}} = {
  1: {
    name: 'Graphene Waterproof Pet Down Jacket',
    price: 39,
    detailImages: [
      '/details/1.webp',
      '/details/2.webp',
      '/details/3.webp',
      '/details/4.webp',
      '/details/5.webp',
    ],
    specifications: [
      { id: 1, image: '/details/6.webp', name: '规格 1' },
      { id: 2, image: '/details/7.webp', name: '规格 2' },
      { id: 3, image: '/details/8.webp', name: '规格 3' },
      { id: 4, image: '/details/9.webp', name: '规格 4' },
      { id: 5, image: '/details/10.webp', name: '规格 5' },
      { id: 6, image: '/details/11.webp', name: '规格 6' },
    ]
  },
  2: {
    name: 'Pet Waterproof Windbreaker',
    price: 17,
    detailImages: [
      '/details/12.webp',
      '/details/13.webp',
      '/details/14.webp',
    ],
    specifications: [
      { id: 1, image: '/details/15.webp', name: '规格 1' },
      { id: 2, image: '/details/16.webp', name: '规格 2' },
      { id: 3, image: '/details/17.webp', name: '规格 3' },
    ]
  },
  3: {
    name: 'Wedding Celebration Pet Clothing',
    price: 19,
    detailImages: [], // 没有详情页图片
    specifications: [
      { id: 1, image: '/details/18.webp', name: '规格 1' },
      { id: 2, image: '/details/19.webp', name: '规格 2' },
      { id: 3, image: '/details/20.webp', name: '规格 3' },
      { id: 4, image: '/details/21.webp', name: '规格 4' },
      { id: 5, image: '/details/22.webp', name: '规格 5' },
      { id: 6, image: '/details/23.webp', name: '规格 6' },
    ]
  },
  4: {
    name: 'Pet Winter Cotton Coat',
    price: 22,
    detailImages: [
      '/details/30.webp',
      '/details/31.webp',
      '/details/32.webp',
    ],
    specifications: [
      { id: 1, image: '/details/24.webp', name: '规格 1' },
      { id: 2, image: '/details/25.webp', name: '规格 2' },
      { id: 3, image: '/details/26.webp', name: '规格 3' },
      { id: 4, image: '/details/27.webp', name: '规格 4' },
      { id: 5, image: '/details/28.webp', name: '规格 5' },
      { id: 6, image: '/details/29.webp', name: '规格 6' },
    ]
  },
  5: {
    name: 'Christmas Pet Costume',
    price: 13,
    detailImages: [
      '/details/35.webp',
    ],
    specifications: [
      { id: 1, image: '/details/33.webp', name: '规格 1' },
      { id: 2, image: '/details/34.webp', name: '规格 2' },
    ]
  },
  6: {
    name: 'Pet Pajamas',
    price: 14,
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/36.webp', name: '规格 1' },
      { id: 2, image: '/details/37.webp', name: '规格 2' },
    ]
  },
  7: {
    name: 'Winter Striped Clothing',
    price: 19,
    detailImages: [
      '/details/40.webp',
      '/details/41.webp',
      '/details/42.webp',
      '/details/43.webp',
    ],
    specifications: [
      { id: 1, image: '/details/38.webp', name: '规格 1' },
      { id: 2, image: '/details/39.webp', name: '规格 2' },
    ]
  },
  8: {
    name: 'Pet Cute Vest',
    price: 16,
    detailImages: [
      '/details/46.webp',
      '/details/47.webp',
    ],
    specifications: [
      { id: 1, image: '/details/44.webp', name: '规格 1' },
      { id: 2, image: '/details/45.webp', name: '规格 2' },
    ]
  },
  9: {
    name: 'Pet Bed',
    price: 39,
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/48.webp', name: '规格 1' },
      { id: 2, image: '/details/49.webp', name: '规格 2' },
      { id: 3, image: '/details/50.webp', name: '规格 3' },
      { id: 4, image: '/details/51.webp', name: '规格 4' },
      { id: 5, image: '/details/52.webp', name: '规格 5' },
    ]
  },
  10: {
    name: 'Pet Bed',
    price: 31,
    detailImages: [
      '/details/2000.webp',
      '/details/2001.webp',
      '/details/2002.webp',
    ],
    specifications: [
      { id: 1, image: '/details/53.webp', name: '规格 1' },
      { id: 2, image: '/details/54.webp', name: '规格 2' },
    ]
  },
  11: {
    name: 'Pet Mat',
    price: 34,
    detailImages: [
      '/details/57.webp',
      '/details/58.webp',
    ],
    specifications: [
      { id: 1, image: '/details/55.webp', name: '规格 1' },
      { id: 2, image: '/details/56.webp', name: '规格 2' },
    ]
  },
  12: {
    name: 'Pet Tent',
    price: 125,
    detailImages: [
      '/details/59.webp',
      '/details/60.webp',
      '/details/61.webp',
      '/details/62.webp',
    ],
    colors: [
      { id: 'red', name: '红色', color: '#DC2626' },
      { id: 'darkgreen', name: '墨绿色', color: '#166534' },
    ]
  },
  13: {
    name: 'Pet Dryer Box',
    price: 73.9,
    detailImages: [
      '/details/66.webp',
      '/details/67.webp',
      '/details/68.webp',
      '/details/2003.webp',
      '/details/2004.webp',
      '/details/2005.webp',
      '/details/2006.webp',
    ],
    specifications: [
      { id: 1, image: '/details/63.webp', name: '规格 1' },
      { id: 2, image: '/details/64.webp', name: '规格 2' },
      { id: 3, image: '/details/65.webp', name: '规格 3' },
    ]
  },
  14: {
    name: 'Panoramic Breathable Pet Backpack',
    price: 22,
    detailImages: [
      '/details/73.webp',
      '/details/74.webp',
      '/details/2007.webp',
      '/details/2008.webp',
    ],
    specifications: [
      { id: 1, image: '/details/69.webp', name: '规格 1' },
      { id: 2, image: '/details/70.webp', name: '规格 2' },
      { id: 3, image: '/details/71.webp', name: '规格 3' },
      { id: 4, image: '/details/72.webp', name: '规格 4' },
    ]
  },
  15: {
    name: 'Tree Nest',
    price: 135,
    detailImages: [
      '/details/104.webp',
      '/details/102.webp',
      '/details/103.webp',
    ],
    specifications: [
      { id: 1, image: '/details/76.webp', name: '规格 1' },
      { id: 2, image: '/details/77.webp', name: '规格 2' },
      { id: 3, image: '/details/78.webp', name: '规格 3' },
      { id: 4, image: '/details/79.webp', name: '规格 4' },
      { id: 5, image: '/details/80.webp', name: '规格 5' },
      { id: 6, image: '/details/81.webp', name: '规格 6' },
      { id: 7, image: '/details/82.webp', name: '规格 7' },
      { id: 8, image: '/details/83.webp', name: '规格 8' },
      { id: 9, image: '/details/84.webp', name: '规格 9' },
      { id: 10, image: '/details/85.webp', name: '规格 10' },
      { id: 11, image: '/details/86.webp', name: '规格 11' },
      { id: 12, image: '/details/87.webp', name: '规格 12' },
      { id: 13, image: '/details/88.webp', name: '规格 13' },
      { id: 14, image: '/details/89.webp', name: '规格 14' },
      { id: 15, image: '/details/90.webp', name: '规格 15' },
      { id: 16, image: '/details/91.webp', name: '规格 16' },
      { id: 17, image: '/details/92.webp', name: '规格 17' },
      { id: 18, image: '/details/93.webp', name: '规格 18' },
      { id: 19, image: '/details/94.webp', name: '规格 19' },
      { id: 20, image: '/details/95.webp', name: '规格 20' },
      { id: 21, image: '/details/96.webp', name: '规格 21' },
      { id: 22, image: '/details/97.webp', name: '规格 22' },
      { id: 23, image: '/details/98.webp', name: '规格 23' },
      { id: 24, image: '/details/99.webp', name: '规格 24' },
      { id: 25, image: '/details/100.webp', name: '规格 25' },
      { id: 26, image: '/details/101.webp', name: '规格 26' },
    ]
  },
  16: {
    name: 'Pet Feeding & Drinking Supplies',
    price: 11,
    detailImages: [
      '/details/107.webp',
      '/details/108.webp',
      '/details/109.webp',
      '/details/110.webp',
    ],
    specifications: [
      { id: 1, image: '/details/105.webp', name: '规格 1' },
      { id: 2, image: '/details/106.webp', name: '规格 2' },
    ]
  },
  17: {
    name: 'Pet Nail Clipper',
    price: 4,
    detailImages: [
      '/details/114.webp',
      '/details/115.webp',
      '/details/116.webp',
    ],
    specifications: [
      { id: 1, image: '/details/111.webp', name: '规格 1' },
      { id: 2, image: '/details/112.webp', name: '规格 2' },
      { id: 3, image: '/details/113.webp', name: '规格 3' },
    ]
  },
  18: {
    name: 'Pet Automatic Water Dispenser',
    price: 11.9,
    detailImages: [
      '/details/118.webp',
      '/details/121.webp',
      '/details/122.webp',
    ],
    specifications: [
      { id: 1, image: '/details/117.webp', name: '规格 1' },
      { id: 2, image: '/details/119.webp', name: '规格 2' },
      { id: 3, image: '/details/120.webp', name: '规格 3' },
    ]
  },
  19: {
    name: 'Ferris Wheel Cat Scratch Ball',
    price: 13,
    detailImages: [
      '/details/125.webp',
      '/details/126.webp',
    ],
    specifications: [
      { id: 1, image: '/details/123.webp', name: '规格 1' },
      { id: 2, image: '/details/124.webp', name: '规格 2' },
    ]
  },
  20: {
    name: 'Pet Hair Dryer and Deshedding Tool',
    price: 85,
    detailImages: [
      '/details/129.webp',
      '/details/130.webp',
      '/details/131.webp',
      '/details/132.webp',
      '/details/133.webp',
    ],
    specifications: [
      { id: 1, image: '/details/127.webp', name: '规格 1' },
      { id: 2, image: '/details/128.webp', name: '规格 2' },
    ]
  },
  21: {
    name: 'Pet Premium Polished Bowl',
    price: 6.9,
    detailImages: [
      '/details/137.webp',
    ],
    specifications: [
      { id: 1, image: '/details/134.webp', name: '规格 1' },
      { id: 2, image: '/details/135.webp', name: '规格 2' },
      { id: 3, image: '/details/136.webp', name: '规格 3' },
    ]
  },
  22: {
    name: 'Cat Scratching Post with Double Layer House',
    price: 13,
    detailImages: [
      '/details/141.webp',
      '/details/142.webp',
    ],
    specifications: [
      { id: 1, image: '/details/138.webp', name: '规格 1' },
      { id: 2, image: '/details/139.webp', name: '规格 2' },
      { id: 3, image: '/details/140.webp', name: '规格 3' },
    ]
  },
  23: {
    name: 'Fashion Pet Carrier Bag',
    price: 34,
    detailImages: [
      '/details/148.webp',
      '/details/149.webp',
      '/details/150.webp',
      '/details/151.webp',
    ],
    specifications: [
      { id: 1, image: '/details/2009.webp', name: '规格 1' },
      { id: 2, image: '/details/2010.webp', name: '规格 2' },
      { id: 3, image: '/details/2011.webp', name: '规格 3' },
      { id: 4, image: '/details/2012.webp', name: '规格 4' },
      { id: 5, image: '/details/2013.webp', name: '规格 5' },
      { id: 6, image: '/details/2014.webp', name: '规格 6' },
      { id: 7, image: '/details/2015.webp', name: '规格 7' },
      { id: 8, image: '/details/2016.webp', name: '规格 8' },
      { id: 9, image: '/details/2017.webp', name: '规格 9' },
      { id: 10, image: '/details/2018.webp', name: '规格 10' },
    ]
  },
  24: {
    name: 'Pet Outdoor Shoulder Bag',
    price: 15,
    detailImages: [
      '/details/152.webp',
      '/details/153.webp',
      '/details/157.webp',
      '/details/158.webp',
      '/details/159.webp',
    ],
    specifications: [
      { id: 1, image: '/details/154.webp', name: '规格 1' },
      { id: 2, image: '/details/155.webp', name: '规格 2' },
      { id: 3, image: '/details/156.webp', name: '规格 3' },
    ]
  },
  25: {
    name: 'Pet Product 25',
    price: '20-78',
    detailImages: [
      '/details/166.webp',
      '/details/167.webp',
      '/details/168.webp',
      '/details/169.webp',
      '/details/170.webp',
      '/details/171.webp',
      '/details/2043.webp',
      '/details/2044.webp',
    ],
    specifications: [
      { id: 1, image: '/details/2019.webp', name: '规格 1', price: 78 },
      { id: 2, image: '/details/2020.webp', name: '规格 2', price: 45 },
      { id: 3, image: '/details/2021.webp', name: '规格 3', price: 55 },
      { id: 4, image: '/details/2022.webp', name: '规格 4', price: 45 },
      { id: 5, image: '/details/2023.webp', name: '规格 5', price: 55 },
      { id: 6, image: '/details/2024.webp', name: '规格 6', price: 45 },
      { id: 7, image: '/details/2025.webp', name: '规格 7', price: 55 },
      { id: 8, image: '/details/2026.webp', name: '规格 8', price: 30 },
      { id: 9, image: '/details/2027.webp', name: '规格 9', price: 50 },
      { id: 10, image: '/details/2028.webp', name: '规格 10', price: 20 },
      { id: 11, image: '/details/2029.webp', name: '规格 11', price: 25 },
      { id: 12, image: '/details/2030.webp', name: '规格 12', price: 78 },
      { id: 13, image: '/details/2031.webp', name: '规格 13', price: 35 },
      { id: 14, image: '/details/2032.webp', name: '规格 14', price: 25 },
      { id: 15, image: '/details/2033.webp', name: '规格 15', price: 35 },
      { id: 16, image: '/details/2034.webp', name: '规格 16', price: 78 },
      { id: 17, image: '/details/2035.webp', name: '规格 17', price: 57 },
      { id: 18, image: '/details/2036.webp', name: '规格 18', price: 77 },
      { id: 19, image: '/details/2037.webp', name: '规格 19', price: 77 },
      { id: 20, image: '/details/2038.webp', name: '规格 20', price: 57 },
      { id: 21, image: '/details/2039.webp', name: '规格 21', price: 50 },
      { id: 22, image: '/details/2040.webp', name: '规格 22', price: 60 },
      { id: 23, image: '/details/2041.webp', name: '规格 23', price: 48.5 },
      { id: 24, image: '/details/2042.webp', name: '规格 24', price: 67.5 },
    ]
  },
  26: {
    name: 'Pet Anti-Bite Muzzle',
    price: 12.7,
    detailImages: [
      '/details/174.webp',
      '/details/175.webp',
      '/details/177.webp',
      '/details/2054.webp',
      '/details/2055.webp',
    ],
    specifications: [
      { id: 1, image: '/details/172.webp', name: '规格 1' },
      { id: 2, image: '/details/173.webp', name: '规格 2' },
      { id: 3, image: '/details/176.webp', name: '规格 3' },
      { id: 4, image: '/details/2045.webp', name: '规格 4' },
      { id: 5, image: '/details/2046.webp', name: '规格 5' },
      { id: 6, image: '/details/2047.webp', name: '规格 6' },
    ]
  },
  27: {
    name: 'Pet Rolling Suitcase',
    price: 145,
    detailImages: [
      '/details/178.webp',
      '/details/179.webp',
      '/details/180.webp',
      '/details/181.webp',
      '/details/182.webp',
    ],
    specifications: [
      { id: 1, image: '/details/183.webp', name: '规格 1' },
    ]
  },
  28: {
    name: 'Automatic Water Fountain',
    price: 21,
    detailImages: [
      '/details/185.webp',
      '/details/186.webp',
      '/details/187.webp',
      '/details/188.webp',
      '/details/189.webp',
    ],
    specifications: [
      { id: 1, image: '/details/184.webp', name: '规格 1' },
    ]
  },
  29: {
    name: 'Folding Tent',
    price: '18.8-37',
    detailImages: [
      '/details/192.webp',
      '/details/193.webp',
      '/details/194.webp',
      '/details/195.webp',
      '/details/196.webp',
    ],
    specifications: [
      { id: 1, image: '/details/190.webp', name: '规格 1' },
      { id: 2, image: '/details/191.webp', name: '规格 2' },
    ]
  },
  30: {
    name: 'Cat Leash',
    price: 14.5,
    detailImages: [
      '/details/200.webp',
      '/details/201.webp',
      '/details/202.webp',
      '/details/203.webp',
    ],
    specifications: [
      { id: 1, image: '/details/197.webp', name: '规格 1' },
      { id: 2, image: '/details/198.webp', name: '规格 2' },
      { id: 3, image: '/details/199.webp', name: '规格 3' },
      { id: 4, image: '/details/2048.webp', name: '规格 4' },
    ]
  },
  31: {
    name: 'Cat Climbing Frame',
    price: '20-25',
    detailImages: [
      '/details/206.webp',
      '/details/207.webp',
      '/details/208.webp',
    ],
    specifications: [
      { id: 1, image: '/details/204.webp', name: '规格 1', price: 20 },
      { id: 2, image: '/details/205.webp', name: '规格 2', price: 25 },
    ]
  },
  32: {
    name: 'Cat Castle Cat Cage',
    price: '128-165',
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/209.webp', name: '规格 1', price: 128 },
      { id: 2, image: '/details/210.webp', name: '规格 2', price: 135 },
      { id: 3, image: '/details/211.webp', name: '规格 3', price: 165 },
      { id: 4, image: '/details/212.webp', name: '规格 4', price: 135 },
      { id: 5, image: '/details/213.webp', name: '规格 5', price: 165 },
    ]
  },
  33: {
    name: 'Snack Freeze-Dried Storage',
    price: 13.6,
    detailImages: [
      '/details/215.webp',
      '/details/216.webp',
      '/details/217.webp',
    ],
    specifications: [
      { id: 1, image: '/details/214.webp', name: '规格 1' },
    ]
  },
  34: {
    name: 'Space Capsule Backpack',
    price: 55,
    detailImages: [
      '/details/221.webp',
      '/details/222.webp',
      '/details/223.webp',
      '/details/224.webp',
    ],
    specifications: [
      { id: 1, image: '/details/218.webp', name: '规格 1' },
      { id: 2, image: '/details/219.webp', name: '规格 2' },
      { id: 3, image: '/details/220.webp', name: '规格 3' },
    ]
  },
  35: {
    name: 'Chest Pet Carrier',
    price: '14.5-18.5',
    detailImages: [
      '/details/225.webp',
      '/details/229.webp',
      '/details/230.webp',
    ],
    specifications: [
      { id: 1, image: '/details/226.webp', name: '规格 1' },
      { id: 2, image: '/details/228.webp', name: '规格 2' },
      { id: 3, image: '/details/227.webp', name: '规格 3' },
    ]
  },
  36: {
    name: 'Pet Villa',
    price: '37.5-50.8',
    detailImages: [
      '/details/235.webp',
      '/details/236.webp',
      '/details/237.webp',
    ],
    specifications: [
      { id: 1, image: '/details/231.webp', name: '规格 1' },
      { id: 2, image: '/details/232.webp', name: '规格 2' },
    ]
  },
  37: {
    name: 'Small Shoulder Bag',
    price: 228,
    detailImages: [
      '/details/239.webp',
      '/details/240.webp',
      '/details/241.webp',
      '/details/242.webp',
    ],
    specifications: [
      { id: 1, image: '/details/238.webp', name: '规格 1' },
    ]
  },
  38: {
    name: 'Cat Handbag',
    price: '29-41',
    detailImages: [
      '/details/251.webp',
      '/details/252.webp',
    ],
    specifications: [
      { id: 1, image: '/details/243.webp', name: '规格 1' },
      { id: 2, image: '/details/244.webp', name: '规格 2' },
      { id: 3, image: '/details/245.webp', name: '规格 3' },
      { id: 4, image: '/details/246.webp', name: '规格 4' },
      { id: 5, image: '/details/247.webp', name: '规格 5' },
      { id: 6, image: '/details/248.webp', name: '规格 6' },
      { id: 7, image: '/details/249.webp', name: '规格 7' },
      { id: 8, image: '/details/250.webp', name: '规格 8' },
    ]
  },
  39: {
    name: 'Pet Scoop',
    price: 3,
    detailImages: [
      '/details/254.webp',
      '/details/255.webp',
      '/details/256.webp',
    ],
    specifications: [
      { id: 1, image: '/details/253.webp', name: '规格 1' },
    ]
  },
  40: {
    name: 'Pet Hood',
    price: '12.87-16.83',
    detailImages: [
      '/details/259.webp',
      '/details/260.webp',
      '/details/261.webp',
      '/details/262.webp',
    ],
    specifications: [
      { id: 1, image: '/details/257.webp', name: '规格 1' },
      { id: 2, image: '/details/258.webp', name: '规格 2' },
    ]
  },
  41: {
    name: 'Cat Litter Box',
    price: 16.56,
    detailImages: [
      '/details/266.webp',
      '/details/267.webp',
      '/details/268.webp',
    ],
    specifications: [
      { id: 1, image: '/details/263.webp', name: '规格 1' },
      { id: 2, image: '/details/264.webp', name: '规格 2' },
      { id: 3, image: '/details/265.webp', name: '规格 3' },
    ]
  },
  42: {
    name: 'Four Season Pet Bed',
    price: '10.88-27.88',
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/269.webp', name: '规格 1' },
      { id: 2, image: '/details/270.webp', name: '规格 2' },
      { id: 3, image: '/details/271.webp', name: '规格 3' },
    ]
  },
  43: {
    name: 'Adjustable Harness Leash',
    price: 4,
    detailImages: [
      '/details/277.webp',
      '/details/278.webp',
      '/details/279.webp',
    ],
    specifications: [
      { id: 1, image: '/details/272.webp', name: '规格 1' },
      { id: 2, image: '/details/273.webp', name: '规格 2' },
      { id: 3, image: '/details/274.webp', name: '规格 3' },
      { id: 4, image: '/details/275.webp', name: '规格 4' },
      { id: 5, image: '/details/276.webp', name: '规格 5' },
    ]
  },
  44: {
    name: 'Cat Carrier',
    price: 55,
    detailImages: [
      '/details/283.webp',
      '/details/284.webp',
      '/details/285.webp',
    ],
    specifications: [
      { id: 1, image: '/details/280.webp', name: '规格 1' },
      { id: 2, image: '/details/281.webp', name: '规格 2' },
      { id: 3, image: '/details/282.webp', name: '规格 3' },
    ]
  },
  45: {
    name: 'Cat Scratching Board',
    price: 25,
    detailImages: [
      '/details/287.webp',
      '/details/288.webp',
    ],
    specifications: [
      { id: 1, image: '/details/286.webp', name: '规格 1' },
    ]
  },
  46: {
    name: 'Cat Feeder Water Dispenser',
    price: 16.5,
    detailImages: [
      '/details/292.webp',
      '/details/293.webp',
      '/details/294.webp',
      '/details/295.webp',
      '/details/296.webp',
    ],
    specifications: [
      { id: 1, image: '/details/289.webp', name: '规格 1' },
      { id: 2, image: '/details/290.webp', name: '规格 2' },
      { id: 3, image: '/details/291.webp', name: '规格 3' },
    ]
  },
  47: {
    name: 'Pet Stroller',
    price: 138,
    detailImages: [
      '/details/301.webp',
      '/details/302.webp',
      '/details/303.webp',
      '/details/304.webp',
    ],
    specifications: [
      { id: 1, image: '/details/297.webp', name: '规格 1' },
      { id: 2, image: '/details/298.webp', name: '规格 2' },
      { id: 3, image: '/details/299.webp', name: '规格 3' },
      { id: 4, image: '/details/300.webp', name: '规格 4' },
    ]
  },
  48: {
    name: 'Pet Nest',
    price: '40-61',
    detailImages: [
      '/details/312.webp',
      '/details/313.webp',
      '/details/314.webp',
    ],
    specifications: [
      { id: 1, image: '/details/305.webp', name: '规格 1' },
      { id: 2, image: '/details/306.webp', name: '规格 2' },
      { id: 3, image: '/details/307.webp', name: '规格 3' },
      { id: 4, image: '/details/308.webp', name: '规格 4' },
      { id: 5, image: '/details/309.webp', name: '规格 5' },
      { id: 6, image: '/details/310.webp', name: '规格 6' },
      { id: 7, image: '/details/311.webp', name: '规格 7' },
    ]
  },
  49: {
    name: 'Pet Mat',
    price: '3.5-18',
    detailImages: [
      '/details/318.webp',
      '/details/319.webp',
    ],
    specifications: [
      { id: 1, image: '/details/315.webp', name: '规格 1' },
      { id: 2, image: '/details/316.webp', name: '规格 2' },
      { id: 3, image: '/details/317.webp', name: '规格 3' },
    ]
  },
  50: {
    name: 'Pet Thick Mat',
    price: '3.9-18',
    detailImages: [
      '/details/325.webp',
      '/details/326.webp',
    ],
    specifications: [
      { id: 1, image: '/details/320.webp', name: '规格 1' },
      { id: 2, image: '/details/321.webp', name: '规格 2' },
      { id: 3, image: '/details/322.webp', name: '规格 3' },
      { id: 4, image: '/details/323.webp', name: '规格 4' },
      { id: 5, image: '/details/324.webp', name: '规格 5' },
    ]
  },
  51: {
    name: 'Pet Rolling Suitcase',
    price: 455,
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/327.webp', name: '规格 1' },
      { id: 2, image: '/details/328.webp', name: '规格 2' },
    ]
  },
  52: {
    name: 'Pet Folding Stroller',
    price: 74,
    detailImages: [
      '/details/333.webp',
      '/details/334.webp',
      '/details/335.webp',
      '/details/336.webp',
    ],
    specifications: [
      { id: 1, image: '/details/329.webp', name: '规格 1' },
      { id: 2, image: '/details/330.webp', name: '规格 2' },
      { id: 3, image: '/details/331.webp', name: '规格 3' },
      { id: 4, image: '/details/332.webp', name: '规格 4' },
    ]
  },
  53: {
    name: 'Halloween Pet Costume',
    price: 31,
    detailImages: [
      '/details/337.webp',
      '/details/339.webp',
      '/details/340.webp',
    ],
    specifications: [
      { id: 1, image: '/details/338.webp', name: '规格 1' },
    ]
  },
  54: {
    name: 'Pet Stroller',
    price: 104,
    detailImages: [
      '/details/345.webp',
      '/details/346.webp',
      '/details/347.webp',
      '/details/348.webp',
    ],
    specifications: [
      { id: 1, image: '/details/341.webp', name: '规格 1' },
      { id: 2, image: '/details/342.webp', name: '规格 2' },
      { id: 3, image: '/details/343.webp', name: '规格 3' },
      { id: 4, image: '/details/344.webp', name: '规格 4' },
    ]
  },
  55: {
    name: 'Pet Leash',
    price: 15,
    detailImages: [
      '/details/351.webp',
    ],
    specifications: [
      { id: 1, image: '/details/349.webp', name: '规格 1' },
      { id: 2, image: '/details/350.webp', name: '规格 2' },
    ]
  },
  56: {
    name: 'Pet Leash',
    price: 14,
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/352.webp', name: '规格 1' },
    ]
  },
  57: {
    name: 'Reflective Harness Leash',
    price: '7-11.79',
    detailImages: [
      '/details/359.webp',
      '/details/360.webp',
      '/details/361.webp',
      '/details/362.webp',
    ],
    specifications: [
      { id: 1, image: '/details/353.webp', name: '规格 1', price: 7 },
      { id: 2, image: '/details/354.webp', name: '规格 2', price: 7 },
      { id: 3, image: '/details/355.webp', name: '规格 3', price: 7 },
      { id: 4, image: '/details/356.webp', name: '规格 4', price: 7 },
      { id: 5, image: '/details/357.webp', name: '规格 5', price: 11.79 },
      { id: 6, image: '/details/358.webp', name: '规格 6', price: 11.79 },
    ]
  },
  58: {
    name: 'Vintage Chest Harness Leash',
    price: 22.8,
    detailImages: [
      '/details/365.webp',
      '/details/366.webp',
      '/details/367.webp',
    ],
    specifications: [
      { id: 1, image: '/details/363.webp', name: '规格 1' },
      { id: 2, image: '/details/364.webp', name: '规格 2' },
    ]
  },
  59: {
    name: 'Harness Leash Clothing',
    price: 16.64,
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/368.webp', name: '规格 1' },
      { id: 2, image: '/details/369.webp', name: '规格 2' },
      { id: 3, image: '/details/370.webp', name: '规格 3' },
    ]
  },
  60: {
    name: 'Korean Denim Harness Clothing',
    price: 15,
    detailImages: [
      '/details/373.webp',
      '/details/374.webp',
      '/details/375.webp',
      '/details/376.webp',
    ],
    specifications: [
      { id: 1, image: '/details/371.webp', name: '规格 1' },
      { id: 2, image: '/details/372.webp', name: '规格 2' },
    ]
  },
  61: {
    name: 'Tactical Chest Harness Clothing',
    price: 35,
    detailImages: [
      '/details/380.webp',
      '/details/381.webp',
      '/details/382.webp',
      '/details/383.webp',
    ],
    specifications: [
      { id: 1, image: '/details/377.webp', name: '规格 1' },
      { id: 2, image: '/details/378.webp', name: '规格 2' },
      { id: 3, image: '/details/379.webp', name: '规格 3' },
    ]
  },
  62: {
    name: 'Spring Summer Vest Harness',
    price: 12.8,
    detailImages: [
      '/details/387.webp',
      '/details/388.webp',
      '/details/389.webp',
      '/details/390.webp',
    ],
    specifications: [
      { id: 1, image: '/details/384.webp', name: '规格 1' },
      { id: 2, image: '/details/385.webp', name: '规格 2' },
      { id: 3, image: '/details/386.webp', name: '规格 3' },
    ]
  },
  63: {
    name: 'Pet Clothing',
    price: 22,
    detailImages: [
      '/details/395.webp',
      '/details/396.webp',
    ],
    specifications: [
      { id: 1, image: '/details/391.webp', name: '规格 1' },
      { id: 2, image: '/details/392.webp', name: '规格 2' },
      { id: 3, image: '/details/393.webp', name: '规格 3' },
      { id: 4, image: '/details/394.webp', name: '规格 4' },
    ]
  },
  64: {
    name: 'Pet Overalls',
    price: 22.8,
    detailImages: [
      '/details/398.webp',
      '/details/399.webp',
      '/details/400.webp',
    ],
    specifications: [
      { id: 1, image: '/details/397.webp', name: '规格 1' },
    ]
  },
  65: {
    name: 'Pet Rolling Suitcase',
    price: 105,
    detailImages: [
      '/details/404.webp',
      '/details/405.webp',
      '/details/406.webp',
      '/details/407.webp',
      '/details/408.webp',
      '/details/409.webp',
      '/details/410.webp',
    ],
    specifications: [
      { id: 1, image: '/details/401.webp', name: '规格 1' },
      { id: 2, image: '/details/402.webp', name: '规格 2' },
      { id: 3, image: '/details/403.webp', name: '规格 3' },
    ]
  },
  66: {
    name: 'Cat Handbag',
    price: '35-45',
    detailImages: [
      '/details/417.webp',
      '/details/418.webp',
    ],
    specifications: [
      { id: 1, image: '/details/411.webp', name: '规格 1' },
      { id: 2, image: '/details/412.webp', name: '规格 2' },
      { id: 3, image: '/details/413.webp', name: '规格 3' },
      { id: 4, image: '/details/414.webp', name: '规格 4' },
      { id: 5, image: '/details/415.webp', name: '规格 5' },
      { id: 6, image: '/details/416.webp', name: '规格 6' },
    ]
  },
  67: {
    name: 'Fashion Pet Carrier Bag',
    price: 22,
    detailImages: [
      '/details/424.webp',
      '/details/425.webp',
      '/details/426.webp',
    ],
    specifications: [
      { id: 1, image: '/details/419.webp', name: '规格 1' },
      { id: 2, image: '/details/420.webp', name: '规格 2' },
      { id: 3, image: '/details/421.webp', name: '规格 3' },
      { id: 4, image: '/details/422.webp', name: '规格 4' },
      { id: 5, image: '/details/423.webp', name: '规格 5' },
    ]
  },
  68: {
    name: 'Pet Bag',
    price: 36,
    detailImages: [
      '/details/433.webp',
      '/details/434.webp',
      '/details/435.webp',
      '/details/436.webp',
      '/details/437.webp',
      '/details/438.webp',
    ],
    specifications: [
      { id: 1, image: '/details/427.webp', name: '规格 1' },
      { id: 2, image: '/details/428.webp', name: '规格 2' },
      { id: 3, image: '/details/429.webp', name: '规格 3' },
      { id: 4, image: '/details/430.webp', name: '规格 4' },
      { id: 5, image: '/details/431.webp', name: '规格 5' },
      { id: 6, image: '/details/432.webp', name: '规格 6' },
    ]
  },
  69: {
    name: 'Pet Backpack Trolley',
    price: '87-147',
    detailImages: [
      '/details/441.webp',
      '/details/442.webp',
      '/details/443.webp',
    ],
    specifications: [
      { id: 1, image: '/details/439.webp', name: '规格 1', price: 87 },
      { id: 2, image: '/details/440.webp', name: '规格 2', price: 147 },
    ]
  },
  70: {
    name: 'Pet Grooming Clipper',
    price: 41,
    detailImages: [
      '/details/445.webp',
      '/details/446.webp',
      '/details/447.webp',
      '/details/448.webp',
      '/details/449.webp',
      '/details/450.webp',
      '/details/451.webp',
      '/details/452.webp',
    ],
    specifications: [
      { id: 1, image: '/details/444.webp', name: '规格 1' },
    ]
  },
  71: {
    name: 'Pet Toothbrush Set',
    price: 6.3,
    detailImages: [
      '/details/456.webp',
      '/details/457.webp',
      '/details/458.webp',
      '/details/459.webp',
      '/details/460.webp',
    ],
    specifications: [
      { id: 1, image: '/details/453.webp', name: '规格 1' },
      { id: 2, image: '/details/454.webp', name: '规格 2' },
      { id: 3, image: '/details/455.webp', name: '规格 3' },
    ]
  },
  72: {
    name: 'Pet Nail Clipper',
    price: 4,
    detailImages: [
      '/details/463.webp',
      '/details/464.webp',
    ],
    specifications: [
      { id: 1, image: '/details/461.webp', name: '规格 1' },
      { id: 2, image: '/details/462.webp', name: '规格 2' },
    ]
  },
  73: {
    name: 'Pet Spray Massage Brush',
    price: 13,
    detailImages: [
      '/details/467.webp',
      '/details/468.webp',
      '/details/469.webp',
      '/details/470.webp',
      '/details/471.webp',
      '/details/472.webp',
    ],
    specifications: [
      { id: 1, image: '/details/465.webp', name: '规格 1' },
      { id: 2, image: '/details/466.webp', name: '规格 2' },
    ]
  },
  74: {
    name: 'Cat Deodorizing Care Bath Set',
    price: 51,
    detailImages: [
      '/details/477.webp',
      '/details/478.webp',
      '/details/479.webp',
      '/details/480.webp',
      '/details/474.webp',
      '/details/475.webp',
    ],
    specifications: [
      { id: 1, image: '/details/473.webp', name: '规格 1' },
    ]
  },
  75: {
    name: 'Dog Deodorizing Care Bath Set',
    price: 51.5,
    detailImages: [
      '/details/477.webp',
      '/details/478.webp',
      '/details/479.webp',
      '/details/480.webp',
      '/details/474.webp',
      '/details/475.webp',
    ],
    specifications: [
      { id: 1, image: '/details/476.webp', name: '规格 1' },
    ]
  },
  76: {
    name: 'Pet Fragrance',
    price: 10,
    detailImages: [
      '/details/477.webp',
      '/details/478.webp',
      '/details/479.webp',
      '/details/480.webp',
      '/details/474.webp',
      '/details/475.webp',
    ],
    specifications: [
      { id: 1, image: '/details/478.webp', name: '规格 1' },
    ]
  },
  77: {
    name: 'Dog Bath Liquid',
    price: 15.9,
    detailImages: [
      '/details/477.webp',
      '/details/478.webp',
      '/details/479.webp',
      '/details/480.webp',
      '/details/474.webp',
      '/details/475.webp',
    ],
    specifications: [
      { id: 1, image: '/details/481.webp', name: '规格 1' },
    ]
  },
  78: {
    name: 'Cat Bath Liquid',
    price: 11.9,
    detailImages: [
      '/details/477.webp',
      '/details/478.webp',
      '/details/479.webp',
      '/details/480.webp',
      '/details/474.webp',
      '/details/475.webp',
    ],
    specifications: [
      { id: 1, image: '/details/482.webp', name: '规格 1' },
    ]
  },
  79: {
    name: 'Electric Nail Grinder',
    price: 25.5,
    detailImages: [
      '/details/486.webp',
      '/details/487.webp',
      '/details/488.webp',
      '/details/489.webp',
      '/details/490.webp',
    ],
    specifications: [
      { id: 1, image: '/details/483.webp', name: '规格 1' },
      { id: 2, image: '/details/484.webp', name: '规格 2' },
      { id: 3, image: '/details/485.webp', name: '规格 3' },
    ]
  },
  80: {
    name: 'Pet Wipes',
    price: 11.8,
    detailImages: [
      '/details/492.webp',
      '/details/493.webp',
      '/details/494.webp',
    ],
    specifications: [
      { id: 1, image: '/details/491.webp', name: '规格 1' },
    ]
  },
  81: {
    name: 'Dog Waterproof Raincoat',
    price: '54-82',
    detailImages: [
      '/details/499.webp',
      '/details/500.webp',
      '/details/501.webp',
      '/details/502.webp',
      '/details/503.webp',
    ],
    specifications: [
      { id: 1, image: '/details/495.webp', name: '规格 1' },
      { id: 2, image: '/details/496.webp', name: '规格 2' },
      { id: 3, image: '/details/497.webp', name: '规格 3' },
      { id: 4, image: '/details/498.webp', name: '规格 4' },
    ]
  },
  82: {
    name: 'Pet Cotton Coat',
    price: '30.8-41.8',
    detailImages: [
      '/details/508.webp',
      '/details/509.webp',
      '/details/510.webp',
      '/details/511.webp',
      '/details/512.webp',
      '/details/513.webp',
      '/details/514.webp',
      '/details/515.webp',
      '/details/516.webp',
      '/details/517.webp',
      '/details/518.webp',
      '/details/519.webp',
      '/details/520.webp',
      '/details/521.webp',
      '/details/522.webp',
      '/details/523.webp',
      '/details/524.webp',
      '/details/525.webp',
    ],
    specifications: [
      { id: 1, image: '/details/504.webp', name: '规格 1' },
      { id: 2, image: '/details/505.webp', name: '规格 2' },
      { id: 3, image: '/details/506.webp', name: '规格 3' },
      { id: 4, image: '/details/507.webp', name: '规格 4' },
    ]
  },
  83: {
    name: 'Pet Raincoat',
    price: '24-50',
    detailImages: [
      '/details/528.webp',
      '/details/529.webp',
      '/details/530.webp',
      '/details/531.webp',
      '/details/532.webp',
      '/details/533.webp',
    ],
    specifications: [
      { id: 1, image: '/details/526.webp', name: '规格 1' },
      { id: 2, image: '/details/527.webp', name: '规格 2' },
    ]
  },
  84: {
    name: 'Pet Raincoat',
    price: '27-37',
    detailImages: [
      '/details/539.webp',
      '/details/540.webp',
      '/details/541.webp',
    ],
    specifications: [
      { id: 1, image: '/details/534.webp', name: '规格 1' },
      { id: 2, image: '/details/535.webp', name: '规格 2' },
      { id: 3, image: '/details/536.webp', name: '规格 3' },
      { id: 4, image: '/details/537.webp', name: '规格 4' },
      { id: 5, image: '/details/538.webp', name: '规格 5' },
    ]
  },
  85: {
    name: 'Cat Striped Sweater',
    price: 6.5,
    detailImages: [
      '/details/543.webp',
    ],
    specifications: [
      { id: 1, image: '/details/542.webp', name: '规格 1' },
    ]
  },
  86: {
    name: 'Assault Raincoat',
    price: '68-123',
    detailImages: [
      '/details/547.webp',
      '/details/548.webp',
      '/details/549.webp',
      '/details/550.webp',
      '/details/551.webp',
      '/details/552.webp',
      '/details/553.webp',
    ],
    specifications: [
      { id: 1, image: '/details/544.webp', name: '规格 1' },
      { id: 2, image: '/details/545.webp', name: '规格 2' },
      { id: 3, image: '/details/546.webp', name: '规格 3' },
    ]
  },
  87: {
    name: 'Pet Grooming Kit',
    price: 35.8,
    detailImages: [
      '/details/555.webp',
      '/details/556.webp',
      '/details/557.webp',
      '/details/558.webp',
      '/details/559.webp',
      '/details/560.webp',
      '/details/561.webp',
      '/details/562.webp',
      '/details/563.webp',
    ],
    specifications: [
      { id: 1, image: '/details/554.webp', name: '规格 1' },
    ]
  },
  88: {
    name: 'Pet Warm Sweater',
    price: 32,
    detailImages: [
      '/details/567.webp',
      '/details/568.webp',
      '/details/569.webp',
    ],
    specifications: [
      { id: 1, image: '/details/564.webp', name: '规格 1' },
      { id: 2, image: '/details/565.webp', name: '规格 2' },
      { id: 3, image: '/details/566.webp', name: '规格 3' },
    ]
  },
  89: {
    name: 'Winter Warm Thick Cotton Coat',
    price: 18.8,
    detailImages: [
      '/details/574.webp',
      '/details/575.webp',
      '/details/576.webp',
      '/details/577.webp',
      '/details/578.webp',
      '/details/579.webp',
    ],
    specifications: [
      { id: 1, image: '/details/570.webp', name: '规格 1' },
      { id: 2, image: '/details/571.webp', name: '规格 2' },
      { id: 3, image: '/details/572.webp', name: '规格 3' },
      { id: 4, image: '/details/573.webp', name: '规格 4' },
    ]
  },
  90: {
    name: 'Pet Outdoor Stroller',
    price: 210,
    detailImages: [
      '/details/583.webp',
      '/details/584.webp',
      '/details/585.webp',
      '/details/586.webp',
      '/details/587.webp',
      '/details/588.webp',
      '/details/589.webp',
      '/details/590.webp',
    ],
    specifications: [
      { id: 1, image: '/details/580.webp', name: '规格 1' },
      { id: 2, image: '/details/581.webp', name: '规格 2' },
      { id: 3, image: '/details/582.webp', name: '规格 3' },
    ]
  },
  91: {
    name: 'Pet Tent',
    price: 85,
    detailImages: [
      '/details/593.webp',
      '/details/594.webp',
      '/details/595.webp',
      '/details/596.webp',
    ],
    specifications: [
      { id: 1, image: '/details/591.webp', name: '规格 1' },
      { id: 2, image: '/details/592.webp', name: '规格 2' },
    ]
  },
  92: {
    name: 'Assault Raincoat',
    price: 205,
    detailImages: [
      '/details/547.webp',
      '/details/548.webp',
      '/details/549.webp',
      '/details/550.webp',
      '/details/551.webp',
      '/details/552.webp',
      '/details/553.webp',
    ],
    specifications: [
      { id: 1, image: '/details/545.webp', name: '规格 1' },
    ]
  },
  93: {
    name: 'Pet Tent',
    price: '28-43',
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/599.webp', name: '规格 1', sizes: { 'M - 42×42×38cm': 28, 'L - 50×50×45cm': 43 } },
      { id: 2, image: '/details/600.webp', name: '规格 2', sizes: { 'M - 42×42×38cm': 28, 'L - 50×50×45cm': 43 } },
      { id: 3, image: '/details/601.webp', name: '规格 3', sizes: { 'M - 42×42×38cm': 28 } },
    ]
  },
  94: {
    name: 'Pet Triangle Tent',
    price: 52,
    detailImages: [
      '/details/602.webp',
      '/details/607.webp',
      '/details/608.webp',
      '/details/609.webp',
      '/details/615.webp',
    ],
    specifications: [
      { id: 1, image: '/details/603.webp', name: '规格 1' },
      { id: 2, image: '/details/604.webp', name: '规格 2' },
      { id: 3, image: '/details/605.webp', name: '规格 3' },
      { id: 4, image: '/details/606.webp', name: '规格 4' },
    ]
  },
  95: {
    name: 'Pet Triangle Tent with Mat',
    price: 62,
    detailImages: [
      '/details/602.webp',
      '/details/607.webp',
      '/details/608.webp',
      '/details/609.webp',
      '/details/615.webp',
    ],
    specifications: [
      { id: 1, image: '/details/610.webp', name: '规格 1' },
      { id: 2, image: '/details/611.webp', name: '规格 2' },
      { id: 3, image: '/details/612.webp', name: '规格 3' },
      { id: 4, image: '/details/613.webp', name: '规格 4' },
    ]
  },
  96: {
    name: 'Pet Triangle Tent with Mat',
    price: 62,
    detailImages: [
      '/details/602.webp',
      '/details/607.webp',
      '/details/608.webp',
      '/details/609.webp',
      '/details/615.webp',
    ],
    specifications: [
      { id: 1, image: '/details/610.webp', name: '规格 1' },
      { id: 2, image: '/details/611.webp', name: '规格 2' },
      { id: 3, image: '/details/612.webp', name: '规格 3' },
      { id: 4, image: '/details/613.webp', name: '规格 4' },
    ]
  },
  97: {
    name: 'Pet Foam Steps',
    price: '48.51-83.16',
    detailImages: [
      '/details/627.webp',
      '/details/628.webp',
      '/details/629.webp',
      '/details/630.webp',
    ],
    specifications: [
      { id: 1, image: '/details/616.webp', name: '规格 1', price: 62.37 },
      { id: 2, image: '/details/617.webp', name: '规格 2', price: 69.3 },
      { id: 3, image: '/details/618.webp', name: '规格 3', price: 62.37 },
      { id: 4, image: '/details/619.webp', name: '规格 4', price: 69.3 },
      { id: 5, image: '/details/620.webp', name: '规格 5', price: 83.16 },
      { id: 6, image: '/details/621.webp', name: '规格 6', price: 83.16 },
      { id: 7, image: '/details/622.webp', name: '规格 7', price: 83.16 },
      { id: 8, image: '/details/623.webp', name: '规格 8', price: 48.51 },
      { id: 9, image: '/details/624.webp', name: '规格 9', price: 48.51 },
      { id: 10, image: '/details/625.webp', name: '规格 10', price: 48.51 },
      { id: 11, image: '/details/626.webp', name: '规格 11', price: 62.37 },
    ]
  },
  98: {
    name: 'Anti-Spill Bowl',
    price: 12.5,
    detailImages: [
      '/details/637.webp',
      '/details/638.webp',
    ],
    specifications: [
      { id: 1, image: '/details/631.webp', name: '规格 1' },
      { id: 2, image: '/details/632.webp', name: '规格 2' },
      { id: 3, image: '/details/633.webp', name: '规格 3' },
      { id: 4, image: '/details/634.webp', name: '规格 4' },
      { id: 5, image: '/details/635.webp', name: '规格 5' },
      { id: 6, image: '/details/636.webp', name: '规格 6' },
    ]
  },
  99: {
    name: 'Double Layer Pet Stroller',
    price: 260,
    detailImages: [
      '/details/642.webp',
      '/details/643.webp',
      '/details/644.webp',
      '/details/645.webp',
      '/details/646.webp',
      '/details/647.webp',
      '/details/648.webp',
    ],
    specifications: [
      { id: 1, image: '/details/639.webp', name: '规格 1' },
      { id: 2, image: '/details/640.webp', name: '规格 2' },
      { id: 3, image: '/details/641.webp', name: '规格 3' },
    ]
  },
  100: {
    name: 'Pet Wipes',
    price: 3,
    detailImages: [
      '/details/650.webp',
      '/details/651.webp',
      '/details/652.webp',
    ],
    specifications: [
      { id: 1, image: '/details/649.webp', name: '规格 1' },
    ]
  },
  101: {
    name: 'Expandable Pet Backpack',
    price: 35,
    detailImages: [
      '/details/654.webp',
      '/details/655.webp',
      '/details/656.webp',
      '/details/657.webp',
    ],
    specifications: [
      { id: 1, image: '/details/653.webp', name: '规格 1' },
    ]
  },
  102: {
    name: 'Single Shoulder Cat Bag',
    price: 38,
    detailImages: [
      '/details/659.webp',
      '/details/660.webp',
      '/details/661.webp',
    ],
    specifications: [
      { id: 1, image: '/details/658.webp', name: '规格 1' },
    ]
  },
  103: {
    name: 'Pet Grooming Vacuum Kit',
    price: 300,
    detailImages: [
      '/details/663.webp',
      '/details/664.webp',
      '/details/665.webp',
      '/details/666.webp',
      '/details/667.webp',
      '/details/668.webp',
    ],
    specifications: [
      { id: 1, image: '/details/662.webp', name: '规格 1' },
    ]
  },
  104: {
    name: 'Multifunctional Pet Grooming Tool',
    price: 230,
    detailImages: [
      '/details/670.webp',
      '/details/671.webp',
      '/details/672.webp',
      '/details/673.webp',
      '/details/674.webp',
    ],
    specifications: [
      { id: 1, image: '/details/669.webp', name: '规格 1' },
    ]
  },
  105: {
    name: 'Pet Bath Foam Machine',
    price: 27,
    detailImages: [
      '/details/677.webp',
      '/details/678.webp',
      '/details/679.webp',
      '/details/680.webp',
    ],
    specifications: [
      { id: 1, image: '/details/675.webp', name: '规格 1' },
      { id: 2, image: '/details/676.webp', name: '规格 2' },
    ]
  },
  106: {
    name: 'Automatic Foam Machine',
    price: 16,
    detailImages: [
      '/details/683.webp',
      '/details/684.webp',
      '/details/685.webp',
      '/details/686.webp',
      '/details/687.webp',
    ],
    specifications: [
      { id: 1, image: '/details/681.webp', name: '规格 1' },
      { id: 2, image: '/details/682.webp', name: '规格 2' },
      { id: 3, image: '/details/683.webp', name: '规格 3' },
    ]
  },
  107: {
    name: 'Pet Ultrasonic Dental Cleaner',
    price: 53,
    detailImages: [
      '/details/690.webp',
      '/details/691.webp',
      '/details/692.webp',
      '/details/693.webp',
      '/details/694.webp',
      '/details/695.webp',
    ],
    specifications: [
      { id: 1, image: '/details/688.webp', name: '规格 1' },
      { id: 2, image: '/details/689.webp', name: '规格 2' },
    ]
  },
  108: {
    name: 'Cleaning Foam All-in-One Machine',
    price: 45,
    detailImages: [
      '/details/698.webp',
      '/details/699.webp',
      '/details/700.webp',
      '/details/701.webp',
      '/details/702.webp',
    ],
    specifications: [
      { id: 1, image: '/details/696.webp', name: '规格 1' },
      { id: 2, image: '/details/697.webp', name: '规格 2' },
    ]
  },
  109: {
    name: 'Smart Electric Grooming Blow Dryer All-in-One',
    price: 23,
    detailImages: [
      '/details/706.webp',
      '/details/707.webp',
      '/details/708.webp',
      '/details/709.webp',
    ],
    specifications: [
      { id: 1, image: '/details/703.webp', name: '规格 1' },
      { id: 2, image: '/details/704.webp', name: '规格 2' },
      { id: 3, image: '/details/705.webp', name: '规格 3' },
    ]
  },
  110: {
    name: 'Pet Washing and Care 2-in-1',
    price: 49,
    detailImages: [
      '/details/711.webp',
      '/details/712.webp',
      '/details/713.webp',
      '/details/714.webp',
      '/details/715.webp',
      '/details/716.webp',
    ],
    specifications: [
      { id: 1, image: '/details/710.webp', name: '规格 1' },
    ]
  },
  111: {
    name: 'Pet Electric Clipper',
    price: 80,
    detailImages: [
      '/details/719.webp',
      '/details/720.webp',
      '/details/721.webp',
      '/details/722.webp',
      '/details/723.webp',
    ],
    specifications: [
      { id: 1, image: '/details/717.webp', name: '规格 1' },
      { id: 2, image: '/details/718.webp', name: '规格 2' },
    ]
  },
  112: {
    name: 'Electric Clipper Nail Grooming Set',
    price: 44.65,
    detailImages: [
      '/details/726.webp',
      '/details/727.webp',
      '/details/728.webp',
      '/details/729.webp',
    ],
    specifications: [
      { id: 1, image: '/details/724.webp', name: '规格 1' },
      { id: 2, image: '/details/725.webp', name: '规格 2' },
    ]
  },
  113: {
    name: 'Shadowless Light Pet Nail Clipper',
    price: 45,
    detailImages: [
      '/details/732.webp',
      '/details/733.webp',
    ],
    specifications: [
      { id: 1, image: '/details/730.webp', name: '规格 1' },
      { id: 2, image: '/details/731.webp', name: '规格 2' },
    ]
  },
  114: {
    name: 'Automatic Water Dispenser',
    price: 135.11,
    detailImages: [
      '/details/736.webp',
      '/details/737.webp',
      '/details/738.webp',
      '/details/739.webp',
      '/details/740.webp',
    ],
    specifications: [
      { id: 1, image: '/details/734.webp', name: '规格 1' },
      { id: 2, image: '/details/735.webp', name: '规格 2' },
    ]
  },
  115: {
    name: 'Pet Smart Water Machine',
    price: '53-68',
    detailImages: [
      '/details/745.webp',
      '/details/746.webp',
      '/details/747.webp',
      '/details/748.webp',
      '/details/749.webp',
    ],
    specifications: [
      { id: 1, image: '/details/741.webp', name: '规格 1', price: 53 },
      { id: 2, image: '/details/742.webp', name: '规格 2', price: 53 },
      { id: 3, image: '/details/743.webp', name: '规格 3', price: 68 },
      { id: 4, image: '/details/744.webp', name: '规格 4', price: 68 },
    ]
  },
  116: {
    name: 'Pet Toy Training Reward Food Dispenser',
    price: 37,
    detailImages: [
      '/details/753.webp',
      '/details/754.webp',
      '/details/755.webp',
      '/details/756.webp',
      '/details/757.webp',
      '/details/758.webp',
      '/details/759.webp',
    ],
    specifications: [
      { id: 1, image: '/details/750.webp', name: '规格 1' },
      { id: 2, image: '/details/751.webp', name: '规格 2' },
      { id: 3, image: '/details/752.webp', name: '规格 3' },
    ]
  },
  117: {
    name: 'Automatic Circulating Water Dispenser',
    price: 34.5,
    detailImages: [
      '/details/762.webp',
      '/details/763.webp',
      '/details/764.webp',
      '/details/765.webp',
      '/details/766.webp',
      '/details/767.webp',
      '/details/768.webp',
      '/details/769.webp',
    ],
    specifications: [
      { id: 1, image: '/details/760.webp', name: '规格 1' },
      { id: 2, image: '/details/761.webp', name: '规格 2' },
    ]
  },
  118: {
    name: 'Automatic Feeder',
    price: 22.5,
    detailImages: [
      '/details/771.webp',
      '/details/772.webp',
      '/details/773.webp',
      '/details/774.webp',
      '/details/775.webp',
      '/details/776.webp',
    ],
    specifications: [
      { id: 1, image: '/details/770.webp', name: '规格 1' },
    ]
  },
  119: {
    name: 'Smart Feeder',
    price: 122,
    detailImages: [
      '/details/779.webp',
      '/details/780.webp',
      '/details/781.webp',
      '/details/782.webp',
      '/details/783.webp',
      '/details/784.webp',
      '/details/785.webp',
      '/details/786.webp',
      '/details/787.webp',
    ],
    specifications: [
      { id: 1, image: '/details/777.webp', name: '规格 1' },
      { id: 2, image: '/details/778.webp', name: '规格 2' },
    ]
  },
  120: {
    name: 'Teeth Grinding Toy',
    price: 8,
    detailImages: [
      '/details/791.webp',
      '/details/792.webp',
      '/details/793.webp',
      '/details/794.webp',
      '/details/795.webp',
    ],
    specifications: [
      { id: 1, image: '/details/788.webp', name: '规格 1' },
      { id: 2, image: '/details/789.webp', name: '规格 2' },
      { id: 3, image: '/details/790.webp', name: '规格 3' },
    ]
  },
  121: {
    name: 'Warm Cat Mat',
    price: 47,
    detailImages: [
      '/details/798.webp',
      '/details/799.webp',
      '/details/800.webp',
      '/details/801.webp',
    ],
    specifications: [
      { id: 1, image: '/details/796.webp', name: '规格 1' },
      { id: 2, image: '/details/797.webp', name: '规格 2' },
    ]
  },
  122: {
    name: 'Pet Carpet',
    price: '15-60',
    detailImages: [
      '/details/806.webp',
      '/details/807.webp',
      '/details/808.webp',
    ],
    specifications: [
      { id: 1, image: '/details/802.webp', name: '规格 1', sizes: { 'Diameter 50cm': 15, 'Diameter 60cm': 21.6, 'Diameter 80cm': 38.4, 'Diameter 100cm': 60 } },
      { id: 2, image: '/details/803.webp', name: '规格 2', sizes: { 'Diameter 50cm': 15, 'Diameter 60cm': 21.6, 'Diameter 80cm': 38.4, 'Diameter 100cm': 60 } },
      { id: 3, image: '/details/804.webp', name: '规格 3', sizes: { 'Diameter 50cm': 15, 'Diameter 60cm': 21.6, 'Diameter 80cm': 38.4, 'Diameter 100cm': 60 } },
      { id: 4, image: '/details/805.webp', name: '规格 4', sizes: { 'Diameter 50cm': 15, 'Diameter 60cm': 21.6, 'Diameter 80cm': 38.4, 'Diameter 100cm': 60 } },
    ]
  },
  123: {
    name: 'Foldable Pet Bed',
    price: 34,
    detailImages: [
      '/details/810.webp',
      '/details/811.webp',
      '/details/812.webp',
      '/details/813.webp',
      '/details/814.webp',
      '/details/815.webp',
      '/details/816.webp',
    ],
    specifications: [
      { id: 1, image: '/details/809.webp', name: '规格 1' },
    ]
  },
  124: {
    name: 'Cat Villa',
    price: '200-300',
    detailImages: [
      '/details/822.webp',
      '/details/823.webp',
      '/details/824.webp',
      '/details/835.webp',
      '/details/836.webp',
      '/details/837.webp',
      '/details/838.webp',
    ],
    specifications: [
      { id: 1, image: '/details/817.webp', name: '规格 1', price: 200 },
      { id: 2, image: '/details/818.webp', name: '规格 2', price: 200 },
      { id: 3, image: '/details/819.webp', name: '规格 3', price: 200 },
      { id: 4, image: '/details/820.webp', name: '规格 4', price: 230 },
      { id: 5, image: '/details/821.webp', name: '规格 5', price: 300 },
    ]
  },
  125: {
    name: 'Pet Bed',
    price: '45.97-77.64',
    detailImages: [
      '/details/841.webp',
      '/details/842.webp',
      '/details/843.webp',
      '/details/844.webp',
      '/details/845.webp',
      '/details/846.webp',
      '/details/847.webp',
      '/details/848.webp',
    ],
    specifications: [
      { id: 1, image: '/details/839.webp', name: '规格 1', sizes: { 'M-10斤左右犬猫（小型犬过渡使用）': 45.97, 'L-20斤左右犬猫（小型犬可睡到成年 性价比高）': 64.68, 'XL-35斤左右犬猫（多只宠物可共用）': 77.64 } },
      { id: 2, image: '/details/840.webp', name: '规格 2', sizes: { 'M-10斤左右犬猫（小型犬过渡使用）': 51.72, 'L-20斤左右犬猫（小型犬可睡到成年 性价比高）': 64.68 } },
    ]
  },
  126: {
    name: 'Pet Villa',
    price: '29-78.5',
    detailImages: [
      '/details/861.webp',
      '/details/862.webp',
      '/details/863.webp',
      '/details/864.webp',
      '/details/865.webp',
      '/details/866.webp',
    ],
    specifications: [
      { id: 1, image: '/details/849.webp', name: '规格 1', sizes: { S: 36, M: 47, L: 61 } },
      { id: 2, image: '/details/850.webp', name: '规格 2', sizes: { S: 38, M: 45, L: 59 } },
      { id: 3, image: '/details/851.webp', name: '规格 3', sizes: { M: 36, XL: 60, '2XL': 78.5 } },
      { id: 4, image: '/details/852.webp', name: '规格 4', sizes: { S: 29, M: 36, L: 43.5, XL: 60, '2XL': 78.5 } },
      { id: 5, image: '/details/853.webp', name: '规格 5', sizes: { S: 29, M: 36, L: 43.5, XL: 60, '2XL': 78.5 } },
      { id: 6, image: '/details/854.webp', name: '规格 6', sizes: { S: 35.5, M: 46.5, L: 62.5 } },
      { id: 7, image: '/details/855.webp', name: '规格 7', sizes: { S: 38, M: 49, L: 64.5 } },
      { id: 8, image: '/details/856.webp', name: '规格 8', sizes: { S: 30, M: 41, L: 53.5 } },
      { id: 9, image: '/details/857.webp', name: '规格 9', sizes: { S: 32, M: 43.5, L: 57 } },
      { id: 10, image: '/details/858.webp', name: '规格 10', sizes: { S: 39.5, M: 51.5, L: 63.5 } },
      { id: 11, image: '/details/859.webp', name: '规格 11', sizes: { S: 35.5, M: 46, L: 56.8 } },
      { id: 12, image: '/details/860.webp', name: '规格 12', sizes: { S: 32.8, M: 42.8, L: 54.5 } },
    ]
  },
  127: {
    name: 'Four Season Pet Bed',
    price: '27.5-177.8',
    detailImages: [
      '/details/876.webp',
      '/details/877.webp',
      '/details/878.webp',
      '/details/879.webp',
      '/details/880.webp',
      '/details/881.webp',
    ],
    specifications: [
      { id: 1, image: '/details/867.webp', name: '规格 1', sizes: { 'S (Recommended weight within 3.5kg)': 27.5, 'M (Recommended weight within 5kg)': 37, 'L (Recommended weight within 10kg)': 47.5, 'XL (Recommended weight within 20kg)': 61.5, '2XL (Recommended weight within 40kg)': 89, '3XL (Recommended weight within 60kg)': 130 } },
      { id: 2, image: '/details/868.webp', name: '规格 2', sizes: { 'S (Recommended weight within 3.5kg)': 27.5, 'M (Recommended weight within 5kg)': 37, 'L (Recommended weight within 10kg)': 47.5, 'XL (Recommended weight within 20kg)': 61.5, '2XL (Recommended weight within 40kg)': 89, '3XL (Recommended weight within 60kg)': 130 } },
      { id: 3, image: '/details/869.webp', name: '规格 3', sizes: { 'S (Recommended weight within 3.5kg)': 30.5, 'M (Recommended weight within 5kg)': 35, 'L (Recommended weight within 10kg)': 49, 'XL (Recommended weight within 20kg)': 67.8, '2XL (Recommended weight within 40kg)': 99.5, '3XL (Recommended weight within 60kg)': 131.5 } },
      { id: 4, image: '/details/870.webp', name: '规格 4', sizes: { 'S (Recommended weight within 3.5kg)': 30.5, 'M (Recommended weight within 5kg)': 35, 'L (Recommended weight within 10kg)': 49, 'XL (Recommended weight within 20kg)': 67.8, '2XL (Recommended weight within 40kg)': 99.5, '3XL (Recommended weight within 60kg)': 131.5 } },
      { id: 5, image: '/details/871.webp', name: '规格 5', sizes: { 'S (Recommended weight within 3.5kg)': 30.5, 'M (Recommended weight within 5kg)': 35, 'L (Recommended weight within 10kg)': 49, 'XL (Recommended weight within 20kg)': 67.8, '2XL (Recommended weight within 40kg)': 99.5, '3XL (Recommended weight within 60kg)': 131.5 } },
      { id: 6, image: '/details/872.webp', name: '规格 6', sizes: { 'S (Recommended weight within 3.5kg)': 30.5, 'M (Recommended weight within 5kg)': 35, 'L (Recommended weight within 10kg)': 49, 'XL (Recommended weight within 20kg)': 67.8, '2XL (Recommended weight within 40kg)': 99.5, '3XL (Recommended weight within 60kg)': 131.5 } },
      { id: 7, image: '/details/873.webp', name: '规格 7', sizes: { 'S (Recommended weight within 3.5kg)': 30.5, 'M (Recommended weight within 5kg)': 35, 'L (Recommended weight within 10kg)': 49, 'XL (Recommended weight within 20kg)': 67.8, '2XL (Recommended weight within 40kg)': 99.5, '3XL (Recommended weight within 60kg)': 131.5 } },
      { id: 8, image: '/details/874.webp', name: '规格 8', sizes: { 'S (Recommended weight within 3.5kg)': 41, 'M (Recommended weight within 5kg)': 51, 'L (Recommended weight within 10kg)': 66.5, 'XL (Recommended weight within 20kg)': 77.8, '2XL (Recommended weight within 40kg)': 118.5, '3XL (Recommended weight within 60kg)': 177.8 } },
      { id: 9, image: '/details/875.webp', name: '规格 9', sizes: { 'S (Recommended weight within 3.5kg)': 41, 'M (Recommended weight within 5kg)': 51, 'L (Recommended weight within 10kg)': 66.5, 'XL (Recommended weight within 20kg)': 77.8, '2XL (Recommended weight within 40kg)': 118.5, '3XL (Recommended weight within 60kg)': 177.8 } },
    ]
  },
  128: {
    name: 'Quick-Dry Carpet',
    price: '14.4-32.4',
    detailImages: [
      '/details/888.webp',
      '/details/889.webp',
      '/details/890.webp',
    ],
    specifications: [
      { id: 1, image: '/details/882.webp', name: '规格 1', sizes: { '40x60cm': 14.4, '50x80cm': 24, '60x90cm': 32.4 } },
      { id: 2, image: '/details/883.webp', name: '规格 2', sizes: { '40x60cm': 14.4, '50x80cm': 24, '60x90cm': 32.4 } },
      { id: 3, image: '/details/884.webp', name: '规格 3', sizes: { '40x60cm': 14.4, '50x80cm': 24, '60x90cm': 32.4 } },
      { id: 4, image: '/details/885.webp', name: '规格 4', sizes: { '40x60cm': 14.4, '50x80cm': 24, '60x90cm': 32.4 } },
    ]
  },
  129: {
    name: 'Outdoor Assistance Stretcher Riding Bag',
    price: '36-45',
    detailImages: [
      '/details/896.webp',
      '/details/897.webp',
      '/details/898.webp',
      '/details/899.webp',
      '/details/900.webp',
    ],
    specifications: [
      { id: 1, image: '/details/891.webp', name: '规格 1', sizes: { S: 36, M: 42, L: 45 } },
      { id: 2, image: '/details/892.webp', name: '规格 2', sizes: { S: 36, M: 42, L: 45 } },
      { id: 3, image: '/details/893.webp', name: '规格 3', sizes: { S: 36, M: 42, L: 45 } },
      { id: 4, image: '/details/894.webp', name: '规格 4', sizes: { S: 36, M: 42, L: 45 } },
      { id: 5, image: '/details/895.webp', name: '规格 5', sizes: { S: 36, M: 42, L: 45 } },
    ]
  },
  130: {
    name: 'Cat Bag',
    price: '25-35',
    detailImages: [
      '/details/910.webp',
      '/details/911.webp',
      '/details/912.webp',
      '/details/913.webp',
      '/details/914.webp',
      '/details/915.webp',
    ],
    specifications: [
      { id: 1, image: '/details/901.webp', name: '规格 1', price: 35 },
      { id: 2, image: '/details/902.webp', name: '规格 2', price: 35 },
      { id: 3, image: '/details/903.webp', name: '规格 3', price: 25 },
      { id: 4, image: '/details/904.webp', name: '规格 4', price: 25 },
      { id: 5, image: '/details/905.webp', name: '规格 5', price: 25 },
      { id: 6, image: '/details/906.webp', name: '规格 6', price: 25 },
      { id: 7, image: '/details/907.webp', name: '规格 7', price: 25 },
      { id: 8, image: '/details/908.webp', name: '规格 8', price: 25 },
      { id: 9, image: '/details/909.webp', name: '规格 9', price: 25 },
    ]
  },
  131: {
    name: 'Cat Chest Bag',
    price: 36,
    detailImages: [
      '/details/918.webp',
      '/details/919.webp',
      '/details/920.webp',
      '/details/921.webp',
    ],
    specifications: [
      { id: 1, image: '/details/916.webp', name: '规格 1' },
      { id: 2, image: '/details/917.webp', name: '规格 2' },
    ]
  },
  132: {
    name: 'Large Capacity Backpack',
    price: 62,
    detailImages: [
      '/details/925.webp',
      '/details/926.webp',
      '/details/927.webp',
      '/details/928.webp',
      '/details/929.webp',
      '/details/930.webp',
    ],
    specifications: [
      { id: 1, image: '/details/922.webp', name: '规格 1' },
      { id: 2, image: '/details/923.webp', name: '规格 2' },
      { id: 3, image: '/details/924.webp', name: '规格 3' },
    ]
  },
  133: {
    name: 'Parrot Travel Bag',
    price: 47,
    detailImages: [
      '/details/935.webp',
      '/details/936.webp',
      '/details/937.webp',
      '/details/938.webp',
      '/details/939.webp',
      '/details/940.webp',
    ],
    specifications: [
      { id: 1, image: '/details/931.webp', name: '规格 1' },
      { id: 2, image: '/details/932.webp', name: '规格 2' },
      { id: 3, image: '/details/933.webp', name: '规格 3' },
      { id: 4, image: '/details/934.webp', name: '规格 4' },
    ]
  },
  134: {
    name: 'Car Travel Bag',
    price: 98,
    detailImages: [
      '/details/942.webp',
      '/details/943.webp',
    ],
    specifications: [
      { id: 1, image: '/details/941.webp', name: '规格 1' },
    ]
  },
  135: {
    name: 'Pet Expandable Bag',
    price: 75,
    detailImages: [
      '/details/948.webp',
      '/details/949.webp',
      '/details/950.webp',
      '/details/951.webp',
      '/details/952.webp',
      '/details/953.webp',
      '/details/954.webp',
      '/details/955.webp',
    ],
    specifications: [
      { id: 1, image: '/details/944.webp', name: '规格 1' },
      { id: 2, image: '/details/945.webp', name: '规格 2' },
      { id: 3, image: '/details/946.webp', name: '规格 3' },
      { id: 4, image: '/details/947.webp', name: '规格 4' },
    ]
  },
  136: {
    name: 'Breathable Cat Bag',
    price: 55,
    detailImages: [
      '/details/958.webp',
      '/details/959.webp',
      '/details/960.webp',
      '/details/961.webp',
      '/details/962.webp',
      '/details/963.webp',
      '/details/964.webp',
      '/details/965.webp',
      '/details/966.webp',
      '/details/967.webp',
    ],
    specifications: [
      { id: 1, image: '/details/956.webp', name: '规格 1' },
      { id: 2, image: '/details/957.webp', name: '规格 2' },
    ]
  },
  137: {
    name: 'Breathable Cat Bag',
    price: 102,
    detailImages: [
      '/details/967.webp',
      '/details/968.webp',
      '/details/969.webp',
      '/details/970.webp',
      '/details/971.webp',
      '/details/972.webp',
      '/details/973.webp',
      '/details/974.webp',
      '/details/975.webp',
      '/details/976.webp',
      '/details/977.webp',
    ],
    specifications: [
      { id: 1, image: '/details/968.webp', name: '规格 1' },
    ]
  },
  138: {
    name: 'Space Capsule Backpack',
    price: 43,
    detailImages: [
      '/details/983.webp',
      '/details/984.webp',
      '/details/985.webp',
      '/details/986.webp',
      '/details/987.webp',
      '/details/988.webp',
      '/details/989.webp',
      '/details/990.webp',
    ],
    specifications: [
      { id: 1, image: '/details/978.webp', name: '规格 1' },
      { id: 2, image: '/details/979.webp', name: '规格 2' },
      { id: 3, image: '/details/980.webp', name: '规格 3' },
      { id: 4, image: '/details/981.webp', name: '规格 4' },
      { id: 5, image: '/details/982.webp', name: '规格 5' },
    ]
  },
  139: {
    name: 'Front Cat Bag',
    price: '19-36.5',
    detailImages: [
      '/details/995.webp',
      '/details/996.webp',
      '/details/997.webp',
      '/details/998.webp',
      '/details/999.webp',
      '/details/1000.webp',
      '/details/1001.webp',
      '/details/1002.webp',
      '/details/1003.webp',
      '/details/1004.webp',
    ],
    specifications: [
      { id: 1, image: '/details/991.webp', name: '规格 1', sizes: { 'S - Small (Refer to size chart)': 19, 'M - Medium (Refer to size chart)': 25, 'L - Large (Refer to size chart)': 27.5, 'XL - Extra Large (Refer to size chart)': 31.5, 'XXL - Super Large (Refer to size chart)': 36.5 } },
      { id: 2, image: '/details/992.webp', name: '规格 2', sizes: { 'M - Medium (Refer to size chart)': 22.5, 'L - Large (Refer to size chart)': 25, 'XL - Extra Large (Refer to size chart)': 26.5, 'XXL - Super Large (Refer to size chart)': 29 } },
      { id: 3, image: '/details/993.webp', name: '规格 3', sizes: { 'S - Small (Refer to size chart)': 20, 'M - Medium (Refer to size chart)': 25, 'L - Large (Refer to size chart)': 27.5, 'XL - Extra Large (Refer to size chart)': 31.5, 'XXL - Super Large (Refer to size chart)': 36.5 } },
      { id: 4, image: '/details/994.webp', name: '规格 4', sizes: { 'S - Small (Refer to size chart)': 20, 'M - Medium (Refer to size chart)': 25, 'L - Large (Refer to size chart)': 27.5, 'XL - Extra Large (Refer to size chart)': 31.5, 'XXL - Super Large (Refer to size chart)': 36.5 } },
    ]
  },
  140: {
    name: 'Cat Chest Bag',
    price: '76-94',
    detailImages: [
      '/details/1013.webp',
      '/details/1014.webp',
      '/details/1015.webp',
      '/details/1016.webp',
      '/details/1017.webp',
      '/details/1018.webp',
      '/details/1019.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1005.webp', name: '规格 1', price: 76 },
      { id: 2, image: '/details/1006.webp', name: '规格 2', price: 82 },
      { id: 3, image: '/details/1007.webp', name: '规格 3', price: 88 },
      { id: 4, image: '/details/1008.webp', name: '规格 4', price: 94 },
      { id: 5, image: '/details/1009.webp', name: '规格 5', price: 76 },
      { id: 6, image: '/details/1010.webp', name: '规格 6', price: 76 },
      { id: 7, image: '/details/1011.webp', name: '规格 7', price: 80 },
      { id: 8, image: '/details/1012.webp', name: '规格 8', price: 82 },
    ]
  },
  141: {
    name: 'Panoramic Transparent Cat Bag',
    price: 45,
    detailImages: [
      '/details/1024.webp',
      '/details/1025.webp',
      '/details/1026.webp',
      '/details/1027.webp',
      '/details/1028.webp',
      '/details/1029.webp',
      '/details/1030.webp',
      '/details/1031.webp',
      '/details/1032.webp',
      '/details/1033.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1020.webp', name: '规格 1' },
      { id: 2, image: '/details/1021.webp', name: '规格 2' },
      { id: 3, image: '/details/1022.webp', name: '规格 3' },
      { id: 4, image: '/details/1023.webp', name: '规格 4' },
    ]
  },
  142: {
    name: 'Expandable Travel Handbag',
    price: '32.4-36',
    detailImages: [
      '/details/1037.webp',
      '/details/1042.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1034.webp', name: '规格 1', price: 32.4 },
      { id: 2, image: '/details/1035.webp', name: '规格 2', price: 32.4 },
      { id: 3, image: '/details/1036.webp', name: '规格 3', price: 36 },
    ]
  },
  143: {
    name: 'Cat Bag',
    price: '13-17',
    detailImages: [
      '/details/1046.webp',
      '/details/1047.webp',
      '/details/1048.webp',
      '/details/1049.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1043.webp', name: '规格 1', sizes: { M: 13, L: 17 } },
      { id: 2, image: '/details/1044.webp', name: '规格 2', sizes: { M: 13, L: 17 } },
      { id: 3, image: '/details/1045.webp', name: '规格 3', sizes: { M: 13, L: 17 } },
    ]
  },
  144: {
    name: 'Crossbody Handbag',
    price: '42.5-50.8',
    detailImages: [
      '/details/1054.webp',
      '/details/1055.webp',
      '/details/1056.webp',
      '/details/1057.webp',
      '/details/1058.webp',
      '/details/1059.webp',
      '/details/1060.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1050.webp', name: '规格 1', sizes: { 'S (Recommended weight 2-4kg)': 42.5, 'M (Recommended weight 4-6.5kg)': 44.5, 'L (Recommended weight 6.5-9kg)': 48.8, 'XL (Recommended weight 9-11.5kg)': 50.8 } },
      { id: 2, image: '/details/1051.webp', name: '规格 2', sizes: { 'S (Recommended weight 2-4kg)': 42.5, 'M (Recommended weight 4-6.5kg)': 44.5, 'L (Recommended weight 6.5-9kg)': 48.8, 'XL (Recommended weight 9-11.5kg)': 50.8 } },
    ]
  },
  145: {
    name: 'Pet Backpack',
    price: '30-33',
    detailImages: [
      '/details/1067.webp',
      '/details/1068.webp',
      '/details/1069.webp',
      '/details/1070.webp',
      '/details/1071.webp',
      '/details/1072.webp',
      '/details/1073.webp',
      '/details/1074.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1061.webp', name: '规格 1', price: 33 },
      { id: 2, image: '/details/1062.webp', name: '规格 2', price: 33 },
      { id: 3, image: '/details/1063.webp', name: '规格 3', price: 33 },
      { id: 4, image: '/details/1064.webp', name: '规格 4', price: 30 },
      { id: 5, image: '/details/1065.webp', name: '规格 5', price: 30 },
      { id: 6, image: '/details/1066.webp', name: '规格 6', price: 30 },
    ]
  },
  146: {
    name: 'Front Backpack',
    price: '12-18',
    detailImages: [
      '/details/1082.webp',
      '/details/1083.webp',
      '/details/1084.webp',
      '/details/1085.webp',
      '/details/1086.webp',
      '/details/1087.webp',
      '/details/1088.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1075.webp', name: '规格 1', sizes: { 'S(背长25CM)': 12, 'M(背长33CM)': 14, 'L(背长38CM)': 16, 'XL(背长42CM)': 18 } },
      { id: 2, image: '/details/1076.webp', name: '规格 2', sizes: { 'S(背长25CM)': 12, 'M(背长33CM)': 14, 'L(背长38CM)': 16, 'XL(背长42CM)': 18 } },
      { id: 3, image: '/details/1077.webp', name: '规格 3', sizes: { 'S(背长25CM)': 12, 'M(背长33CM)': 14, 'L(背长38CM)': 16, 'XL(背长42CM)': 18 } },
      { id: 4, image: '/details/1078.webp', name: '规格 4', sizes: { 'S(背长25CM)': 12, 'M(背长33CM)': 14, 'L(背长38CM)': 16, 'XL(背长42CM)': 18 } },
      { id: 5, image: '/details/1079.webp', name: '规格 5', sizes: { 'S(背长25CM)': 12, 'M(背长33CM)': 14, 'L(背长38CM)': 16, 'XL(背长42CM)': 18 } },
      { id: 6, image: '/details/1080.webp', name: '规格 6', sizes: { 'S(背长25CM)': 12, 'M(背长33CM)': 14, 'L(背长38CM)': 16, 'XL(背长42CM)': 18 } },
      { id: 7, image: '/details/1081.webp', name: '规格 7', sizes: { 'S(背长25CM)': 12, 'M(背长33CM)': 14, 'L(背长38CM)': 16, 'XL(背长42CM)': 18 } },
    ]
  },
  147: {
    name: 'Crossbody Travel Airline Bag',
    price: 39,
    detailImages: [
      '/details/1093.webp',
      '/details/1094.webp',
      '/details/1095.webp',
      '/details/1096.webp',
      '/details/1097.webp',
      '/details/1098.webp',
      '/details/1099.webp',
      '/details/1100.webp',
      '/details/1101.webp',
      '/details/1102.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1089.webp', name: '规格 1' },
      { id: 2, image: '/details/1090.webp', name: '规格 2' },
      { id: 3, image: '/details/1091.webp', name: '规格 3' },
      { id: 4, image: '/details/1092.webp', name: '规格 4' },
    ]
  },
  148: {
    name: 'Large Pet Bag',
    price: '67-95',
    detailImages: [
      '/details/1107.webp',
      '/details/1108.webp',
      '/details/1109.webp',
      '/details/1110.webp',
      '/details/1111.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1103.webp', name: '规格 1', sizes: { S: 67, M: 85, L: 95 } },
      { id: 2, image: '/details/1104.webp', name: '规格 2', sizes: { S: 67, M: 85, L: 95 } },
      { id: 3, image: '/details/1105.webp', name: '规格 3', sizes: { S: 67, M: 85, L: 95 } },
      { id: 4, image: '/details/1106.webp', name: '规格 4', sizes: { S: 67, M: 85, L: 95 } },
    ]
  },
  149: {
    name: 'Handheld Travel Backpack',
    price: 49,
    detailImages: [
      '/details/1114.webp',
      '/details/1115.webp',
      '/details/1116.webp',
      '/details/1117.webp',
      '/details/1118.webp',
      '/details/1119.webp',
      '/details/1120.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1112.webp', name: '规格 1' },
      { id: 2, image: '/details/1113.webp', name: '规格 2' },
    ]
  },
  150: {
    name: 'Expandable Travel Breathable Bag',
    price: '75-79',
    detailImages: [
      '/details/1124.webp',
      '/details/1125.webp',
      '/details/1126.webp',
      '/details/1127.webp',
      '/details/1128.webp',
      '/details/1129.webp',
      '/details/1130.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1121.webp', name: '规格 1', sizes: { S: 75, L: 79 } },
      { id: 2, image: '/details/1122.webp', name: '规格 2', sizes: { S: 75, L: 79 } },
      { id: 3, image: '/details/1123.webp', name: '规格 3', sizes: { S: 75, L: 79 } },
    ]
  },
  151: {
    name: 'Transparent Small Crossbody Handbag',
    price: 44,
    detailImages: [
      '/details/1134.webp',
      '/details/1135.webp',
      '/details/1136.webp',
      '/details/1137.webp',
      '/details/1138.webp',
      '/details/1139.webp',
      '/details/1140.webp',
      '/details/1141.webp',
      '/details/1142.webp',
      '/details/1143.webp',
      '/details/1144.webp',
      '/details/2058.webp',
      '/details/2059.webp',
      '/details/2060.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1132.webp', name: '规格 1' },
      { id: 2, image: '/details/1133.webp', name: '规格 2' },
      { id: 3, image: '/details/2057.webp', name: '规格 3' },
    ]
  },
  152: {
    name: 'Breathable Backpack',
    price: 48.8,
    detailImages: [
      '/details/1149.webp',
      '/details/1150.webp',
      '/details/1151.webp',
      '/details/1152.webp',
      '/details/1153.webp',
      '/details/1154.webp',
      '/details/1155.webp',
      '/details/1156.webp',
      '/details/1157.webp',
      '/details/1158.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1145.webp', name: '规格 1' },
      { id: 2, image: '/details/1146.webp', name: '规格 2' },
      { id: 3, image: '/details/1147.webp', name: '规格 3' },
      { id: 4, image: '/details/1148.webp', name: '规格 4' },
    ]
  },
  153: {
    name: 'Breathable Outdoor Backpack',
    price: 115,
    detailImages: [
      '/details/1164.webp',
      '/details/1165.webp',
      '/details/1166.webp',
      '/details/1167.webp',
      '/details/1169.webp',
      '/details/1170.webp',
      '/details/1171.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1159.webp', name: '规格 1' },
      { id: 2, image: '/details/1160.webp', name: '规格 2' },
      { id: 3, image: '/details/1161.webp', name: '规格 3' },
      { id: 4, image: '/details/1162.webp', name: '规格 4' },
      { id: 5, image: '/details/1163.webp', name: '规格 5' },
    ]
  },
  154: {
    name: 'Pet Rolling Suitcase',
    price: 91,
    detailImages: [
      '/details/1174.webp',
      '/details/1175.webp',
      '/details/1176.webp',
      '/details/1177.webp',
      '/details/1178.webp',
      '/details/1179.webp',
      '/details/1180.webp',
      '/details/1181.webp',
      '/details/1182.webp',
      '/details/1183.webp',
      '/details/1184.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1172.webp', name: '规格 1' },
      { id: 2, image: '/details/1173.webp', name: '规格 2' },
    ]
  },
  155: {
    name: 'Expandable Large Capacity Carrier',
    price: 59,
    detailImages: [
      '/details/1189.webp',
      '/details/1190.webp',
      '/details/1191.webp',
      '/details/1192.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1185.webp', name: '规格 1' },
      { id: 2, image: '/details/1186.webp', name: '规格 2' },
      { id: 3, image: '/details/1187.webp', name: '规格 3' },
      { id: 4, image: '/details/1188.webp', name: '规格 4' },
    ]
  },
  156: {
    name: 'Expandable Medium Carrier',
    price: 57.8,
    detailImages: [
      '/details/1195.webp',
      '/details/1196.webp',
      '/details/1197.webp',
      '/details/1198.webp',
      '/details/1199.webp',
      '/details/1200.webp',
      '/details/1201.webp',
      '/details/1202.webp',
      '/details/1203.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1193.webp', name: '规格 1' },
      { id: 2, image: '/details/1194.webp', name: '规格 2' },
    ]
  },
  157: {
    name: 'Transparent Backpack',
    price: 26.5,
    detailImages: [
      '/details/1208.webp',
      '/details/1209.webp',
      '/details/1210.webp',
      '/details/1211.webp',
      '/details/1212.webp',
      '/details/1213.webp',
      '/details/1214.webp',
      '/details/1215.webp',
      '/details/1216.webp',
      '/details/1217.webp',
      '/details/1218.webp',
      '/details/1219.webp',
      '/details/1220.webp',
      '/details/1221.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1204.webp', name: '规格 1' },
      { id: 2, image: '/details/1205.webp', name: '规格 2' },
      { id: 3, image: '/details/1206.webp', name: '规格 3' },
      { id: 4, image: '/details/1207.webp', name: '规格 4' },
    ]
  },
  158: {
    name: 'Pet Large Capacity Luggage',
    price: 166,
    detailImages: [
      '/details/1224.webp',
      '/details/1225.webp',
      '/details/1226.webp',
      '/details/1227.webp',
      '/details/1228.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1222.webp', name: '规格 1' },
      { id: 2, image: '/details/1223.webp', name: '规格 2' },
    ]
  },
  159: {
    name: 'Disabled Pet Mobility Cart',
    price: 130,
    detailImages: [
      '/details/1231.webp',
      '/details/1232.webp',
      '/details/1233.webp',
      '/details/1234.webp',
      '/details/1235.webp',
      '/details/1236.webp',
      '/details/1237.webp',
      '/details/1238.webp',
      '/details/1239.webp',
      '/details/1240.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1229.webp', name: '规格 1' },
      { id: 2, image: '/details/1230.webp', name: '规格 2' },
    ]
  },
  160: {
    name: 'Pet Stroller',
    price: 105,
    detailImages: [
      '/details/1244.webp',
      '/details/1245.webp',
      '/details/1246.webp',
      '/details/1247.webp',
      '/details/1248.webp',
      '/details/1249.webp',
      '/details/1250.webp',
      '/details/1251.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1241.webp', name: '规格 1' },
      { id: 2, image: '/details/1242.webp', name: '规格 2' },
      { id: 3, image: '/details/1243.webp', name: '规格 3' },
    ]
  },
  161: {
    name: 'Pet Stroller',
    price: 170,
    detailImages: [
      '/details/1256.webp',
      '/details/1257.webp',
      '/details/1258.webp',
      '/details/1259.webp',
      '/details/1260.webp',
      '/details/1261.webp',
      '/details/1262.webp',
      '/details/1263.webp',
      '/details/1264.webp',
      '/details/1265.webp',
      '/details/1266.webp',
      '/details/1267.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1252.webp', name: '规格 1' },
      { id: 2, image: '/details/1253.webp', name: '规格 2' },
      { id: 3, image: '/details/1254.webp', name: '规格 3' },
      { id: 4, image: '/details/1255.webp', name: '规格 4' },
    ]
  },
  162: {
    name: 'Pet Stroller',
    price: 520,
    detailImages: [
      '/details/1271.webp',
      '/details/1272.webp',
      '/details/1273.webp',
      '/details/1274.webp',
      '/details/1275.webp',
      '/details/1276.webp',
      '/details/1277.webp',
      '/details/1278.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1268.webp', name: '规格 1' },
      { id: 2, image: '/details/1269.webp', name: '规格 2' },
      { id: 3, image: '/details/1270.webp', name: '规格 3' },
    ]
  },
  163: {
    name: 'Pet Stroller',
    price: 248,
    detailImages: [
      '/details/1285.webp',
      '/details/1286.webp',
      '/details/1287.webp',
      '/details/1288.webp',
      '/details/1289.webp',
      '/details/1290.webp',
      '/details/1291.webp',
      '/details/1292.webp',
      '/details/1293.webp',
      '/details/1294.webp',
      '/details/1295.webp',
      '/details/1296.webp',
      '/details/1297.webp',
      '/details/1298.webp',
      '/details/1299.webp',
      '/details/1300.webp',
      '/details/1301.webp',
      '/details/1302.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1279.webp', name: '规格 1' },
      { id: 2, image: '/details/1280.webp', name: '规格 2' },
      { id: 3, image: '/details/1281.webp', name: '规格 3' },
      { id: 4, image: '/details/1282.webp', name: '规格 4' },
      { id: 5, image: '/details/1283.webp', name: '规格 5' },
      { id: 6, image: '/details/1284.webp', name: '规格 6' },
    ]
  },
  164: {
    name: 'Small to Medium Disabled Mobility Cart',
    price: 125,
    detailImages: [
      '/details/1306.webp',
      '/details/1307.webp',
      '/details/1308.webp',
      '/details/1309.webp',
      '/details/1310.webp',
      '/details/1311.webp',
      '/details/1312.webp',
      '/details/1313.webp',
      '/details/1314.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1303.webp', name: '规格 1', sizes: { XXS: 125, XS: 125, S: 125, M: 125, L: 125 } },
      { id: 2, image: '/details/1304.webp', name: '规格 2', sizes: { XXS: 125, XS: 125, S: 125, M: 125, L: 125 } },
      { id: 3, image: '/details/1305.webp', name: '规格 3', sizes: { XXS: 125, XS: 125, S: 125, M: 125, L: 125 } },
    ]
  },
  165: {
    name: 'Small Stroller',
    price: 68,
    detailImages: [
      '/details/1319.webp',
      '/details/1320.webp',
      '/details/1321.webp',
      '/details/1322.webp',
      '/details/1323.webp',
      '/details/1324.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1315.webp', name: '规格 1' },
      { id: 2, image: '/details/1316.webp', name: '规格 2' },
      { id: 3, image: '/details/1317.webp', name: '规格 3' },
      { id: 4, image: '/details/1318.webp', name: '规格 4' },
    ]
  },
  166: {
    name: 'Stroller',
    price: 188,
    detailImages: [
      '/details/1328.webp',
      '/details/1329.webp',
      '/details/1330.webp',
      '/details/1331.webp',
      '/details/1332.webp',
      '/details/1333.webp',
      '/details/1334.webp',
      '/details/1335.webp',
      '/details/1336.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1325.webp', name: '规格 1' },
      { id: 2, image: '/details/1326.webp', name: '规格 2' },
      { id: 3, image: '/details/1327.webp', name: '规格 3' },
    ]
  },
  167: {
    name: 'Cat Climbing Frame',
    price: 92,
    detailImages: [
      '/details/1339.webp',
      '/details/1340.webp',
      '/details/1341.webp',
      '/details/1342.webp',
      '/details/1343.webp',
      '/details/1344.webp',
      '/details/1345.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1337.webp', name: '规格 1' },
      { id: 2, image: '/details/1338.webp', name: '规格 2' },
    ]
  },
  168: {
    name: 'Cat Nest',
    price: '24-52',
    detailImages: [
      '/details/1353.webp',
      '/details/1354.webp',
      '/details/1355.webp',
      '/details/1356.webp',
      '/details/1357.webp',
      '/details/1358.webp',
      '/details/1359.webp',
      '/details/1360.webp',
      '/details/1361.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1346.webp', name: '规格 1', sizes: { S: 26, M: 42, L: 52 } },
      { id: 2, image: '/details/1347.webp', name: '规格 2', sizes: { S: 26, M: 42, L: 52 } },
      { id: 3, image: '/details/1348.webp', name: '规格 3', sizes: { S: 28, M: 34, L: 40 } },
      { id: 4, image: '/details/1349.webp', name: '规格 4', sizes: { S: 28, M: 34, L: 40 } },
      { id: 5, image: '/details/1350.webp', name: '规格 5', sizes: { S: 24, M: 30, L: 40 } },
      { id: 6, image: '/details/1351.webp', name: '规格 6', sizes: { S: 24, M: 30, L: 40 } },
      { id: 7, image: '/details/1352.webp', name: '规格 7', sizes: { S: 24, M: 30, L: 40 } },
    ]
  },
  169: {
    name: 'Mushroom House',
    price: '48-58',
    detailImages: [
      '/details/1365.webp',
      '/details/1366.webp',
      '/details/1367.webp',
      '/details/1368.webp',
      '/details/1369.webp',
      '/details/1370.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1362.webp', name: '规格 1', sizes: { 'M-39x39cm': 48, 'L-48x48cm': 58 } },
      { id: 2, image: '/details/1363.webp', name: '规格 2', sizes: { 'M-39x39cm': 48, 'L-48x48cm': 58 } },
      { id: 3, image: '/details/1364.webp', name: '规格 3', sizes: { 'M-39x39cm': 48, 'L-48x48cm': 58 } },
    ]
  },
  170: {
    name: 'Pet Villa',
    price: '29-78.5',
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/1371.webp', name: '规格 1' },
    ]
  },
  171: {
    name: 'Cat Nest Tree Climbing Frame',
    price: '26-39',
    detailImages: [
      '/details/1373.webp',
      '/details/1374.webp',
      '/details/1375.webp',
      '/details/1376.webp',
      '/details/1377.webp',
      '/details/1378.webp',
      '/details/1379.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1372.webp', name: '规格 1', sizes: { 'Double Layer 60×65×37cm': 26, 'Triple Layer 60×95×37cm': 36, 'Double Layer 60×65×37cm + 2 Cushions': 39 } },
    ]
  },
  172: {
    name: 'Outdoor Sunshade Tent',
    price: '29.8-37.8',
    detailImages: [
      '/details/1384.webp',
      '/details/1385.webp',
      '/details/1386.webp',
      '/details/1387.webp',
      '/details/1388.webp',
      '/details/1389.webp',
      '/details/1390.webp',
      '/details/1391.webp',
      '/details/1392.webp',
      '/details/1393.webp',
      '/details/1394.webp',
      '/details/1395.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1380.webp', name: '规格 1', sizes: { S: 29.8, M: 32.8, L: 37.8 } },
      { id: 2, image: '/details/1381.webp', name: '规格 2', sizes: { S: 29.8, M: 32.8, L: 37.8 } },
      { id: 3, image: '/details/1382.webp', name: '规格 3', sizes: { S: 29.8, M: 32.8, L: 37.8 } },
      { id: 4, image: '/details/1383.webp', name: '规格 4', sizes: { S: 29.8, M: 32.8, L: 37.8 } },
    ]
  },
  173: {
    name: 'Round Cat Nest',
    price: '33.95-50.51',
    detailImages: [
      '/details/1398.webp',
      '/details/1399.webp',
      '/details/1400.webp',
      '/details/1401.webp',
      '/details/1402.webp',
      '/details/1403.webp',
      '/details/1404.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1396.webp', name: '规格 1', sizes: { 'S-40x40cm': 33.95, 'M-50x50cm': 41.31, 'L-60x60cm': 50.51 } },
      { id: 2, image: '/details/1397.webp', name: '规格 2', sizes: { 'S-40x40cm': 33.95, 'M-50x50cm': 41.31, 'L-60x60cm': 50.51 } },
    ]
  },
  174: {
    name: 'Pumpkin Thick Tent',
    price: '18.9-46.5',
    detailImages: [
      '/details/1406.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1405.webp', name: '规格 1', sizes: { 'S-35x35x34cm': 18.9, 'M-45x45x40cm': 28.5, 'L-56x56x43cm': 37.5, 'XL-60x60x50cm': 46.5 } },
    ]
  },
  175: {
    name: 'Pumpkin Warm Cat Nest',
    price: '21.8-33.3',
    detailImages: [
      '/details/1410.webp',
      '/details/1411.webp',
      '/details/1412.webp',
      '/details/1413.webp',
      '/details/1414.webp',
      '/details/1415.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1407.webp', name: '规格 1', sizes: { 'S-43x43x36cm': 21.8, 'M-47x47x42cm': 28, 'L-52x52x47cm': 33.3 } },
      { id: 2, image: '/details/1408.webp', name: '规格 2', sizes: { 'S-43x43x36cm': 21.8, 'M-47x47x42cm': 28, 'L-52x52x47cm': 33.3 } },
      { id: 3, image: '/details/1409.webp', name: '规格 3', sizes: { 'S-43x43x36cm': 21.8, 'M-47x47x42cm': 28, 'L-52x52x47cm': 33.3 } },
    ]
  },
  176: {
    name: 'Autumn Winter Pet Nest',
    price: '27.5-115.8',
    detailImages: [
      '/details/1418.webp',
      '/details/1419.webp',
      '/details/1420.webp',
      '/details/1421.webp',
      '/details/1422.webp',
      '/details/1423.webp',
      '/details/1424.webp',
      '/details/1425.webp',
      '/details/1426.webp',
      '/details/1427.webp',
      '/details/1428.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1416.webp', name: '规格 1', sizes: { 'S (Recommended weight within 3.5kg)': 27.5, 'M (Recommended weight within 5kg)': 32.8, 'XL (Recommended weight within 20kg)': 59.5, 'XXL (Recommended weight within 40kg)': 82, '3XL (Recommended weight within 60kg)': 115.8 } },
      { id: 2, image: '/details/1417.webp', name: '规格 2', sizes: { 'S (Recommended weight within 3.5kg)': 27.5, 'M (Recommended weight within 5kg)': 32.8, 'XL (Recommended weight within 20kg)': 59.5, 'XXL (Recommended weight within 40kg)': 82, '3XL (Recommended weight within 60kg)': 115.8 } },
    ]
  },
  177: {
    name: 'Tree Hole Cat Nest',
    price: '18.5-27',
    detailImages: [
      '/details/1433.webp',
      '/details/1434.webp',
      '/details/1435.webp',
      '/details/1436.webp',
      '/details/1437.webp',
      '/details/1438.webp',
      '/details/1439.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1429.webp', name: '规格 1', price: 27 },
      { id: 2, image: '/details/1430.webp', name: '规格 2', price: 27 },
      { id: 3, image: '/details/1431.webp', name: '规格 3', price: 18.5 },
      { id: 4, image: '/details/1432.webp', name: '规格 4', price: 18.5 },
    ]
  },
  178: {
    name: 'Cat Nest',
    price: '31.17-174.19',
    detailImages: [
      '/details/1445.webp',
      '/details/1446.webp',
      '/details/1447.webp',
      '/details/1448.webp',
      '/details/1449.webp',
      '/details/1450.webp',
      '/details/1451.webp',
      '/details/1452.webp',
      '/details/1453.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1440.webp', name: '规格 1', sizes: { S: 31.17, M: 40.08, L: 53.94, XL: 69.77, '3XL': 122.23 } },
      { id: 2, image: '/details/1441.webp', name: '规格 2', sizes: { S: 31.17, M: 40.08, L: 53.94, XL: 69.77, '3XL': 122.23 } },
      { id: 3, image: '/details/1442.webp', name: '规格 3', sizes: { S: 31.17, M: 40.08, L: 53.94, XL: 69.77, '3XL': 122.23 } },
      { id: 4, image: '/details/1443.webp', name: '规格 4', sizes: { S: 38.6, M: 51.46, L: 63.83, XL: 91.55, '2XL': 174.19 } },
      { id: 5, image: '/details/1444.webp', name: '规格 5', sizes: { S: 38.6, M: 51.46, L: 63.83, XL: 91.55 } },
    ]
  },
  179: {
    name: 'Lucky Cat Nest',
    price: '28-44',
    detailImages: [
      '/details/1457.webp',
      '/details/1458.webp',
      '/details/1459.webp',
      '/details/1460.webp',
      '/details/1461.webp',
      '/details/1462.webp',
      '/details/1463.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1454.webp', name: '规格 1', sizes: { 'S-34x34x34cm': 28, 'M-41x41x41cm': 38, 'L-48x48x48cm': 44 } },
      { id: 2, image: '/details/1455.webp', name: '规格 2', sizes: { 'S-34x34x34cm': 28, 'M-41x41x41cm': 38, 'L-48x48x48cm': 44 } },
      { id: 3, image: '/details/1456.webp', name: '规格 3', sizes: { 'S-34x34x34cm': 28, 'M-41x41x41cm': 38, 'L-48x48x48cm': 44 } },
    ]
  },
  180: {
    name: 'Pet Product 180',
    price: 150,
    detailImages: [],
    specifications: []
  },
  181: {
    name: 'Cat Cage Villa',
    price: '90-198',
    detailImages: [
      '/details/1479.webp',
      '/details/1480.webp',
      '/details/1481.webp',
      '/details/1482.webp',
      '/details/1483.webp',
      '/details/1484.webp',
      '/details/1485.webp',
      '/details/1486.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1464.webp', name: '规格 1', price: 90 },
      { id: 2, image: '/details/1465.webp', name: '规格 2', price: 97 },
      { id: 3, image: '/details/1466.webp', name: '规格 3', price: 105 },
      { id: 4, image: '/details/1467.webp', name: '规格 4', price: 124 },
      { id: 5, image: '/details/1468.webp', name: '规格 5', price: 114 },
      { id: 6, image: '/details/1471.webp', name: '规格 6', price: 140 },
      { id: 7, image: '/details/1472.webp', name: '规格 7', price: 131 },
      { id: 8, image: '/details/1473.webp', name: '规格 8', price: 161 },
      { id: 9, image: '/details/1474.webp', name: '规格 9', price: 141 },
      { id: 10, image: '/details/1475.webp', name: '规格 10', price: 183 },
      { id: 11, image: '/details/1476.webp', name: '规格 11', price: 172 },
      { id: 12, image: '/details/1477.webp', name: '规格 12', price: 198 },
      { id: 13, image: '/details/1478.webp', name: '规格 13', price: 198 },
    ]
  },
  182: {
    name: 'Pet Product 182',
    price: 160,
    detailImages: [],
    specifications: []
  },
  183: {
    name: 'Pet Vest Cotton Coat',
    price: 37,
    detailImages: [
      '/details/1491.webp',
      '/details/1492.webp',
      '/details/1493.webp',
      '/details/1494.webp',
      '/details/1495.webp',
      '/details/1496.webp',
      '/details/1497.webp',
      '/details/1498.webp',
      '/details/1499.webp',
      '/details/1500.webp',
      '/details/1501.webp',
      '/details/1502.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1487.webp', name: '规格 1' },
      { id: 2, image: '/details/1488.webp', name: '规格 2' },
      { id: 3, image: '/details/1489.webp', name: '规格 3' },
      { id: 4, image: '/details/1490.webp', name: '规格 4' },
    ]
  }
}

function ProductContent() {
  const { addToCart } = useCart()
  const searchParams = useSearchParams()
  let productId = parseInt(searchParams.get('id') || '1')

  // Products 180 and 182 redirect to product 15
  if (productId === 180 || productId === 182) {
    productId = 15
  }

  // Product 170 redirects to product 126
  if (productId === 170) {
    productId = 126
  }

  // Products 92 redirects to product 86
  if (productId === 92) {
    productId = 86
  }

  // Products 96 redirects to product 95
  if (productId === 96) {
    productId = 95
  }

  // 获取当前商品数据
  const product = productData[productId] || productData[1]
  const productImages = product.detailImages.length > 0 ? product.detailImages : (product.specifications?.map(spec => spec.image) || [])
  const specifications = product.specifications || []
  const colors = product.colors || []

  const sizes = (productId === 29 || productId === 30)
    ? productId === 29
      ? [
          { size: 'S', price: 18.8, stock: 406 },
          { size: 'M', price: 25.3, stock: 346 },
          { size: 'L', price: 37, stock: 375 },
        ]
      : [
          { size: 'XXS', price: 14.5, stock: 395 },
          { size: 'XS', price: 14.5, stock: 400 },
          { size: 'S', price: 14.5, stock: 406 },
          { size: 'M', price: 14.5, stock: 346 },
          { size: 'L', price: 14.5, stock: 375 },
        ]
    : productId === 35
    ? [
        { size: 'S', price: 14.5, stock: 406 },
        { size: 'M', price: 15.5, stock: 346 },
        { size: 'L', price: 16.5, stock: 375 },
        { size: 'XL', price: 17.5, stock: 407 },
        { size: '2XL', price: 18.5, stock: 439 },
      ]
    : productId === 36
    ? [
        { size: 'M', price: 37.5, stock: 346 },
        { size: 'L', price: 50.8, stock: 375 },
      ]
    : productId === 38
    ? [
        { size: 'S', price: 29, stock: 406 },
        { size: 'M', price: 35, stock: 346 },
        { size: 'L', price: 41, stock: 375 },
      ]
    : productId === 40
    ? [
        { size: 'S', price: 12.87, stock: 406 },
        { size: 'M', price: 14.85, stock: 346 },
        { size: 'L', price: 16.83, stock: 375 },
      ]
    : productId === 42
    ? [
        { size: 'S', price: 10.88, stock: 406 },
        { size: 'M', price: 14.88, stock: 346 },
        { size: 'L', price: 17.88, stock: 375 },
        { size: 'XL', price: 23.88, stock: 407 },
        { size: 'XXL', price: 27.88, stock: 439 },
      ]
    : productId === 43
    ? [
        { size: 'S', price: 4, stock: 406 },
        { size: 'M', price: 4, stock: 346 },
      ]
    : productId === 48
    ? [
        { size: 'S', price: 40, stock: 406 },
        { size: 'M', price: 45, stock: 346 },
        { size: 'L', price: 52, stock: 375 },
        { size: 'XL', price: 61, stock: 407 },
      ]
    : productId === 49
    ? [
        { size: 'S', price: 3.5, stock: 406 },
        { size: 'M', price: 6.5, stock: 346 },
        { size: 'L', price: 9, stock: 375 },
        { size: 'XL', price: 12, stock: 407 },
        { size: '2XL', price: 18, stock: 439 },
      ]
    : productId === 50
    ? [
        { size: 'S', price: 3.9, stock: 406 },
        { size: 'M', price: 5.5, stock: 346 },
        { size: 'L', price: 8.5, stock: 375 },
        { size: 'XL', price: 10.5, stock: 407 },
        { size: '2XL', price: 12.5, stock: 439 },
        { size: '3XL', price: 18, stock: 456 },
      ]
    : productId === 55
    ? [
        { size: 'XS — Chest 30cm, Back Length 20cm', price: 15, stock: 400 },
        { size: 'S — Chest 35cm, Back Length 25cm', price: 15, stock: 406 },
        { size: 'M — Chest 40cm, Back Length 30cm', price: 15, stock: 346 },
        { size: 'L — Chest 45cm, Back Length 35cm', price: 15, stock: 375 },
        { size: 'XL — Chest 50cm, Back Length 40cm', price: 15, stock: 407 },
        { size: '2XL — Chest 55cm, Back Length 45cm', price: 15, stock: 439 },
      ]
    : productId === 56
    ? [
        { size: 'XS — Chest 24-28cm, 0.5-1kg', price: 14, stock: 400 },
        { size: 'S — Chest 28-32cm, 1-1.5kg', price: 14, stock: 406 },
        { size: 'M — Chest 32-36cm, 2-2.5kg', price: 14, stock: 346 },
        { size: 'L — Chest 36-40cm, 3-4kg', price: 14, stock: 375 },
        { size: 'XL — Chest 40-45cm, 4.5-6kg', price: 14, stock: 407 },
      ]
    : productId === 57
    ? [
        { size: 'XS', price: 7, stock: 400 },
        { size: 'S', price: 7, stock: 406 },
        { size: 'M', price: 7, stock: 346 },
        { size: 'L', price: 7, stock: 375 },
        { size: 'XL', price: 7, stock: 407 },
      ]
    : productId === 58
    ? [
        { size: 'XS', price: 22.8, stock: 400 },
        { size: 'S', price: 22.8, stock: 406 },
        { size: 'M', price: 22.8, stock: 346 },
        { size: 'L', price: 22.8, stock: 375 },
        { size: 'XL', price: 22.8, stock: 407 },
        { size: 'XXL', price: 22.8, stock: 430 },
      ]
    : productId === 59
    ? [
        { size: 'S', price: 16.64, stock: 406 },
        { size: 'M', price: 16.64, stock: 346 },
        { size: 'L', price: 16.64, stock: 375 },
        { size: 'XL', price: 16.64, stock: 407 },
        { size: 'XXL', price: 16.64, stock: 430 },
      ]
    : productId === 60
    ? [
        { size: 'XXS', price: 15, stock: 395 },
        { size: 'XS', price: 15, stock: 400 },
        { size: 'S', price: 15, stock: 406 },
        { size: 'M', price: 15, stock: 346 },
        { size: 'L', price: 15, stock: 375 },
        { size: 'XL', price: 15, stock: 407 },
        { size: 'XXL', price: 15, stock: 430 },
        { size: '3XL', price: 15, stock: 456 },
      ]
    : productId === 61
    ? [
        { size: 'S', price: 35, stock: 406 },
        { size: 'M', price: 35, stock: 346 },
        { size: 'L', price: 35, stock: 375 },
      ]
    : productId === 62
    ? [
        { size: 'XS', price: 12.8, stock: 400 },
        { size: 'S', price: 12.8, stock: 406 },
        { size: 'M', price: 12.8, stock: 346 },
        { size: 'L', price: 12.8, stock: 375 },
        { size: 'XL', price: 12.8, stock: 407 },
        { size: 'XXL', price: 12.8, stock: 430 },
      ]
    : productId === 63
    ? [
        { size: 'XS', price: 22, stock: 400 },
        { size: 'S', price: 22, stock: 406 },
        { size: 'M', price: 22, stock: 346 },
        { size: 'L', price: 22, stock: 375 },
        { size: 'XL', price: 22, stock: 407 },
      ]
    : productId === 64
    ? [
        { size: 'S', price: 22.8, stock: 406 },
        { size: 'M', price: 22.8, stock: 346 },
        { size: 'L', price: 22.8, stock: 375 },
        { size: 'XL', price: 22.8, stock: 407 },
        { size: 'XXL', price: 22.8, stock: 430 },
      ]
    : productId === 66
    ? [
        { size: 'S', price: 35, stock: 406 },
        { size: 'M', price: 40, stock: 346 },
        { size: 'L', price: 45, stock: 375 },
      ]
    : productId === 81
    ? [
        { size: 'XS', price: 54, stock: 400 },
        { size: 'S', price: 57, stock: 406 },
        { size: 'M', price: 60, stock: 346 },
        { size: 'L', price: 62, stock: 375 },
        { size: 'XL', price: 64, stock: 407 },
        { size: '2XL', price: 68, stock: 439 },
        { size: '3XL', price: 72, stock: 456 },
        { size: '4XL', price: 82, stock: 470 },
      ]
    : productId === 82
    ? [
        { size: 'S', price: 30.8, stock: 406 },
        { size: 'M', price: 32.8, stock: 346 },
        { size: 'L', price: 34.8, stock: 375 },
        { size: 'XL', price: 36.8, stock: 407 },
        { size: '2XL', price: 39.8, stock: 439 },
        { size: '3XL', price: 41.8, stock: 456 },
      ]
    : productId === 83
    ? [
        { size: 'M', price: 24, stock: 346 },
        { size: 'L', price: 25, stock: 375 },
        { size: 'XL', price: 26, stock: 407 },
        { size: 'XXL', price: 27, stock: 430 },
        { size: '3XL', price: 40, stock: 456 },
        { size: '4XL', price: 42, stock: 470 },
        { size: '5XL', price: 44, stock: 485 },
        { size: '6XL', price: 46, stock: 500 },
        { size: '7XL', price: 48, stock: 515 },
        { size: '8XL', price: 50, stock: 530 },
      ]
    : productId === 84
    ? [
        { size: '12', price: 27, stock: 406 },
        { size: '14', price: 27, stock: 406 },
        { size: '16', price: 27, stock: 406 },
        { size: '18', price: 27, stock: 406 },
        { size: '20', price: 37, stock: 407 },
        { size: '22', price: 37, stock: 407 },
        { size: '24', price: 37, stock: 407 },
        { size: '26', price: 37, stock: 407 },
        { size: '28', price: 37, stock: 407 },
        { size: '30', price: 37, stock: 407 },
      ]
    : productId === 85
    ? [
        { size: 'S', price: 6.5, stock: 406 },
        { size: 'M', price: 6.5, stock: 346 },
        { size: 'L', price: 6.5, stock: 375 },
        { size: 'XL', price: 6.5, stock: 407 },
      ]
    : productId === 86
    ? [
        { size: 'XS(10")', price: 68, stock: 400 },
        { size: 'S(12")', price: 72, stock: 406 },
        { size: 'M(14")', price: 77, stock: 346 },
        { size: 'L(16")', price: 81, stock: 375 },
        { size: 'XL(18")', price: 85, stock: 407 },
        { size: '2XL(20")', price: 92, stock: 439 },
        { size: '3XL(22")', price: 96, stock: 456 },
        { size: '3XL+(24")', price: 105, stock: 460 },
        { size: '4XL(26")', price: 110, stock: 470 },
        { size: '4XL+(28")', price: 115, stock: 475 },
        { size: '5XL(30")', price: 123, stock: 485 },
      ]
    : productId === 88
    ? [
        { size: 'S', price: 32, stock: 406 },
        { size: 'M', price: 32, stock: 346 },
        { size: 'L', price: 32, stock: 375 },
        { size: 'XL', price: 32, stock: 407 },
        { size: 'XXL', price: 32, stock: 430 },
        { size: '3XL', price: 32, stock: 456 },
      ]
    : productId === 89
    ? [
        { size: 'M', price: 18.8, stock: 346 },
        { size: 'L', price: 18.8, stock: 375 },
        { size: 'XL', price: 18.8, stock: 407 },
      ]
    : productId === 2 || productId === 3 || productId === 9 || productId === 10
    ? [
        { size: 'S', price: productId === 2 ? 17 : productId === 3 ? 19 : productId === 9 ? 39 : 31, stock: 406 },
        { size: 'M', price: productId === 2 ? 17 : productId === 3 ? 19 : productId === 9 ? 39 : 31, stock: 346 },
        { size: 'L', price: productId === 2 ? 17 : productId === 3 ? 19 : productId === 9 ? 39 : 31, stock: 375 },
        { size: 'XL', price: productId === 2 ? 17 : productId === 3 ? 19 : productId === 9 ? 39 : 31, stock: 407 },
      ]
    : productId === 4
    ? [
        { size: 'S', price: 22, stock: 406 },
        { size: 'M', price: 22, stock: 346 },
        { size: 'L', price: 22, stock: 375 },
        { size: 'XL', price: 22, stock: 407 },
        { size: '2XL', price: 22, stock: 439 },
      ]
    : productId === 5 || productId === 6 || productId === 7 || productId === 8
    ? [
        { size: 'XS', price: productId === 5 ? 13 : productId === 6 ? 14 : productId === 7 ? 19 : 16, stock: 400 },
        { size: 'S', price: productId === 5 ? 13 : productId === 6 ? 14 : productId === 7 ? 19 : 16, stock: 406 },
        { size: 'M', price: productId === 5 ? 13 : productId === 6 ? 14 : productId === 7 ? 19 : 16, stock: 346 },
        { size: 'L', price: productId === 5 ? 13 : productId === 6 ? 14 : productId === 7 ? 19 : 16, stock: 375 },
        { size: 'XL', price: productId === 5 ? 13 : productId === 6 ? 14 : productId === 7 ? 19 : 16, stock: 407 },
        { size: '2XL', price: productId === 5 ? 13 : productId === 6 ? 14 : productId === 7 ? 19 : 16, stock: 439 },
        { size: '3XL', price: productId === 5 ? 13 : productId === 6 ? 14 : productId === 7 ? 19 : 16, stock: 456 },
      ]
    : productId === 11
    ? [
        { size: 'S', price: 34, stock: 406 },
        { size: 'M', price: 34, stock: 346 },
        { size: 'L', price: 34, stock: 375 },
      ]
    : productId === 131
    ? [
        { size: 'M — 2-5kg (Recommended back length 28cm)', price: 36, stock: 346 },
        { size: 'L — 5-10kg (Recommended back length 31cm)', price: 36, stock: 375 },
        { size: 'XL — 10-15kg (Recommended back length 35cm)', price: 36, stock: 407 },
      ]
    : [
        { size: 'S', price: 39, stock: 406 },
        { size: 'M', price: 39, stock: 346 },
        { size: 'L', price: 39, stock: 375 },
        { size: 'XL', price: 39, stock: 407 },
        { size: '2XL', price: 39, stock: 439 },
        { size: '3XL', price: 39, stock: 456 },
      ]

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSpec, setSelectedSpec] = useState<number | null>(null)
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)
  // 存储每个规格+尺寸的数量: { specId: { size: quantity } }
  const [specSizeQuantities, setSpecSizeQuantities] = useState<{[key: number]: {[key: string]: number}}>({})
  // 颜色选择状态
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [colorSizeQuantities, setColorSizeQuantities] = useState<{[key: string]: {[key: string]: number}}>({})

  // 选中某个规格进行配置
  const selectSpec = (specId: number) => {
    setSelectedSpec(specId)
    // 如果该规格还没有初始化，初始化尺寸数量
    if (!specSizeQuantities[specId]) {
      // For products that only need quantity selection (no size selection)
      const quantityOnlyProducts = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 37, 39, 41, 44, 45, 46, 47, 51, 52, 53, 54, 65, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 87, 90, 91, 94, 95, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 123, 124, 130, 132, 133, 134, 135, 136, 137, 138, 140, 141, 142, 145, 147, 149, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 165, 166, 167, 177, 181]

      if (quantityOnlyProducts.includes(productId)) {
        // For quantity-only products, initialize with 'onesize'
        setSpecSizeQuantities(prev => ({
          ...prev,
          [specId]: { 'onesize': 0 }
        }))
      } else {
        // Get appropriate size configuration based on product ID
        let defaultSizes: {[key: string]: number} = {}

        if (productId === 2 || productId === 3 || productId === 9 || productId === 10) {
          // Products 2, 3, 9, 10: Remove 2XL, 3XL
          defaultSizes = { 'S': 0, 'M': 0, 'L': 0, 'XL': 0 }
        } else if (productId === 4) {
          // Product 4: Remove 3XL only
          defaultSizes = { 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0 }
        } else if (productId === 5 || productId === 6 || productId === 7 || productId === 8) {
          // Products 5, 6, 7, 8: Add XS
          defaultSizes = { 'XS': 0, 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0, '3XL': 0 }
        } else if (productId === 11) {
          // Product 11: Remove XL, 2XL, 3XL
          defaultSizes = { 'S': 0, 'M': 0, 'L': 0 }
        } else if (productId === 30) {
          // Product 30: Add XXS, XS
          defaultSizes = { 'XXS': 0, 'XS': 0, 'S': 0, 'M': 0, 'L': 0 }
        } else {
          // Default sizes for other products
          defaultSizes = { 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0, '3XL': 0 }
        }

        setSpecSizeQuantities(prev => ({
          ...prev,
          [specId]: defaultSizes
        }))
      }
    }
  }

  // 更新某个规格的某个尺寸的数量
  const updateSpecSizeQuantity = (specId: number, size: string, delta: number) => {
    setSpecSizeQuantities(prev => {
      const newQuantities = { ...prev }
      if (!newQuantities[specId]) {
        newQuantities[specId] = { 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0, '3XL': 0 }
      }
      newQuantities[specId] = {
        ...newQuantities[specId],
        [size]: Math.max(0, (newQuantities[specId][size] || 0) + delta)
      }
      return newQuantities
    })
  }

  // 取消某个规格的所有选择
  const removeSpec = (specId: number) => {
    setSpecSizeQuantities(prev => {
      const newQuantities = { ...prev }
      delete newQuantities[specId]
      return newQuantities
    })
    if (selectedSpec === specId) {
      setSelectedSpec(null)
    }
  }

  // 获取某个规格的总数量
  const getSpecTotalQuantity = (specId: number) => {
    if (!specSizeQuantities[specId]) return 0
    return Object.values(specSizeQuantities[specId]).reduce((sum, qty) => sum + qty, 0)
  }

  // 颜色选择相关函数
  const selectColor = (colorId: string) => {
    setSelectedColor(colorId)
    if (!colorSizeQuantities[colorId]) {
      setColorSizeQuantities(prev => ({
        ...prev,
        [colorId]: { 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0, '3XL': 0 }
      }))
    }
  }

  const updateColorSizeQuantity = (colorId: string, size: string, delta: number) => {
    setColorSizeQuantities(prev => {
      const newQuantities = { ...prev }
      if (!newQuantities[colorId]) {
        newQuantities[colorId] = { 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0, '3XL': 0 }
      }
      newQuantities[colorId] = {
        ...newQuantities[colorId],
        [size]: Math.max(0, (newQuantities[colorId][size] || 0) + delta)
      }
      return newQuantities
    })
  }

  const removeColor = (colorId: string) => {
    setColorSizeQuantities(prev => {
      const newQuantities = { ...prev }
      delete newQuantities[colorId]
      return newQuantities
    })
    if (selectedColor === colorId) {
      setSelectedColor(null)
    }
  }

  const getColorTotalQuantity = (colorId: string) => {
    if (!colorSizeQuantities[colorId]) return 0
    return Object.values(colorSizeQuantities[colorId]).reduce((sum, qty) => sum + qty, 0)
  }

  const handleAddToCart = () => {
    let totalAdded = 0

    // 规格商品加入购物车
    Object.entries(specSizeQuantities).forEach(([specId, sizes]) => {
      Object.entries(sizes).forEach(([size, qty]) => {
        if (qty > 0) {
          // For products with spec-based pricing/sizing and special configurations
          // For products 29, 35, 36, 38, 40, 42, 43, 48, 49, 50, 55-66 get price based on size or fixed price
          let itemPrice = 0
          if (productId === 93 || productId === 122 || productId === 125 || productId === 126 || productId === 127 || productId === 128 || productId === 129 || productId === 139 || productId === 143 || productId === 144 || productId === 146 || productId === 148 || productId === 150 || productId === 164 || productId === 168 || productId === 169 || productId === 171 || productId === 172 || productId === 173 || productId === 174 || productId === 175 || productId === 176 || productId === 178 || productId === 179) {
            // Products with spec-based sizes: Get price from specification's sizes object
            const spec = specifications.find(s => s.id === parseInt(specId))
            if (spec && spec.sizes && spec.sizes[size as keyof typeof spec.sizes]) {
              itemPrice = spec.sizes[size as keyof typeof spec.sizes] as number
            } else {
              itemPrice = 0
            }
          } else if (productId === 97 || productId === 115 || productId === 124 || productId === 130 || productId === 140 || productId === 142 || productId === 145 || productId === 177 || productId === 181 || productId === 57) {
            // Products with spec-based pricing: Get price from specification's price property
            itemPrice = specifications.find(s => s.id === parseInt(specId))?.price || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 25 || productId === 31 || productId === 32) {
            itemPrice = specifications.find(s => s.id === parseInt(specId))?.price || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 29) {
            // Product 29 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'S': 18.8,
              'M': 25.3,
              'L': 37
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 35) {
            // Product 35 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'S': 14.5,
              'M': 15.5,
              'L': 16.5,
              'XL': 17.5,
              '2XL': 18.5
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 36) {
            // Product 36 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'M': 37.5,
              'L': 50.8
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 38) {
            // Product 38 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'S': 29,
              'M': 35,
              'L': 41
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 40) {
            // Product 40 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'S': 12.87,
              'M': 14.85,
              'L': 16.83
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 42) {
            // Product 42 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'S': 10.88,
              'M': 14.88,
              'L': 17.88,
              'XL': 23.88,
              'XXL': 27.88
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 43) {
            // Product 43 price is fixed at $4
            itemPrice = 4
          } else if (productId === 48) {
            // Product 48 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'S': 40,
              'M': 45,
              'L': 52,
              'XL': 61
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 49) {
            // Product 49 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'S': 3.5,
              'M': 6.5,
              'L': 9,
              'XL': 12,
              '2XL': 18
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 50) {
            // Product 50 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'S': 3.9,
              'M': 5.5,
              'L': 8.5,
              'XL': 10.5,
              '2XL': 12.5,
              '3XL': 18
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 55 || productId === 56 || productId === 58 || productId === 59 || productId === 60 || productId === 61 || productId === 62 || productId === 63 || productId === 64) {
            // Products 55-64 (except 57) have fixed pricing regardless of size
            itemPrice = typeof product.price === 'number' ? product.price : 0
          } else if (productId === 66) {
            // Product 66 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'S': 35,
              'M': 40,
              'L': 45
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 81) {
            // Product 81 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'XS': 54,
              'S': 57,
              'M': 60,
              'L': 62,
              'XL': 64,
              '2XL': 68,
              '3XL': 72,
              '4XL': 82
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 82) {
            // Product 82 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'S': 30.8,
              'M': 32.8,
              'L': 34.8,
              'XL': 36.8,
              '2XL': 39.8,
              '3XL': 41.8
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 83) {
            // Product 83 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'M': 24,
              'L': 25,
              'XL': 26,
              'XXL': 27,
              '3XL': 40,
              '4XL': 42,
              '5XL': 44,
              '6XL': 46,
              '7XL': 48,
              '8XL': 50
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 84) {
            // Product 84 price mapping by size
            const sizePrice: { [key: string]: number } = {
              '12': 27,
              '14': 27,
              '16': 27,
              '18': 27,
              '20': 37,
              '22': 37,
              '24': 37,
              '26': 37,
              '28': 37,
              '30': 37
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 85) {
            // Product 85 price is fixed at $6.5 for all sizes
            itemPrice = 6.5
          } else if (productId === 86) {
            // Product 86 price mapping by size
            const sizePrice: { [key: string]: number } = {
              'XS(10")': 68,
              'S(12")': 72,
              'M(14")': 77,
              'L(16")': 81,
              'XL(18")': 85,
              '2XL(20")': 92,
              '3XL(22")': 96,
              '3XL+(24")': 105,
              '4XL(26")': 110,
              '4XL+(28")': 115,
              '5XL(30")': 123
            }
            itemPrice = sizePrice[size] || (typeof product.price === 'number' ? product.price : 0)
          } else if (productId === 88) {
            // Product 88 price is fixed at $32 for all sizes
            itemPrice = 32
          } else if (productId === 89) {
            // Product 89 price is fixed at $18.8 for all sizes
            itemPrice = 18.8
          } else if (productId === 57) {
            itemPrice = specifications.find(s => s.id === parseInt(specId))?.price || 7
          } else if (productId === 69) {
            itemPrice = specifications.find(s => s.id === parseInt(specId))?.price || 87
          } else {
            itemPrice = typeof product.price === 'number' ? product.price : 0
          }

          for (let i = 0; i < qty; i++) {
            // Calculate page number and position in category list
            const pageNumber = Math.ceil(productId / 8)
            const itemPosition = ((productId - 1) % 8) + 1

            addToCart({
              id: Date.now() + Math.random(),
              name: `${product.name} - Spec ${specId} - ${size}`,
              price: itemPrice,
              pageNumber: pageNumber,
              itemPosition: itemPosition
            })
            totalAdded++
          }
        }
      })
    })

    // 颜色商品加入购物车
    Object.entries(colorSizeQuantities).forEach(([colorId, sizes]) => {
      const colorName = colors.find(c => c.id === colorId)?.name || colorId
      Object.entries(sizes).forEach(([size, qty]) => {
        if (qty > 0) {
          for (let i = 0; i < qty; i++) {
            // Calculate page number and position in category list
            const pageNumber = Math.ceil(productId / 8)
            const itemPosition = ((productId - 1) % 8) + 1

            addToCart({
              id: Date.now() + Math.random(),
              name: `${product.name} - ${colorName} - ${size}`,
              price: product.price,
              pageNumber: pageNumber,
              itemPosition: itemPosition
            })
            totalAdded++
          }
        }
      })
    })

    if (totalAdded > 0) {
      alert(`已添加 ${totalAdded} 件商品到购物车！`)
      setSpecSizeQuantities({})
      setColorSizeQuantities({})
      setSelectedSpec(null)
      setSelectedColor(null)
    } else {
      alert('请先选择商品规格/颜色和尺寸')
    }
  }

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* 返回按钮 */}
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回商品列表</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
        {/* 左侧：产品图片 */}
        <div className="flex flex-col gap-4">
          {/* 主图 */}
          <div className="aspect-square rounded-lg overflow-hidden">
            <Image
              src={productImages[selectedImage]}
              alt="Product"
              width={800}
              height={800}
              unoptimized={true}
              className="w-full h-full object-contain"
            />
          </div>

          {/* 缩略图 - 动态显示，有几张显示几张 */}
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(productImages.length, 5)}, minmax(0, 1fr))` }}>
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? 'border-2 border-primary' : 'border-2 border-slate-200 dark:border-slate-700'
                } transition-all focus:outline-none focus:ring-2 focus:ring-primary`}
              >
                <Image
                  src={img}
                  alt={`图片 ${index + 1}`}
                  width={200}
                  height={200}
                  unoptimized={true}
                  className="w-full h-full object-contain"
                />
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

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">{product.name}</h1>
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

          <p className="text-2xl md:text-3xl font-bold text-primary mt-4">
            ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
          </p>

          {/* Product 9 weight notice */}
          {productId === 9 && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Suitable for pets up to 25 lbs</span>
              </p>
            </div>
          )}

          {/* Size Chart - Product 2 */}
          {productId === 2 && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 mb-3">Size Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Length</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Chest</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Weight</th>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                      <td className="py-1 px-3">Unit</td>
                      <td className="py-1 px-3">cm</td>
                      <td className="py-1 px-3">cm</td>
                      <td className="py-1 px-3">lbs</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">S</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">24</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">38</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">3-5</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">M</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">28</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">43</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">6-8</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">L</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">33</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">48</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">9-11</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">XL</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">38</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">53</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">12-15</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">* Please choose the appropriate size based on your pet's actual measurements</p>
              </div>
            </div>
          )}

          {/* Size Chart - Product 3 only */}
          {productId === 3 && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 mb-3">Size Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Neck</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Chest</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Length</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Weight</th>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                      <td className="py-1 px-3">Unit</td>
                      <td className="py-1 px-3">cm</td>
                      <td className="py-1 px-3">cm</td>
                      <td className="py-1 px-3">cm</td>
                      <td className="py-1 px-3">lbs</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">S</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">25</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">37</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">24</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">6-8</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">M</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">30</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">43</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">29</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">9-12</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">L</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">35</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">48</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">34</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">13-16</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">XL</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">45</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">52</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">40</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">17-20</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">* Please choose the appropriate size based on your pet's actual measurements</p>
              </div>
            </div>
          )}

          {/* Size Chart - Product 5 */}
          {productId === 5 && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 mb-3">Size Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Chest</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Length</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Weight</th>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                      <td className="py-1 px-3">Unit</td>
                      <td className="py-1 px-3">cm</td>
                      <td className="py-1 px-3">cm</td>
                      <td className="py-1 px-3">lbs</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">XS</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">30</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">20</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">1-3</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">S</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">35</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">25</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">3-5</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">M</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">40</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">30</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">5-8</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">L</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">45</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">35</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">8-12</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">XL</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">50</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">38</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">12-15</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">2XL</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">55</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">42</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">15-20</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">3XL</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">60</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">45</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">20-25</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">* Please choose the appropriate size based on your pet's actual measurements</p>
              </div>
            </div>
          )}

          {/* Size Chart - Product 6 */}
          {productId === 6 && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 mb-3">Size Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Chest</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Length</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Weight</th>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                      <td className="py-1 px-3">Unit</td>
                      <td className="py-1 px-3">cm</td>
                      <td className="py-1 px-3">cm</td>
                      <td className="py-1 px-3">lbs</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">XS</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">32</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">20</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">2-3</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">S</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">36</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">25</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">4-6</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">SM</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">40</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">27</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">6-8</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">M</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">45</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">32</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">8-10</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">L</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">50</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">35</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">10-15</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">XL</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">55</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">34</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">15-20</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">XXL</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">60</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">36</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">20-25</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">3XL</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">65</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">36</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">25-30</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">* Please choose the appropriate size based on your pet's actual measurements</p>
              </div>
            </div>
          )}

          {/* Size Chart - Product 8 (same as Product 5) */}
          {productId === 8 && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 mb-3">Size Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Chest</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Length</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-900 dark:text-slate-200">Weight</th>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                      <td className="py-1 px-3">Unit</td>
                      <td className="py-1 px-3">cm</td>
                      <td className="py-1 px-3">cm</td>
                      <td className="py-1 px-3">lbs</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">XS</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">30</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">20</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">1-3</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">S</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">35</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">25</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">3-5</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">M</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">40</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">30</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">5-8</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">L</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">45</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">35</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">8-12</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">XL</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">50</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">38</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">12-15</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">2XL</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">55</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">42</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">15-20</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">3XL</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">60</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">45</td>
                      <td className="py-2 px-3 text-slate-600 dark:text-slate-400">20-25</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">* Please choose the appropriate size based on your pet's actual measurements</p>
              </div>
            </div>
          )}

          {/* 颜色选择 - 仅第12个商品显示 */}
          {colors.length > 0 && (
            <div className="mt-8">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 mb-4">选择颜色</h3>
              <div className="flex gap-3">
                {colors.map((color) => {
                  const totalQty = getColorTotalQuantity(color.id)
                  const isSelected = colorSizeQuantities[color.id] !== undefined

                  return (
                    <div key={color.id} className="relative">
                      {/* 颜色方块 */}
                      <div
                        className={`w-16 h-16 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-primary'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                        style={{ backgroundColor: color.color }}
                        onClick={() => selectColor(color.id)}
                        title={color.name}
                      >
                        {/* 显示数量徽章 */}
                        {totalQty > 0 && (
                          <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {totalQty}
                          </div>
                        )}
                      </div>

                      {/* 颜色名称 */}
                      <p className="text-xs text-center mt-2 text-slate-600 dark:text-slate-400">{color.name}</p>

                      {/* 删除按钮 */}
                      {isSelected && (
                        <button
                          type="button"
                          className="absolute -bottom-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg transition-colors z-20"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            removeColor(color.id)
                          }}
                          title="删除此颜色"
                        >
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Size Chart for Product 4 */}
          {productId === 4 && (
            <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 mb-4">Size Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-orange-400">
                      <th className="border border-orange-400 p-2 text-slate-900 dark:text-slate-200">Size</th>
                      <th className="border border-orange-400 p-2 text-slate-900 dark:text-slate-200">Neck<br/>cm</th>
                      <th className="border border-orange-400 p-2 text-slate-900 dark:text-slate-200">Chest<br/>cm</th>
                      <th className="border border-orange-400 p-2 text-slate-900 dark:text-slate-200">Length<br/>cm</th>
                      <th className="border border-orange-400 p-2 text-slate-900 dark:text-slate-200">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-orange-400 p-2 text-center font-semibold text-slate-900 dark:text-slate-200">S</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">24</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">34</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">24</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">4-5 lbs</td>
                    </tr>
                    <tr>
                      <td className="border border-orange-400 p-2 text-center font-semibold text-slate-900 dark:text-slate-200">M</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">28</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">40</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">28</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">6-8 lbs</td>
                    </tr>
                    <tr>
                      <td className="border border-orange-400 p-2 text-center font-semibold text-slate-900 dark:text-slate-200">L</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">32</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">45</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">32</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">9-10 lbs</td>
                    </tr>
                    <tr>
                      <td className="border border-orange-400 p-2 text-center font-semibold text-slate-900 dark:text-slate-200">XL</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">36</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">49</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">37</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">11-15 lbs</td>
                    </tr>
                    <tr>
                      <td className="border border-orange-400 p-2 text-center font-semibold text-slate-900 dark:text-slate-200">2XL</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">40</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">54</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">41</td>
                      <td className="border border-orange-400 p-2 text-center text-slate-700 dark:text-slate-300">16-22 lbs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <p className="text-orange-600 dark:text-orange-400 font-semibold">Size Guide:</p>
                <p>• Please measure your pet carefully before purchasing</p>
                <p>• Pet chest measurement ≠ Garment chest measurement</p>
                <p>• Pet chest + ease allowance = Garment chest</p>
                <p>• For thin fabrics: add 3-5cm to pet chest measurement</p>
                <p>• For thick winter coats: add 5-7cm to pet chest measurement</p>
                <p>• (Larger breeds may need more ease than smaller breeds)</p>
              </div>
            </div>
          )}

          {/* Product 24 尺寸显示 */}
          {productId === 24 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">尺寸</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">40x26x22 cm</p>
              </div>
            </div>
          )}

          {/* Product 33 特性显示 */}
          {productId === 33 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Features</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Drop-resistant Thickened 2-Pack</p>
              </div>
            </div>
          )}

          {/* Product 34 规格显示 */}
          {productId === 34 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Specifications</h3>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200">New Hot Blue</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Large Capacity Viewing Window | 32×28×45 cm | 40320g | 1100ml
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200">New Hot Black</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Large Capacity Viewing Window | 32×28×45 cm | 40320g | 1100ml
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200">New Hot Gray</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Large Capacity Viewing Window | 32×28×45 cm | 40320g | 1100ml
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Product 40 尺寸规格显示 */}
          {productId === 40 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Specifications</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-1">
                <p className="text-sm text-slate-700 dark:text-slate-300">S - Neck: 13-20cm | Depth: 10cm | Weight: 23.7g</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">M - Neck: 17-23cm | Depth: 12cm | Weight: 43.6g</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">L - Neck: 20-26cm | Depth: 14cm | Weight: 60g</p>
              </div>
            </div>
          )}

          {/* Product 44 尺寸显示 */}
          {productId === 44 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">43×28×28 cm</p>
              </div>
            </div>
          )}

          {/* Product 51 尺寸显示 */}
          {productId === 51 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">52×40×70-97 cm</p>
              </div>
            </div>
          )}

          {/* Product 54 尺寸显示 */}
          {productId === 54 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-1">
                <p className="text-sm text-slate-700 dark:text-slate-300">56×33×56 cm</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">60×47×95 cm</p>
              </div>
            </div>
          )}

          {/* Product 58 尺码表 */}
          {productId === 58 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Chart</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-600">
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Chest (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Length (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Weight (lbs)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 dark:text-slate-300">
                    <tr><td className="py-1">XS</td><td>25-30</td><td>13</td><td>2-3</td></tr>
                    <tr><td className="py-1">S</td><td>30-36</td><td>16</td><td>3-5</td></tr>
                    <tr><td className="py-1">M</td><td>35-40</td><td>18</td><td>6-8</td></tr>
                    <tr><td className="py-1">L</td><td>40-45</td><td>20</td><td>9-11</td></tr>
                    <tr><td className="py-1">XL</td><td>45-50</td><td>23</td><td>12-15</td></tr>
                    <tr><td className="py-1">XXL</td><td>50-55</td><td>26.5</td><td>15-18</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product 59 尺码表 */}
          {productId === 59 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Chart</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-600">
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Chest (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Back (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Weight (lbs)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 dark:text-slate-300">
                    <tr><td className="py-1">S</td><td>32</td><td>20</td><td>1-3</td></tr>
                    <tr><td className="py-1">M</td><td>36</td><td>25</td><td>3-5</td></tr>
                    <tr><td className="py-1">L</td><td>42</td><td>30</td><td>5-8</td></tr>
                    <tr><td className="py-1">XL</td><td>47</td><td>35</td><td>8-11</td></tr>
                    <tr><td className="py-1">XXL</td><td>53</td><td>40</td><td>11-16</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product 60 尺码表 */}
          {productId === 60 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Chart</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-600">
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Back (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Chest (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Neck (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Weight (lbs)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 dark:text-slate-300">
                    <tr><td className="py-1">XXS</td><td>11</td><td>22</td><td>17</td><td>0.5-1.2</td></tr>
                    <tr><td className="py-1">XS</td><td>16</td><td>27</td><td>20</td><td>1.3-2.4</td></tr>
                    <tr><td className="py-1">S</td><td>20</td><td>32</td><td>23</td><td>2.5-4</td></tr>
                    <tr><td className="py-1">M</td><td>25</td><td>37</td><td>26</td><td>4-6</td></tr>
                    <tr><td className="py-1">L</td><td>30</td><td>42</td><td>29</td><td>6-8.5</td></tr>
                    <tr><td className="py-1">XL</td><td>35</td><td>47</td><td>33</td><td>8-12</td></tr>
                    <tr><td className="py-1">XXL</td><td>40</td><td>52</td><td>36</td><td>12-18</td></tr>
                    <tr><td className="py-1">3XL</td><td>45</td><td>65</td><td>40</td><td>18-30</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product 61 尺码表 */}
          {productId === 61 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Chart</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-600">
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Waist (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Chest (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Weight (g)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Pet Weight (lbs)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 dark:text-slate-300">
                    <tr><td className="py-1">S</td><td>42-54</td><td>50-66</td><td>295</td><td>15-28</td></tr>
                    <tr><td className="py-1">M</td><td>58-72</td><td>56-76</td><td>313</td><td>28-45</td></tr>
                    <tr><td className="py-1">L</td><td>62-80</td><td>76-110</td><td>350</td><td>45-90</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product 62 尺码表 */}
          {productId === 62 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Chart</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-600">
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Chest (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Back (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Weight (lbs)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 dark:text-slate-300">
                    <tr><td className="py-1">XS</td><td>32</td><td>20</td><td>1-3</td></tr>
                    <tr><td className="py-1">S</td><td>37</td><td>25</td><td>3-5</td></tr>
                    <tr><td className="py-1">M</td><td>42</td><td>30</td><td>5-8</td></tr>
                    <tr><td className="py-1">L</td><td>47</td><td>35</td><td>8-11</td></tr>
                    <tr><td className="py-1">XL</td><td>52</td><td>40</td><td>11-15</td></tr>
                    <tr><td className="py-1">XXL</td><td>57</td><td>45</td><td>15-20</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product 63 尺码表 */}
          {productId === 63 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Chart</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-600">
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Chest (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Back (cm)</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Weight (lbs)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 dark:text-slate-300">
                    <tr><td className="py-1">XS</td><td>28-32</td><td>18-22</td><td>≤3</td></tr>
                    <tr><td className="py-1">S</td><td>36-40</td><td>23-27</td><td>4-6</td></tr>
                    <tr><td className="py-1">M</td><td>40-44</td><td>28-32</td><td>7.5-9</td></tr>
                    <tr><td className="py-1">L</td><td>44-48</td><td>33-37</td><td>10-12</td></tr>
                    <tr><td className="py-1">XL</td><td>52-56</td><td>38-42</td><td>13-16</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product 67 尺寸显示 */}
          {productId === 67 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">25×25×5 cm</p>
              </div>
            </div>
          )}

          {/* Product 68 尺寸显示 */}
          {productId === 68 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">36×38×25 cm</p>
              </div>
            </div>
          )}

          {/* Product 80 特性显示 */}
          {productId === 80 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Features</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">130 Eye Wipes + Ear Cleaning Kit</p>
              </div>
            </div>
          )}

          {/* Product 83 尺码表 */}
          {productId === 83 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Chart</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-600">
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Price</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Weight</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Note</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 dark:text-slate-300">
                    <tr><td className="py-1">M</td><td>$24</td><td>5-8 lbs</td><td></td></tr>
                    <tr><td className="py-1">L</td><td>$25</td><td>8-12 lbs</td><td></td></tr>
                    <tr><td className="py-1">XL</td><td>$26</td><td>12-15 lbs</td><td></td></tr>
                    <tr><td className="py-1">XXL</td><td>$27</td><td>15-20 lbs</td><td></td></tr>
                    <tr><td className="py-1">3XL</td><td>$40</td><td>20-30 lbs</td><td>No feet cover</td></tr>
                    <tr><td className="py-1">4XL</td><td>$42</td><td>30-40 lbs</td><td>No feet cover</td></tr>
                    <tr><td className="py-1">5XL</td><td>$44</td><td>40-50 lbs</td><td>No feet cover</td></tr>
                    <tr><td className="py-1">6XL</td><td>$46</td><td>50-65 lbs</td><td>No feet cover</td></tr>
                    <tr><td className="py-1">7XL</td><td>$48</td><td>65-80 lbs</td><td>No feet cover</td></tr>
                    <tr><td className="py-1">8XL</td><td>$50</td><td>80-100 lbs</td><td>No feet cover</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product 84 尺码表 */}
          {productId === 84 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Chart</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-600">
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Price</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Chest</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Back</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Neck</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 dark:text-slate-300">
                    <tr><td className="py-1">12 (Full)</td><td>$27</td><td>42cm</td><td>32cm</td><td>32cm</td><td>2.5-3.5kg</td></tr>
                    <tr><td className="py-1">14 (Full)</td><td>$27</td><td>45cm</td><td>36cm</td><td>34cm</td><td>3.5-5kg</td></tr>
                    <tr><td className="py-1">16 (Full)</td><td>$27</td><td>53cm</td><td>40cm</td><td>38cm</td><td>5-7.5kg</td></tr>
                    <tr><td className="py-1">18 (Full)</td><td>$27</td><td>58cm</td><td>44cm</td><td>40cm</td><td>7.5-10kg</td></tr>
                    <tr><td className="py-1">20 (Full)</td><td>$37</td><td>63cm</td><td>56cm</td><td>44cm</td><td>10-12.5kg</td></tr>
                    <tr><td className="py-1">22 (Full)</td><td>$37</td><td>68cm</td><td>60cm</td><td>48cm</td><td>12.5-15kg</td></tr>
                    <tr><td className="py-1">24 (Full)</td><td>$37</td><td>74cm</td><td>64cm</td><td>50cm</td><td>15-20kg</td></tr>
                    <tr><td className="py-1">26 (Full)</td><td>$37</td><td>80cm</td><td>69cm</td><td>52cm</td><td>20-25kg</td></tr>
                    <tr><td className="py-1">28 (Full)</td><td>$37</td><td>88cm</td><td>73cm</td><td>56cm</td><td>25-35kg</td></tr>
                    <tr><td className="py-1">30 (Full)</td><td>$37</td><td>103cm</td><td>78cm</td><td>63cm</td><td>35-50kg</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product 85 尺码表 */}
          {productId === 85 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Chart</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-600">
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 dark:text-slate-300">
                    <tr><td className="py-1">S</td><td>1.5kg-2.5kg</td></tr>
                    <tr><td className="py-1">M</td><td>3-5kg</td></tr>
                    <tr><td className="py-1">L</td><td>5.5kg-12.5kg</td></tr>
                    <tr><td className="py-1">XL</td><td>8kg-10kg</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product 86 尺码表 */}
          {productId === 86 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Chart</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-600">
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Price</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Length</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Neck</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Chest</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 dark:text-slate-300">
                    <tr><td className="py-1">XS(10")</td><td>$68</td><td>25cm</td><td>32-36cm</td><td>38-44cm</td></tr>
                    <tr><td className="py-1">S(12")</td><td>$72</td><td>30cm</td><td>34-38cm</td><td>44-52cm</td></tr>
                    <tr><td className="py-1">M(14")</td><td>$77</td><td>35cm</td><td>37-42cm</td><td>48-60cm</td></tr>
                    <tr><td className="py-1">L(16")</td><td>$81</td><td>40cm</td><td>40-46cm</td><td>53-65cm</td></tr>
                    <tr><td className="py-1">XL(18")</td><td>$85</td><td>45cm</td><td>42-48cm</td><td>58-70cm</td></tr>
                    <tr><td className="py-1">2XL(20")</td><td>$92</td><td>50cm</td><td>46-50cm</td><td>65-78cm</td></tr>
                    <tr><td className="py-1">3XL(22")</td><td>$96</td><td>55cm</td><td>50-56cm</td><td>72-86cm</td></tr>
                    <tr><td className="py-1">3XL+(24")</td><td>$105</td><td>60cm</td><td>53-60cm</td><td>72-90cm</td></tr>
                    <tr><td className="py-1">4XL(26")</td><td>$110</td><td>66cm</td><td>57-64cm</td><td>75-94cm</td></tr>
                    <tr><td className="py-1">4XL+(28")</td><td>$115</td><td>71cm</td><td>61-68cm</td><td>84-100cm</td></tr>
                    <tr><td className="py-1">5XL(30")</td><td>$123</td><td>76cm</td><td>67-74cm</td><td>92-110cm</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product 89 尺码表 */}
          {productId === 89 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Chart</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-600">
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Size</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Back</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Chest</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Neck</th>
                      <th className="text-left py-2 text-slate-900 dark:text-slate-200">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 dark:text-slate-300">
                    <tr><td className="py-1">M</td><td>31cm</td><td>42cm</td><td>32cm</td><td>3.5-4.5kg</td></tr>
                    <tr><td className="py-1">L</td><td>35cm</td><td>46cm</td><td>38cm</td><td>5-6.5kg</td></tr>
                    <tr><td className="py-1">XL</td><td>39cm</td><td>50cm</td><td>42cm</td><td>6.5-9kg</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product 95 尺寸显示 */}
          {productId === 95 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">60×55×63 cm</p>
              </div>
            </div>
          )}

          {/* Product 99 尺寸显示 */}
          {productId === 99 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">95×67×50 cm</p>
              </div>
            </div>
          )}

          {/* Product 101 尺寸显示 */}
          {productId === 101 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">43×29×37 cm</p>
              </div>
            </div>
          )}

          {/* Product 102 尺寸显示 */}
          {productId === 102 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">45×28×28 cm</p>
              </div>
            </div>
          )}

          {/* Product 121 尺寸显示 */}
          {productId === 121 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions & Weight Limit</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">52×52×22 cm</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Weight limit: 7.5kg</p>
              </div>
            </div>
          )}

          {/* Product 123 尺寸显示 */}
          {productId === 123 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">39×39×32 cm</p>
              </div>
            </div>
          )}

          {/* Product 133 尺寸显示 */}
          {productId === 133 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">30×24×26 cm</p>
              </div>
            </div>
          )}

          {/* Product 134 尺寸显示 */}
          {productId === 134 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">45×34×38 cm</p>
              </div>
            </div>
          )}

          {/* Product 142 尺寸显示 */}
          {productId === 142 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">40×30×40 cm</p>
              </div>
            </div>
          )}

          {/* Product 146 尺寸显示 */}
          {productId === 146 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Details</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <p><strong>S:</strong> 胸围40cm　背长25cm　背带伸缩范围62–103cm　包包重量180g　包装尺寸23×28×1.5cm</p>
                  <p><strong>M:</strong> 胸围48cm　背长33cm　背带伸缩范围62–103cm　包包重量205g　包装尺寸27×35×1.5cm</p>
                  <p><strong>L:</strong> 胸围58cm　背长38cm　背带伸缩范围62–103cm　包包重量225g　包装尺寸27×39×1.5cm</p>
                  <p><strong>XL:</strong> 胸围64cm　背长42cm　背带伸缩范围62–103cm　包包重量240g　包装尺寸28×43×1.5cm</p>
                </div>
              </div>
            </div>
          )}

          {/* Product 148 尺寸显示 */}
          {productId === 148 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  <p><strong>S:</strong> 50×35×35 cm</p>
                  <p><strong>M:</strong> 60×42×42 cm</p>
                  <p><strong>L:</strong> 72×52×52 cm</p>
                </div>
              </div>
            </div>
          )}

          {/* Product 150 尺寸显示 */}
          {productId === 150 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  <p><strong>S:</strong> 43×28×28 cm</p>
                  <p><strong>L:</strong> 48×30×31 cm</p>
                </div>
              </div>
            </div>
          )}

          {/* Product 151 尺寸显示 */}
          {productId === 151 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  <p>42×20×30 cm</p>
                </div>
              </div>
            </div>
          )}

          {/* Product 169 尺寸显示 */}
          {productId === 169 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  <p><strong>M:</strong> 39×39 cm</p>
                  <p><strong>L:</strong> 48×48 cm</p>
                </div>
              </div>
            </div>
          )}

          {/* Product 173 尺寸显示 */}
          {productId === 173 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  <p><strong>S:</strong> 40×40 cm</p>
                  <p><strong>M:</strong> 50×50 cm</p>
                  <p><strong>L:</strong> 60×60 cm</p>
                </div>
              </div>
            </div>
          )}

          {/* Product 174 尺寸显示 */}
          {productId === 174 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  <p><strong>S:</strong> 35×35×34 cm</p>
                  <p><strong>M:</strong> 45×45×40 cm</p>
                  <p><strong>L:</strong> 56×56×43 cm</p>
                  <p><strong>XL:</strong> 60×60×50 cm</p>
                </div>
              </div>
            </div>
          )}

          {/* Product 175 尺寸显示 */}
          {productId === 175 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  <p><strong>S:</strong> 43×43×36 cm</p>
                  <p><strong>M:</strong> 47×47×42 cm</p>
                  <p><strong>L:</strong> 52×52×47 cm</p>
                </div>
              </div>
            </div>
          )}

          {/* Product 179 尺寸显示 */}
          {productId === 179 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Size Dimensions</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  <p><strong>S:</strong> 34×34×34 cm</p>
                  <p><strong>M:</strong> 41×41×41 cm</p>
                  <p><strong>L:</strong> 48×48×48 cm</p>
                </div>
              </div>
            </div>
          )}

          {/* 规格选择 - 点击图片放大，点击+号选中规格 */}
          {specifications.length > 0 && (
            <div className="mt-8">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 mb-4">选择规格</h3>
            <div className="grid grid-cols-5 gap-3 max-h-[400px] overflow-y-auto">
              {specifications.map((spec) => {
                const totalQty = getSpecTotalQuantity(spec.id)
                const isSelected = specSizeQuantities[spec.id] !== undefined

                return (
                  <div key={spec.id} className="relative">
                    {/* 点击图片放大 */}
                    <div
                      className={`p-1.5 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                      onClick={() => setEnlargedImage(spec.image)}
                    >
                      <div className="aspect-square rounded overflow-hidden">
                        <Image
                          src={spec.image}
                          alt=""
                          width={100}
                          height={100}
                          unoptimized={true}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* 显示数量徽章 */}
                      {totalQty > 0 && (
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {totalQty}
                        </div>
                      )}
                    </div>

                    {/* 右下角的按钮：已选中显示删除，未选中显示加号 */}
                    {isSelected ? (
                      <button
                        type="button"
                        className="absolute -bottom-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg transition-colors z-20"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          removeSpec(spec.id)
                        }}
                        title="删除此规格"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="absolute -bottom-2 -right-2 bg-white hover:bg-slate-50 text-primary rounded-full w-6 h-6 flex items-center justify-center shadow-lg transition-colors z-20 border-2 border-primary"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          selectSpec(spec.id)
                        }}
                        title="选择此规格"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          )}

          {/* 颜色尺码选择 - 显示已选中颜色的尺寸选择 */}
          {Object.keys(colorSizeQuantities).length > 0 && productId !== 12 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-3">选择尺寸（${product.price}/件）</h3>

              <div className="space-y-3">
                {Object.keys(colorSizeQuantities).map((colorId) => {
                  const colorName = colors.find(c => c.id === colorId)?.name || colorId
                  return (
                    <div key={colorId} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-slate-200">{colorName}</h4>
                        <button
                          onClick={() => removeColor(colorId)}
                          className="text-xs text-red-500 hover:text-red-700 transition-colors"
                        >
                          删除
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {sizes.map((item) => (
                          <div key={item.size} className="flex items-center justify-between px-2 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">{item.size}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateColorSizeQuantity(colorId, item.size, -1)}
                                className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                              >
                                <span className="text-base text-slate-600 dark:text-slate-300">−</span>
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-slate-900 dark:text-slate-200">
                                {colorSizeQuantities[colorId]?.[item.size] || 0}
                              </span>
                              <button
                                onClick={() => updateColorSizeQuantity(colorId, item.size, 1)}
                                className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                              >
                                <span className="text-base text-slate-600 dark:text-slate-300">+</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Product 12 颜色数量选择（无尺寸） */}
          {Object.keys(colorSizeQuantities).length > 0 && productId === 12 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-3">选择数量（${product.price}/件）</h3>

              <div className="space-y-3">
                {Object.keys(colorSizeQuantities).map((colorId) => {
                  const colorName = colors.find(c => c.id === colorId)?.name || colorId
                  const quantity = colorSizeQuantities[colorId]?.['onesize'] || 0
                  return (
                    <div key={colorId} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-slate-200">{colorName}</h4>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                const newQty = Math.max(0, quantity - 1)
                                if (newQty === 0) {
                                  removeColor(colorId)
                                } else {
                                  updateColorSizeQuantity(colorId, 'onesize', -1)
                                }
                              }}
                              className="w-12 h-12 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                            >
                              <span className="text-xl text-slate-700 dark:text-slate-200">−</span>
                            </button>
                            <span className="w-12 text-center text-base font-semibold text-slate-900 dark:text-slate-200">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateColorSizeQuantity(colorId, 'onesize', 1)}
                              className="w-12 h-12 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                            >
                              <span className="text-xl text-slate-700 dark:text-slate-200">+</span>
                            </button>
                          </div>
                          <button
                            onClick={() => removeColor(colorId)}
                            className="text-xs text-red-500 hover:text-red-700 transition-colors px-2"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 尺码选择 - 显示已选中规格的尺寸选择 */}
          {Object.keys(specSizeQuantities).length > 0 && productId !== 13 && productId !== 14 && productId !== 15 && productId !== 16 && productId !== 17 && productId !== 18 && productId !== 19 && productId !== 20 && productId !== 21 && productId !== 22 && productId !== 23 && productId !== 24 && productId !== 25 && productId !== 26 && productId !== 27 && productId !== 28 && productId !== 31 && productId !== 32 && productId !== 33 && productId !== 34 && productId !== 37 && productId !== 39 && productId !== 41 && productId !== 44 && productId !== 45 && productId !== 46 && productId !== 47 && productId !== 51 && productId !== 52 && productId !== 53 && productId !== 54 && productId !== 65 && productId !== 67 && productId !== 68 && productId !== 69 && productId !== 70 && productId !== 71 && productId !== 72 && productId !== 73 && productId !== 74 && productId !== 75 && productId !== 76 && productId !== 77 && productId !== 78 && productId !== 79 && productId !== 80 && productId !== 87 && productId !== 90 && productId !== 91 && productId !== 94 && productId !== 95 && productId !== 97 && productId !== 98 && productId !== 99 && productId !== 100 && productId !== 101 && productId !== 102 && productId !== 103 && productId !== 104 && productId !== 105 && productId !== 106 && productId !== 107 && productId !== 108 && productId !== 109 && productId !== 110 && productId !== 111 && productId !== 112 && productId !== 113 && productId !== 114 && productId !== 115 && productId !== 116 && productId !== 117 && productId !== 118 && productId !== 119 && productId !== 120 && productId !== 121 && productId !== 123 && productId !== 124 && productId !== 130 && productId !== 132 && productId !== 133 && productId !== 134 && productId !== 135 && productId !== 136 && productId !== 137 && productId !== 138 && productId !== 140 && productId !== 141 && productId !== 142 && productId !== 145 && productId !== 147 && productId !== 149 && productId !== 151 && productId !== 152 && productId !== 153 && productId !== 154 && productId !== 155 && productId !== 156 && productId !== 157 && productId !== 158 && productId !== 159 && productId !== 160 && productId !== 161 && productId !== 162 && productId !== 163 && productId !== 165 && productId !== 166 && productId !== 167 && productId !== 177 && productId !== 181 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-3">
                {(productId === 29 || productId === 35 || productId === 36 || productId === 38 || productId === 40 || productId === 42 || productId === 48 || productId === 49 || productId === 50 || productId === 55 || productId === 56 || productId === 57 || productId === 58 || productId === 59 || productId === 60 || productId === 61 || productId === 62 || productId === 63 || productId === 64 || productId === 66 || productId === 81 || productId === 82 || productId === 83 || productId === 84 || productId === 85 || productId === 86 || productId === 88 || productId === 89 || productId === 93 || productId === 122 || productId === 125 || productId === 126 || productId === 127 || productId === 128 || productId === 129 || productId === 139 || productId === 143 || productId === 144 || productId === 146 || productId === 148 || productId === 150) ? '选择尺寸' : `选择尺寸（$${product.price}/件）`}
              </h3>

              <div className="space-y-3">
                {Object.keys(specSizeQuantities).map((specId) => (
                  <div key={specId} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-200">规格 {specId}</h4>
                      <button
                        onClick={() => removeSpec(parseInt(specId))}
                        className="text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        删除
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {(() => {
                        // For products with spec-based sizes, get sizes from the specification's sizes property
                        if (productId === 93 || productId === 122 || productId === 125 || productId === 126 || productId === 127 || productId === 128 || productId === 129 || productId === 139 || productId === 143 || productId === 144 || productId === 146 || productId === 148 || productId === 150 || productId === 164 || productId === 168 || productId === 169 || productId === 171 || productId === 172 || productId === 173 || productId === 174 || productId === 175 || productId === 176 || productId === 178 || productId === 179) {
                          const spec = specifications.find(s => s.id === parseInt(specId))
                          if (spec && spec.sizes) {
                            return Object.entries(spec.sizes).map(([size, price]) => (
                              <div key={size} className="flex items-center justify-between px-2 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                                <div className="flex flex-col">
                                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">{size}</span>
                                  <span className="text-sm text-slate-600 dark:text-slate-400">${price}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => updateSpecSizeQuantity(parseInt(specId), size, -1)}
                                    className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                                  >
                                    <span className="text-base text-slate-600 dark:text-slate-300">−</span>
                                  </button>
                                  <span className="w-8 text-center text-sm font-medium text-slate-900 dark:text-slate-200">
                                    {specSizeQuantities[parseInt(specId)]?.[size] || 0}
                                  </span>
                                  <button
                                    onClick={() => updateSpecSizeQuantity(parseInt(specId), size, 1)}
                                    className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                                  >
                                    <span className="text-base text-slate-600 dark:text-slate-300">+</span>
                                  </button>
                                </div>
                              </div>
                            ))
                          }
                          return null
                        }

                        // For all other products, use the global sizes array
                        return sizes.map((item) => (
                          <div key={item.size} className="flex items-center justify-between px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-slate-900 dark:text-slate-200">{item.size}</span>
                              {(productId === 29 || productId === 35 || productId === 36 || productId === 38 || productId === 40 || productId === 42 || productId === 48 || productId === 49 || productId === 50 || productId === 66 || productId === 81 || productId === 82 || productId === 83 || productId === 84 || productId === 85 || productId === 86 || productId === 88 || productId === 89) && (
                                <span className="text-xs text-slate-600 dark:text-slate-400">${item.price}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateSpecSizeQuantity(parseInt(specId), item.size, -1)}
                                className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                              >
                                <span className="text-sm text-slate-600 dark:text-slate-300">−</span>
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-slate-900 dark:text-slate-200">
                                {specSizeQuantities[parseInt(specId)]?.[item.size] || 0}
                              </span>
                              <button
                                onClick={() => updateSpecSizeQuantity(parseInt(specId), item.size, 1)}
                                className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                              >
                                <span className="text-sm text-slate-600 dark:text-slate-300">+</span>
                              </button>
                            </div>
                          </div>
                        ))
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product 13-28, 31-34, 37, 39, 41, 44-47, 51-54, 65, 67-80, 87, 90-105, 106-121, 123-124, 130, 132-142, 145, 147, 149, 151-163 (except 164), 165-167, 177, 181 规格数量选择（无尺寸） */}
          {Object.keys(specSizeQuantities).length > 0 && (productId === 13 || productId === 14 || productId === 15 || productId === 16 || productId === 17 || productId === 18 || productId === 19 || productId === 20 || productId === 21 || productId === 22 || productId === 23 || productId === 24 || productId === 25 || productId === 26 || productId === 27 || productId === 28 || productId === 31 || productId === 32 || productId === 33 || productId === 34 || productId === 37 || productId === 39 || productId === 41 || productId === 44 || productId === 45 || productId === 46 || productId === 47 || productId === 51 || productId === 52 || productId === 53 || productId === 54 || productId === 65 || productId === 67 || productId === 68 || productId === 69 || productId === 70 || productId === 71 || productId === 72 || productId === 73 || productId === 74 || productId === 75 || productId === 76 || productId === 77 || productId === 78 || productId === 79 || productId === 80 || productId === 87 || productId === 90 || productId === 91 || productId === 94 || productId === 95 || productId === 97 || productId === 98 || productId === 99 || productId === 100 || productId === 101 || productId === 102 || productId === 103 || productId === 104 || productId === 105 || productId === 106 || productId === 107 || productId === 108 || productId === 109 || productId === 110 || productId === 111 || productId === 112 || productId === 113 || productId === 114 || productId === 115 || productId === 116 || productId === 117 || productId === 118 || productId === 119 || productId === 120 || productId === 121 || productId === 123 || productId === 124 || productId === 130 || productId === 132 || productId === 133 || productId === 134 || productId === 135 || productId === 136 || productId === 137 || productId === 138 || productId === 140 || productId === 141 || productId === 142 || productId === 145 || productId === 147 || productId === 149 || productId === 151 || productId === 152 || productId === 153 || productId === 154 || productId === 155 || productId === 156 || productId === 157 || productId === 158 || productId === 159 || productId === 160 || productId === 161 || productId === 162 || productId === 163 || productId === 165 || productId === 166 || productId === 167 || productId === 177 || productId === 181) && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-3">
                {(productId === 25 || productId === 31 || productId === 32 || productId === 57 || productId === 69 || productId === 97 || productId === 115 || productId === 124 || productId === 130 || productId === 140 || productId === 142 || productId === 145 || productId === 177 || productId === 181) ? '选择数量' : `选择数量（$${product.price}/件）`}
              </h3>

              <div className="space-y-3">
                {Object.keys(specSizeQuantities).map((specId) => {
                  const quantity = specSizeQuantities[parseInt(specId)]?.['onesize'] || 0
                  // For products 25, 31, 32, 97, 115, 124, 130, 140, 142, 145, 177, 181 get the specific price for each spec
                  const specPrice = (productId === 25 || productId === 31 || productId === 32 || productId === 97 || productId === 115 || productId === 124 || productId === 130 || productId === 140 || productId === 142 || productId === 145 || productId === 177 || productId === 181)
                    ? specifications.find(s => s.id === parseInt(specId))?.price || product.price
                    : product.price

                  return (
                    <div key={specId} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-slate-200">规格 {specId}</h4>
                          {(productId === 25 || productId === 31 || productId === 32 || productId === 97 || productId === 115 || productId === 124 || productId === 130 || productId === 140 || productId === 142 || productId === 145 || productId === 177 || productId === 181) && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">${specPrice}/件</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                const newQty = Math.max(0, quantity - 1)
                                if (newQty === 0) {
                                  removeSpec(parseInt(specId))
                                } else {
                                  updateSpecSizeQuantity(parseInt(specId), 'onesize', -1)
                                }
                              }}
                              className="w-12 h-12 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                            >
                              <span className="text-xl text-slate-700 dark:text-slate-200">−</span>
                            </button>
                            <span className="w-12 text-center text-base font-semibold text-slate-900 dark:text-slate-200">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateSpecSizeQuantity(parseInt(specId), 'onesize', 1)}
                              className="w-12 h-12 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                            >
                              <span className="text-xl text-slate-700 dark:text-slate-200">+</span>
                            </button>
                          </div>
                          <button
                            onClick={() => removeSpec(parseInt(specId))}
                            className="text-xs text-red-500 hover:text-red-700 transition-colors px-2"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 加入购物车 */}
          <div className="mt-10">
            <button
              onClick={handleAddToCart}
              className="block w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* 图片放大查看模态框 */}
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* 关闭按钮 */}
            <button
              className="absolute top-2 right-2 bg-white dark:bg-slate-800 rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors z-10"
              onClick={() => setEnlargedImage(null)}
            >
              <svg className="w-6 h-6 text-slate-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 放大的图片 */}
            <div className="rounded-lg p-4">
              <Image
                src={enlargedImage}
                alt="放大查看"
                width={800}
                height={800}
                unoptimized={true}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default function ProductPage() {
  return (
    <Suspense fallback={
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          <div className="flex flex-col gap-4">
            <div className="aspect-square rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-1/4 animate-pulse"></div>
          </div>
        </div>
      </main>
    }>
      <ProductContent />
    </Suspense>
  )
}
