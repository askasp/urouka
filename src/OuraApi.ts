export async function GetUserData(token: string) {
    console.log("token is", token)
    const response = await fetch('https://api.ouraring.com/v1/userinfo',
        {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            method: 'Get',
        }
    );

    const b = await response.json()
    console.log(b)

}


const getToday = () => {
    const today = new Date();
    var friday
    if (today.getDay() === 0) {
        friday = new Date().setDate(today.getDate() - 2);
        friday = new Date(friday)
        friday = friday.getFullYear() + '-' + (friday.getMonth() + 1) + '-' + friday.getDate();
        console.log("sunday friday is is", friday)
        return friday
    }
    if (today.getDay() === 6) {
        friday = new Date().setDate(today.getDate() - 2);
        friday = new Date(friday)
        friday = friday.getFullYear() + '-' + (friday.getMonth() + 1) + '-' + friday.getDate();
        console.log("saturdat friday is is", friday)
        return friday
    }
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log("todat is", date)
}

function getPreviousMonday() {
    var date = new Date();
    var day = date.getDay() - 1;
    if (day === -1) {
        day = 6
    }
    var prevMonday;
    console.log("day is", date.getDay())
    if (date.getDay() === 1) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    else {
        prevMonday = new Date().setDate(date.getDate() - day);
        prevMonday = new Date(prevMonday)
        return prevMonday.getFullYear() + '-' + (prevMonday.getMonth() + 1) + '-' + prevMonday.getDate();
    }
}

export async function GetOuraData(token: string, dataType: string) {
    const today = getToday();

    const prevMonday = getPreviousMonday()
    console.log("previius monday", prevMonday)
    const response = await fetch('https://api.ouraring.com/v1/' + dataType + `?start=${prevMonday}&end=${today}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: 'Get',
        }
    );
    const b = await response.json()
    if (b['readiness'] !== undefined && b['readiness'].length > 0) {
        const c = b['readiness'].map((item: any) => item.score)
        console.log("C is ", c)
        return c
    }
    return []
}

export async function UpdateUserData(uromakers2: any, token: string, userid: string) {
    const test = { "user_metadata": { uromakers2 } }
    const response = await fetch('https://dev-j8vszf7i.eu.auth0.com/api/v2/users/' + userid,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                "content-type": "application/json; charset=utf-8",
            },
            method: 'PATCH',
            body: JSON.stringify(test)
        }
    );

    const b = await response.json()
    return b
}

export async function GetAuth0UserData(token: string, userid: string) {
    const test = { "user_metadata": { "dummy": "data" } }
    const response = await fetch('https://dev-j8vszf7i.eu.auth0.com/api/v2/users/' + userid,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                "content-type": "application/json; charset=utf-8",
            },
            method: 'PATCH',
            body: JSON.stringify(test)
        }
    );
    const b = await response.json()
    console.log(b)
    return b
}
