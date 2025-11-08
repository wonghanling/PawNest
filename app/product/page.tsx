'use client'

import { useState, useEffect } from 'react'
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
    name: 'Pet Product 18',
    price: 90,
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
    name: 'Pet Product 19',
    price: 55,
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
    name: 'Pet Product 20',
    price: 140,
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
    name: 'Pet Product 21',
    price: 75,
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
    name: 'Pet Product 22',
    price: 80,
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
    name: 'Pet Product 23',
    price: 160,
    detailImages: [
      '/details/148.webp',
      '/details/149.webp',
      '/details/150.webp',
      '/details/151.webp',
    ],
    specifications: [
      { id: 1, image: '/details/143.webp', name: '规格 1' },
      { id: 2, image: '/details/144.webp', name: '规格 2' },
      { id: 3, image: '/details/145.webp', name: '规格 3' },
      { id: 4, image: '/details/146.webp', name: '规格 4' },
      { id: 5, image: '/details/147.webp', name: '规格 5' },
    ]
  },
  24: {
    name: 'Pet Product 24',
    price: 120,
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
    price: 200,
    detailImages: [
      '/details/166.webp',
      '/details/167.webp',
      '/details/168.webp',
      '/details/169.webp',
      '/details/170.webp',
      '/details/171.webp',
    ],
    specifications: [
      { id: 1, image: '/details/160.webp', name: '规格 1' },
      { id: 2, image: '/details/161.webp', name: '规格 2' },
      { id: 3, image: '/details/162.webp', name: '规格 3' },
      { id: 4, image: '/details/163.webp', name: '规格 4' },
      { id: 5, image: '/details/164.webp', name: '规格 5' },
      { id: 6, image: '/details/165.webp', name: '规格 6' },
    ]
  },
  26: {
    name: 'Pet Product 26',
    price: 95,
    detailImages: [
      '/details/174.webp',
      '/details/175.webp',
      '/details/177.webp',
    ],
    specifications: [
      { id: 1, image: '/details/172.webp', name: '规格 1' },
      { id: 2, image: '/details/173.webp', name: '规格 2' },
      { id: 3, image: '/details/176.webp', name: '规格 3' },
    ]
  },
  27: {
    name: 'Pet Product 27',
    price: 150,
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
    name: 'Pet Product 28',
    price: 130,
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
    name: 'Pet Product 29',
    price: 110,
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
    name: 'Pet Product 30',
    price: 140,
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
    ]
  },
  31: {
    name: 'Pet Product 31',
    price: 85,
    detailImages: [
      '/details/206.webp',
      '/details/207.webp',
      '/details/208.webp',
    ],
    specifications: [
      { id: 1, image: '/details/204.webp', name: '规格 1' },
      { id: 2, image: '/details/205.webp', name: '规格 2' },
    ]
  },
  32: {
    name: 'Pet Product 32',
    price: 70,
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/209.webp', name: '规格 1' },
      { id: 2, image: '/details/210.webp', name: '规格 2' },
      { id: 3, image: '/details/211.webp', name: '规格 3' },
      { id: 4, image: '/details/212.webp', name: '规格 4' },
      { id: 5, image: '/details/213.webp', name: '规格 5' },
    ]
  },
  33: {
    name: 'Pet Product 33',
    price: 105,
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
    name: 'Pet Product 34',
    price: 125,
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
    name: 'Pet Product 35',
    price: 115,
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
    name: 'Pet Product 36',
    price: 145,
    detailImages: [
      '/details/235.webp',
      '/details/236.webp',
      '/details/237.webp',
    ],
    specifications: [
      { id: 1, image: '/details/231.webp', name: '规格 1' },
      { id: 2, image: '/details/232.webp', name: '规格 2' },
      { id: 3, image: '/details/233.webp', name: '规格 3' },
    ]
  },
  37: {
    name: 'Pet Product 37',
    price: 95,
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
    name: 'Pet Product 38',
    price: 180,
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
    name: 'Pet Product 39',
    price: 125,
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
    name: 'Pet Product 40',
    price: 165,
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
    name: 'Pet Product 41',
    price: 135,
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
    name: 'Pet Product 42',
    price: 90,
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/269.webp', name: '规格 1' },
      { id: 2, image: '/details/270.webp', name: '规格 2' },
      { id: 3, image: '/details/271.webp', name: '规格 3' },
    ]
  },
  43: {
    name: 'Pet Product 43',
    price: 155,
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
    name: 'Pet Product 44',
    price: 140,
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
    name: 'Pet Product 45',
    price: 105,
    detailImages: [
      '/details/287.webp',
      '/details/288.webp',
    ],
    specifications: [
      { id: 1, image: '/details/286.webp', name: '规格 1' },
    ]
  },
  46: {
    name: 'Pet Product 46',
    price: 170,
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
    name: 'Pet Product 47',
    price: 160,
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
    name: 'Pet Product 48',
    price: 195,
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
    name: 'Pet Product 49',
    price: 135,
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
    name: 'Pet Product 50',
    price: 185,
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
    name: 'Pet Product 51',
    price: 100,
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/327.webp', name: '规格 1' },
      { id: 2, image: '/details/328.webp', name: '规格 2' },
    ]
  },
  52: {
    name: 'Pet Product 52',
    price: 175,
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
    name: 'Pet Product 53',
    price: 155,
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
    name: 'Pet Product 54',
    price: 165,
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
    name: 'Pet Product 55',
    price: 115,
    detailImages: [
      '/details/351.webp',
    ],
    specifications: [
      { id: 1, image: '/details/349.webp', name: '规格 1' },
      { id: 2, image: '/details/350.webp', name: '规格 2' },
    ]
  },
  56: {
    name: 'Pet Product 56',
    price: 85,
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/352.webp', name: '规格 1' },
    ]
  },
  57: {
    name: 'Pet Product 57',
    price: 210,
    detailImages: [
      '/details/359.webp',
      '/details/360.webp',
      '/details/361.webp',
      '/details/362.webp',
    ],
    specifications: [
      { id: 1, image: '/details/353.webp', name: '规格 1' },
      { id: 2, image: '/details/354.webp', name: '规格 2' },
      { id: 3, image: '/details/355.webp', name: '规格 3' },
      { id: 4, image: '/details/356.webp', name: '规格 4' },
      { id: 5, image: '/details/357.webp', name: '规格 5' },
      { id: 6, image: '/details/358.webp', name: '规格 6' },
    ]
  },
  58: {
    name: 'Pet Product 58',
    price: 130,
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
    name: 'Pet Product 59',
    price: 125,
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/368.webp', name: '规格 1' },
      { id: 2, image: '/details/369.webp', name: '规格 2' },
      { id: 3, image: '/details/370.webp', name: '规格 3' },
    ]
  },
  60: {
    name: 'Pet Product 60',
    price: 170,
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
    name: 'Pet Product 61',
    price: 165,
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
    name: 'Pet Product 62',
    price: 155,
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
    name: 'Pet Product 63',
    price: 145,
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
    name: 'Pet Product 64',
    price: 135,
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
    name: 'Pet Product 65',
    price: 215,
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
    name: 'Pet Product 66',
    price: 190,
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
    name: 'Pet Product 67',
    price: 175,
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
    name: 'Pet Product 68',
    price: 220,
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
    name: 'Pet Product 69',
    price: 140,
    detailImages: [
      '/details/441.webp',
      '/details/442.webp',
      '/details/443.webp',
    ],
    specifications: [
      { id: 1, image: '/details/439.webp', name: '规格 1' },
      { id: 2, image: '/details/440.webp', name: '规格 2' },
    ]
  },
  70: {
    name: 'Pet Product 70',
    price: 235,
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
    name: 'Pet Product 71',
    price: 180,
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
    name: 'Pet Product 72',
    price: 120,
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
    name: 'Pet Product 73',
    price: 205,
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
    name: 'Pet Product 74',
    price: 160,
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
    name: 'Pet Product 75',
    price: 160,
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
    name: 'Pet Product 76',
    price: 160,
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
    name: 'Pet Product 77',
    price: 160,
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
    name: 'Pet Product 78',
    price: 160,
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
    name: 'Pet Product 79',
    price: 175,
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
    name: 'Pet Product 80',
    price: 125,
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
    name: 'Pet Product 81',
    price: 185,
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
    name: 'Pet Product 82',
    price: 250,
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
    name: 'Pet Product 83',
    price: 195,
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
    name: 'Pet Product 84',
    price: 180,
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
    name: 'Pet Product 85',
    price: 110,
    detailImages: [
      '/details/543.webp',
    ],
    specifications: [
      { id: 1, image: '/details/542.webp', name: '规格 1' },
    ]
  },
  86: {
    name: 'Pet Product 86',
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
      { id: 1, image: '/details/544.webp', name: '规格 1' },
      { id: 2, image: '/details/545.webp', name: '规格 2' },
      { id: 3, image: '/details/546.webp', name: '规格 3' },
    ]
  },
  87: {
    name: 'Pet Product 87',
    price: 220,
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
    name: 'Pet Product 88',
    price: 145,
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
    name: 'Pet Product 89',
    price: 210,
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
    name: 'Pet Product 90',
    price: 225,
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
    name: 'Pet Product 91',
    price: 165,
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
    name: 'Pet Product 92',
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
    name: 'Pet Product 93',
    price: 130,
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/599.webp', name: '规格 1' },
      { id: 2, image: '/details/600.webp', name: '规格 2' },
      { id: 3, image: '/details/601.webp', name: '规格 3' },
    ]
  },
  94: {
    name: 'Pet Product 94',
    price: 215,
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
    name: 'Pet Product 95',
    price: 215,
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
    name: 'Pet Product 96',
    price: 215,
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
    name: 'Pet Product 97',
    price: 260,
    detailImages: [
      '/details/627.webp',
      '/details/628.webp',
      '/details/629.webp',
      '/details/630.webp',
    ],
    specifications: [
      { id: 1, image: '/details/616.webp', name: '规格 1' },
      { id: 2, image: '/details/617.webp', name: '规格 2' },
      { id: 3, image: '/details/618.webp', name: '规格 3' },
      { id: 4, image: '/details/619.webp', name: '规格 4' },
      { id: 5, image: '/details/620.webp', name: '规格 5' },
      { id: 6, image: '/details/621.webp', name: '规格 6' },
      { id: 7, image: '/details/622.webp', name: '规格 7' },
      { id: 8, image: '/details/623.webp', name: '规格 8' },
      { id: 9, image: '/details/624.webp', name: '规格 9' },
      { id: 10, image: '/details/625.webp', name: '规格 10' },
      { id: 11, image: '/details/626.webp', name: '规格 11' },
    ]
  },
  98: {
    name: 'Pet Product 98',
    price: 210,
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
    name: 'Pet Product 99',
    price: 225,
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
    name: 'Pet Product 100',
    price: 135,
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
    name: 'Pet Product 101',
    price: 165,
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
    name: 'Pet Product 102',
    price: 145,
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
    name: 'Pet Product 103',
    price: 195,
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
    name: 'Pet Product 104',
    price: 175,
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
    name: 'Pet Product 105',
    price: 165,
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
    name: 'Pet Product 106',
    price: 185,
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
    ]
  },
  107: {
    name: 'Pet Product 107',
    price: 205,
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
    name: 'Pet Product 108',
    price: 185,
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
    name: 'Pet Product 109',
    price: 175,
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
    name: 'Pet Product 110',
    price: 195,
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
    name: 'Pet Product 111',
    price: 185,
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
    name: 'Pet Product 112',
    price: 165,
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
    name: 'Pet Product 113',
    price: 145,
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
    name: 'Pet Product 114',
    price: 185,
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
    name: 'Pet Product 115',
    price: 205,
    detailImages: [
      '/details/745.webp',
      '/details/746.webp',
      '/details/747.webp',
      '/details/748.webp',
      '/details/749.webp',
    ],
    specifications: [
      { id: 1, image: '/details/741.webp', name: '规格 1' },
      { id: 2, image: '/details/742.webp', name: '规格 2' },
      { id: 3, image: '/details/743.webp', name: '规格 3' },
      { id: 4, image: '/details/744.webp', name: '规格 4' },
    ]
  },
  116: {
    name: 'Pet Product 116',
    price: 225,
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
    name: 'Pet Product 117',
    price: 245,
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
    name: 'Pet Product 118',
    price: 195,
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
    name: 'Pet Product 119',
    price: 255,
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
    name: 'Pet Product 120',
    price: 195,
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
    name: 'Pet Product 121',
    price: 165,
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
    name: 'Pet Product 122',
    price: 155,
    detailImages: [
      '/details/806.webp',
      '/details/807.webp',
      '/details/808.webp',
    ],
    specifications: [
      { id: 1, image: '/details/802.webp', name: '规格 1' },
      { id: 2, image: '/details/803.webp', name: '规格 2' },
      { id: 3, image: '/details/804.webp', name: '规格 3' },
      { id: 4, image: '/details/805.webp', name: '规格 4' },
    ]
  },
  123: {
    name: 'Pet Product 123',
    price: 215,
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
    name: 'Pet Product 124',
    price: 280,
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
      { id: 1, image: '/details/817.webp', name: '规格 1' },
      { id: 2, image: '/details/818.webp', name: '规格 2' },
      { id: 3, image: '/details/819.webp', name: '规格 3' },
      { id: 4, image: '/details/820.webp', name: '规格 4' },
      { id: 5, image: '/details/821.webp', name: '规格 5' },
    ]
  },
  125: {
    name: 'Pet Product 125',
    price: 245,
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
      { id: 1, image: '/details/839.webp', name: '规格 1' },
      { id: 2, image: '/details/840.webp', name: '规格 2' },
    ]
  },
  126: {
    name: 'Pet Product 126',
    price: 295,
    detailImages: [
      '/details/861.webp',
      '/details/862.webp',
      '/details/863.webp',
      '/details/864.webp',
      '/details/865.webp',
      '/details/866.webp',
    ],
    specifications: [
      { id: 1, image: '/details/849.webp', name: '规格 1' },
      { id: 2, image: '/details/850.webp', name: '规格 2' },
      { id: 3, image: '/details/851.webp', name: '规格 3' },
      { id: 4, image: '/details/852.webp', name: '规格 4' },
      { id: 5, image: '/details/853.webp', name: '规格 5' },
      { id: 6, image: '/details/854.webp', name: '规格 6' },
      { id: 7, image: '/details/855.webp', name: '规格 7' },
      { id: 8, image: '/details/856.webp', name: '规格 8' },
      { id: 9, image: '/details/857.webp', name: '规格 9' },
      { id: 10, image: '/details/858.webp', name: '规格 10' },
      { id: 11, image: '/details/859.webp', name: '规格 11' },
      { id: 12, image: '/details/860.webp', name: '规格 12' },
    ]
  },
  127: {
    name: 'Pet Product 127',
    price: 275,
    detailImages: [
      '/details/876.webp',
      '/details/877.webp',
      '/details/878.webp',
      '/details/879.webp',
      '/details/880.webp',
      '/details/881.webp',
    ],
    specifications: [
      { id: 1, image: '/details/867.webp', name: '规格 1' },
      { id: 2, image: '/details/868.webp', name: '规格 2' },
      { id: 3, image: '/details/869.webp', name: '规格 3' },
      { id: 4, image: '/details/870.webp', name: '规格 4' },
      { id: 5, image: '/details/871.webp', name: '规格 5' },
      { id: 6, image: '/details/872.webp', name: '规格 6' },
      { id: 7, image: '/details/873.webp', name: '规格 7' },
      { id: 8, image: '/details/874.webp', name: '规格 8' },
      { id: 9, image: '/details/875.webp', name: '规格 9' },
    ]
  },
  128: {
    name: 'Pet Product 128',
    price: 155,
    detailImages: [
      '/details/888.webp',
      '/details/889.webp',
      '/details/890.webp',
    ],
    specifications: [
      { id: 1, image: '/details/882.webp', name: '规格 1' },
      { id: 2, image: '/details/883.webp', name: '规格 2' },
      { id: 3, image: '/details/884.webp', name: '规格 3' },
      { id: 4, image: '/details/885.webp', name: '规格 4' },
      { id: 5, image: '/details/886.webp', name: '规格 5' },
      { id: 6, image: '/details/887.webp', name: '规格 6' },
    ]
  },
  129: {
    name: 'Pet Product 129',
    price: 185,
    detailImages: [
      '/details/896.webp',
      '/details/897.webp',
      '/details/898.webp',
      '/details/899.webp',
      '/details/900.webp',
    ],
    specifications: [
      { id: 1, image: '/details/891.webp', name: '规格 1' },
      { id: 2, image: '/details/892.webp', name: '规格 2' },
      { id: 3, image: '/details/893.webp', name: '规格 3' },
      { id: 4, image: '/details/894.webp', name: '规格 4' },
      { id: 5, image: '/details/895.webp', name: '规格 5' },
    ]
  },
  130: {
    name: 'Pet Product 130',
    price: 265,
    detailImages: [
      '/details/910.webp',
      '/details/911.webp',
      '/details/912.webp',
      '/details/913.webp',
      '/details/914.webp',
      '/details/915.webp',
    ],
    specifications: [
      { id: 1, image: '/details/901.webp', name: '规格 1' },
      { id: 2, image: '/details/902.webp', name: '规格 2' },
      { id: 3, image: '/details/903.webp', name: '规格 3' },
      { id: 4, image: '/details/904.webp', name: '规格 4' },
      { id: 5, image: '/details/905.webp', name: '规格 5' },
      { id: 6, image: '/details/906.webp', name: '规格 6' },
      { id: 7, image: '/details/907.webp', name: '规格 7' },
      { id: 8, image: '/details/908.webp', name: '规格 8' },
      { id: 9, image: '/details/909.webp', name: '规格 9' },
    ]
  },
  131: {
    name: 'Pet Product 131',
    price: 165,
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
    name: 'Pet Product 132',
    price: 205,
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
    name: 'Pet Product 133',
    price: 195,
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
    name: 'Pet Product 134',
    price: 125,
    detailImages: [
      '/details/942.webp',
      '/details/943.webp',
    ],
    specifications: [
      { id: 1, image: '/details/941.webp', name: '规格 1' },
    ]
  },
  135: {
    name: 'Pet Product 135',
    price: 245,
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
    name: 'Pet Product 136',
    price: 285,
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
    name: 'Pet Product 137',
    price: 305,
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
    name: 'Pet Product 138',
    price: 265,
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
    name: 'Pet Product 139',
    price: 295,
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
      { id: 1, image: '/details/991.webp', name: '规格 1' },
      { id: 2, image: '/details/992.webp', name: '规格 2' },
      { id: 3, image: '/details/993.webp', name: '规格 3' },
      { id: 4, image: '/details/994.webp', name: '规格 4' },
    ]
  },
  140: {
    name: 'Pet Product 140',
    price: 275,
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
      { id: 1, image: '/details/1005.webp', name: '规格 1' },
      { id: 2, image: '/details/1006.webp', name: '规格 2' },
      { id: 3, image: '/details/1007.webp', name: '规格 3' },
      { id: 4, image: '/details/1008.webp', name: '规格 4' },
      { id: 5, image: '/details/1009.webp', name: '规格 5' },
      { id: 6, image: '/details/1010.webp', name: '规格 6' },
      { id: 7, image: '/details/1011.webp', name: '规格 7' },
      { id: 8, image: '/details/1012.webp', name: '规格 8' },
    ]
  },
  141: {
    name: 'Pet Product 141',
    price: 295,
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
    name: 'Pet Product 142',
    price: 155,
    detailImages: [
      '/details/1037.webp',
      '/details/1042.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1034.webp', name: '规格 1' },
      { id: 2, image: '/details/1035.webp', name: '规格 2' },
      { id: 3, image: '/details/1036.webp', name: '规格 3' },
    ]
  },
  143: {
    name: 'Pet Product 143',
    price: 175,
    detailImages: [
      '/details/1046.webp',
      '/details/1047.webp',
      '/details/1048.webp',
      '/details/1049.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1043.webp', name: '规格 1' },
      { id: 2, image: '/details/1044.webp', name: '规格 2' },
      { id: 3, image: '/details/1045.webp', name: '规格 3' },
    ]
  },
  144: {
    name: 'Pet Product 144',
    price: 235,
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
      { id: 1, image: '/details/1050.webp', name: '规格 1' },
      { id: 2, image: '/details/1051.webp', name: '规格 2' },
      { id: 3, image: '/details/1052.webp', name: '规格 3' },
      { id: 4, image: '/details/1053.webp', name: '规格 4' },
    ]
  },
  145: {
    name: 'Pet Product 145',
    price: 265,
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
      { id: 1, image: '/details/1061.webp', name: '规格 1' },
      { id: 2, image: '/details/1062.webp', name: '规格 2' },
      { id: 3, image: '/details/1063.webp', name: '规格 3' },
      { id: 4, image: '/details/1064.webp', name: '规格 4' },
      { id: 5, image: '/details/1065.webp', name: '规格 5' },
      { id: 6, image: '/details/1066.webp', name: '规格 6' },
    ]
  },
  146: {
    name: 'Pet Product 146',
    price: 275,
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
      { id: 1, image: '/details/1075.webp', name: '规格 1' },
      { id: 2, image: '/details/1076.webp', name: '规格 2' },
      { id: 3, image: '/details/1077.webp', name: '规格 3' },
      { id: 4, image: '/details/1078.webp', name: '规格 4' },
      { id: 5, image: '/details/1079.webp', name: '规格 5' },
      { id: 6, image: '/details/1080.webp', name: '规格 6' },
      { id: 7, image: '/details/1081.webp', name: '规格 7' },
    ]
  },
  147: {
    name: 'Pet Product 147',
    price: 295,
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
    name: 'Pet Product 148',
    price: 195,
    detailImages: [
      '/details/1107.webp',
      '/details/1108.webp',
      '/details/1109.webp',
      '/details/1110.webp',
      '/details/1111.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1103.webp', name: '规格 1' },
      { id: 2, image: '/details/1104.webp', name: '规格 2' },
      { id: 3, image: '/details/1105.webp', name: '规格 3' },
      { id: 4, image: '/details/1106.webp', name: '规格 4' },
    ]
  },
  149: {
    name: 'Pet Product 149',
    price: 225,
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
    name: 'Pet Product 150',
    price: 235,
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
      { id: 1, image: '/details/1121.webp', name: '规格 1' },
      { id: 2, image: '/details/1122.webp', name: '规格 2' },
      { id: 3, image: '/details/1123.webp', name: '规格 3' },
    ]
  },
  151: {
    name: 'Pet Product 151',
    price: 305,
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
    ],
    specifications: [
      { id: 1, image: '/details/1132.webp', name: '规格 1' },
      { id: 2, image: '/details/1133.webp', name: '规格 2' },
    ]
  },
  152: {
    name: 'Pet Product 152',
    price: 295,
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
    name: 'Pet Product 153',
    price: 265,
    detailImages: [
      '/details/1164.webp',
      '/details/1165.webp',
      '/details/1166.webp',
      '/details/1167.webp',
      '/details/1168.webp',
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
    name: 'Pet Product 154',
    price: 305,
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
    name: 'Pet Product 155',
    price: 185,
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
    name: 'Pet Product 156',
    price: 275,
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
    name: 'Pet Product 157',
    price: 335,
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
    name: 'Pet Product 158',
    price: 195,
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
    name: 'Pet Product 159',
    price: 295,
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
    name: 'Pet Product 160',
    price: 255,
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
    name: 'Pet Product 161',
    price: 315,
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
    name: 'Pet Product 162',
    price: 245,
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
    name: 'Pet Product 163',
    price: 385,
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
    name: 'Pet Product 164',
    price: 275,
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
      { id: 1, image: '/details/1303.webp', name: '规格 1' },
      { id: 2, image: '/details/1304.webp', name: '规格 2' },
      { id: 3, image: '/details/1305.webp', name: '规格 3' },
    ]
  },
  165: {
    name: 'Pet Product 165',
    price: 215,
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
    name: 'Pet Product 166',
    price: 275,
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
    name: 'Pet Product 167',
    price: 235,
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
    name: 'Pet Product 168',
    price: 285,
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
      { id: 1, image: '/details/1346.webp', name: '规格 1' },
      { id: 2, image: '/details/1347.webp', name: '规格 2' },
      { id: 3, image: '/details/1348.webp', name: '规格 3' },
      { id: 4, image: '/details/1349.webp', name: '规格 4' },
      { id: 5, image: '/details/1350.webp', name: '规格 5' },
      { id: 6, image: '/details/1351.webp', name: '规格 6' },
      { id: 7, image: '/details/1352.webp', name: '规格 7' },
    ]
  },
  169: {
    name: 'Pet Product 169',
    price: 215,
    detailImages: [
      '/details/1365.webp',
      '/details/1366.webp',
      '/details/1367.webp',
      '/details/1368.webp',
      '/details/1369.webp',
      '/details/1370.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1362.webp', name: '规格 1' },
      { id: 2, image: '/details/1363.webp', name: '规格 2' },
      { id: 3, image: '/details/1364.webp', name: '规格 3' },
    ]
  },
  170: {
    name: 'Pet Product 170',
    price: 95,
    detailImages: [],
    specifications: [
      { id: 1, image: '/details/1371.webp', name: '规格 1' },
    ]
  },
  171: {
    name: 'Pet Product 171',
    price: 235,
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
      { id: 1, image: '/details/1372.webp', name: '规格 1' },
    ]
  },
  172: {
    name: 'Pet Product 172',
    price: 315,
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
      { id: 1, image: '/details/1380.webp', name: '规格 1' },
      { id: 2, image: '/details/1381.webp', name: '规格 2' },
      { id: 3, image: '/details/1382.webp', name: '规格 3' },
      { id: 4, image: '/details/1383.webp', name: '规格 4' },
    ]
  },
  173: {
    name: 'Pet Product 173',
    price: 235,
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
      { id: 1, image: '/details/1396.webp', name: '规格 1' },
      { id: 2, image: '/details/1397.webp', name: '规格 2' },
    ]
  },
  174: {
    name: 'Pet Product 174',
    price: 115,
    detailImages: [
      '/details/1406.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1405.webp', name: '规格 1' },
    ]
  },
  175: {
    name: 'Pet Product 175',
    price: 215,
    detailImages: [
      '/details/1410.webp',
      '/details/1411.webp',
      '/details/1412.webp',
      '/details/1413.webp',
      '/details/1414.webp',
      '/details/1415.webp',
    ],
    specifications: [
      { id: 1, image: '/details/1407.webp', name: '规格 1' },
      { id: 2, image: '/details/1408.webp', name: '规格 2' },
      { id: 3, image: '/details/1409.webp', name: '规格 3' },
    ]
  },
  176: {
    name: 'Pet Product 176',
    price: 305,
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
      { id: 1, image: '/details/1416.webp', name: '规格 1' },
      { id: 2, image: '/details/1417.webp', name: '规格 2' },
    ]
  },
  177: {
    name: 'Pet Product 177',
    price: 235,
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
      { id: 1, image: '/details/1429.webp', name: '规格 1' },
      { id: 2, image: '/details/1430.webp', name: '规格 2' },
      { id: 3, image: '/details/1431.webp', name: '规格 3' },
      { id: 4, image: '/details/1432.webp', name: '规格 4' },
    ]
  },
  178: {
    name: 'Pet Product 178',
    price: 275,
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
      { id: 1, image: '/details/1440.webp', name: '规格 1' },
      { id: 2, image: '/details/1441.webp', name: '规格 2' },
      { id: 3, image: '/details/1442.webp', name: '规格 3' },
      { id: 4, image: '/details/1443.webp', name: '规格 4' },
      { id: 5, image: '/details/1444.webp', name: '规格 5' },
    ]
  },
  179: {
    name: 'Pet Product 179',
    price: 245,
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
      { id: 1, image: '/details/1454.webp', name: '规格 1' },
      { id: 2, image: '/details/1455.webp', name: '规格 2' },
      { id: 3, image: '/details/1456.webp', name: '规格 3' },
    ]
  },
  180: {
    name: 'Pet Product 180',
    price: 150,
    detailImages: [],
    specifications: []
  },
  181: {
    name: 'Pet Product 181',
    price: 385,
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
      { id: 1, image: '/details/1464.webp', name: '规格 1' },
      { id: 2, image: '/details/1465.webp', name: '规格 2' },
      { id: 3, image: '/details/1466.webp', name: '规格 3' },
      { id: 4, image: '/details/1467.webp', name: '规格 4' },
      { id: 5, image: '/details/1468.webp', name: '规格 5' },
      { id: 6, image: '/details/1469.webp', name: '规格 6' },
      { id: 7, image: '/details/1470.webp', name: '规格 7' },
      { id: 8, image: '/details/1471.webp', name: '规格 8' },
      { id: 9, image: '/details/1472.webp', name: '规格 9' },
      { id: 10, image: '/details/1473.webp', name: '规格 10' },
      { id: 11, image: '/details/1474.webp', name: '规格 11' },
      { id: 12, image: '/details/1475.webp', name: '规格 12' },
      { id: 13, image: '/details/1476.webp', name: '规格 13' },
      { id: 14, image: '/details/1477.webp', name: '规格 14' },
      { id: 15, image: '/details/1478.webp', name: '规格 15' },
    ]
  },
  182: {
    name: 'Pet Product 182',
    price: 160,
    detailImages: [],
    specifications: []
  },
  183: {
    name: 'Pet Product 183',
    price: 315,
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

export default function ProductPage() {
  const { addToCart } = useCart()
  const searchParams = useSearchParams()
  let productId = parseInt(searchParams.get('id') || '1')

  // Products 180 and 182 redirect to product 15
  if (productId === 180 || productId === 182) {
    productId = 15
  }

  // 获取当前商品数据
  const product = productData[productId] || productData[1]
  const productImages = product.detailImages.length > 0 ? product.detailImages : (product.specifications?.map(spec => spec.image) || [])
  const specifications = product.specifications || []
  const colors = product.colors || []

  const sizes = [
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
      setSpecSizeQuantities(prev => ({
        ...prev,
        [specId]: { 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0, '3XL': 0 }
      }))
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
          for (let i = 0; i < qty; i++) {
            addToCart({
              id: Date.now() + Math.random(),
              name: `${product.name} - Spec ${specId} - ${size}`,
              price: product.price
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
            addToCart({
              id: Date.now() + Math.random(),
              name: `${product.name} - ${colorName} - ${size}`,
              price: product.price
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

          <p className="text-2xl md:text-3xl font-bold text-primary mt-4">${product.price.toFixed(2)}</p>

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
                          <div key={item.size} className="flex items-center justify-between px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                            <span className="text-xs font-semibold text-slate-900 dark:text-slate-200">{item.size}</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateColorSizeQuantity(colorId, item.size, -1)}
                                className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                              >
                                <span className="text-xs text-slate-600 dark:text-slate-300">−</span>
                              </button>
                              <span className="w-6 text-center text-xs font-medium text-slate-900 dark:text-slate-200">
                                {colorSizeQuantities[colorId]?.[item.size] || 0}
                              </span>
                              <button
                                onClick={() => updateColorSizeQuantity(colorId, item.size, 1)}
                                className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                              >
                                <span className="text-xs text-slate-600 dark:text-slate-300">+</span>
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
                              className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                            >
                              <span className="text-lg text-slate-700 dark:text-slate-200">−</span>
                            </button>
                            <span className="w-12 text-center text-base font-semibold text-slate-900 dark:text-slate-200">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateColorSizeQuantity(colorId, 'onesize', 1)}
                              className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                            >
                              <span className="text-lg text-slate-700 dark:text-slate-200">+</span>
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
          {Object.keys(specSizeQuantities).length > 0 && productId !== 14 && productId !== 15 && productId !== 16 && productId !== 17 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-3">选择尺寸（${product.price}/件）</h3>

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
                      {sizes.map((item) => (
                        <div key={item.size} className="flex items-center justify-between px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                          <span className="text-xs font-semibold text-slate-900 dark:text-slate-200">{item.size}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateSpecSizeQuantity(parseInt(specId), item.size, -1)}
                              className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                            >
                              <span className="text-xs text-slate-600 dark:text-slate-300">−</span>
                            </button>
                            <span className="w-6 text-center text-xs font-medium text-slate-900 dark:text-slate-200">
                              {specSizeQuantities[parseInt(specId)]?.[item.size] || 0}
                            </span>
                            <button
                              onClick={() => updateSpecSizeQuantity(parseInt(specId), item.size, 1)}
                              className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                            >
                              <span className="text-xs text-slate-600 dark:text-slate-300">+</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product 14, 15, 16 & 17 规格数量选择（无尺寸） */}
          {Object.keys(specSizeQuantities).length > 0 && (productId === 14 || productId === 15 || productId === 16 || productId === 17) && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-3">选择数量（${product.price}/件）</h3>

              <div className="space-y-3">
                {Object.keys(specSizeQuantities).map((specId) => {
                  const quantity = specSizeQuantities[parseInt(specId)]?.['onesize'] || 0
                  return (
                    <div key={specId} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-slate-200">规格 {specId}</h4>
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
                              className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                            >
                              <span className="text-lg text-slate-700 dark:text-slate-200">−</span>
                            </button>
                            <span className="w-12 text-center text-base font-semibold text-slate-900 dark:text-slate-200">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateSpecSizeQuantity(parseInt(specId), 'onesize', 1)}
                              className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                            >
                              <span className="text-lg text-slate-700 dark:text-slate-200">+</span>
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
