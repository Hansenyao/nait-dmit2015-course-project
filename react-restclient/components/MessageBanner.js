import React, { useEffect } from "react";

export default function MessageBanner({ message, isError, onClose }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div>
            {message && (
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: isError ? "#ff4d4f" : "#1976d2",
                    color: "white",
                    padding: "10px 15px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    boxSizing: "border-box"
                }}>
                    {message}

                    <button
                        onClick={onClose}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "18px",
                            cursor: "pointer",
                            lineHeight: 1,
                            padding: 0
                        }}
                    >
                        X
                    </button>
                </div>
            )}
        </div>
    )
}