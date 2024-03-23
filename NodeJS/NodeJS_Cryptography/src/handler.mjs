import { Hasher } from "./useCases/hasher.mjs";

const handler = (algorithm) => {
    return async (request, response) => {
        const { data } = request['params']

        if (algorithm === 'aes' && 'iv', 'key' in request['query']) {
            const { key } = request['query']
            if (key.length !== 32) return response.json({ error: 'Invalid key' })

            if('decrypt' in request['query']) {
                const { data: dataDecrypted } = request['params']
                const { iv, key } = request['query']
                const decrypted = Hasher.aesDecrypt(dataDecrypted, key, iv)
                return response.json({ decrypted_data: decrypted })
            }

            const { encrypted, iv } = Hasher.aesEncrypt(data, key)
            return response.json({ data_encrypted: encrypted, iv })
        }

        const hash = Hasher.hashEncrypt(data)
        return response.json({ hash })
    }
}

export { handler }