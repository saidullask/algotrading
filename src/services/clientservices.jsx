import { authHeader } from "../helper/auth-header";
import { handleResponse } from "../helper/handle-response";
import Config from "../config";
export const Clientservices = {
    addClient,
    getClients,
    updateClient,
    getClientType,
    getClientBasicDetails,
    getClientById,
    getClientStrategyStatus,
    updateClientStrategy,
    getClientStrategy,
    assignClientToStrategy,
    getAllRegisterClient
}

function addClient(clientData) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            clientData
        }),
    };
    return fetch(`${Config.SERVER_URL}/client/AddClient`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getClients(strategyType) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            strategyType
        }),
    };
    return fetch(`${Config.SERVER_URL}/client/GetClients`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function updateClient(id, clientName, description, clientType) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            id, clientName, description, clientType
        }),
    };
    return fetch(`${Config.SERVER_URL}/client/UpdateClient`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getClientType() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(`${Config.SERVER_URL}/client/GetClientTypes`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}
function getClientBasicDetails() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(`${Config.SERVER_URL}/client/GetAllClientsBasicDetails`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}
function getClientById(clientId) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            clientId
        }),
    };
    return fetch(`${Config.SERVER_URL}/client/GetClientById`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getClientStrategyStatus() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(`${Config.SERVER_URL}/client/GetClientStrategyStatus`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}


function updateClientStrategy(strategyId, clientStrategyStatusId, expiryDate, quantityInLot) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            strategyId, clientStrategyStatusId, expiryDate, quantityInLot
        }),
    };
    return fetch(`${Config.SERVER_URL}/client/UpdateClientStrategy`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getClientStrategy() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(`${Config.SERVER_URL}/client/GetClientStrategy`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function assignClientToStrategy(clientId, strategyId, expiryDate, quantity) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            clientId, strategyId, expiryDate, quantity
        }),
    };
    return fetch(`${Config.SERVER_URL}/client/AssignClientToStrategy`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getAllRegisterClient() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(`${Config.SERVER_URL}/client/GetAllRegisterClient`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}