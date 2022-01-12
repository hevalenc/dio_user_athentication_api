import { Pool } from "pg";

const connectionString = 'postgres://ezjxclit:t5BKVkHP-UHLGEwjc_Sc_zQg6xyX3LVg@motty.db.elephantsql.com/ezjxclit'
const db = new Pool({connectionString})

export default db