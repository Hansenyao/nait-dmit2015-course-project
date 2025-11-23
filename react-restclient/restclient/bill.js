import { BASE_URL } from './base.js'

export const getBills = async () => {
    try {
        const resp = await fetch(`${BASE_URL}`);
        if (resp.ok) {
            return await resp.json();
        }

        // failed! Get error from JSON or fallback text
        let err;
        try {
            const json = await resp.json();
            err = json.message || JSON.stringify(json);
        } catch {
            err = await resp.text();
        }
        throw new Error(err);
    } catch (e) {
        console.error("Get bills failed:", e.message);
        throw e;
    }
}

export const getBill = async (id) => {
    try {
        const resp = await fetch(`${BASE_URL}/${id}/`);
        if (resp.ok) {
            return await resp.json();
        }

        // failed! Get error from JSON or fallback text
        let err;
        try {
            const json = await resp.json();
            err = json.message || JSON.stringify(json);
        } catch {
            err = await resp.text();
        }
        throw new Error(err);
    } catch (e) {
        console.error("Get bill failed:", e.message);
        throw e;
    }
}

export const createBill = async (bill) => {
    try {
        const resp = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bill })
        });
        if (resp.ok) {
            return await resp.json();
        }

        // failed! Get error from JSON or fallback text
        let err;
        try {
            const json = await resp.json();
            err = json.message || JSON.stringify(json);
        } catch {
            err = await resp.text();
        }
        throw new Error(err);
    } catch (e) {
        console.error("Create bill failed:", e.message);
        throw e;
    }
}

export const updateBill = async (id, bill) => {
    try {
        const resp = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bill })
        });
        if (resp.ok) {
            return await resp.json();
        }

        // failed! Get error from JSON or fallback text
        let err;
        try {
            const json = await resp.json();
            err = json.message || JSON.stringify(json);
        } catch {
            err = await resp.text();
        }
        throw new Error(err);
    } catch (e) {
        console.error("Update bill failed:", e.message);
        throw e;
    }
}

export const deleteBill = async (id) => {
    try {
        const resp = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        })
        if (resp.ok) {
            return await resp.json();
        }

        // failed! Get error from JSON or fallback text
        let err;
        try {
            const json = await resp.json();
            err = json.message || JSON.stringify(json);
        } catch {
            err = await resp.text();
        }
        throw new Error(err);
    } catch (e) {
        console.error("Delete bill failed:", e.message);
        throw e;
    }
}