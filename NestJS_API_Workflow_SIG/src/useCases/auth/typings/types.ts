export type UserPayload = { id: number; login: string; name: string }

export type UserFromJwt = { id: number; login: string; name: string }

export type CurrentUserProps = { id: number; name: string; login: string }

export type MeProps = { me: CurrentUserProps }

export type AcessTokenProps = { accessToken: string }
