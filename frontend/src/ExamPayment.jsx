import { useState } from 'react'
import { ArrowRight, Banknote, Check, CreditCard, LoaderCircle, ShieldCheck, ShoppingCart, WalletCards, X } from 'lucide-react'
import { ADDRESS_RU } from './i18n'

const examOrders = [
  'Курс Frontend · 119 000 сом', 'Курс Backend · 119 000 сом', 'Курс Flutter · 119 000 сом',
  'Acer Nitro V 15 · 89 900 сом', 'Okurmen Forge M1 · 104 900 сом', 'Lenovo LOQ 15 · 119 900 сом',
  'ASUS TUF Gaming A15 · 124 900 сом', 'HP Victus 16 · 129 900 сом', 'MacBook Air M3 · 139 900 сом',
  'ASUS ROG Strix G16 · 189 900 сом', 'MSI Raider GE78 · 279 900 сом', 'Okurmen Study S1 · 54 900 сом',
  'Okurmen Creator C2 · 84 900 сом', 'Okurmen Gaming G3 · 129 900 сом', 'Okurmen Pro P4 · 179 900 сом',
  'Okurmen Render R5 · 249 900 сом', 'Okurmen Elite E7 · 389 900 сом', 'Okurmen Compact M2 · 114 900 сом'
]
const banks = [{ name: 'MBANK', label: 'Мбанк', className: 'mbank', mark: 'M' }, { name: 'O! Bank', label: 'О!Банк', className: 'obank', mark: 'O!' }, { name: 'Optima', label: 'Оптима Банк', className: 'optima', mark: 'O' }]

function SuccessModal({ onClose }) {
  return <div className="success-backdrop" role="dialog" aria-modal="true"><div className="success-modal"><button className="modal-close" onClick={onClose} aria-label="Закрыть"><X size={18} /></button><div className="success-icon"><Check size={29} /></div><div className="eyebrow orange-label">OKURMEN IT-PC</div><h2>Заказ успешно принят!</h2><p>Менеджер свяжется с вами в ближайшее время и подтвердит детали заказа.</p><button className="primary-btn" onClick={onClose}>Понятно <ArrowRight size={16} /></button></div></div>
}

export default function ExamPayment() {
  const [order, setOrder] = useState('')
  const [method, setMethod] = useState('card')
  const [bank, setBank] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const selectedBank = banks.find(item => item.name === bank)
  const qr = selectedBank ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`Okurmen IT-PC|${selectedBank.name}|+996 708 436 331|Байыш.Б|${order}`)}` : ''
  const validate = () => {
    const next = {}
    if (!order) next.order = 'Выберите курс или товар'
    if (!name.trim()) next.name = 'Введите имя'
    if (!/^\+996\s?\d{3}\s?\d{3}\s?\d{3}$/.test(phone.trim())) next.phone = 'Формат: +996 555 123 456'
    if (method === 'bank' && !bank) next.bank = 'Выберите банк'
    setErrors(next)
    return Object.keys(next).length === 0
  }
  const submit = event => { event.preventDefault(); if (!validate()) return; setLoading(true); window.setTimeout(() => { setLoading(false); setSuccess(true) }, 900) }
  return <section className="payment-page section-light section-pad"><div className="page-intro"><div className="eyebrow">03 / ЗОНА ОПЛАТЫ</div><h1>Оплата без<br /><span>лишних шагов.</span></h1><p>Выберите одну позицию, заполните контакты и подтвердите заказ.</p></div><div className="payment-layout"><form className="checkout-card" onSubmit={submit} noValidate><div className="checkout-title"><ShoppingCart size={18} /><b>Выбор заказа</b></div><label>Курс или товар<select value={order} onChange={event => setOrder(event.target.value)}><option value="">Выберите одну позицию</option>{examOrders.map(item => <option key={item}>{item}</option>)}</select>{errors.order && <em className="form-error">{errors.order}</em>}</label><label>Ваше имя<input value={name} onChange={event => setName(event.target.value)} placeholder="Как к вам обращаться?" />{errors.name && <em className="form-error">{errors.name}</em>}</label><label>Номер телефона<input value={phone} onChange={event => setPhone(event.target.value)} placeholder="+996 555 123 456" inputMode="tel" />{errors.phone && <em className="form-error">{errors.phone}</em>}</label><div className="payment-methods"><b>Способ оплаты</b><button type="button" className={method === 'card' ? 'selected' : ''} onClick={() => { setMethod('card'); setBank('') }}><span className="radio">{method === 'card' && <Check size={12} />}</span><CreditCard size={18} />Банковская карта</button><button type="button" className={method === 'bank' ? 'selected' : ''} onClick={() => setMethod('bank')}><span className="radio">{method === 'bank' && <Check size={12} />}</span><Banknote size={18} />Через приложение банка</button></div>{method === 'bank' && <div className="bank-choice"><b>Выберите банк</b><div className="bank-choice-grid">{banks.map(item => <button type="button" className={`bank-choice-card ${item.className} ${bank === item.name ? 'selected' : ''}`} onClick={() => { setBank(item.name); setErrors({ ...errors, bank: '' }) }} key={item.name}><span className="bank-mark">{item.mark}</span><strong>{item.name}</strong><small>{item.label}</small></button>)}</div>{errors.bank && <em className="form-error">{errors.bank}</em>}{selectedBank && <div className="payment-requisites"><div><b>{selectedBank.name}</b><span>Получатель: Байыш.Б</span><strong>+996 708 436 331</strong><small>{ADDRESS_RU}</small></div><img className="payment-qr" src={qr} alt="QR-код для оплаты" /></div>}</div>}<button className="primary-btn full submit-btn" type="submit" disabled={loading}>{loading ? <><LoaderCircle className="spin" size={17} /> Проверяем данные...</> : <>Подтвердить заказ <ArrowRight size={17} /></>}</button></form><div className="bank-box payment-banks"><div className="bank-box-head"><span>БЕЗОПАСНАЯ ОПЛАТА</span><ShieldCheck size={17} /><span className="secure">Защищённый платёж</span></div><p className="payment-hint">Карта или перевод через приложение банка. Получатель: Байыш.Б.</p><div className="bank-foot"><WalletCards size={18} /><span>Visa · Mastercard · Элкарт</span></div></div></div>{success && <SuccessModal onClose={() => setSuccess(false)} />}</section>
}
