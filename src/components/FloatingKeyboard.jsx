import { useRef, useState } from "react";

export default function FloatingKeyboard({ value, onChange, onEnter }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const dragRef = useRef(null);

  const keys = [
    ["1","2","3","4","5","6","7","8","9","0"],
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"],
  ];

  const pressKey = (key) => {
    if (key === "BACKSPACE") {
      onChange(value.slice(0, -1));
    } else if (key === "SPACE") {
      onChange(value + " ");
    } else if (key === "ENTER") {
      onEnter?.();
      setOpen(false);
    } else {
      onChange(value + key);
    }
  };

  const startDrag = (e) => {
    const point = e.touches?.[0] || e;
    const rect = e.currentTarget.parentElement.getBoundingClientRect();

    dragRef.current = {
      startX: point.clientX,
      startY: point.clientY,
      startLeft: rect.left,
      startTop: rect.top,
    };

    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const drag = (e) => {
    if (!dragRef.current) return;

    const point = e.touches?.[0] || e;
    const d = dragRef.current;

    setPosition({
      x: Math.max(5, d.startLeft + point.clientX - d.startX),
      y: Math.max(5, d.startTop + point.clientY - d.startY),
    });
  };

  const stopDrag = () => {
    dragRef.current = null;
  };

  const keyStyle = {
    flex: 1,
    height: 42,
    border: "1px solid rgba(255,255,255,.2)",
    borderRadius: 8,
    background: "rgba(255,255,255,.12)",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
  };

  return (
    <>
      {/* NAME INPUT */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setOpen(true)}
        placeholder="Enter your name"
        style={{
          width: "100%",
          padding: "16px 20px",
          borderRadius: 18,
          border: "2px solid #168df0",
          outline: "none",
        }}
      />

      {/* FLOATING KEYBOARD */}
      {open && (
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            width: "min(94vw, 700px)",
            left: position ? position.x : "50%",
            top: position ? position.y : "auto",
            bottom: position ? "auto" : "25px",
            transform: position ? "none" : "translateX(-50%)",
            background: "#102f72",
            border: "2px solid #25d5ff",
            borderRadius: 22,
            padding: 12,
            boxShadow: "0 20px 60px rgba(0,0,0,.4)",
          }}
          onPointerMove={drag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
        >
          {/* DRAG HEADER */}
          <div
            onPointerDown={startDrag}
            style={{
              cursor: "grab",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 12px",
              marginBottom: 8,
              background: "rgba(255,255,255,.1)",
              borderRadius: 12,
              color: "white",
              fontWeight: 800,
              userSelect: "none",
            }}
          >
            <span>ON-SCREEN KEYBOARD</span>

            <button
              onClick={() => setOpen(false)}
              style={{
                width: 32,
                height: 32,
                border: 0,
                borderRadius: "50%",
                background: "rgba(255,255,255,.15)",
                color: "white",
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          {/* KEYS */}
          {keys.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                gap: 6,
                marginBottom: 6,
              }}
            >
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => pressKey(key)}
                  style={keyStyle}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}

          {/* BOTTOM ROW */}
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => pressKey("BACKSPACE")}
              style={{ ...keyStyle, flex: 1.5 }}
            >
              ⌫ BACKSPACE
            </button>

            <button
              onClick={() => pressKey("SPACE")}
              style={{ ...keyStyle, flex: 4 }}
            >
              SPACE
            </button>

            <button
              onClick={() => pressKey("ENTER")}
              style={{
                ...keyStyle,
                flex: 1.5,
                background: "linear-gradient(90deg,#08cfff,#1764ff)",
              }}
            >
              ENTER ↵
            </button>
          </div>
        </div>
      )}
    </>
  );
}