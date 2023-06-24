import { Card } from "../interfaces/ICardType";
import { User } from "../interfaces/IUserType";
import { EventTypes } from "../pages/CardDetails";

const serverUrl = "http://localhost:3000/";
const usersUrl = `${serverUrl}users/`;
const cardsUrl = `${serverUrl}cards/`;
const eventsUrl = `${serverUrl}events/`;

export async function signup(user: User): Promise<User> {
  const res = await fetch(`${usersUrl}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function login(user: User): Promise<User> {
  const res = await fetch(`${usersUrl}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  return res.json();
}

export async function getUsers(): Promise<Array<User>> {
  const res = await fetch(`${usersUrl}`);
  return res.json();
}

export async function getUserById(_id: string): Promise<Array<User>> {
  const res = await fetch(`${usersUrl}myuser/${_id}`, {
    headers: {
      // 'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function editUser(_id: string, user: User): Promise<User> {
  const res = await fetch(`${usersUrl}${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      // 'x-auth-token': getToken()
    },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function deleteUser(_id: string): Promise<User> {
  const res = await fetch(`${usersUrl}${_id}`, {
    method: "DELETE",
    headers: {
      // 'x-auth-token': getToken()
    },
  });
  return res.json();
}





export async function getCards(): Promise<Array<Card>> {
  const res = await fetch(`${cardsUrl}`);
  return res.json();
}

export async function addCard(card: Card): Promise<Card> {
  const res = await fetch(`${cardsUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'x-auth-token': getToken()
    },
    body: JSON.stringify(card),
  });
  return res.json();
}

export async function getCardsById(_id: string): Promise<Array<Card>> {
  const res = await fetch(`${cardsUrl}mycards/${_id}`, {
    headers: {
      // 'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function getCardById(_id: string): Promise<Card> {
  const res = await fetch(`${cardsUrl}${_id}`, {
    headers: {
      // 'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function editCards(_id: string, card: Card): Promise<Card> {
  const res = await fetch(`${cardsUrl}${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      // 'x-auth-token': getToken()
    },
    body: JSON.stringify(card),
  });
  return res.json();
}

export async function deleteCard(_id: string): Promise<Card> {
  const res = await fetch(`${cardsUrl}${_id}`, {
    method: "DELETE",
    headers: {
      // 'x-auth-token': getToken()
    },
  });
  return res.json();
}

export async function changeFav(_id: string): Promise<Card> {
  const res = await fetch(`${cardsUrl}favs/${_id}`, {
    method: "PATCH",
    headers: {
      // 'x-auth-token': getToken()
    },
  });
  return res.json();
}





export async function getEvents(): Promise<Array<EventTypes>> {
  const res = await fetch(`${eventsUrl}`);
  return res.json();
}

export async function getEventTitle(title: string): Promise<EventTypes> {
  const res = await fetch(`${eventsUrl}${title}`, {
    headers: {
      // 'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function addEvent(event: EventTypes): Promise<EventTypes> {
  const res = await fetch(`${eventsUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event),
  });
  return res.json();
}

export async function deleteEvent(_id: string): Promise<EventTypes> {
  const res = await fetch(`${eventsUrl}${_id}`, {
    method: "DELETE"
  });
  return res.json();
}