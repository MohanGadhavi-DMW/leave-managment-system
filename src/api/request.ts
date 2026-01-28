import endpoints from "src/config/endpoints"
import apiController from "./apiController"
import { defaultSerachParams } from "src/components/Flight/ModifySearch/flightSearch.constant"
import { IGuestPayload } from "src/components/Flight/FlightReview/BookingCard/ReviewPageTabs/TravellerDetails/traveller.types"
import { AxiosHeaders } from "axios"
import { IRecommendationPayload } from "src/components/Flight/RecommendationPanel/recommended.types"

export async function requestSearch(searchPayload: Record<string, any>, headers?: AxiosHeaders,) {
    try {
        const res = await apiController.post(endpoints.search,
            {
                ...defaultSerachParams,
                ...searchPayload,
            },
            {
                headers: {
                    ...headers ?? {}
                }
            }
        )
        return res?.data?.data
    } catch (error) {
        console.log('error', error)
        return
    }
}

export async function requestSaveGuest(
    newGuest: IGuestPayload[],
    modifiedGuest: IGuestPayload[],
    searchId?: string,
    searchType?: string
) {
    const res = await apiController
        .put(`${endpoints.saveGuests}?searchId=${searchId}`, {
            newGuests: newGuest.map((item) => {
                const { formIndex, guestIndex, ...rest } = item;
                return { ...rest };
            }),
            updatedGuests: modifiedGuest,
            searchType
        })
    return res?.data?.data
} 

export async function requestFareRecommendation({
    selectedFlight,
    searchId,
    searchType
}: Partial<IRecommendationPayload>) {
    const res = await apiController
        .put(`${endpoints.faresRecommendation}`, {
            searchType,
            searchId,
            selectedFlight
        })
    return res?.data?.data
}
