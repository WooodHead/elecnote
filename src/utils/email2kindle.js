import Email from './Email';

const email = new Email({
  host: localStorage.getItem('host'),
  port: localStorage.getItem('port'),
  auth: {
    user: localStorage.getItem('user'),
    pass: localStorage.getItem('pass'),
  },
  secure: true,
});

email.setReceiver([localStorage.getItem('kindle')]);

export default function email2kindle(notes) {
  const subject = 'convert';
  const attachments = notes.map(note => Email.evernote2attachment(note));
  return email.send({ subject, attachments });
}
