import { useState, useEffect } from "react";
import Button from "../Components/Button";


export default function PeopleCard({ felhasznalonev, image, onClick,content }) {


    return (
        <div
            className="bombo"
            style={{
                borderRadius: "20px",
                padding: "20px",
               
                textAlign: "center",
                minHeight: "250px"
            }}
        >
            <div>
                <img
                    src={image}
                    style={{
                        width: "100%",
                        borderRadius: "10px",
                        marginBottom: "15px",
                        maxHeight: "200px",
                        minHeight: "200px",
                        objectFit: "cover"
                    }}
                />
            </div>


            <div className="d-flex align-items-start" style={{ color: "white" }}>
                {felhasznalonev}
            </div>


            <div style={{ background: "#333333", borderRadius: "45px" }}>
                <button onClick={onClick} style={{ borderRadius: "15px", boxShadow: "0px 4px 10px" }} className={`btn csetliColor`}>
                    {content}
                    </button>
            </div>
        </div>
    );
}
