export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url('/img.jpg')", // Adjusted to reference public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "10px",
        minHeight: "90vh",
        color: "#f5f5f5",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay with 60% opacity
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          color: "#f5f5f5",
          textShadow: "3px 3px 5px rgba(0, 0, 0, 0.9)", // Stronger text shadow
          textAlign: "center", // Center text alignment
          maxWidth: "1920px", // Optional: limits text width for readability
          padding: "10px",
        }}
      >
        <p style={{ fontSize: "3.2rem", lineHeight: "1.6", fontWeight: "500" }}>
  <span style={{ color: "#FFD700", fontWeight: "700" }}>Classroom, a place of learning.</span> <br />
  
  <span style={{ fontSize: "2.8rem", fontWeight: "400" }}>
    But much of the time is wasted in 
    <span style={{ fontStyle: "italic", color: "#FF6347" }}>&nbsp;updating attendance</span>, a&nbsp;
    <span style={{ fontWeight: "bold", color: "#FF4500" }}>necessary</span> yet&nbsp;
    <span style={{ textDecoration: "underline", color: "#FF4500" }}>unwanted process</span>.
  </span> <br />
  
  <span style={{ fontSize: "2.6rem", fontWeight: "500", color: "#87CEEB" }}>
    We aim to <span style={{ fontWeight: "bold", color: "#32CD32" }}>automate</span> this process.
  </span> <br />
  
  <span style={{ fontSize: "2.4rem", fontWeight: "400", color: "#00CED1" }}>
    With our <span style={{ fontWeight: "bold", color: "#1E90FF" }}>High-Precision&nbsp;</span> 
    <span style={{ fontWeight: "bold", fontStyle: "italic", color: "#1E90FF" }}>location-based attendance system</span>.
  </span>
</p>

      </div>
    </div>
  );
}
