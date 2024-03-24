// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
class User {
  static #list = []
  constructor(email, login, password) {
    this.email = email
    this.login = login
    this.password = password
    this.id = new Date().getTime()
  }

  verifyPassword = (password) => this.password === password

  static add = (user) => {
    this.#list.push(user)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) =>
    this.#list.find((user) => user.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (user) => user.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, data) => {
    const user = this.getById(id)

    if (user) {
      this.update(user, data)
      return true
    } else {
      return false
    }
  }

  static update = (user, { email }) => {
    if (email) {
      user.email = email
    }
  }
}
// =============== Product ==================
class Product {
  static #list = []
  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
    this.id = Math.floor(Math.random() * 90000) + 10000
    this.createDate = Date()
  }

  static add = (product) => {
    this.#list.push(product)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static updateById = (id, data) => {
    const product = this.getById(id)
    if (product) {
      this.update(product, data)
      return true
    } else {
      return false
    }
  }

  static update = (
    product,
    { name, price, description },
  ) => {
    if (name) {
      product.name = name
    }
    if (price) {
      product.price = price
    }
    if (description) {
      product.description = description
    }
  }

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
}

// ================================================================

Product.add(
  new Product('Example name L', 25, 'Example description'),
)

Product.add(
  new Product(
    'Example name XXL',
    35,
    'Example description XXL',
  ),
)

// ===============================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // const list = User.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('start', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'start',
    info: 'JS practice CRUD',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/product-create', function (req, res) {
  res.render('product-create', {
    style: 'product-create',
    info: "router.get('/product-create'",
  })
})

// ===============================================================
router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body
  const product = new Product(name, price, description)
  Product.add(product)
  // console.log(Product.getList())
  res.render('alert', {
    style: 'alert',
    info: 'The product has been created.',
    id: product.id,
    date: product.createDate,
  })
})

// ===================================================
router.get('/product-list', function (req, res) {
  const list = Product.getList()
  res.render('product-list', {
    style: 'product-list',
    info: 'Product list',
    list,
    isEmpty: list.length === 0,
  })
})

// ==================================================
router.get('/product-edit', function (req, res) {
  const { id } = req.query
  let product = Product.getById(Number(id))

  if (product === undefined) {
    console.log('if action')
    product = {
      id: '',
      name: '',
      price: '',
      description: '',
    }
  }
  res.render('product-edit', {
    style: 'product-edit',
    info: '',
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
  })
})

// ================================================================
router.post('/product-edit', function (req, res) {
  const { id, name, price, description } = req.body
  let result = false
  console.log('IDDI:' + id + 'endId')

  const product = Product.getById(Number(id))

  console.log('Product:' + product)

  if (product) {
    Product.update(product, {
      id,
      name,
      price,
      description,
    })
    result = true
  }

  res.render('alert', {
    id: product ? product.id : ' does not exist',
    style: 'alert',
    info: result ? 'Product is updated' : 'Вилізла помилка',
  })
})
// ============ s e a r c h =======================================
router.post('/product-search', function (req, res) {
  const { id, name, price, description } = req.body
  let result = false

  let product = Product.getById(Number(id))

  console.log(product)

  if (product === undefined) {
    console.log('if action')
    product = {
      id: '',
      name: '',
      price: '',
      description: '',
    }
    result = true
  }

  res.render('product-edit', {
    style: 'product-edit',
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    info: result ? `ID${id} does not exist.` : undefined,
  })
})
// ===================================================
router.get('/product-delete', function (req, res) {
  const { id } = req.query

  Product.deleteById(Number(id))

  res.render('alert', {
    style: 'alert',
    info: id
      ? 'Product is deleted'
      : 'ERROR: Product is not deleted',
  })
})
// ===================================================
// ===================================================
router.get('/user-crud', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = User.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.post('/user-create', function (req, res) {
  const { email, login, password } = req.body
  const user = new User(email, login, password)
  User.add(user)
  // console.log(User.getList())
  res.render('success-info', {
    style: 'success-info',
    info: 'користувач створений',
  })
})

// ====================================================
router.get('/user-delete', function (req, res) {
  const { id } = req.query

  User.deleteById(Number(id))

  res.render('success-info', {
    style: 'success-info',
    info: 'користувач видалений',
  })
})

// ================================================================
router.post('/user-update', function (req, res) {
  const { id, email, password } = req.body

  let result = false

  const user = User.getById(Number(id))

  // console.log(user)

  if (user.verifyPassword(password)) {
    User.update(user, { email })
    result = true
  }

  // const result = User.updateById(Number(id), { email })

  res.render('success-info', {
    style: 'success-info',
    info: result
      ? 'пошту користувача саме оновлено (звісно шо електронну)'
      : 'Вилізла помилка',
  })
})
// ===================================================
// Підключаємо роутер до бек-енду
module.exports = router
