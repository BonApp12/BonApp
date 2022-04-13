local-build:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --remove-orphans --build

local-up:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --remove-orphans

local-down:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

prod-build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down && docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans --build

prod-up:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down && docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans

prod-down:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down