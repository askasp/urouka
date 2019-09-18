import { Uromaker2 } from "./Models";

export async function GetUserData(token: string) {
  const response = await fetch("https://api.ouraring.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: "Get"
  });

  const b = await response.json();
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
  prevSunday = new Date().setDate(date.getDate() - day);
  date = new Date(prevSunday);
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}

function getDateForWeekDay(x: number) {
  // Score is determine by the previous day.. so sunday to thursday, but do not include non existing days
  var date = new Date();
  var day = date.getDay();
  if (day === 0) {
    day = 7;
  }
  var prevSunday;
  prevSunday = new Date().setDate(date.getDate() - day + x);
  date = new Date(prevSunday);
  return date.toISOString();
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}
export async function GetOuraData(token: string, dataType: string) {
  const today = getToday();
  const prevSunday = getPreviousSunday();
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
  let tmp = [undefined, undefined, undefined, undefined, undefined];
  if (b["readiness"] !== undefined && b["readiness"].length > 0) {
    const c = b["readiness"].map((item: any) => item.score);
    for (var counter: number = 0; counter < 5; counter++) {
      const result = b["readiness"].find(
        (item: any) =>
          item["summary_date"] === getDateForWeekDay(counter).split("T")[0]
      );

      if (result) {
        tmp[counter] = result.score;
      }
    }

    return tmp;
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
  return b;
}
