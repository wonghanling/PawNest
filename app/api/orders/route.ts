import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

// 生成订单号
function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `PN${timestamp}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      totalAmount,
      shippingFee,
      paymentMethod = 'paypal',
      paymentStatus = 'completed',
      paypalTransactionId,
      items
    } = body

    // 验证必填字段
    if (!customerName || !customerEmail || !customerAddress || !totalAmount || !items) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 生成订单号
    const orderNumber = generateOrderNumber()

    // 保存订单到 Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        total_amount: totalAmount,
        shipping_fee: shippingFee || 20.00,
        payment_method: paymentMethod,
        payment_status: paymentStatus,
        paypal_transaction_id: paypalTransactionId,
        items: items
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving order:', error)
      return NextResponse.json(
        { error: 'Failed to save order' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      order: data,
      message: 'Order saved successfully'
    })

  } catch (error) {
    console.error('Error processing order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// 获取所有订单（可选，用于管理后台）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching orders:', error)
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      orders: data,
      page,
      limit
    })

  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}