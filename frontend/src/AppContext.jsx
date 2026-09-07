import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translateRenderedPage } from './i18n'

const LanguageContext = createContext(null)
const AuthContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => localStorage.getItem('okurmen-language') || 'RU')
  const setLanguage = value => setLanguageState(value === 'KG' ? 'KG' : 'RU')
  useEffect(() => {
    localStorage.setItem('okurmen-language', language)
    document.documentElement.lang = language === 'KG' ? 'ky' : 'ru'
    let timer
    const apply = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => translateRenderedPage(language), 0)
    }
    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => { window.clearTimeout(timer); observer.disconnect() }
  }, [language])
  const value = useMemo(() => ({ language, setLanguage }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider')
  return value
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('okurmen-user') || 'null') } catch { return null }
  })
  const login = nextUser => {
    setUser(nextUser)
    localStorage.setItem('okurmen-user', JSON.stringify(nextUser))
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem('okurmen-user')
  }
  const value = useMemo(() => ({ user, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
