const User = require('../models/user');
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const userList = await User.find().select('-passwordHash')

    if(!userList){
        return res.status(500).json({success:false})
    }
    res.send(userList)
})

router.get('/:id', async (req, res) => {
    const userid = await mongoose.isValidObjectId(req.params.id)
    if(!userid){return res.status(500).send('Invalid userid')}
    const user = await User.findById(req.params.id).select('-passwordHash')

    if(!user){return res.status(404).send('User not found')}

    res.send(user)
})

router.post('/', async(req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })

    user = await user.save()
    if(!user){return res.status(400).send('no user created')}

    res.send(user);
})

router.post('/login', async(req, res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.SECRET

    if(!user){
        return res.status(404).send('user not found')
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {
                expiresIn: '1d'
            }
        )

        return res.status(200).send({user: user.email, token: token})
    } else {
         res.send('incorrect password')
    }  
})

router.post('/register', async(req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })

    user = await user.save()
    if(!user){return res.status(400).send('no user created')}

    res.send(user);
})

router.get('/get/count/', async (req, res) => {
    const userCount = await User.countDocuments()

    if(!userCount) {
        res.status(500).json({success: false})
    }
    res.send({
        userCount: userCount
    })
})

router.delete('/:id', async (req, res) => {
    const userId = mongoose.isValidObjectId(req.params.id)
    if(!userId) {return res.status(500).send('Invalid user id')}
    const user = await User.findByIdAndRemove(req.params.id)

    if(!user) {return res.status(404).send('user does not exist')}

    res.send('User is deleted')
})


module.exports= router