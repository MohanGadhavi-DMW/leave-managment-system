import { IReturnTypeBindWithPromiseType } from "./actionTypes.types"
export const pendingType = "/pending"
export const fulfilledType = "/fulfilled"
export const rejectedType = "/rejected"
export const bindTypeWithPromiseStatusType = (type: string): IReturnTypeBindWithPromiseType => {
    return {
        toString: () => type,
        pending: type + pendingType,
        fulfilled: type + fulfilledType,
        rejected: type + rejectedType,
        type
    }
}