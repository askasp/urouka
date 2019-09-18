import { Uromaker2 } from "./Models";

export async function GetUserData(token: string) {
  console.log("token is", token);
  const response = await fetch("https://api.ouraring.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: "Get"
  });

  const b = await response.json();
  console.log(b);
}

const getToday = () => {
  const today = new Date();
  return (
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
  );
};

function getPreviousSunday() {
  // Score is determine by the previous day.. so sunday to thursday, but do not include non existing days
  var date = new Date();
  var day = date.getDay();
  if (day === 0) {
    day = 7;
  }
  var prevSunday;
  console.log("day is", date.getDay());
  prevSunday = new Date().setDate(date.getDate() - day);
  date = new Date(prevSunday);
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}

export async function GetOuraData(token: string, dataType: string) {
  const today = getToday();
  const prevSunday = getPreviousSunday();
  console.log("Previous Sunday", prevSunday);
  console.log("today is", today);
  const response = await fetch(
    "https://api.ouraring.com/v1/" +
      dataType +
      "?start=" +
      prevSunday +
      "&end=" +
      today,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "Get"
    }
  );
  const b = await response.json();
  console.log("received data is", b);
  if (b["readiness"] !== undefined && b["readiness"].length > 0) {
    const c = b["readiness"].map((item: any) => item.score);
    console.log("Oura return is", c);
    return c;
  }
  return [0];
}

export async function UpdateUserData(
  uromakers2: Uromaker2[],
  token: string,
  userid: string
) {
  const test = { user_metadata: { uromakers2 } };
  const response = await fetch(
    "https://dev-j8vszf7i.eu.auth0.com/api/v2/users/" + userid,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json; charset=utf-8"
      },
      method: "PATCH",
      body: JSON.stringify(test)
    }
  );

  const b = await response.json();
  return b;
}

export async function GetAuth0UserData(token: string, userid: string) {
  const test = { user_metadata: { dummy: "data" } };
  const response = await fetch(
    "https://dev-j8vszf7i.eu.auth0.com/api/v2/users/" + userid,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json; charset=utf-8"
      },
      method: "PATCH",
      body: JSON.stringify(test)
    }
  );
  const b = await response.json();
  console.log(b);
  return b;
}
