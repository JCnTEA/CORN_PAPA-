
import { useState } from 'react';

export default function Login() {
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      localStorage.setItem('tesla_token', token);
      window.location.href = '/public';
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>如何取得 Tesla API Token</h2>
      <ol style={{ textAlign: 'left', display: 'inline-block', textAlign: 'left', marginBottom: '20px' }}>
        <li>1. 前往 <a href="https://www.teslafi.com/signup.php" target="_blank" rel="noopener noreferrer">TeslaFi</a> 註冊並登入 Tesla 帳號。</li>
        <li>2. 進入 "Account -> Tesla API Token" 頁面。</li>
        <li>3. 複製 Access Token 並貼上下方欄位。</li>
      </ol>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="請貼上 Tesla API Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
        />
        <br />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>確認授權</button>
      </form>
    </div>
  );
}
