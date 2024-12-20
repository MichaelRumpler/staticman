'use strict'

const path = require('path')
const config = require(path.join(__dirname, '/../config'))

const Notification = function (mailAgent) {
  this.mailAgent = mailAgent
}

Notification.prototype._buildMessage = function (fields, options, data) {
  return `
  <html>
    <body>
      There was a new comment by ${fields.name} on <a href="${options.origin}">${options.origin}</a>.<br>
      <br>
      <pre style="margin: 30px">${fields.message}</pre>
      ---<br><br>
      You are receiving this because you sent a comment in this thread.<br>
      <a href="${options.origin}#comment-${options.id}">View it on ${data.siteName}</a> or <a href="%mailing_list_unsubscribe_url%">unsubscribe</a>.
    </body>
  </html>
  `
}

Notification.prototype.send = function (to, fields, options, data) {
  const subject = data.siteName ? `New reply on "${data.siteName}"` : 'New reply'

  return new Promise((resolve, reject) => {
    this.mailAgent.messages().send({
      from: `${data.siteName} <${config.get('email.fromAddress')}>`,
      to,
      subject,
      html: this._buildMessage(fields, options, data)
    }, (err, res) => {
      if (err) {
        return reject(err)
      }

      return resolve(res)
    })
  })
}

module.exports = Notification
