export const BASE = 'https://nodejs310.dszcbaross.edu.hu'

export async function regisztracio(email, felhasznalonev, jelszo, file) {
    const formData = new FormData();
    formData.append('kep_neve', file);
    formData.append('email', email);
    formData.append('felhasznalonev', felhasznalonev);
    formData.append('jelszo', jelszo);


    const res = await fetch(`${BASE}/regisztracio`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}

export async function belepes(felhasznalonevVagyEmail, jelszo) {
    const res = await fetch(`${BASE}/belepes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ felhasznalonevVagyEmail, jelszo })
    })
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message }
    else return { result: true, message: data.message }
}

export async function felhasznalonevModositas(ujfelhasznalonev) {
    const res = await fetch(`${BASE}/felhasznalonev`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ujfelhasznalonev })
    })
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}

export async function profilKepModositas(file) {
    const formData = new FormData();
    formData.append('ujProfilkep', file);
    const res = await fetch(`${BASE}/profilkep`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
    })
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}

export async function jelszoModositas(jelenlegiJelszo, ujJelszo) {
    const res = await fetch(`${BASE}/jelszo`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jelenlegiJelszo, ujJelszo }),
    })
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}

export async function bejegyzes(tartalom, kep) {

    const formData = new FormData();
    formData.append("tartalom", tartalom);
    formData.append("kep", kep);

    const res = await fetch(`${BASE}/bejegyzes`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    });

    const data = await res.json();

    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}

export async function kovetes(felhasznalo_id) {
    const res = await fetch(`${BASE}/kovetes/${felhasznalo_id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}

export async function koveti(felhasznalo_id) {
    const res = await fetch(`${BASE}/kovetes/${felhasznalo_id}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}
//KESZ?
export async function komment(tartalom, bejegyzes_id) {
    const res = await fetch(`${BASE}/komment`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tartalom, bejegyzes_id })
    });
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    return { result: true, message: data.message };
}


export async function szobakeszites(ismerosId) {
    const res = await fetch(`${BASE}/szobaCsinalas/${ismerosId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json();

    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, szobaId: data.szobaId };
}

export async function uzenetkuldes(szobaId, szoveg) {
    const res = await fetch(`${BASE}/uzenetkuldes/${szobaId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ szoveg })
    });

    const data = await res.json();

    if (!res.ok) return { result: false, message: data.message };

    return {
        result: true,
        uzenet: data.uzenet
    };
}

export async function bejegyzesek() {
    const res = await fetch(`${BASE}/bejegyzesek`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, posts: data.posts || [] };
}



export async function ismerosok() {
    const res = await fetch(`${BASE}/ismerosok`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, ismerosok: data.ismerosok };
}


export async function getUzenetek(ismerosid) {
    const res = await fetch(`${BASE}/uzenetek/${ismerosid}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data };
}


export async function emoji(bejegyzes_id, emoji1) {
    const res = await fetch(`${BASE}/emoji/${bejegyzes_id}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji1 }),
    });
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}

export async function emojiCount(bejegyzes_id) {
    const res = await fetch(`${BASE}/emojiCount/${bejegyzes_id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, emojiszam: data.emojiszam };
}

export async function kijelentkezes() {
    const res = await fetch(`${BASE}/kijelentkezes`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}

export async function adataim() {
    const res = await fetch(`${BASE}/adataim`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}

export async function fiokom() {
    const res = await fetch(`${BASE}/fiokom`, {
        method: 'DELETE',
        credentials: 'include',
    })
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}

export async function deleteKovetes(ismeros_id) {
    const res = await fetch(`${BASE}/kovetes/${ismeros_id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ismeros_id })
    })
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}

export async function putBejegyzes(bejegyzes_id, tartalom, kep, existingImage = null) {
    const formData = new FormData();
    formData.append('tartalom', tartalom);

    if (kep && kep instanceof File) {
        formData.append('kep', kep);
    } else if (existingImage) {
        formData.append('existingImage', existingImage);
    }

    const res = await fetch(`${BASE}/bejegyzes/${bejegyzes_id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
    });

    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, message: data.message };
}



export async function deleteBejegyzes(bejegyzes_id) {
    const res = await fetch(`${BASE}/bejegyzes/${bejegyzes_id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    const data = await res.json();

    if (!res.ok) {
        return { result: false, message: data.message };
    }

    return { result: true, message: data.message };
}

export async function emberek() {
    const res = await fetch(`${BASE}/emberek`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, users: data.users };
}

export async function getKommentek(bejegyzes_id) {
    const res = await fetch(`${BASE}/kommentek/${bejegyzes_id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else {
        // Map backend fields to frontend expected keys
        const comments = data.kommentek.map(k => ({
            id: k.kuldo_felhasznalo_id + '_' + k.kuldes_ideje, // or other unique id
            felhasznalonev: k.Felhasznalo_nev,  // map username here
            szoveg: k.tartalom,
            ido: k.kuldes_ideje,
        }));
        return { result: true, comments };
    }
}

export async function kommentSzam() {
    const res = await fetch(`${BASE}/kommentSzam`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, kommentSzam: data.kommentSzam };
}

export async function kommentSzamBejegyzes() {
    const res = await fetch(`${BASE}/kommentSzamBejegyzes/${bejegyzes_id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok) return { result: false, message: data.message };
    else return { result: true, kommentSzam: data.kommentSzam };
}