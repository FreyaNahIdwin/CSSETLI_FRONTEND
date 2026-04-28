import React, { useState, useEffect } from "react";
export default function UzenetekCard({ balUzenet, jobbUzenet, balProfilkep,jobbProfilkep}) {

    return (
        <div className="d-flex flex-column p-4">


            {/* BAL OLDALI ÜZENET - Csak akkor jelenik meg, ha van balUzenet */}
            {balUzenet && (
                <div className="d-flex flex-row align-items-start mb-3">
                    <img
                        style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }}
                        src={balProfilkep}
                        className="me-2"
                    />
                    <div style={{ padding: "10px 20px", borderRadius: "20px", maxWidth: "550px", backgroundColor: "#FD0303ff", color: "white" }}>
                        {balUzenet}
                    </div>
                </div>
            )}


            {/* JOBB OLDALI ÜZENET - Csak akkor jelenik meg, ha van jobbUzenet */}
            {jobbUzenet && (
                <div className="d-flex flex-row-reverse align-items-end ms-auto mb-3">
                    <div style={{ padding: "10px 20px", borderRadius: "20px", maxWidth: "550px", backgroundColor: "#D95E2Eff", color: "white" }}>
                        {jobbUzenet}
                    </div>
                </div>
            )}


        </div>
    )
}
