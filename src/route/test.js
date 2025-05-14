let add = (...arg) => {
  return new Purchase(...arg)
}

class Product {
  static #list = []
  constructor({ name, price, description }) {
    this.name = name
    this.price = price
    this.description = description || ''
    this.id = Math.floor(Math.random() * 90000) + 10000
    this.createDate = Date()
  }
}

const productData = {
  name: 'Bla nmae',
  price: 22,
  // description: 'asdasd',
}

const prodA = new Product(productData)

console.log(prodA)

class Purchase {
  constructor(data, product) {
    this.firstname = data.firstname
    this.lastname = data.lastname
    this.phone = data.phone
    this.product = product
  }

  static add = (...arg) => {
    console.log('ARG: ' + arg)
    const newPur = new Purchase(...arg)
    return newPur
  }
}

const purchase1 = Purchase.add(
  {
    firstname: 'Иван',
    lastname: 'Иванов',
    phone: '1234567890',
  },
  { name: 'Ноутбук', price: 1000 },
)

console.log(purchase1)
