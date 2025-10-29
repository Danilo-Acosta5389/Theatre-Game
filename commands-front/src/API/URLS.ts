export const BASE = "http://localhost:5299/theatrehub";
//export const BASE = "http://theatre.whatisspace.online/theatrehub";
//export const BASE = "https://theatre.whatisspace.online/theatrehub";

export const CREATE_SESSION_URL = (sessionId: string) => {
  return "http://localhost:5299/api/session/create/" + sessionId;
};

export const CHECK_SESSION_URL = (sessionId: string) => {
  return "http://localhost:5299/api/session/check/" + sessionId;
};
