export async function GetUserData(token:string) {
    console.log("token is",token)
    const response = await fetch('https://api.ouraring.com/v1/userinfo',
        {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            method: 'Get',
        }
    );

    const b= await response.json()
    console.log(b)
    
}

export async function GetOuraData(token:string,dataType:string) {
    console.log("token is",token)
    //TODO must not hardcode the dates
    const response = await fetch('https://api.ouraring.com/v1/'+dataType+'?start=2019-01-01&end=2020-09-01',
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: 'Get',
        }
    );

    const b= await response.json()
    console.log(b)
    return b
}

