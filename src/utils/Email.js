import nodemailer from 'nodemailer';

export default class Email {
  // https://github.com/nodemailer/nodemailer#send-using-smtp
  constructor(options) {
    this.transporter = nodemailer.createTransport(options);
    this.from = `"${options.auth.name}"<${options.auth.user}>`;
    this.to = '';
    this.data = {};
  }

  setReceiver(receivers) {
    this.to = receivers.join(', ');
    return this;
  }

  // https://github.com/nodemailer/nodemailer#sending-mail
  send(partOfData) {
    const data = {
      from: this.from,
      to: this.to,
      subject: '',
      text: '\n',
      ...partOfData,
    };
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(data, (err, info) => {
        if (err) return reject(err);
        resolve(info);
      });
    });
  }

  static evernote2attachment(note) {
    const body = note.content.replace(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">`, '');
    const html = `<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /></head><body>${body}</body></html>`;
    return {
      filename: `${note.title}.html`,
      encoding: 'utf-8',
      content: html,
    };
  }
}
