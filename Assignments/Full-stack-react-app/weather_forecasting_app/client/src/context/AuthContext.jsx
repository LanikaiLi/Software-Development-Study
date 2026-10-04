import { createContext, useContext, useState } from 'react';

// 1. 用 createContext 建一块公告板，叫 AuthContext
const AuthContext = createContext(null);

// 2. Provider：把数据放到公告板上
export function AuthProvider({ children }) {
  // 2. 用 useState 建一个 token
  //    初始值：localStorage.getItem('token')
  const [token, setToken] = useState(localStorage.getItem('token'))

  // 3. 写一个函数 login(newToken)：
  //    - localStorage.setItem('token', newToken)
  //    - setToken(newToken)
  function login(newToken) {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  // 4. 写一个函数 logout()：
  //    - localStorage.removeItem('token')
  //    - setToken(null)
  function logout() {
    localStorage.removeItem('token')
    setToken(null)
  }
  // 5. 返回 <AuthContext.Provider value={{ ... }}>，包住 {children}
  //    value 里放：token、login、logout
  return (
    <AuthContext.Provider value = {{token, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

// 6. 导出一个函数 useAuth，返回 useContext(AuthContext)
export function useAuth() {
    return useContext(AuthContext)
}