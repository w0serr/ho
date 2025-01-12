from flask import Flask, request, jsonify, render_template, redirect, url_for, session
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Секретный ключ для работы с сессиями

# Подключение к базе данных
def connect_db():
    conn = sqlite3.connect('hotels.db')
    cursor = conn.cursor()
    # Таблица для отелей
    cursor.execute('''CREATE TABLE IF NOT EXISTS hotels (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        description TEXT NOT NULL
                      )''')
    # Таблица для пользователей
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        username TEXT NOT NULL UNIQUE,
                        email TEXT NOT NULL,
                        phone TEXT NOT NULL,
                        password TEXT NOT NULL
                      )''')
    conn.commit()
    return conn

@app.route('/hotel1')
def hotel1():
    if 'user_id' not in session:
        return redirect(url_for('login'))  # Перенаправить на страницу входа
    return render_template('hotel1.html')  # Ваш основной контент для /hotel1


@app.route('/profile')
def profile():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    # Получаем данные пользователя из базы данных
    user_id = session['user_id']
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT username, email, phone FROM users WHERE id = ?', (user_id,))
    user = cursor.fetchone()
    conn.close()

    # Проверяем, что пользователь существует
    if not user:
        return redirect(url_for('login'))

    username, email, phone = user

    # Передаем данные пользователя в шаблон
    return render_template('profile.html', username=username, email=email, phone=phone)


# Главная страница
@app.route('/index')
def index():
    user_is_logged_in = 'user_id' in session
    if user_is_logged_in:
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('SELECT username FROM users WHERE id = ?', (session['user_id'],))
        username = cursor.fetchone()[0]
        conn.close()
        return render_template('index.html', username=username, user_is_logged_in=user_is_logged_in)
    return redirect(url_for('login'))


# Страница регистрации
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        phone = request.form.get('phone')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        if not username or not email or not phone or not password or not confirm_password:
            return render_template('register.html', error='Все поля обязательны!')

        if password != confirm_password:
            return render_template('register.html', error='Пароли должны совпадать!')

        hashed_password = generate_password_hash(password)

        conn = connect_db()
        cursor = conn.cursor()
        try:
            cursor.execute('INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)', 
                           (username, email, phone, hashed_password))
            conn.commit()
        except sqlite3.IntegrityError:
            return render_template('register.html', error='Пользователь с таким именем уже существует!')
        finally:
            conn.close()

        return redirect(url_for('login'))

    return render_template('register.html')


# Страница входа
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if not username or not password:
            return render_template('login.html', error='Все поля обязательны!')

        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('SELECT id, password FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
        conn.close()

        if user and check_password_hash(user[1], password):
            session['user_id'] = user[0]
            session['username'] = username
            return redirect(url_for('index'))

        return render_template('login.html', error='Неверное имя пользователя или пароль!')

    return render_template('login.html')


# Выход из системы
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return redirect(url_for('login'))


# Страница с отелями
@app.route('/hotels')
def hotels():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM hotels')
    hotels = cursor.fetchall()
    conn.close()
    return render_template('hotels.html', hotels=hotels)  # Отправляем отели в шаблон


# Обработка добавления отеля
@app.route('/add', methods=['POST'])
def add_hotel():
    if 'user_id' not in session:
        return jsonify({'error': 'Необходимо войти в систему!'}), 403

    data = request.json
    name = data.get('name')
    description = data.get('description')

    if not name or not description:
        return jsonify({'error': 'Все поля обязательны!'}), 400

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO hotels (name, description) VALUES (?, ?)', (name, description))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Отель добавлен успешно!'})


# Обработка редактирования отеля
@app.route('/edit/<int:id>', methods=['PUT'])
def edit_hotel(id):
    if 'user_id' not in session:
        return jsonify({'error': 'Необходимо войти в систему!'}), 403

    data = request.json
    name = data.get('name')
    description = data.get('description')

    if not name or not description:
        return jsonify({'error': 'Все поля обязательны!'}), 400

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('UPDATE hotels SET name = ?, description = ? WHERE id = ?', (name, description, id))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Отель обновлен успешно!'})


# Обработка удаления отеля
@app.route('/delete/<int:id>', methods=['POST'])
def delete_hotel(id):
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM hotels WHERE id = ?', (id,))
    conn.commit()
    conn.close()

    return redirect(url_for('hotels'))


# Запуск приложения
if __name__ == '__main__':
    app.run(debug=True)
