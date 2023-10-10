const { Router } = require('express')
const { resolve } = require('path')
const express = require('express')

const router = Router()

router.use('/public', express.static('public'))
router.get('/', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')))
router.get('/admin', (req, res) => res.sendFile(resolve(__dirname, '../public/admin.html')))

module.exports = { router }