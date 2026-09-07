import { useState } from 'react'
import { ArrowRight, Check, LoaderCircle, UserRound, X } from 'lucide-react'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const update = event => setForm({ ...form, [event.target.name]: event.target.value })
  const submit = event => {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Введите имя'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Введите корректный email'
    if (!/^\+996\s?\d{3}\s?\d{3}\s?\d{3}$/.test(form.phone.trim())) next.phone = 'Формат: +996 555 123 456'
    if (form.password.length < 6) next.password = 'Минимум 6 символов'
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true)
    window.setTimeout(() => { setLoading(false); setSuccess(true) }, 900)
  }
  return <section className="auth-page section-light section-pad"><div className="auth-form-card"><div className="auth-mark"><UserRound size={20} /></div><div className="eyebrow orange-label">OKURMEN ACCOUNT</div><h1>Создай аккаунт.</h1><p>Сохраняй курсы, товары и свои заказы в одном месте.</p><form onSubmit={submit} noValidate>{[['name', 'Имя', 'Как тебя зовут?'], ['email', 'Email', 'you@example.com'], ['phone', 'Телефон', '+996 555 123 456'], ['password', 'Пароль', 'Минимум 6 символов']].map(([name, label, placeholder]) => <label key={name}>{label}<input name={name} type={name === 'password' ? 'password' : name === 'email' ? 'email' : 'text'} value={form[name]} onChange={update} placeholder={placeholder} />{errors[name] && <em className="form-error">{errors[name]}</em>}</label>)}<button className="primary-btn full" disabled={loading}>{loading ? <><LoaderCircle className="spin" size={17} /> Создаём...</> : <>Зарегистрироваться <ArrowRight size={17} /></>}</button></form></div>{success && <div className="success-backdrop"><div className="success-modal"><button className="modal-close" onClick={() => setSuccess(false)} aria-label="Закрыть"><X size={18} /></button><div className="success-icon"><Check size={29} /></div><h2>Регистрация завершена!</h2><p>Аккаунт создан. Добро пожаловать в Okurmen IT-PC.</p><button className="primary-btn" onClick={() => setSuccess(false)}>Понятно <ArrowRight size={16} /></button></div></div>}</section>
}
