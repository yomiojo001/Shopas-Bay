const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const User = require('../models/user');
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    const orderList = await Order.find().populate('user', 'name').populate({path: 'orderItems', populate: 'product'})

    if(!orderList){
        return res.status(500).json({success:false})
    }
    res.send(orderList)
})

router.get('/:id', async (req, res) => {
    const orderList = await Order.findOne(req.params.id).populate('user', 'name').populate({path: 'orderItems', populate: 'product'})

    if(!orderList){
        return res.status(500).json({success:false})
    }
    res.send(orderList)
})

router.post('/', async (req, res) => {
    const orderItemsId = Promise.all(req.body.orderItems.map( async orderItem => { 
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id 
    }))
    const orderItemsIdResolved = await orderItemsId;

    const totalPrices = await Promise.all(orderItemsIdResolved.map( async orderItemId =>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price')
        const totalPrice = orderItem.product.price * orderItem.quantity
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a + b, 0)

    let order  = new Order({
        orderItems: orderItemsIdResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user
    })

    order = await order.save()

    if(!order){
        return res.status(404).send('the order cannot be created')
    }

    res.send(order)
})

router.put('/:id', async (req, res) => {
    const orderId = mongoose.isValidObjectId(req.params.id)
    if(!orderId){
        return res.status(404).send('the order ID is not valid')
    }
    const order = await Order.findByIdAndUpdate(req.params.id,
        {
            status: req.body.status
        },
        {new: true}
        )

    if(!order){
       return res.status(404).send('the order cannot be updated')
    }

    res.send(order)

})

router.delete('/:id', async (req, res) => {
    const orderId = mongoose.isValidObjectId(req.params.id)
    if(!orderId){
        return res.status(404).send('the order ID is not valid')
    }

    const order = await Order.findByIdAndRemove(req.params.id)
    
    if(!order){
        return res.status(404).send('the order was not found')
    }

        await order.orderItems.map(async orderItem => {
            await OrderItem.findByIdAndRemove(orderItem)
        })

    res.send('the order has been deleted')
});

router.get('/get/totalsales', async (req,res) => {
    const totalSales = await Order.aggregate([
        {$group: {_id: null, totalsales:{ $sum: '$totalPrice'}}}
    ])
    if(!totalSales){
        return res.status(400).send('the order sales can not be processed')
    }

    res.send({totalsales: totalSales.pop().totalsales})
})

router.get('/get/count', async (req, res) => {
    const orderCount = await Order.countDocuments()

    if(!orderCount){
        return res.status(400).send('error processing orders count')
    }

    res.status(200).send({ordercount: orderCount})
})

router.get('/get/userorders/:userid', async (req, res) => {
    const userOrders = await Order.find({user: req.params.userid}).populate({
        path: 'orderItems', 
        populate:{path:'product', populate: 'category' }}).sort({'dateOrdered': -1})

    if(!userOrders){
        return res.status(404).send('user orders not found')
    }

    res.status(200).send(userOrders)
})

module.exports= router