import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  MapPin,
  ImagePlus,
  User,
  Mail,
  Phone,
  Home,
  Lock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { authApi, complaintApi } from "./api";
import { useAuth } from "./AuthContext";

const CATEGORIES = [
  "Roads",
  "Water Supply",
  "Electricity",
  "Garbage",
  "Drainage",
  "Street Lights",
  "Public Transport",
  "Other",
];
const PRIORITIES = ["Low", "Medium", "High", "Emergency"];
const ROLES = ["Citizen", "Government Officer", "Department Staff"];

export default function RegisterComplaint() {
  const { user, token, login, logout } = useAuth();

  return (
    <section
      id="login"
      style={{
        minHeight: "100vh",
        padding: "120px 8%",
        background: "linear-gradient(135deg,#020617,#0f172a,#111827)",
      }}
    >
      {!user ? (
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: "center",
              fontSize: "48px",
              marginBottom: "12px",
              fontWeight: 800,
              background: "linear-gradient(90deg,#8b5cf6,#3b82f6,#06b6d4)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Login to CivicPulse
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: "center",
              color: "#94a3b8",
              marginBottom: "40px",
              fontSize: "16px",
            }}
          >
            Please log in or create an account to register and submit your complaint.
          </motion.p>
          <AuthCard onAuthed={login} />
        </div>
      ) : (
        <>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: "center",
              fontSize: "54px",
              marginBottom: "60px",
              fontWeight: 800,
              background: "linear-gradient(90deg,#8b5cf6,#3b82f6,#06b6d4)",
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
            <ComplaintForm token={token} user={user} />
            <LoggedInCard user={user} onLogout={logout} />
          </div>
        </>
      )}
    </section>
  );
}

/* ---------------- Complaint Form ---------------- */

function ComplaintForm({ token, user }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: "",
    location: "",
    description: "",
  });
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user || !token) {
      setStatus({
        state: "error",
        message: "Please create an account or log in before submitting a complaint.",
      });
      return;
    }

    if (!form.title || !form.category || !form.priority || !form.location || !form.description) {
      setStatus({ state: "error", message: "Please fill in all required fields." });
      return;
    }

    setStatus({ state: "loading", message: "" });

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      photos.forEach((file) => fd.append("photos", file));

      await complaintApi.create(fd, token);

      setStatus({ state: "success", message: "Complaint submitted successfully!" });
      setForm({ title: "", category: "", priority: "", location: "", description: "" });
      setPhotos([]);
    } catch (err) {
      setStatus({ state: "error", message: err.message || "Failed to submit complaint." });
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      style={card}
    >
      <h2 style={heading}>Complaint Details</h2>

      <Input
        icon={<FileText />}
        placeholder="Issue Title"
        value={form.title}
        onChange={(e) => update("title", e.target.value)}
      />

      <select
        style={select}
        value={form.category}
        onChange={(e) => update("category", e.target.value)}
      >
        <option value="" style={optionStyle}>Select Category</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c} style={optionStyle}>
            {c}
          </option>
        ))}
      </select>

      <select
        style={select}
        value={form.priority}
        onChange={(e) => update("priority", e.target.value)}
      >
        <option value="" style={optionStyle}>Select Priority</option>
        {PRIORITIES.map((p) => (
          <option key={p} value={p} style={optionStyle}>
            {p}
          </option>
        ))}
      </select>

      <Input
        icon={<MapPin />}
        placeholder="Location"
        value={form.location}
        onChange={(e) => update("location", e.target.value)}
      />

      <textarea
        placeholder="Describe your complaint..."
        style={textarea}
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
      />

      <label style={upload}>
        <ImagePlus />
        {photos.length > 0
          ? `${photos.length} photo(s) selected`
          : "Upload Supporting Photos (Optional)"}
        <input
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={(e) => setPhotos(Array.from(e.target.files || []).slice(0, 5))}
        />
      </label>

      <button type="submit" style={button} disabled={status.state === "loading"}>
        {status.state === "loading" ? "Submitting..." : "Submit Complaint"}
      </button>

      <StatusMessage status={status} />
    </motion.form>
  );
}

/* ---------------- Auth Card (Register / Login) ---------------- */

