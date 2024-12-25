
// Функция для проверки, авторизован ли пользователь
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Функция для обновления состояния кнопки на главной странице
function updateLoginButton() {
  const loginButton = document.querySelector('.login-button');
  if (loginButton) {
    if (isLoggedIn()) {
      loginButton.textContent = 'Профиль';
      loginButton.href = 'profile.html';
    } else {
      loginButton.textContent = 'Регистрация';
      loginButton.href = 'register.html';
    }
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'login-button'");
  }
}

// Обработка загрузки страницы index.html
window.onload = function() {
  updateLoginButton();
};

// Обработка формы регистрации
document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('registrationForm');
  const registerButton = registrationForm.querySelector('.button');

  if (registerButton) {
    registerButton.addEventListener('click', (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (isValidRegistrationForm(name, email, phone, password, confirmPassword)) {
        // Сохраняем информацию о пользователе в localStorage (упрощенный вариант)
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        localStorage.setItem('password', password);
        localStorage.setItem('isLoggedIn', 'true');

        // Обновляем кнопку на главной странице
        updateLoginButton();
        // Перенаправляем пользователя на главную страницу
        window.location.href = 'index.html';
      } else {
        alert('Пожалуйста, заполните все поля формы!');
      }
    });
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'button' в форме регистрации");
  }
});

// Функция для проверки формы регистрации
function isValidRegistrationForm(name, email, phone, password, confirmPassword) {
  // Проверяем, заполнены ли все поля формы
  if (!name || !email || !phone || !password || !confirmPassword) {
    alert('Пожалуйста, заполните все поля формы!');
    return false;
  }

  // Проверяем пароль на соответствие
  if (password !== confirmPassword) {
    alert('Пароли не совпадают!');
    return false;
  }

  // Дополнительные проверки (например, на формат почты)
  // ...

  return true;
}

// Обработка формы входа
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const loginButton = loginForm.querySelector('.button'); // Исправлено: Ищем кнопку по классу, а не по id

  if (loginButton) {
    loginButton.addEventListener('click', (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (isValidLoginForm(email, password)) {
        // Проверяем, существует ли пользователь с такими данными
        // (В реальной ситуации данные нужно было бы проверять на сервере)
        if (localStorage.getItem('email') === email && localStorage.getItem('password') === password) {
          localStorage.setItem('isLoggedIn', 'true');

          // Перенаправляем пользователя на главную страницу
          window.location.href = 'index.html';

          // Обновляем кнопку на главной странице
          updateLoginButton();
        } else {
          alert('Неверный email или пароль.');
        }
      }
    });
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'button' в форме входа");
  }
});

// Функция для проверки формы входа
function isValidLoginForm(email, password) {
  // Проверяем, заполнены ли поля формы
  if (!email || !password) {
    alert('Пожалуйста, заполните все поля формы.');
    return false;
  }

  return true;
}

// Обработка выхода из системы (на странице profile.html)
// (Добавьте эту функцию в код для profile.html)
function logout() {
  localStorage.setItem('isLoggedIn', 'false');
  window.location.href = 'index.html';
}

// Дополнительная функциональность для страницы профиля

// Обновляем состояние кнопки на странице профиля при загрузке
window.onload = function() {
  const loginButton = document.querySelector('.login-button');
  if (loginButton) {
    loginButton.textContent = 'Профиль';
    loginButton.href = 'profile.html';
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'login-button'");
  }
};

// Обработка кнопки "Изменить данные"
document.addEventListener('DOMContentLoaded', function() {
  const changeDataButton = document.querySelector('.profile-actions button:first-child');
  if (changeDataButton) {
    changeDataButton.addEventListener('click', function() {
      // Перенаправляем на страницу редактирования профиля (предположим, что она называется edit-profile.html)
      window.location.href = 'edit-profile.html';
    });
  } else {
    console.error("Ошибка: Не найдена кнопка 'Изменить данные' в разделе действий профиля.");
  }
});

// Обработка кнопки "История бронирований"
document.addEventListener('DOMContentLoaded', function() {
  const bookingHistoryButton = document.querySelector('.profile-actions button:last-child');
  if (bookingHistoryButton) {
    bookingHistoryButton.addEventListener('click', function() {
      // Перенаправляем на страницу истории бронирований (предположим, что она называется booking-history.html)
      window.location.href = 'booking-history.html';
    });
  } else {
    console.error("Ошибка: Не найдена кнопка 'История бронирований' в разделе действий профиля.");
  }
});

