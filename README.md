# Junior fullstack interview exercise

Simple backend API for skills list application.

Project can contain a few "not the best" solutions that can be pointed out by the candidate during interview.

## prerequisites

- node v20.10.0+
- npm v10.2.3+
- docker-compose version 2.22.0+
- docker version 24.0.6+

## run tests

- install dependencies `npm install`
- run docker with postgres `npm run start:services` keep it running in separate terminal
- run tests `npm run test`

## notes

- You can switch to use storage mocks in `.env` file: `USE_DB_MOCK=true`
- tests should pass for integration tests with dockerized database and also with mocked storages

## troubleshooting

- in case of error related to installing dependencies install `libpq` (on mac: `brew install libpq`)
