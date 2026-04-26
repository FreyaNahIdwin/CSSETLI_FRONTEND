import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import PeopleCard from "../Components/PeopleCard.jsx";
import { BASE, emberek, kovetes, koveti, deleteKovetes } from "../api.js";
import simplehaz from "../kepek/feketeHaz.svg";
import messages from "../kepek/feketeKomment.svg";
import settings from "../kepek/feketeSettings.svg";
import people from "../kepek/feketePeople.svg";
import getLanguage from "../language";


const LOCAL_STORAGE_KEY = "koveti_follow_status";


function saveFollowStatusToStorage(statusObj) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(statusObj));
  } catch (e) {
    console.warn("Failed to save follow status to localStorage", e);
  }
}


function loadFollowStatusFromStorage() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.warn("Failed to load follow status from localStorage", e);
    return null;
  }
}


export default function People() {
  const [lang, setLang] = useState(getLanguage("1"));
  const [users, setUsers] = useState([]);
  const [koveti, setkoveti] = useState(() => loadFollowStatusFromStorage() || {});


  useEffect(() => {
    (async () => {
      const data = await emberek();
      if (data.result) {
        setUsers(data.users);
        const followStatuses = {};
        for (const user of data.users) {
          const res = await koveti(user.felhasznalo_id);
          if (res.result) {
            followStatuses[user.felhasznalo_id] = res.message;
          } else {
            followStatuses[user.felhasznalo_id] = false;
          }
        }


        setkoveti(followStatuses);
        saveFollowStatusToStorage(followStatuses);
      } else {
        setUsers([]);
      }
    })();


    const language = JSON.parse(localStorage.getItem("language")) || { lang: "0" };
    setLang(getLanguage(language.lang));
  }, []);


  const handleFollowToggle = async (userId) => {
    if (!koveti[userId]) {
      const res = await kovetes(userId);
      if (res.result) {
        const updated = { ...koveti, [userId]: true };
        setkoveti(updated);
        saveFollowStatusToStorage(updated);
      } else {
        alert("Hiba történt a követés során: " + res.message);
      }
    } else {
      const confirmed = window.confirm("Biztosan törölni szeretnéd az ismerőst?");
      if (confirmed) {
        const res = await deleteKovetes(userId);
        if (res.result) {
          const updated = { ...koveti, [userId]: false };
          setkoveti(updated);
          saveFollowStatusToStorage(updated);
        } else {
          alert("Hiba történt a törlés során: " + res.message);
        }
      }
    }
  };


  return (
    <div style={{ paddingTop: "90px" }} className="background min-vh-100">
      <Navbar homeI={simplehaz} messagesI={messages} settingsI={settings} peopleI={people} />


      <div className="container mt-5">
        <div className="row gy-3 text-center">
          {users.length === 0 && <p>{lang?.peopleEmpty ?? "Nincs senki csak te."}</p>}
          {users.map((user, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <PeopleCard
                content={koveti[user.felhasznalo_id] ? "követve" : "követés"}
                image={`${BASE}/uploads/${user.kep}`}
                felhasznalonev={user.felhasznalo_nev}
                onClick={() => handleFollowToggle(user.felhasznalo_id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}