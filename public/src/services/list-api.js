const URL = '/api';

function fetchWithError(url, options) {
    return fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                return response.json().then(json => {
                    throw json.error;
                });
            }
        });
}


export function getList() {
    const url = `${URL}/list`;
    return fetchWithError(url);
}

export function addItem(item) {
    const url = `${URL}/list`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json());
}