function AuthCard({ onAuthed }) {
  const [mode, setMode] = useState("login"); // "login" | "register"

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={card}>
      <h2 style={heading}>{mode === "login" ? "Login" : "Create Account"}</h2>

      {mode === "login" ? (
        <LoginForm onAuthed={onAuthed} />
      ) : (
        <RegisterForm onAuthed={onAuthed} />
      )}

      <p style={{ textAlign: "center", color: "#94a3b8", marginTop: 25 }}>
        {mode === "login" ? "Need an account?" : "Already have an account?"}
        <span
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          style={{
            color: "#3b82f6",
            marginLeft: 6,
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          {mode === "login" ? "Create Account" : "Login"}
        </span>
      </p>
    </motion.div>
  );
}

function RegisterForm({ onAuthed }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.phone || !form.password) {
      setStatus({ state: "error", message: "Please fill in all required fields." });
      return;
    }
    if (form.password !== form.confirmPassword) {
      setStatus({ state: "error", message: "Passwords do not match." });
      return;
    }

    setStatus({ state: "loading", message: "" });
    try {
      const data = await authApi.register(form);
      onAuthed(data.user, data.token);
      setStatus({ state: "success", message: "Account created!" });
    } catch (err) {
      setStatus({ state: "error", message: err.message || "Registration failed." });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        icon={<User />}
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) => update("fullName", e.target.value)}
      />
      <Input
        icon={<Mail />}
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
      />
      <Input
        icon={<Phone />}
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
      />
      <Input
        icon={<Home />}
        placeholder="Address"
        value={form.address}
        onChange={(e) => update("address", e.target.value)}
      />

      <select style={select} value={form.role} onChange={(e) => update("role", e.target.value)}>
        <option value="" style={optionStyle}>Select Role</option>
        {ROLES.map((r) => (
          <option key={r} value={r} style={optionStyle}>
            {r}
          </option>
        ))}
      </select>

      <Input
        icon={<Lock />}
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => update("password", e.target.value)}
      />
      <Input
        icon={<Lock />}
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) => update("confirmPassword", e.target.value)}
      />

      <button type="submit" style={button} disabled={status.state === "loading"}>
        {status.state === "loading" ? "Creating..." : "Create Account"}
      </button>

      <StatusMessage status={status} />
    </form>
  );
}

function LoginForm({ onAuthed }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setStatus({ state: "error", message: "Please enter email and password." });
      return;
    }

    setStatus({ state: "loading", message: "" });
    try {
      const data = await authApi.login(form);
      onAuthed(data.user, data.token);
      setStatus({ state: "success", message: "Logged in!" });
    } catch (err) {
      setStatus({ state: "error", message: err.message || "Login failed." });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        icon={<Mail />}
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
      />
      <Input
        icon={<Lock />}
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => update("password", e.target.value)}
      />

      <button type="submit" style={button} disabled={status.state === "loading"}>
        {status.state === "loading" ? "Logging in..." : "Login"}
      </button>

      <StatusMessage status={status} />
    </form>
  );
}

/* ---------------- Logged In Card ---------------- */

function LoggedInCard({ user, onLogout }) {
  return (
    <motion.div initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} style={card}>
      <h2 style={heading}>Welcome back</h2>
      <div style={{ color: "#e2e8f0", marginBottom: 18, lineHeight: 1.8 }}>
        <p>
          <strong>Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
      <p style={{ color: "#94a3b8", marginBottom: 25 }}>
        You're logged in. You can now submit complaints on the left — they'll be linked to
        your account.
      </p>
      <button type="button" style={{ ...button, background: "rgba(255,255,255,.08)" }} onClick={onLogout}>
        Log Out
      </button>
    </motion.div>
  );
}

/* ---------------- Shared bits ---------------- */

function StatusMessage({ status }) {
  if (status.state === "idle" || status.state === "loading" || !status.message) return null;
  const isError = status.state === "error";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginTop: 16,
        padding: "12px 16px",
        borderRadius: 12,
        background: isError ? "rgba(239,68,68,.1)" : "rgba(34,197,94,.1)",
        border: `1px solid ${isError ? "rgba(239,68,68,.3)" : "rgba(34,197,94,.3)"}`,
        color: isError ? "#f87171" : "#4ade80",
        fontSize: 14,
      }}
    >
      {isError ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
      {status.message}
    </div>
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

const optionStyle = {
  background: "#0f172a",
  color: "#ffffff",
  padding: "12px",
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
