import { useState } from 'react'
import Site from './site'
import {
  ArrowRight, BadgeCheck, BatteryCharging, BookOpen, BrainCircuit, Check, ChevronDown,
  ChevronRight, Clock3, Code2, Cpu, Gamepad2, Globe2, GraduationCap, Laptop,
  Layers3, LockKeyhole, MapPin, Menu, Monitor, MousePointer2, Package, Phone,
  Play, Router, Search, ShieldCheck, ShoppingCart, Sparkles, Star, Terminal,
  UserRound, UsersRound, WalletCards, X, Zap
} from 'lucide-react'

/* Legacy single-page implementation retained below for reference. */
const courses = [
  { icon: Code2, tone: 'orange', title: 'Python Start', text: 'Программирование с нуля до первых проектов и алгоритмов.', duration: '3 месяца', hours: '72 часа', price: '8 900', tag: 'Самый популярный' },
  { icon: Globe2, tone: 'blue', title: 'Frontend Lab', text: 'HTML, CSS, JavaScript и React — собираем реальные сайты.', duration: '4 месяца', hours: '96 часов', price: '11 900', tag: 'В тренде' },
  { icon: MousePointer2, tone: 'violet', title: 'UI/UX & Figma', text: 'Дизайн интерфейсов, прототипы и сильное портфолио.', duration: '2 месяца', hours: '48 часов', price: '7 900', tag: 'Для творческих' }
]

const products = [
  { type: 'laptop', name: 'Acer Nitro V 15', spec: 'i5 · RTX 4050 · 16 GB · 512 GB', price: '89 900', old: '96 500', badge: 'Хит продаж', accent: 'cyan' },
  { type: 'pc', name: 'Okurmen Forge M1', spec: 'Ryzen 5 · RTX 4060 · 32 GB · 1 TB', price: '104 900', old: '112 000', badge: 'Для игр', accent: 'orange' },
  { type: 'laptop', name: 'Lenovo LOQ 15', spec: 'i7 · RTX 4060 · 16 GB · 1 TB', price: '119 900', old: '128 900', badge: 'Мощный', accent: 'purple' }
]

const banks = [
  { name: 'MBANK', label: 'Мбанк', className: 'mbank', mark: 'M' },
  { name: 'O! Bank', label: 'О!Банк', className: 'obank', mark: 'O!' },
  { name: 'Optima', label: 'Оптима Банк', className: 'optima', mark: 'O' }
]

function Logo() {
  return <a className="logo" href="#top"><span className="logo-mark"><Zap size={19} fill="currentColor" /></span><span>Okurmen_Store <b>IT-PC</b></span></a>
}

function Navbar({ onAuth }) {
  const [open, setOpen] = useState(false)
  return <header className="navbar" id="top"><div className="nav-inner"><Logo /><nav className={open ? 'nav-links open' : 'nav-links'}><a href="#courses" onClick={() => setOpen(false)}>Курсы</a><a href="#store" onClick={() => setOpen(false)}>Сборки ПК</a><a href="#payments" onClick={() => setOpen(false)}>Оплата</a><a href="#contacts" onClick={() => setOpen(false)}>Контакты</a></nav><div className="nav-actions"><button className="icon-btn mobile-menu" onClick={() => setOpen(!open)} aria-label="Меню">{open ? <X size={20} /> : <Menu size={20} />}</button><button className="login-btn" onClick={() => onAuth('login')}><UserRound size={17} />Войти</button><button className="primary-btn small" onClick={() => onAuth('register')}>Начать путь <ArrowRight size={16} /></button></div></div></header>
}

function Hero({ onAuth }) {
  return <section className="hero section-light"><div className="hero-grid"><div className="hero-copy"><div className="eyebrow"><span className="live-dot" /> Образование и техника в Бишкеке</div><h1>Твоя точка<br /><em>роста</em> в IT<span className="orange-dot">.</span></h1><p>Учись создавать будущее, а технику для этого мы подберём. Курсы, карьерный трек и честные цены в одном месте.</p><div className="hero-buttons"><button className="primary-btn" onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>Смотреть курсы <ArrowRight size={18} /></button><button className="text-btn" onClick={() => onAuth('register')}><Play size={16} fill="currentColor" /> Как это работает</button></div><div className="hero-proof"><div className="avatar-stack"><span>А</span><span>Н</span><span>Б</span><span>+</span></div><div><strong>2 400+</strong><small>студентов уже с нами</small></div><div className="rating"><Star size={14} fill="currentColor" /> 4.9 <small>рейтинг</small></div></div></div><div className="hero-art"><div className="grid-lines" /><div className="code-window"><div className="window-bar"><span /><span /><span /><label>okurmen.py</label></div><div className="code-lines"><p><i>01</i> <b>def</b> <strong>build_future</strong>():</p><p><i>02</i>&nbsp;&nbsp; skills = [<mark>"curiosity"</mark>,</p><p><i>03</i>&nbsp;&nbsp; <mark>"practice"</mark>, <mark>"courage"</mark>]</p><p><i>04</i>&nbsp;&nbsp; <b>return</b> skills</p><p className="cursor-line"><i>05</i> <span>▌</span></p></div></div><div className="floating-stat stat-one"><span className="stat-icon"><BrainCircuit size={18} /></span><b>+86%</b><small>новых навыков</small></div><div className="floating-stat stat-two"><span className="stat-icon green"><BadgeCheck size={18} /></span><b>100%</b><small>практики на курсе</small></div><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /></div></div></section>
}

