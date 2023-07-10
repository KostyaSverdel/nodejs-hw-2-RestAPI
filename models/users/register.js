const express = require('express');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const User = require('./index');

const app = express();
app.use(express.json());

// Роут для регистрации пользователя
app.post('/users/register', async (req, res) => {
  try {
    // Валидация запроса
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Проверка на уникальность email
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    // Хеширование пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Создание пользователя
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      subscription: 'starter',
    });
    await user.save();

    // Успешный ответ
    return res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    // Обработка ошибок сервера
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Роут для логина пользователя
app.post('/users/login', async (req, res) => {
  try {
    // Валидация запроса
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Поиск пользователя по email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    // Сравнение паролей
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    // Создание и сохранение токена
    const token = 'exampletoken'; // Здесь можно использовать пакет для создания и управления токенами, такой как jsonwebtoken
    user.token = token;
    await user.save();

    // Успешный ответ
    return res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    // Обработка ошибок сервера
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
