The difference between db.js & .env

db.js will be pushed to github and will not contain sensitive info

.env is just for storing sensitive info and things we don't want to deploy to public, sometimes not only sensitive info, for example, in this project we saved a var called 'PORT=3000' in .env file, but PORT is not sensitive, we store it there just because PORT=3000 is only valid in local, when we deploy we could deploy to a different port (through render, ..etc.)