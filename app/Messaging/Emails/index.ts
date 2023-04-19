import SendGridMessenger from './SendGridMessenger'

class EmailService extends SendGridMessenger {}

export default Object.freeze(new EmailService())
