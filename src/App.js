import React, { useState, useEffect } from "react";
import { Upload, RefreshCw, Settings } from "lucide-react";

export default function RandomNumbersApp() {
  const [numbers, setNumbers] = useState(generateRandomNumbers());
  const [isRolling, setIsRolling] = useState(false);
  const [background, setBackground] = useState(null);
  const [videoBackground, setVideoBackground] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function generateRandomNumbers() {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 100));
  }

  function startRolling() {
    setIsRolling(true);
    let interval = setInterval(() => {
      setNumbers(generateRandomNumbers());
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setNumbers(generateRandomNumbers());
      setIsRolling(false);
    }, 2000);
  }

  function handleFileChange(event, type) {
    const file = event.target.files[0];
    if (!file) return;

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const validVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (type === "image" && !validImageTypes.includes(file.type)) {
      alert("Vui lòng chọn một file ảnh hợp lệ (JPEG, PNG, GIF).");
      return;
    }

    if (type === "video" && !validVideoTypes.includes(file.type)) {
      alert("Vui lòng chọn một file video hợp lệ (MP4, WEBM, OGG).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === "image") {
        setBackground(e.target.result);
        setVideoBackground(null);
      } else if (type === "video") {
        setVideoBackground(e.target.result);
        setBackground(null);
      }
    };
    reader.readAsDataURL(file);
  }

  if (showSettings) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e5e7eb",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Cài đặt
        </h2>

        <button
          style={{
            padding: "12px",
            backgroundColor: "#374151",
            color: "white",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "1rem",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => document.getElementById("bgImageInput").click()}
        >
          <Upload size={18} /> Chọn ảnh nền
        </button>
        <input
          type="file"
          id="bgImageInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e, "image")}
        />

        <button
          style={{
            padding: "12px",
            backgroundColor: "#1d4ed8",
            color: "white",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "1rem",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => document.getElementById("bgVideoInput").click()}
        >
          <Upload size={18} /> Chọn video nền
        </button>
        <input
          type="file"
          id="bgVideoInput"
          accept="video/*"
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e, "video")}
        />

        <button
          style={{
            padding: "12px",
            backgroundColor: "#dc2626",
            color: "white",
            borderRadius: "999px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => setShowSettings(false)}
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {videoBackground && (
        <video
          src={videoBackground}
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
      )}

      {background && !videoBackground && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          height: "100vh",
        }}
      >
        {numbers.map((num, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              width: 80,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
              fontSize: 20,
              fontWeight: "bold",
              transform: isRolling ? "scale(1.2)" : "scale(1)",
            }}
          >
            {num}
          </div>
        ))}
      </div>

      <button
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          opacity: 0.5,
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setShowSettings(true)}
      >
        <Settings size={20} /> Cài đặt
      </button>

      <button
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "1.5rem",
          padding: "16px",
          backgroundColor: "#1d4ed8",
          color: "white",
          borderRadius: "999px",
          cursor: isRolling ? "not-allowed" : "pointer",
          opacity: isRolling ? 0.7 : 1,
        }}
        onClick={startRolling}
        disabled={isRolling}
      >
        <RefreshCw size={20} /> {isRolling ? "Đang quay..." : "Random số"}
      </button>
    </div>
  );
}
