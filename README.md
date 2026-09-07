# Okurmen IT-PC

Полноценный сайт для учебного центра Okurmen и магазина техники IT-PC.

## Frontend

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Откройте `http://localhost:5173`.

Основные маршруты frontend: `/`, `/store`, `/store/:id`, `/courses`, `/payment`, `/contacts`.
В шапке доступно переключение светлой/тёмной темы. В каталоге есть фильтр товаров,
страницы характеристик и интерактивный конфигуратор комплектующих с пересчётом цены.

## Backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

API доступен на `http://127.0.0.1:8000/api/`:

- `GET /api/courses/`
- `GET /api/products/` и фильтр `?type=laptop` или `?type=pc`
- `POST /api/auth/register/`
- `POST /api/auth/login/`

Для админки создайте пользователя командой `python manage.py createsuperuser`.
