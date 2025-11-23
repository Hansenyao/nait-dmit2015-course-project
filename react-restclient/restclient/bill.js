import { BASE_URL } from './base.js'

export const getBills = async () => {
    try {
        const resp = await fetch(`${BASE_URL}`);
        if (resp.ok) {
            return await resp.json();
        } else {
            return resp.data;
        }
    } catch (e) {
        console.log(e.message);
    }
}

export const getBill = async (id) => {
    try {
        const resp = await fetch(`${BASE_URL}/${id}/`);
        if (resp.ok) {
            return await resp.json();
        } else {
            return resp.data;
        }
    } catch (e) {
        console.log(e.message);
    }
}

export const createBill = async (bill) => {
    try {
        const resp = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({bill})
        });
        if (resp.ok) {
            return await resp.json();
        } else {
            return resp.data;
        }
    } catch (e) {
        console.log(e.message);
    }
}

export const updateBill = async (id, bill) => {
    try {
        const resp = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({bill})
        });
        if (resp.ok) {
            return await resp.json();
        } else {
            return resp.data;
        }
    } catch (e) {
        console.log(e.message);
    }
}

export const deleteBill = async (id) => {
    try {
        const resp = await fetch (`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {'Content-Type' : 'application/json'}
        })
        if (resp.ok) {
            return await resp.json();
        } else {
            return resp.data;
        }
    } catch (e) {
        console.log(e.message);
    }
}