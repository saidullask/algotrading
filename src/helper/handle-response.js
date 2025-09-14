import { Authservices } from "../services/AuthServices";
export function handleResponse(response) {
  return response.text().then((text) => {
    if (
      !response.ok ||
      (!response.status === 200 && !response.status === 201)
    ) {
      if ([401, 403].indexOf(response.status) !== -1) {
        Authservices.logout();
      }
      const error = text;
      return Promise.reject(error);
    }
    const data = text && JSON.parse(text);
    return data;
  });
}

