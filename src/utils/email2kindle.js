import Email from './Email';

const email = new Email({
  host: 'smtp.qq.com',
  port: 465,
  auth: {
    user: 'sisipedia@qq.com',
    pass: 'ffgrhpkqwejvdfdj',
  },
  secure: true,
})

email.setReceiver(['1054334756@kindle.cn']);

export default function email2kindle(notes) {
  const subject = 'convert';
  const attachments = notes.map(note => Email.evernote2attachment(note));
  return email.send({ subject, attachments });
}
