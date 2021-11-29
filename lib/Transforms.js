const md5 = require('md5')

const upcase = (value) => {
  return String(value).toUpperCase()
}

const downcase = (value) => {
  return String(value).toLowerCase()
}

const antixss = (value) => {
  return String(value)
          .replace(/<script([^>]*)>(.*?)<\/script>/g, "&lt;script$1&gt;$2&lt;\/script&gt;")
          .replace(/(<a [^>]*?)href="javascript:[^"]*"/g, "$1")
          .replace(/(<a [^>]*?)href='javascript:[^']*'/g, "$1")
          .replace(/(<[^>]*) on\w+="[^"]*"/g, "$1")
          .replace(/(<[^>]*) on\w+='[^']*'/g, "$1");
}

module.exports = {
  md5,
  upcase,
  downcase,
  antixss
}
