import pgp from 'pg-promise'

export const connection = pgp(process.env.CONN_POSTGRES)
