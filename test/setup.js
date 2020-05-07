require('dotenv').config();
const supertest = require('supertest');
const { expect } = require('chai');

global.supertest = supertest;
global.expect = expect;