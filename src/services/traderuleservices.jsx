import { authHeader } from "../helper/auth-header";
import { handleResponse } from "../helper/handle-response";
import Config from "../config";
export const TradeRuleServices = {
    createMasterRule,
    getExchangeTypes,
    getInstrumentTypes,
    getSymbols,
    getStrategyTypes,
    getPriceAndExpiry,
    getExchangeType,
    viewActiveMasterRules,
    getMasterRuleFromId,
    startMasterRule,
    pauseMasterRule,
    exitMasterRule,
    stopRule,
    updateBearSwitchingPrice,
    updateStartingPrice,
    finalOrderOfTheDay,
    viewSquarOffMasterRules
}

function createMasterRule(
    ruleName,
    instrumentType,
    symbolData,
    general,
    expiryDate,
    strategyType
) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            ruleName,
            instrumentType,
            symbolData,
            general,
            expiryDate,
            strategyType,
        }),
    };
    return fetch(
        `${Config.SERVER_URL}/TradeRule/CreateMasterRule`,
        requestOptions
    )
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getExchangeTypes() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(
        `${Config.SERVER_URL}/tradeRule/getExchangeTypes`,
        requestOptions
    )
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getInstrumentTypes() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(
        `${Config.SERVER_URL}/tradeRule/getInstrumentTypes`,
        requestOptions
    )
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getSymbols() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(`${Config.SERVER_URL}/tradeRule/getSymbols`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getStrategyTypes() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(
        `${Config.SERVER_URL}/TradeRule/GetStrategyTypes`,
        requestOptions
    )
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getPriceAndExpiry(symbolData, instrumentType) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            symbolData,
            instrumentType,
        }),
    };
    return fetch(
        `${Config.SERVER_URL}/TradeRule/GetPriceAndExpiry`,
        requestOptions
    )
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getExchangeType(symbolData) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            symbolData,
        }),
    };
    return fetch(`${Config.SERVER_URL}/tradeRule/getExchangeType`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function viewActiveMasterRules() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(
        `${Config.SERVER_URL}/tradeRule/ViewActiveMasterRules`,
        requestOptions
    )
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getMasterRuleFromId(ruleId) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            ruleId,
        }),
    };
    return fetch(
        `${Config.SERVER_URL}/tradeRule/GetMasterRuleFromId`,
        requestOptions
    )
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}
function startMasterRule(ruleName) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            ruleName,
        }),
    };
    return fetch(`${Config.SERVER_URL}/tradeRule/StartMasterRule`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function pauseMasterRule(ruleName) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            ruleName,
        }),
    };
    return fetch(`${Config.SERVER_URL}/tradeRule/PauseMasterRule`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function exitMasterRule(ruleName) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            ruleName,
        }),
    };
    return fetch(`${Config.SERVER_URL}/tradeRule/ExitMasterRule`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function stopRule(ruleName) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            ruleName,
        }),
    };
    return fetch(`${Config.SERVER_URL}/tradeRule/stopRule`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function updateBearSwitchingPrice(RuleId, RuleName, SwitchingPrice) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            RuleId,
            RuleName,
            SwitchingPrice,
        }),
    };
    return fetch(
        `${Config.SERVER_URL}/tradeRule/UpdateSwitchingPrice`,
        requestOptions
    )
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function updateStartingPrice(RuleId, RuleName, StartingPrice) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            RuleId,
            RuleName,
            StartingPrice,
        }),
    };
    return fetch(
        `${Config.SERVER_URL}/tradeRule/UpdateStartingPrice`,
        requestOptions
    )
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function finalOrderOfTheDay(ruleName) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            ruleName,
        }),
    };
    return fetch(
        `${Config.SERVER_URL}/tradeRule/finalOrderOfTheDay`,
        requestOptions
    )
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function viewSquarOffMasterRules() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(
        `${Config.SERVER_URL}/tradeRule/ViewSquarOffMasterRules`,
        requestOptions
    )
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}