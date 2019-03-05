const express = require('express');
require('dotenv').config();
const convict = require('convict');
const mongoose = require('mongoose');
const db_url = require('./config/database');

console.log(process.env.NODE_ENV);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
console.log(process.env.DB_SECRET);
console.log(db_url);
