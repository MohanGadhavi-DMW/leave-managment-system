import { createAsyncThunk, createListenerMiddleware } from "@reduxjs/toolkit"
import api from "../../api/apiController"
import { AxiosRequestConfig } from "axios"
import { fetchDataThunkKey } from "./actionTypes"
import { fulfilledType, pendingType, rejectedType } from "./helpers"

export const fetchData = createAsyncThunk(
    fetchDataThunkKey.type,
    async (params: { type: string, config: AxiosRequestConfig, actionPayload?: any }, { rejectWithValue }) => {
        if (!params.type) throw new Error("type is required");
        if (!params?.config) throw new Error("config is required");
        if (!params.config?.url) throw new Error("config must have url");
        try {
            const response = await api(params.config);  // Example API call
            return {
                type: params.type,
                data: response.data,
                actionPayload: params.actionPayload,
            };
        } catch (error: any) {
            console.log('error', error)
            // If the API call fails, reject the promise with custom error data
            return rejectWithValue({
                type: params.type,
                message: error.message || 'An error occurred',
                status: error?.response ? error?.response.status : 500,
                data: error?.response?.data ?? null,
                actionPayload: params.actionPayload
            });
        }
    }
)

export const fetchDataListenerMiddleware = createListenerMiddleware()

fetchDataListenerMiddleware.startListening({
    type: fetchDataThunkKey.pending,
    effect: (action: any, listenerApi) => {
        const { meta } = action
        listenerApi.dispatch({
            type: meta?.arg?.type + pendingType,
            payload: null,
            meta: meta
        })
    }
})
fetchDataListenerMiddleware.startListening({
    type: fetchDataThunkKey.fulfilled,
    effect: (action: any, listenerApi) => {
        const { payload } = action
        listenerApi.dispatch({
            type: payload?.type + fulfilledType,
            payload,
            meta: action.meta
        })
    }
})
fetchDataListenerMiddleware.startListening({
    type: fetchDataThunkKey.rejected,
    effect: (action: any, listenerApi) => {
        const { meta, payload } = action
        listenerApi.dispatch({
            type: meta?.arg?.type + rejectedType,
            error: payload?.message,
            payload: payload,
            meta: action.meta
        })
    }
})
