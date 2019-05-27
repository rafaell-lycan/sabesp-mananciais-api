import { config } from 'dotenv';
config();

import 'reflect-metadata';

import Application from './application';

new Application().start();