function CourseCard({ course }) {
  const Icon = course.icon
  return <article className="course-card"><div className={`course-icon ${course.tone}`}><Icon size={22} /></div><span className="course-tag">{course.tag}</span><h3>{course.title}</h3><p>{course.text}</p><div className="course-meta"><span><Clock3 size={15} />{course.duration}</span><span><Layers3 size={15} />{course.hours}</span></div><div className="course-bottom"><div><small>Стоимость курса</small><strong>{course.price} <i>сом</i></strong></div><button className="circle-arrow" aria-label={`Подробнее о курсе ${course.title}`}><ArrowRight size={17} /></button></div></article>
}

function Courses() {
  return <section className="courses section-light section-pad" id="courses"><div className="section-heading"><div><div className="eyebrow orange-label">01 / ОБУЧЕНИЕ</div><h2>Навыки, которые<br /><span>работают на тебя.</span></h2></div><p>Не просто лекции. Мы создаём среду, где ты пробуешь, ошибаешься и собираешь проекты, которыми хочется делиться.</p></div><div className="course-grid">{courses.map(course => <CourseCard key={course.title} course={course} />)}</div><div className="courses-note"><div className="note-symbol"><GraduationCap size={21} /></div><span><b>Нет опыта в IT?</b> Это нормально. Начни с нуля — ментор будет рядом на каждом шаге.</span><a href="#contacts">Задать вопрос <ChevronRight size={15} /></a></div></section>
}

function Payment() {
  const [method, setMethod] = useState('full')
  return <section className="payment-section section-light section-pad" id="payments"><div className="payment-shell"><div className="payment-intro"><div className="eyebrow orange-label">02 / ОПЛАТА</div><h2>Выбирай свой<br /><span>ритм оплаты.</span></h2><p>Начни учиться сегодня. Без скрытых условий и сложных договоров.</p><div className="payment-options">{[['full', 'Полностью', 'Одна оплата — и всё готово.'], ['split', 'По частям', '2 платежа без переплат.'], ['installment', 'Рассрочка', 'До 12 месяцев.']].map(([key, title, text]) => <button key={key} className={method === key ? 'payment-option active' : 'payment-option'} onClick={() => setMethod(key)}><span className="radio">{method === key && <Check size={12} />}</span><span><b>{title}</b><small>{text}</small></span></button>)}</div></div><div className="bank-box"><div className="bank-box-head"><span>ПРИНИМАЕМ К ОПЛАТЕ</span><ShieldCheck size={17} /><span className="secure">Безопасно и надёжно</span></div><div className="bank-cards">{banks.map(bank => <div className={`bank-card ${bank.className}`} key={bank.name}><div className="bank-mark">{bank.mark}</div><b>{bank.name}</b><small>{bank.label}</small><ArrowRight size={16} /></div>)}</div><div className="bank-foot"><WalletCards size={18} /><span>Оплата картой Visa, Mastercard и Элкарт</span></div></div></div></section>
}

function ProductVisual({ product }) {
  return <div className={`product-visual ${product.accent}`}><div className="scanline" />{product.type === 'laptop' ? <Laptop size={118} strokeWidth={1.1} /> : <Monitor size={118} strokeWidth={1.1} />}<span className="visual-glow" /></div>
}

function Store() {
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? products : products.filter(product => product.type === filter)
  return <section className="store-section" id="store"><div className="cyber-stars" /><div className="store-inner section-pad"><div className="store-top"><div><div className="eyebrow cyan-label">03 / IT-PC STORE</div><h2>Техника для<br /><span>больших задач.</span></h2></div><div className="store-copy"><p>От первой строки кода до финального босса. Собираем конфигурации, которые не подведут.</p><div className="store-tabs">{[['all', 'Всё'], ['laptop', 'Ноутбуки'], ['pc', 'Сборки ПК']].map(([key, title]) => <button className={filter === key ? 'active' : ''} onClick={() => setFilter(key)} key={key}>{title}</button>)}</div></div></div><div className="product-grid">{shown.map(product => <article className="product-card" key={product.name}><div className="product-card-top"><span className="product-badge">{product.badge}</span><button className="heart-btn" aria-label="Добавить в избранное">♡</button></div><ProductVisual product={product} /><div className="product-info"><span className="product-type">{product.type === 'laptop' ? 'НОУТБУК' : 'ГОТОВАЯ СБОРКА'}</span><h3>{product.name}</h3><p>{product.spec}</p><div className="product-price"><strong>{product.price} <i>сом</i></strong><del>{product.old}</del><button className="buy-btn" aria-label="Добавить в корзину"><ShoppingCart size={17} /></button></div></div></article>)}</div><div className="store-footer"><span><Package size={16} /> Бесплатная доставка по Бишкеку</span><span><ShieldCheck size={16} /> Гарантия до 2 лет</span><a href="#contacts">Смотреть весь каталог <ArrowRight size={16} /></a></div></div></section>
}

