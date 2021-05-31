import logger from './logger'
import express from './express'
import socketio from './socketio'
import db from './database'

export default async ({ expressApp, httpServer }) => {

  const DB = await db();
  console.log('💾 Knex      Initialized 💾');

  await logger({ app: expressApp });
  console.log('🌲 Logger    Initialized 🌲');

  await express({ app: expressApp, db: DB });
  console.log('🚀 Express   Initialized 🚀');

  await socketio({ httpServer })
  console.log('🚄 SocketIO  Initialized 🚄');
}
