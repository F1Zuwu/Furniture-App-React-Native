# Setup

Loo mysql andmebaas ja loo .env fail backend kausta ja täida vajalikud väljad

DB_NAME = "furnitureapp"
DB_USER = "root"
DB_PASSWORD = "qwerty"
DB_HOST = "localhost"

muuda sync.js fail database kaustast ka samadeks väljadeks mis .env failis on ja jooksuta see node ./database/sync.js

see järel käivita api node server.js

ja käivita frontend npm run start
