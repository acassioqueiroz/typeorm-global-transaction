module.exports = [{
   'name': process.env.DB_CONNECTION01_NAME,
   'type': process.env.DB_CONNECTION01_TYPE,
   'url': process.env.DB_CONNECTION01_URL,
   'entities': [
     './src/typeorm/entities/*.ts'
   ],
   'migrations': [
     './src/typeorm//migrations/*.ts'
   ],
   'cli': {
     'migrationsDir': './src/typeorm/migrations',
   }
 }]