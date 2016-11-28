import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import Evernote from '../utils/Evernote';
import email2kindle from '../utils/email2kindle';

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
    this.send = this.send.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.guid === nextProps.guid) return false;
    this.getNote(nextProps.guid);
    return true;
  }

  getNote(guid) {
    if (!guid) return;
    Evernote.getNote(guid).then(({ title, content }) => {
      this.setState({ title, content });
      document.getElementById('note-content').innerHTML = content;
    })
  }

  send() {
    // console.log('send...');
    // return;
    
    email2kindle([this.state]).then(info => {
      if (info.accepted.length > 0) {
        console.info('Email Success @',info.accepted.join(', '));
      }
      if (info.rejected.length > 0) {
        console.warn('Email Fail @',info.rejected.join(', '));
      }
    }).catch(err => {
      console.error(err);
    })
  }

  render() {
    const { title } = this.props;
    const { content } = this.state;
    return (
      <div id="note">
        <div id="note-top">
          <div className="title">{title}</div>
            <Button className="button" type="ghost" size="small" onClick={this.send}>
              发送到kindle
              <Icon type="upload" />
            </Button>
        </div>
        <div id="note-content"></div>
      </div>
    )
  }
}