// Функция для проверки, авторизован ли пользователь
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Функция для обновления состояния кнопки на главной странице
function updateLoginButton() {
  const loginButton = document.querySelector('.login-button');
  if (loginButton) {
    if (isLoggedIn()) {
      loginButton.textContent = 'Профиль';
      loginButton.href = 'profile.html';
    } else {
      loginButton.textContent = 'Регистрация';
      loginButton.href = 'register.html';
    }
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'login-button'");
  }
}

// Обработка загрузки страницы index.html
window.onload = function() {
  updateLoginButton();
};

// Обработка формы регистрации
document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('registrationForm');
  const registerButton = registrationForm.querySelector('.button');

  if (registerButton) {
    registerButton.addEventListener('click', (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (isValidRegistrationForm(name, email, phone, password, confirmPassword)) {
        // Сохраняем информацию о пользователе в localStorage (упрощенный вариант)
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        localStorage.setItem('password', password);
        localStorage.setItem('isLoggedIn', 'true');

        // Обновляем кнопку на главной странице
        updateLoginButton();
        // Перенаправляем пользователя на главную страницу
        window.location.href = 'index.html';
      } else {
        alert('Пожалуйста, заполните все поля формы!');
      }
    });
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'button' в форме регистрации");
  }
});

// Функция для проверки формы регистрации
function isValidRegistrationForm(name, email, phone, password, confirmPassword) {
  // Проверяем, заполнены ли все поля формы
  if (!name || !email || !phone || !password || !confirmPassword) {
    alert('Пожалуйста, заполните все поля формы!');
    return false;
  }

  // Проверяем пароль на соответствие
  if (password !== confirmPassword) {
    alert('Пароли не совпадают!');
    return false;
  }

  // Дополнительные проверки (например, на формат почты)
  // ...

  return true;
}

// Обработка формы входа
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const loginButton = loginForm.querySelector('.button'); // Исправлено: Ищем кнопку по классу, а не по id

  if (loginButton) {
    loginButton.addEventListener('click', (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (isValidLoginForm(email, password)) {
        // Проверяем, существует ли пользователь с такими данными
        // (В реальной ситуации данные нужно было бы проверять на сервере)
        if (localStorage.getItem('email') === email && localStorage.getItem('password') === password) {
          localStorage.setItem('isLoggedIn', 'true');

          // Перенаправляем пользователя на главную страницу
          window.location.href = 'index.html';

          // Обновляем кнопку на главной странице
          updateLoginButton();
        } else {
          alert('Неверный email или пароль.');
        }
      }
    });
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'button' в форме входа");
  }
});

// Функция для проверки формы входа
function isValidLoginForm(email, password) {
  // Проверяем, заполнены ли поля формы
  if (!email || !password) {
    alert('Пожалуйста, заполните все поля формы.');
    return false;
  }

  return true;
}

// Обработка выхода из системы (на странице profile.html)
// (Добавьте эту функцию в код для profile.html)
function logout() {
  localStorage.setItem('isLoggedIn', 'false');
  window.location.href = 'index.html';
}

// Дополнительная функциональность для страницы профиля

// Обновляем состояние кнопки на странице профиля при загрузке
window.onload = function() {
  const loginButton = document.querySelector('.login-button');
  if (loginButton) {
    loginButton.textContent = 'Профиль';
    loginButton.href = 'profile.html';
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'login-button'");
  }
};

// Обработка кнопки "Изменить данные"
document.addEventListener('DOMContentLoaded', function() {
  const changeDataButton = document.querySelector('.profile-actions button:first-child');
  if (changeDataButton) {
    changeDataButton.addEventListener('click', function() {
      // Перенаправляем на страницу редактирования профиля (предположим, что она называется edit-profile.html)
      window.location.href = 'edit-profile.html';
    });
  } else {
    console.error("Ошибка: Не найдена кнопка 'Изменить данные' в разделе действий профиля.");
  }
});

// Обработка кнопки "История бронирований"
document.addEventListener('DOMContentLoaded', function() {
  const bookingHistoryButton = document.querySelector('.profile-actions button:last-child');
  if (bookingHistoryButton) {
    bookingHistoryButton.addEventListener('click', function() {
      // Перенаправляем на страницу истории бронирований (предположим, что она называется booking-history.html)
      window.location.href = 'booking-history.html';
    });
  } else {
    console.error("Ошибка: Не найдена кнопка 'История бронирований' в разделе действий профиля.");
  }
});

