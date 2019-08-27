const URL = '/api';

export function getList() {
    const url = `${URL}/list`;
    return fetch(url)
        .then(response => response.json());
}