import { motion } from "framer-motion";
import {
  FileText,
  MapPin,
  AlertTriangle,
  ImagePlus,
  User,
  Mail,
  Phone,
  Home,
  Users,
  Lock,
} from "lucide-react";

export default function RegisterComplaint() {
  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "120px 8%",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#111827)",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: "center",
          fontSize: "54px",
          marginBottom: "60px",
          fontWeight: 800,
          background:
            "linear-gradient(90deg,#8b5cf6,#3b82f6,#06b6d4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Register & Submit Complaint
      </motion.h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))",
          gap: "40px",
        }}
      >
        {/* Complaint Form */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          style={card}
        >
          <h2 style={heading}>Complaint Details</h2>

          <Input icon={<FileText />} placeholder="Issue Title" />

          <select style={select}>
            <option>Select Category</option>
            <option>Roads</option>
            <option>Water Supply</option>
            <option>Electricity</option>
            <option>Garbage</option>
            <option>Drainage</option>
            <option>Street Lights</option>
            <option>Public Transport</option>
            <option>Other</option>
          </select>

          <select style={select}>
            <option>Select Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Emergency</option>
          </select>

          <Input icon={<MapPin />} placeholder="Location" />

          <textarea
            placeholder="Describe your complaint..."
            style={textarea}
          />

          <label style={upload}>
            <ImagePlus />
            Upload Supporting Photos (Optional)
            <input type="file" multiple hidden />
          </label>

          <button style={button}>Submit Complaint</button>
        </motion.div>

        {/* Register Form */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          style={card}
        >
          <h2 style={heading}>Create Account</h2>

          <Input icon={<User />} placeholder="Full Name" />

          <Input icon={<Mail />} placeholder="Email Address" />

          <Input icon={<Phone />} placeholder="Phone Number" />

          <Input icon={<Home />} placeholder="Address" />

          <select style={select}>
            <option>Select Role</option>
            <option>Citizen</option>
            <option>Government Officer</option>
            <option>Department Staff</option>
          </select>

          <Input
            icon={<Lock />}
            type="password"
            placeholder="Password"
          />

          <Input
            icon={<Lock />}
            type="password"
            placeholder="Confirm Password"
          />

          <button style={button}>Create Account</button>

          <p
            style={{
              textAlign: "center",
              color: "#94a3b8",
              marginTop: 25,
            }}
          >
            Already have an account?
            <span
              style={{
                color: "#3b82f6",
                marginLeft: 6,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Login
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Input({ icon, ...props }) {
  return (
    <div style={inputBox}>
      {icon}
      <input
        {...props}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "16px",
          outline: "none",
        }}
      />
    </div>
  );
}

const card = {
  background: "rgba(255,255,255,.05)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "25px",
  padding: "40px",
};

const heading = {
  color: "white",
  marginBottom: "30px",
  fontSize: "30px",
};

const inputBox = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "15px",
  padding: "16px",
  color: "#3b82f6",
  marginBottom: "18px",
};

const select = {
  width: "100%",
  padding: "16px",
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "15px",
  color: "white",
  marginBottom: "18px",
};

const textarea = {
  width: "100%",
  height: "140px",
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "15px",
  color: "white",
  padding: "16px",
  resize: "none",
  marginBottom: "18px",
};

const upload = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "18px",
  border: "2px dashed #3b82f6",
  borderRadius: "15px",
  color: "#3b82f6",
  cursor: "pointer",
  marginBottom: "25px",
};

const button = {
  width: "100%",
  padding: "18px",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  color: "white",
  fontWeight: 700,
  fontSize: "16px",
  background: "linear-gradient(90deg,#8b5cf6,#2563eb)",
};