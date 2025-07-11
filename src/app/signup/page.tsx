"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

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
  <div className={styles.container}>
    <div className={styles.formWrapper}>
      <h1 className={styles.heading}>KAYIT OL</h1>

      <div className={styles.formGroup}>
        <label className={styles.label}>Kullanıcı Adı:</label>
        <input
          className={styles.input}
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Şifre:</label>
        <input
          className={styles.input}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.checkboxGroup}>
        <input
          className={styles.input}
          type="checkbox"
          checked={showPassword}
          onChange={e => setShowPassword(e.target.checked)}
        />
        <label className={styles.label}>Şifreyi Göster</label>
      </div>

      <button className={styles.button} onClick={hangleSignup}>
        Kayıt Ol
      </button>

      <button className={styles.linkButton} onClick={backSignin}>
        Hesabınız var mı? Giriş Yap
      </button>
    </div>
  </div>
);
}
