// Caricare tutte le librerie necessarie alla nostra applicazione
const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const config = require('./config')
