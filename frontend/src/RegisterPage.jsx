import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, LoaderCircle, UserRound, X } from 'lucide-react'
import { useAuth } from './AppContext'
import { formatPhone, isCompletePhone, PHONE_PREFIX } from './phone'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', phone: PHONE_PREFIX, password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const update = event => setForm({ ...form, [event.target.name]: event.target.value })
  const submit = event => {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Введите имя'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Введите корректный email'
    if (!isCompletePhone(form.phone)) next.phone = 'Формат: +996 555 123 456'
    if (form.password.length < 6) next.password = 'Минимум 6 символов'
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true)
    window.setTimeout(() => { setLoading(false); login({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() }); navigate('/') }, 900)
  }
  return <section className="auth-page section-light section-pad"><div className="auth-form-card"><div className="auth-mark"><UserRound size={20} /></div><div className="eyebrow orange-label">OKURMEN_STORE</div><h1>Создай аккаунт.</h1><p>Сохраняй курсы, товары и свои заказы в одном месте.</p><form onSubmit={submit} noValidate>{[['name', 'Имя', 'Как тебя зовут?'], ['email', 'Email', 'you@example.com'], ['phone', 'Телефон', PHONE_PREFIX], ['password', 'Пароль', 'Минимум 6 символов']].map(([name, label, placeholder]) => <label key={name}>{label}<input name={name} type={name === 'password' ? 'password' : name === 'email' ? 'email' : 'text'} value={form[name]} onChange={event => name === 'phone' ? setForm({ ...form, phone: formatPhone(event.target.value) }) : update(event)} placeholder={placeholder} maxLength={name === 'phone' ? 16 : undefined} inputMode={name === 'phone' ? 'tel' : undefined} />{errors[name] && <em className="form-error">{errors[name]}</em>}</label>)}<button className="primary-btn full" disabled={loading}>{loading ? <><LoaderCircle className="spin" size={17} /> Создаём...</> : <>Зарегистрироваться <ArrowRight size={17} /></>}</button></form></div>{success && <div className="success-backdrop"><div className="success-modal"><button className="modal-close" onClick={() => setSuccess(false)} aria-label="Закрыть"><X size={18} /></button><div className="success-icon"><Check size={29} /></div><div className="eyebrow orange-label">OKURMEN_STORE</div><h2>Регистрация завершена!</h2><p>Аккаунт создан. Добро пожаловать в Okurmen_Store.</p><button className="primary-btn" onClick={() => setSuccess(false)}>Понятно <ArrowRight size={16} /></button></div></div>}</section>
}
