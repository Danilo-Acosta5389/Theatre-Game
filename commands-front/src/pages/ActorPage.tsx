import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { BASE } from "../API/URLS";

export default function ActorPage() {
  const { roleName } = useParams({ from: "/actor/$roleName" });
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [selectedLang, setSelectedLang] = useState<string>(
    navigator.language || "en-US"
  );
  const [receivedMsgs, setReceivedMsgs] = useState<string[]>([]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      console.log(availableVoices);
      setVoices(availableVoices);
      if (!selectedVoice && availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // 🔁 When language changes, pick a default voice for that language
  useEffect(() => {
    if (!voices.length) return;
    const langVoices = voices.filter((v) => v.lang === selectedLang);
    if (langVoices.length > 0) {
      setSelectedVoice(langVoices[0]);
    } else {
      // fallback: first available voice
      setSelectedVoice(voices[0]);
    }
  }, [selectedLang, voices]);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(BASE)
      .withAutomaticReconnect()
      .build();

    conn.start().then(() => {
      conn.invoke("RegisterRole", roleName);
    });

    conn.on("ReceiveInstruction", (msg) => {
      setReceivedMsgs((prev) => [...prev, msg]);
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = selectedLang;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Stop any ongoing speech before speaking new message
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    });

    return () => {
      conn.stop();
    };
  }, [roleName, selectedVoice, selectedLang]);

  return (
    <div style={{ padding: 20 }}>
      <span className=" mb-2.5">
        <strong>Actor: </strong>
        {roleName}
      </span>
      <div style={{ marginBottom: 10 }}>
        <label>
          <strong>Language: </strong>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className=" bg-black"
          >
            {Array.from(new Set(voices.map((v) => v.lang))).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          <strong>Voice: </strong>
          <select
            value={selectedVoice?.name || ""}
            className=" bg-black"
            onChange={(e) =>
              setSelectedVoice(
                voices.find((v) => v.name === e.target.value) ?? null
              )
            }
          >
            {voices
              .filter((v) => v.lang === selectedLang)
              .map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name}
                </option>
              ))}
          </select>
        </label>
      </div>
      {receivedMsgs.length > 0 && (
        <div>
          <strong>Received Instructions:</strong>
          <ul className=" p-2">
            {receivedMsgs.map((msg, index) => (
              <li
                className=" border-white border-2 rounded-lg w-fit bg-slate-800 mt-2 p-2"
                key={index}
              >
                {msg}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
