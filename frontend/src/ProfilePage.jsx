import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Mail, Phone, UserRound } from 'lucide-react'
import { useAuth } from './AppContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  if (!user) return <section className="profile-page section-light section-pad"><div className="profile-card"><div className="profile-avatar"><UserRound size={26} /></div><h1>Войдите в профиль</h1><p>После входа здесь будут ваши данные, курсы и заказы.</p><Link className="primary-btn" to="/register">Регистрация <UserRound size={16} /></Link></div></section>
  const signOut = () => { logout(); navigate('/') }
  return <section className="profile-page section-light section-pad"><div className="profile-card"><div className="profile-avatar"><UserRound size={26} /></div><div className="eyebrow orange-label">OKURMEN ACCOUNT</div><h1>{user.name}</h1><p className="profile-role">Профиль пользователя</p><div className="profile-data"><div><Mail size={17} /><span>{user.email}</span></div><div><Phone size={17} /><span>{user.phone}</span></div></div><button className="logout-action" onClick={signOut}><LogOut size={17} /> Выйти из аккаунта</button></div></section>
}
