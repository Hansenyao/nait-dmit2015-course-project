import { BASE_URL } from './base.js'

export const getBills = async (token) => {
    try {
        const resp = await fetch(`${BASE_URL}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!resp.ok) {
            let text = await resp.text();
            if (text && text.length > 0)
                throw new Error(text);
            else
                throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
        }
        return await resp.json();
    } catch (e) {
        console.error("Get bills failed:", e.message);
        throw e;
    }
}

export const getBill = async (id, token) => {
    try {
        const resp = await fetch(`${BASE_URL}/${id}/`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!resp.ok) {
            let text = await resp.text();
            if (text && text.length > 0)
                throw new Error(text);
            else
                throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
        }
        return await resp.json();
    } catch (e) {
        console.error("Get bill failed:", e.message);
        throw e;
    }
}

export const createBill = async (bill, token) => {
    try {
        const resp = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(bill)
        });
        if (!resp.ok) {
            let text = await resp.text();
            if (text && text.length > 0)
                throw new Error(text);
            else
                throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
        }
        return await resp.json();
    } catch (e) {
        console.error("Create bill failed:", e.message);
        throw e;
    }
}

export const updateBill = async (id, bill, token) => {
    try {
        const resp = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(bill)
        });
        if (!resp.ok) {
            let text = await resp.text();
            if (text && text.length > 0)
                throw new Error(text);
            else
                throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
        }
    } catch (e) {
        console.error("Update bill failed:", e.message);
        throw e;
    }
}

export const deleteBill = async (id, token) => {
    try {
        const resp = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        if (!resp.ok) {
            let text = await resp.text();
            if (text && text.length > 0)
                throw new Error(text);
            else
                throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
        }
    } catch (e) {
        console.error("Delete bill failed:", e.message);
        throw e;
    }
}