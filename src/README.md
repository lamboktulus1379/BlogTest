1. docker-compose up -d --build site
2. docker-compose run --rm composer update
3. docker-compose run --rm npm run dev
4. docker-compose run --rm artisan migrate:fresh --seed
