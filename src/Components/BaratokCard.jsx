export default function BaratokCard({ profilkep, felhasznalonev, onClick }) {
        return (

                <div >
                        <div className="d-flex flex-row align-items-start" >
                                <div className="align-items-center"
                                        style={{
                                                width: "40px", height: "40px", border: "3px solid black",
                                                borderRadius: "50%", overflow: "hidden", flexShrink: 0,
                                        }}>
                                        <img src={profilkep} alt="profkep" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", }} />
                                </div>
                                <button className="bombo" onClick={onClick}><div className="mx-2" style={{color:"white"}}>{felhasznalonev}</div></button>
                                
                        </div>

                </div>



        )
}
