"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const backSignin = () => {
    router.push("/signin");
  };

  const hangleSignup = () => {
    if (!username || !password) {
      alert("Kullanıcı adı ve şifre boş bırakılamaz.");
      return;
    }

    const usersJSON = localStorage.getItem("users");
    const users: { username: string; password: string }[] = usersJSON
      ? JSON.parse(usersJSON)
      : [];

    if (users.some((user) => user.username === username)) {
      alert("Bu kullanıcı adı zaten alınmış.");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Kayıt başarılı!");
    router.push("/signin");
  };

  return (
    <div>
      <h1>KAYIT OL</h1>
      <div>
        <label>Kullanıcı Adı:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Şifre:</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Şifreyi Göster
        </label>
      </div>
      <button onClick={hangleSignup}>Kayıt Ol</button>
      <br />
      <button onClick={backSignin}>Hesabınız var mı? Giriş Yap</button>
    </div>
  );
}
