# 🎭 Theatre Commands App

A real-time interactive theatre platform where **actors** and **audiences** connect live.  
Actors can create and perform roles, while the audience sends them instructions in real-time — all powered by **SignalR** and **Speech Synthesis**.

---

## 🧩 Project Overview

This project is split into two main parts:

1. **Frontend** – built with React + TypeScript using TanStack Router for routing.
2. **Backend** – an ASP.NET Core SignalR hub managing real-time communication between actors and audiences.

The app enables multiple actors and audience members to interact in real-time:
- **Actors** create roles (`/actor/mailman`) and receive spoken instructions.
- **Audience members** can select an active role and send instructions.
- Both sides see chat-like message boxes displaying sent and received messages.

---

## ⚙️ Tech Stack

### Frontend
| Category | Technology |
|-----------|-------------|
| Framework | React (TypeScript) |
| Router | [TanStack Router](https://tanstack.com/router) |
| Realtime | [SignalR JS Client (`@microsoft/signalr`)](https://www.npmjs.com/package/@microsoft/signalr) |
| Styling | Tailwind CSS |
| Speech | Web Speech API (`speechSynthesis`) |
| State | React Hooks (`useState`, `useEffect`) |

### Backend
| Category | Technology |
|-----------|-------------|
| Framework | ASP.NET Core 8 |
| Realtime | SignalR Hub |
| Language | C# |
| Server | Kestrel (can also be proxied via Nginx) |

---

## 🧠 App Structure

### **Frontend Pages**

#### `/actor/`
Actors start here to create a new role.  
They enter a name and are redirected to `/actor/{roleName}`.

#### `/actor/{roleName}`
Once a role is created, the actor:
- Joins a SignalR group matching the role name.
- Receives live messages from the audience via SignalR.
- Hears those messages spoken aloud using **Speech Synthesis**.
- Can choose **voice** and **language**, which defaults to the browser language.
- Sees all received messages displayed like chat bubbles.

#### `/audience/`
Audience members see a live list of active roles currently created by actors.  
This list updates automatically whenever an actor connects or disconnects.

#### `/audience/{roleName}`
Audience members can:
- Type and send text messages to the selected role.
- See their sent messages displayed on screen.
- Send multiple instructions in real time.

---

## 🗄️ Backend Overview (`TheatreHub.cs`)

### Main Responsibilities
- Register actor roles (`RegisterRole`)
- Maintain a list of active roles
- Send audience messages to specific actor groups
- Broadcast active role list updates to all clients
- Handle disconnections gracefully

### SignalR Methods

| Method | Description |
|--------|--------------|
| `RegisterRole(string roleName)` | Adds an actor connection to a SignalR group and updates the active roles list. |
| `GetActiveRoles()` | Returns a list of currently active roles. |
| `SendInstruction(string roleName, string message)` | Sends a message to all clients in the specified role group (i.e., the actor). |
| `OnDisconnectedAsync()` | Removes the actor from active roles and updates all clients. |

---

## 🔊 Speech Synthesis

Actors' browsers use the **Web Speech API** to read instructions aloud.  
They can dynamically change:
- **Language** (`navigator.language` by default)
- **Voice** (available options filtered per selected language)

Each new instruction triggers:
1. Speech synthesis cancellation (to avoid overlap)
2. A new utterance read in the chosen voice & language

---

## 💻 Running the App Locally

### Backend (.NET)
```bash
cd backend
dotnet restore
dotnet run