// Функция для проверки, авторизован ли пользователь
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Функция для обновления состояния кнопки на главной странице
function updateLoginButton() {
  const loginButton = document.querySelector('.login-button');
  if (loginButton) {
    if (isLoggedIn()) {
      loginButton.textContent = 'Профиль';
      loginButton.href = 'profile.html';
    } else {
      loginButton.textContent = 'Регистрация';
      loginButton.href = 'register.html';
    }
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'login-button'");
  }
}

// Обработка загрузки страницы index.html
window.onload = function() {
  updateLoginButton();
};

// Обработка формы регистрации
document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('registrationForm');
  const registerButton = registrationForm.querySelector('.button');

  if (registerButton) {
    registerButton.addEventListener('click', (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (isValidRegistrationForm(name, email, phone, password, confirmPassword)) {
        // Сохраняем информацию о пользователе в localStorage (упрощенный вариант)
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        localStorage.setItem('password', password);
        localStorage.setItem('isLoggedIn', 'true');

        // Обновляем кнопку на главной странице
        updateLoginButton();
        // Перенаправляем пользователя на главную страницу
        window.location.href = 'index.html';
      } else {
        alert('Пожалуйста, заполните все поля формы!');
      }
    });
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'button' в форме регистрации");
  }
});

// Функция для проверки формы регистрации
function isValidRegistrationForm(name, email, phone, password, confirmPassword) {
  // Проверяем, заполнены ли все поля формы
  if (!name || !email || !phone || !password || !confirmPassword) {
    alert('Пожалуйста, заполните все поля формы!');
    return false;
  }

  // Проверяем пароль на соответствие
  if (password !== confirmPassword) {
    alert('Пароли не совпадают!');
    return false;
  }

  // Дополнительные проверки (например, на формат почты)
  // ...

  return true;
}

// Обработка формы входа
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const loginButton = loginForm.querySelector('.button'); // Исправлено: Ищем кнопку по классу, а не по id

  if (loginButton) {
    loginButton.addEventListener('click', (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (isValidLoginForm(email, password)) {
        // Проверяем, существует ли пользователь с такими данными
        // (В реальной ситуации данные нужно было бы проверять на сервере)
        if (localStorage.getItem('email') === email && localStorage.getItem('password') === password) {
          localStorage.setItem('isLoggedIn', 'true');

          // Перенаправляем пользователя на главную страницу
          window.location.href = 'index.html';

          // Обновляем кнопку на главной странице
          updateLoginButton();
        } else {
          alert('Неверный email или пароль.');
        }
      }
    });
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'button' в форме входа");
  }
});

// Функция для проверки формы входа
function isValidLoginForm(email, password) {
  // Проверяем, заполнены ли поля формы
  if (!email || !password) {
    alert('Пожалуйста, заполните все поля формы.');
    return false;
  }

  return true;
}

// Обработка выхода из системы (на странице profile.html)
// (Добавьте эту функцию в код для profile.html)
function logout() {
  localStorage.setItem('isLoggedIn', 'false');
  window.location.href = 'index.html';
}

// Дополнительная функциональность для страницы профиля

// Обновляем состояние кнопки на странице профиля при загрузке
window.onload = function() {
  const loginButton = document.querySelector('.login-button');
  if (loginButton) {
    loginButton.textContent = 'Профиль';
    loginButton.href = 'profile.html';
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'login-button'");
  }
};

// Обработка кнопки "Изменить данные"
document.addEventListener('DOMContentLoaded', function() {
  const changeDataButton = document.querySelector('.profile-actions button:first-child');
  if (changeDataButton) {
    changeDataButton.addEventListener('click', function() {
      // Перенаправляем на страницу редактирования профиля (предположим, что она называется edit-profile.html)
      window.location.href = 'edit-profile.html';
    });
  } else {
    console.error("Ошибка: Не найдена кнопка 'Изменить данные' в разделе действий профиля.");
  }
});

// Обработка кнопки "История бронирований"
document.addEventListener('DOMContentLoaded', function() {
  const bookingHistoryButton = document.querySelector('.profile-actions button:last-child');
  if (bookingHistoryButton) {
    bookingHistoryButton.addEventListener('click', function() {
      // Перенаправляем на страницу истории бронирований (предположим, что она называется booking-history.html)
      window.location.href = 'booking-history.html';
    });
  } else {
    console.error("Ошибка: Не найдена кнопка 'История бронирований' в разделе действий профиля.");
  }
});