function Contacts() {
  return <section className="contacts section-light section-pad" id="contacts"><div className="contact-heading"><div className="eyebrow orange-label">04 / МЫ РЯДОМ</div><h2>Заходи в гости.<br /><span>Поговорим о твоём.</span></h2></div><div className="contact-grid"><div className="map-card"><div className="map-water" /><div className="map-grid" /><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" /><div className="map-label label-one">пр. Чынгыза Айтматова</div><div className="map-label label-two">ул. Токтогула</div><div className="map-pin pin-school"><span><GraduationCap size={18} /></span><b>Okurmen</b></div><div className="map-pin pin-store"><span><Cpu size={18} /></span><b>IT-PC</b></div><div className="map-controls"><button aria-label="Увеличить карту">+</button><button aria-label="Уменьшить карту">−</button></div><div className="map-caption"><MapPin size={16} /> Бишкек, Кыргызстан</div></div><div className="contact-info"><p className="contact-lead">Приходи посмотреть технику вживую или просто выпить кофе и обсудить твой следующий шаг.</p><div className="contact-item"><span className="contact-icon"><MapPin size={19} /></span><div><small>Учебный центр</small><b>ул. Токтогула, 125, 2 этаж</b><em>Пн–Сб, 09:00–20:00</em></div></div><div className="contact-item"><span className="contact-icon dark"><Monitor size={19} /></span><div><small>Шоурум IT-PC</small><b>пр. Чынгыза Айтматова, 45</b><em>Ежедневно, 10:00–21:00</em></div></div><div className="contact-actions"><a className="whatsapp-btn" href="https://wa.me/996555123456"><Phone size={18} /> WhatsApp</a><a className="phone-link" href="tel:+996555123456">+996 555 123 456 <ChevronRight size={16} /></a></div></div></div></section>
}

function AuthModal({ mode, onClose, onSwitch }) {
  const register = mode === 'register'
  const [role, setRole] = useState('student')
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><div className="auth-modal"><button className="modal-close" onClick={onClose} aria-label="Закрыть"><X size={19} /></button><div className="auth-mark"><Zap size={20} fill="currentColor" /></div><div className="eyebrow orange-label">OKURMEN ACCOUNT</div><h2>{register ? 'Начни свой путь.' : 'С возвращением.'}</h2><p>{register ? 'Создай аккаунт, чтобы сохранять курсы и заказы.' : 'Войди, чтобы продолжить обучение.'}</p>{register && <div className="role-switch"><button className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')}><GraduationCap size={16} /> Студент</button><button className={role === 'buyer' ? 'active' : ''} onClick={() => setRole('buyer')}><ShoppingCart size={16} /> Покупатель</button></div>}<form onSubmit={e => { e.preventDefault(); onClose() }}>{register && <label>Имя<input placeholder="Как тебя зовут?" required /></label>}<label>Email<input type="email" placeholder="you@example.com" required /></label><label>Пароль<input type="password" placeholder="••••••••" required /></label>{!register && <a className="forgot" href="#contacts">Забыли пароль?</a>}<button className="primary-btn full" type="submit">{register ? 'Создать аккаунт' : 'Войти'} <ArrowRight size={17} /></button></form><div className="auth-switch">{register ? 'Уже есть аккаунт?' : 'Впервые у нас?'} <button onClick={() => onSwitch(register ? 'login' : 'register')}>{register ? 'Войти' : 'Зарегистрироваться'}</button></div></div></div>
}

function App() {
  const [authMode, setAuthMode] = useState(null)
  return <div className="app"><Navbar onAuth={setAuthMode} /><main><Hero onAuth={setAuthMode} /><Courses /><Payment /><Store /><Contacts /></main><footer className="footer"><Logo /><span>© 2024 Okurmen_Store. Бишкек, KG</span><div><a href="#courses">Курсы</a><a href="#store">Магазин</a><a href="#contacts">Связаться</a></div></footer>{authMode && <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onSwitch={setAuthMode} />}</div>
}

export default Site
