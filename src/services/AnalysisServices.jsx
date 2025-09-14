import { handleResponse } from "../helper/handle-response";
import { authHeader } from "../helper/auth-header";
import Config from "../config";
export const AnalysisServices = {
    getProfit
}

function getProfit(fromDate, toDate) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            fromDate,
            toDate,
        }),
    };
    return fetch(`${Config.SERVER_URL}/Analysis/GetProfit`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