// Функция для проверки, авторизован ли пользователь
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Функция для обновления состояния кнопки на главной странице
function updateLoginButton() {
  const loginButton = document.querySelector('.login-button');
  if (loginButton) {
    if (isLoggedIn()) {
      loginButton.textContent = 'Профиль';
      loginButton.href = 'profile.html';
    } else {
      loginButton.textContent = 'Регистрация';
      loginButton.href = 'register.html';
    }
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'login-button'");
  }
}

// Обработка загрузки страницы index.html
window.onload = function() {
  updateLoginButton();
};

// Обработка формы регистрации
document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('registrationForm');
  const registerButton = registrationForm.querySelector('.button');

  if (registerButton) {
    registerButton.addEventListener('click', (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (isValidRegistrationForm(name, email, phone, password, confirmPassword)) {
        // Сохраняем информацию о пользователе в localStorage (упрощенный вариант)
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        localStorage.setItem('password', password);
        localStorage.setItem('isLoggedIn', 'true');

        // Обновляем кнопку на главной странице
        updateLoginButton();
        // Перенаправляем пользователя на главную страницу
        window.location.href = 'index.html';
      } else {
        alert('Пожалуйста, заполните все поля формы!');
      }
    });
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'button' в форме регистрации");
  }
});

// Функция для проверки формы регистрации
function isValidRegistrationForm(name, email, phone, password, confirmPassword) {
  // Проверяем, заполнены ли все поля формы
  if (!name || !email || !phone || !password || !confirmPassword) {
    alert('Пожалуйста, заполните все поля формы!');
    return false;
  }

  // Проверяем пароль на соответствие
  if (password !== confirmPassword) {
    alert('Пароли не совпадают!');
    return false;
  }

  // Дополнительные проверки (например, на формат почты)
  // ...

  return true;
}

// Обработка формы входа
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const loginButton = loginForm.querySelector('.button'); // Исправлено: Ищем кнопку по классу, а не по id

  if (loginButton) {
    loginButton.addEventListener('click', (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (isValidLoginForm(email, password)) {
        // Проверяем, существует ли пользователь с такими данными
        // (В реальной ситуации данные нужно было бы проверять на сервере)
        if (localStorage.getItem('email') === email && localStorage.getItem('password') === password) {
          localStorage.setItem('isLoggedIn', 'true');

          // Перенаправляем пользователя на главную страницу
          window.location.href = 'index.html';

          // Обновляем кнопку на главной странице
          updateLoginButton();
        } else {
          alert('Неверный email или пароль.');
        }
      }
    });
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'button' в форме входа");
  }
});

// Функция для проверки формы входа
function isValidLoginForm(email, password) {
  // Проверяем, заполнены ли поля формы
  if (!email || !password) {
    alert('Пожалуйста, заполните все поля формы.');
    return false;
  }

  return true;
}

// Обработка выхода из системы (на странице profile.html)
// (Добавьте эту функцию в код для profile.html)
function logout() {
  localStorage.setItem('isLoggedIn', 'false');
  window.location.href = 'index.html';
}

// Дополнительная функциональность для страницы профиля

// Обновляем состояние кнопки на странице профиля при загрузке
window.onload = function() {
  const loginButton = document.querySelector('.login-button');
  if (loginButton) {
    loginButton.textContent = 'Профиль';
    loginButton.href = 'profile.html';
  } else {
    console.error("Ошибка: Не найдена кнопка с классом 'login-button'");
  }
};

// Обработка кнопки "Изменить данные"
document.addEventListener('DOMContentLoaded', function() {
  const changeDataButton = document.querySelector('.profile-actions button:first-child');
  if (changeDataButton) {
    changeDataButton.addEventListener('click', function() {
      // Перенаправляем на страницу редактирования профиля (предположим, что она называется edit-profile.html)
      window.location.href = 'edit-profile.html';
    });
  } else {
    console.error("Ошибка: Не найдена кнопка 'Изменить данные' в разделе действий профиля.");
  }
});

// Обработка кнопки "История бронирований"
document.addEventListener('DOMContentLoaded', function() {
  const bookingHistoryButton = document.querySelector('.profile-actions button:last-child');
  if (bookingHistoryButton) {
    bookingHistoryButton.addEventListener('click', function() {
      // Перенаправляем на страницу истории бронирований (предположим, что она называется booking-history.html)
      window.location.href = 'booking-history.html';
    });
  } else {
    console.error("Ошибка: Не найдена кнопка 'История бронирований' в разделе действий профиля.");
  }
});