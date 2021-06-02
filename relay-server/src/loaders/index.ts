import logger from './logger'
import express from './express'
import socketio from './socketio'
import redis from './redis'
import db from './database'

export default async ({ expressApp, httpServer }) => {
  await db();
  console.log('💾 Knex      Initialized 💾');

  redis();
  console.log('⚡ Redis     Initialized ⚡');

  await logger({ app: expressApp });
  console.log('🌲 Logger    Initialized 🌲');

  await express({ app: expressApp });
  console.log('🚀 Express   Initialized 🚀');

  await socketio({ httpServer })
  console.log('🚄 SocketIO  Initialized 🚄');
}
