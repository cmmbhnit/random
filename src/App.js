import React, { useState } from "react";
import { Upload, RefreshCw, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function RandomNumbersApp() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [number, setNumber] = useState(generateRandomNumber(min, max));
  const [digits, setDigits] = useState(padDigits(number, max));
  const [isRolling, setIsRolling] = useState(false);
  const [background, setBackground] = useState(null);
  const [videoBackground, setVideoBackground] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [explosions, setExplosions] = useState([]);
  const [timeOutRandom, setTimeOutRandom] = useState(5000)

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function padDigits(num, max) {
    let maxLength = max.toString().length;
    let digitsArray = num.toString().split("").map(Number);
    while (digitsArray.length < maxLength) {
      digitsArray.unshift(0);
    }
    return digitsArray;
  }

  function startRolling() {
    setIsRolling(true);
    let interval = setInterval(() => {
      const newNumber = generateRandomNumber(min, max);
      setNumber(newNumber);
      setDigits(padDigits(newNumber, max));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalNumber = generateRandomNumber(min, max);
      setNumber(finalNumber);
      setDigits(padDigits(finalNumber, max));
      setIsRolling(false);
      triggerExplosion();
    }, timeOutRandom);
  }

  function triggerExplosion() {
    let newExplosions = [];
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      for (let j = 0; j < 15; j++) {
        newExplosions.push({
          id: `${i}-${j}`,
          x,
          y,
          angle: Math.random() * 360,
          color: ["black", "red", "yellow"][Math.floor(Math.random() * 3)],
          delay: Math.random() * 0.5,
        });
      }
    }
    setExplosions(newExplosions);
    setTimeout(() => setExplosions([]), 1500);
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
        <div
          style={{
            position: "absolute", // Center it using absolute positioning
            top: "30%", // Vertically centered
            left: "50%", // Horizontally centered
            transform: "translate(-50%, -50%)", // Adjust for element size
            display: "flex",
            gap: "16px", // Space between inputs
            padding: "16px", // Padding around the input container
            backgroundColor: "#f3f4f6", // Light gray background for contrast
            borderRadius: "12px", // Rounded corners for a modern look
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          }}
        >
          <div style={{ alignContent: 'center' }}>Thời gian quay:</div>
          <input
            type="number"
            value={timeOutRandom}
            onChange={(e) => setTimeOutRandom(Number(e.target.value))}
            placeholder="Timeout"
            style={{
              padding: "12px 16px", // Add padding for a better click area
              border: "1px solid #d1d5db", // Light border
              borderRadius: "8px", // Rounded corners
              fontSize: "1rem", // Modern font size
              outline: "none", // Remove default focus outline
              boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)", // Inner shadow for depth
              transition: "border-color 0.3s ease", // Smooth transition for focus
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")} // Highlight on focus
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")} // Reset on blur
          />
          <div style={{ alignContent: 'center' }}>Min:</div>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            placeholder="Min"
            style={{
              padding: "12px 16px", // Add padding for a better click area
              border: "1px solid #d1d5db", // Light border
              borderRadius: "8px", // Rounded corners
              fontSize: "1rem", // Modern font size
              outline: "none", // Remove default focus outline
              boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)", // Inner shadow for depth
              transition: "border-color 0.3s ease", // Smooth transition for focus
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")} // Highlight on focus
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")} // Reset on blur
          />
          <div style={{ alignContent: 'center' }}>Max:</div>

          <input
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            placeholder="Max"
            style={{
              padding: "12px 16px", // Add padding for a better click area
              border: "1px solid #d1d5db", // Light border
              borderRadius: "8px", // Rounded corners
              fontSize: "1rem", // Modern font size
              outline: "none", // Remove default focus outline
              boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)", // Inner shadow for depth
              transition: "border-color 0.3s ease", // Smooth transition for focus
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")} // Highlight on focus
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")} // Reset on blur
          />
        </div>

        <button
          style={{
            padding: "12px",
            backgroundColor: "#374151",
            color: "white",
            borderRadius: "10px",
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
            borderRadius: "10px",
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
            borderRadius: "10px",
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

    <div>
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
        {explosions.map((explosion) => (
          <motion.div
            key={explosion.id}
            initial={{ opacity: 1, x: explosion.x, y: explosion.y, scale: 0 }}
            animate={{
              opacity: 0,
              x: explosion.x + Math.cos(explosion.angle) * 100,
              y: explosion.y + Math.sin(explosion.angle) * 100,
              scale: 1.5,
            }}
            transition={{ duration: 1, delay: explosion.delay }}
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              backgroundColor: explosion.color,
              borderRadius: "50%",
            }}
          />
        ))}

        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", gap: "16px" }}
        >
          {digits.map((digit, index) => (
            <motion.div
              key={index}
              animate={{ scale: isRolling ? 1.2 : 1 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: "fantasy",
                backgroundColor: "white",
                width: 150,
                height: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
                fontSize: 45,
                fontWeight: "bold",
                margin: 50,
              }}
            >
              {digit}
            </motion.div>
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
            fontFamily: "fantasy",
          }}
          onClick={() => setShowSettings(true)}
        >
          <Settings size={20} /> Cài đặt
        </button>

        <button
          style={{
            position: "absolute", // Use absolute positioning
            top: "70%", // Center vertically
            left: "50%", // Center horizontally
            transform: "translate(-50%, -50%)", // Offset by half its width and height
            padding: "16px 24px",
            backgroundColor: "rgb(225, 37, 78)",
            color: "white",
            borderRadius: "10px",
            cursor: isRolling ? "not-allowed" : "pointer",
            opacity: isRolling ? 0.7 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontWeight: "bold",
            fontSize: "1rem",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
          }}
          onClick={startRolling}
          disabled={isRolling}
        >
          <RefreshCw size={50} /> {isRolling ? "Đang quay..." : "Random số"}
        </button>




      </div>
      <script
        src="https://app.preny.ai/embed-global.js"
        data-button-style="width:200px;height:200px"
        async
        defer
        data-preny-bot-id="67c8f3459998359a7fac9e67"
      ></script>
    </div>

  );
}
