class Storage {
  constructor (type='localStorage') {
    this.type = type
  }

  get (key) {
    const source = JSON.parse(window[this.type].getItem(key))
    const now = new Date().getTime()
    const expiresTime = source && source[`${key}__expires__`]
    
    if (now > expiresTime) {
      this.remove(key)
      return null
    }

    return JSON.parse(source[key])
  }

  set (key, value, expires=20) {
    const source = {}
    source[key] = JSON.stringify(value)
    source[`${key}__expires__`] = new Date().getTime() + 1000*60*expires
    window[this.type].setItem(key, JSON.stringify(source))
  }

  remove (key) {
    window[this.type].removeItem(key)
  }
  
}

export default Storage