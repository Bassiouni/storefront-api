import * as dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const { PG_HOST, PG_DB, PG_TEST_DB, PG_USER, PG_PASSWD, ENV } = process.env

let database

if (ENV === 'test') database = PG_TEST_DB
else if (ENV === 'dev') database = PG_DB
else database = 'guarbage_database_due_to_pool_env_err'

const client = new Pool({
  host: PG_HOST,
  database,
  user: PG_USER,
  password: PG_PASSWD,
})

export default client
