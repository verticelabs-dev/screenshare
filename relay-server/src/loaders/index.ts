import logger from './logger'
import express from './express'
import socketio from './socketio'

export default async ({ expressApp, httpServer }) => {
  await logger({ app: expressApp });
  console.log('🌲 Logger    Initialized 🌲');

  await express({ app: expressApp });
  console.log('🚀 Express   Initialized 🚀');

  await socketio({ httpServer })
  console.log('🚄 SocketIO  Initialized 🚄');
}
