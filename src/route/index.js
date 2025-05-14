// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()
//=================================================================
const Handlebars = require('handlebars')

// Регистрируем пользовательский помощник "eq" для сравнения значений
Handlebars.registerHelper('eq', function (a, b, options) {
  return a === b ? true : false
})
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

// =============== eProduct ==================
class eProduct {
  static #list = []
  constructor(
    name,
    price,
    description,
    img,
    category,
    amount,
  ) {
    this.name = name
    this.price = price
    this.description = description
    this.img = img
    this.category = category
    this.amount = amount
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

// ========== Purchase ==============================================

class Purchase {
  static DELIVERY_PRICE = 150
  static #BONUS_FACTOR = 0.1

  static #count = 0
  static #list = []

  static #bonusAccount = new Map()

  static getBonusBalanse = (email) => {
    return Purchase.#bonusAccount.get(email) || 0
  }

  static calcBonusAmount = (value) => {
    return Math.round(value * Purchase.#BONUS_FACTOR)
  }

  static updateBonusBalance = (
    email,
    price,
    bonusUse = 0,
  ) => {
    const amount = this.calcBonusAmount(price)

    const currentBalance = Purchase.getBonusBalanse(email)

    const updatedBalance =
      currentBalance + amount - bonusUse

    Purchase.#bonusAccount.set(email, updatedBalance)

    return amount
  }

  constructor(data, product) {
    this.id = ++Purchase.#count
    this.firstname = data.firstname
    this.surname = data.surname
    this.phone = data.phone
    this.email = data.email
    this.comment = data.comment || null
    this.bonus = data.bonus || 0
    this.promocode = data.promocode || null

    this.totalPrice = data.toPay
    this.productPrice = data.productPrice
    this.deliveryPrice = data.deliveryPrice
    this.amount = data.amount

    this.product = product

    this.date = Date()
  }

  static add = (...arg) => {
    const newPurchase = new Purchase(...arg)

    this.#list.unshift(newPurchase)

    return newPurchase
  }

  static getList = () => {
    return Purchase.#list
  }

  static getById = (id) => {
    return Purchase.#list.find((item) => item.id === id)
  }

  static updateById = (id, data) => {
    const purchase = Purchase.getById(id)

    if (purchase) {
      if (data.firstname)
        purchase.firstname = data.firstname
      if (data.surname) purchase.surname = data.surname
      if (data.phone) purchase.phone = data.phone
      if (data.email) purchase.email = data.email
      return true
    } else {
      return false
    }
  }

  static setServiceBonus() {
    Purchase.#bonusAccount.set('orelmsg@gmail.com', 100)
  }
}

class Promocode {
  static #list = []

  constructor(name, factor) {
    this.name = name
    this.factor = factor
  }

  static add = (name, factor) => {
    const newPromoCode = new Promocode(name, factor)
    Promocode.#list.push(newPromoCode)
    return newPromoCode
  }

  static getByName = (name) => {
    return this.#list.find((el) => el.name === name)
  }

  static infoByName = (name) => {
    const off = Math.round(
      (1 -
        this.#list.find((el) => el.name === name).factor) *
        100,
    )

    return `You have ${off}% off.`
  }

  static calc = (promo, price) => {
    return price * promo.factor
  }
}
// ============================================================

Purchase.setServiceBonus()

// ============================================================

Promocode.add('SUMMER2090', 0.95)
Promocode.add('SUMMER2050', 0.9)
Promocode.add('SUMMER2075', 0.8)

// ============================================================
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
eProduct.add(
  new eProduct(
    'Computer GreenLeaf X510 [O14] i5 | RTX 4060 ',
    50025,
    'Model procesora:i5-10400F (2.9 GHz, 4.3 GHz Turbo, 12 MB Cache, 65W Karta graficzna: GeForce RTX 4060 Ilość pamięci RAM [GB] 8',
    '/img/img1.jpg',
    'Best seller',
    15,
  ),
)

eProduct.add(
  new eProduct(
    'Computer Albatross X610 [O15] i5 | RTX 4060 ',
    45025,
    'Model procesora:i5-10400F (2.9 GHz, 4.3 GHz Turbo, 12 MB Cache, 65W Karta graficzna: GeForce RTX 4060 Ilość pamięci RAM [GB] 8',
    '/img/img2.jpg',
    'Best seller',
    15,
  ),
)

eProduct.add(
  new eProduct(
    'Computer BlackStar ML1522 [O18] i7 | RTX 4060 ',
    42025,
    'Model procesora: Model procesora:Model procesora:i5-10400F (2.9 GHz, 4.3 GHz Turbo, 12 MB Cache, 65W Karta graficzna: GeForce RTX 4060 Ilość pamięci RAM [GB] 8',
    '/img/img3.jpg',
    'Not available',
    15,
  ),
)

eProduct.add(
  new eProduct(
    'Computer ZX Spectrum X510 [O14] i5 | RTX 4060 ',
    8500,
    'Model procesora: Model procesora:Model procesora:i5-10400F (2.9 GHz, 4.3 GHz Turbo, 12 MB Cache, 65W Karta graficzna: GeForce RTX 4060 Ilość pamięci RAM [GB] 8',
    '/img/img4.jpg',
    'New model',
    15,
  ),
)

eProduct.add(
  new eProduct(
    'Computer PinkCat X510 [O14] i5 | RTX 4060 ',
    20025,
    'Model procesora: Model procesora:Model procesora:i5-10400F (2.9 GHz, 4.3 GHz Turbo, 12 MB Cache, 65W Karta graficzna: GeForce RTX 4060 Ilość pamięci RAM [GB] 8',
    '/img/img5.jpg',
    '',
    15,
  ),
)

eProduct.add(
  new eProduct(
    'Computer GreenLeaf X510 [O14] i5 | RTX 4060 ',
    62025,
    'Model procesora: Model procesora:Model procesora:i5-10400F (2.9 GHz, 4.3 GHz Turbo, 12 MB Cache, 65W Karta graficzna: GeForce RTX 4060 Ilość pamięci RAM [GB] 8',
    '/img/img1.jpg',
    'New model',
    15,
  ),
)

eProduct.add(
  new eProduct(
    'Computer Dead Perch X910 [O14] i1 | RTX 4060 ',
    99099,
    'Model procesora:i1-00F (0.9 GHz, 0.3 GHz Turbo, 1.2 MB Cache, 65W Karta graficzna: GeForce RTX 01 Ilość pamięci RAM [MB] 64Model procesora:i1-00F (0.9 GHz, 0.3 GHz Turbo, 1.2 MB Cache, 65W Karta graficzna: GeForce RTX 01 Ilość pamięci RAM [MB] 64Model procesora:i1-00F (0.9 GHz, 0.3 GHz Turbo, 1.2 MB Cache, 65W Karta graficzna: GeForce RTX 01 Ilość pamięci RAM [MB] 64Model procesora:i1-00F (0.9 GHz, 0.3 GHz Turbo, 1.2 MB Cache, 65W Karta graficzna: GeForce RTX 01 Ilość pamięci RAM [MB] 64',
    '/img/img2.jpg',
    'Exclusive',
    15,
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

router.get('/eproduct-list', function (req, res) {
  const list = eProduct.getList()
  res.render('eproduct-list', {
    style: 'eproduct-list',
    info: 'Product list',
    list,
    isEmpty: list.length === 0,
  })
})

// ==================================================
router.get('/eproduct-purchase', function (req, res) {
  const { id } = req.query
  let product = eProduct.getById(Number(id))
  console.log('ID:' + id + product)
  if (product === undefined) {
    console.log('if action')
    product = {
      id: '',
      name: '',
      price: '',
      description: '',
    }
  }
  res.render('eproduct-purchase', {
    style: 'eproduct-purchase',
    info: '',
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    img: product.img,
  })
})

// ================================================================

router.post('/purchase-create', function (req, res) {
  const { id, amount } = req.body
  let product = eProduct.getById(Number(id))
  let delivery = 150
  // console.log(Product.getList())
  res.render('purchase-create', {
    style: 'purchase-create',
    info: 'create order',
    id: id,
    amount: amount,
    name: product.name,
    price: product.price,
    delivery,
    totalPrice: product.price * amount + delivery,
    description: product.description,
    img: product.img,
  })
})

// ===================================================

router.post('/check-input', (req, res) => {
  const confirmText = req.body.inputed
  console.log(confirmText)
  let code = Promocode.getByName(confirmText)
  if (code) {
    let infoOff = Promocode.infoByName(code.name)
    // let factorOff = Promocode.infoByName(code.factor)
    const isValid = true
    const factorOff = code.factor
    res.json({ isValid, infoOff, factorOff })
  } else {
    const isValid = false
    res.json({ isValid })
  }
})

// ===================================================

router.post('/check-inputBonus', (req, res) => {
  const inputedBonus = req.body.inputedBonus
  const eMail = req.body.eMail
  console.log(inputedBonus, eMail)
  const realBonus = Purchase.getBonusBalanse(eMail)
  const value = `Use available bonuses to pay --You have ${realBonus} -- `
  res.json({ value, realBonus })
})

// ===================================================

router.post('/confirm-order', function (req, res) {
  const {
    firstname,
    surname,
    phone,
    email,
    comment,
    bonusUse,
    promocode,
    toPayForm,
    totalPrice,
    amount,
    id,
  } = req.body
  let product = eProduct.getById(Number(id))
  let deliveryPrice = 150
  let toPay = toPayForm
  let productPrice = totalPrice
  let bonus = Purchase.calcBonusAmount(toPay)
  const purchase = Purchase.add(
    {
      firstname,
      surname,
      phone,
      email,
      comment,
      bonus,
      promocode,
      toPay,
      productPrice,
      deliveryPrice,
      amount,
    },
    product,
  )
  let price = toPay
  Purchase.updateBonusBalance(email, price, bonusUse)
  res.render('alert-p', {
    style: 'alert-p',
    info: 'Order is accepted.',
    id: purchase.id,
    purchase: purchase,
  })
})

// ===================================================

router.get('/purchase-list', function (req, res) {
  const list = Purchase.getList()
  res.render('purchase-list', {
    style: 'purchase-list',
    info: 'My orders',
    list,
    isEmpty: list.length === 0,
    emptyInfo: 'The list is empty',
  })
})

// ====================================================

router.get('/purchase-info', function (req, res) {
  const { id } = req.query
  console.log('ID' + id)
  let purchase = Purchase.getById(Number(id))
  let delivery = 150
  res.render('purchase-info', {
    style: 'purchase-info',
    info: '',
    id: id,
    purchase: purchase,
    delivery: delivery,
  })
})

// ===================================================

router.get('/purchase-edit', function (req, res) {
  const { id } = req.query
  console.log('ID' + id)
  let purchase = Purchase.getById(Number(id))
  let delivery = 150
  res.render('purchase-edit', {
    style: 'purchase-edit',
    info: '',
    id: id,
    purchase: purchase,
    delivery: delivery,
  })
})

// ===================================================

router.post('/confirm-orderchanges', function (req, res) {
  const { id, firstname, surname, phone, email } = req.body

  const confirmChanges = Purchase.updateById(Number(id), {
    firstname,
    surname,
    phone,
    email,
  })
  const purchase = Purchase.getById(Number(id))

  res.render('alert-p', {
    style: 'alert-p',
    info: 'Changes is saved.',
    id: purchase.id,
    purchase: purchase,
  })
})

// ===================================================

router.get('/product-edit', function (req, res) {
  const { id } = req.query
  let product = Product.getById(Number(id))
  console.log('ID:' + id + product)
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
