export const myPostFetcher = async (theUrl, data) => {
    var dataToSend = await data;
    const rawResponse = await fetch(theUrl, {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(dataToSend),
    });
    let response = await rawResponse.json();
    return response;
};
// ###############################################################
export const myGetFetcher = async (TheUrl) => {
    const rawResponse = await fetch(TheUrl, {
        method: "get",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    });
    let response = await rawResponse.json();
    return response;
};