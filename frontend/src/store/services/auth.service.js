import config from '../../util/AxiosConfig';

export const verifyUser = (code) => {
    return config.get("confirm/" + code);
};

export const verifyFileAccess = (code) => {
    return config.get("confirmAccess/" + code);
};

export const requestAccessService = (email) => {
    return config.post("/requestAccess", {"email":email});
};