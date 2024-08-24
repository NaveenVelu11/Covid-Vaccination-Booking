const express = require('express')
const app = express()
const mongoose = require("mongoose");
const cors = require('cors')
const Slot = require('./model/booked_slot_schema')
const User = require('./model/user_schema')
app.use(cors())
app.use(express.urlencoded())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/vaccination-booking", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.post('/login', async (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            if (req.body.password == user.password) {
                res.json({ status: 'ok', user_id: user._id })
            } else {
                res.json({ status: 'error', error: "Password didn't match" })
            }
        } else {
            res.json({ status: 'error', error: "User not registered" })
        }
    })
})

app.post('/slotcapacity', async (req, res) => {
    Slot.aggregate([
        {
            '$match': {
                $and: [{ "slot_date": new Date(req.body.date) },
                { "country": req.body.selet_country },
                { "state": req.body.selet_state },
                { "city": req.body.selet_city }]
            }
        },
        { $group: { _id: "$slot_id", count: { $sum: 1 } } }
    ], function (err, result) {

        res.json({ status: 'ok', capacity: result })
    })
})
app.post('/bookslot', async (req, res) => {
    try {
        await Slot.create({
            slot_id: req.body.slot,
            slot_date: req.body.dob1,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            user_id: req.body.id,
            dose: req.body.dose
        })

        res.json({ status: 'ok' })


    } catch (err) {
        console.log(err)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})
app.post('/register', async (req, res) => {
    User.findOne({ $and: [{ email: req.body.email }, { phone: req.body.Phone_no }] }, (err, user) => {
        if (user) {
            res.json({ status: 'exist' })
        }
        else {
            try {
                User.create({
                    first_name: req.body.First_name,
                    last_name: req.body.Last_name,
                    email: req.body.email,
                    password: req.body.password,
                    gender: req.body.Gender,
                    covid: req.body.Infected,
                    phone: req.body.Phone_no,
                    aadhar: req.body.aadhar,
                    dob: req.body.Date_of_birth,
                    country: req.body.countr,
                    state: req.body.stat,
                    city: req.body.cit,
                })
                res.json({ status: 'ok' })
            } catch (err) {
                console.log(err)
                res.json({ status: 'error', error: 'Duplicate email' })
            }
        }
    })
})

app.post('/Booked_userdetails', (req, res) => {
    try {
        Slot.find({ slot_date: req.body.date }, (err, slot) => {
            var user = [];
            slot.forEach((element, i) => {
                User.find({ _id: element.user_id }, (err, newUser) => {
                    user.push(newUser);
                    if (i == slot.length - 1) {
                        return res.json({ status: 'ok', details: user })
                    }

                })
            })
            if (slot.length == 0) {
                return res.json({ status: 'ok', details: "no data" })
            }


        })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.post('/bord_dose', async (req, res) => {
    try {
        const s = Slot.aggregate([
            { "$match": { "dose": req.body.dose } },
            { $group: { _id: { $dateToString: { format: "%m-%Y", date: "$slot_date" } }, count: { $sum: 1 } } }
        ], function (err, result) {
            result.sort((a, b) => a._id > b._id ? 1 : -1);

            return res.json({ status: 'ok', dose: result })
        });
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})
app.get('/bord_gender', async (req, res) => {
    try {
        User.aggregate([
            { $group: { _id: '$gender', count: { $sum: 1 } } }
        ], function (err, result) {
            return res.json({ status: 'ok', gender: result })
        }
        )
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})
app.get(('/bord_covid'), async (req, res) => {
    try {
        User.aggregate([
            { $group: { _id: '$covid', count: { $sum: 1 } } }
        ], function (err, result) {
            return res.json({ status: 'ok', covid: result })
        }
        )
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})
app.post(('/my_profile'), async (req, res) => {
    User.find({ _id: req.body.user_id }, (err, user) => {
        Slot.find({ user_id: req.body.user_id }, (err, slot) => {
            res.json({ slot: slot, user: user })
        })
    })
})
app.listen(2000, () => {
    console.log("server start")
})