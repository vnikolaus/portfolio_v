import { DeleteResult } from 'typeorm'
import { ID_SOLICITANTE, SOLICITANTE } from '../../../constants/sig.constants'
import { Sig } from '../../../entities/sig.entity'

export const sig1 = new Sig({
    idSolicitante: ID_SOLICITANTE,
    solicitante: SOLICITANTE,
})

export const sig2 = new Sig({
    idSolicitante: ID_SOLICITANTE,
    solicitante: SOLICITANTE,
})

export const deleteResultMock = new DeleteResult()

export const arrSigs = [sig1, sig2]
