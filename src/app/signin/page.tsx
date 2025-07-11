"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    if (!username || !password) {
      alert("Kullanıcı adı ve şifre boş bırakılamaz.");
      return;
    }

    const usersJSON = localStorage.getItem("users");
    const users: { username: string; password: string }[] = usersJSON
      ? JSON.parse(usersJSON)
      : [];

    const matchedUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      alert("Giriş başarılı!");
      router.push("/game");
        // oyuna yönlendirecem dir game


    } else {
      alert("Kullanıcı adı veya şifre hatalı.");
    }
  };

  const backSignUp = () => {
    router.push("/signup");
  };

   return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>GİRİŞ YAP</h1>

        <div className={styles.formGroup}>
          <label>Kullanıcı Adı:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Şifre:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label>Şifreyi Göster</label>
        </div>

        <button className={styles.button} onClick={handleSignIn}>
          Giriş Yap
        </button>

        <button className={styles.linkButton} onClick={backSignUp}>
          Hesabınız yok mu? Kayıt Ol
        </button>
      </div>
    </div>
  );
}