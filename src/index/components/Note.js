import React, { Component } from 'react';
import { Button, Icon, Spin, notification } from 'antd';
import Evernote from '../../utils/Evernote';
import email2kindle from '../../utils/email2kindle';

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      sending: false,
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
    this.setState({sending: true});
    const { title, content } = this.state;
    email2kindle([this.state]).then(info => {
      this.setState({sending: false});
      if (info.accepted.length > 0) {
        console.info('Email Success @',info.accepted.join(', '));
        notification.success({
          message: '推送成功！',
          description: title,
        })
      }
      if (info.rejected.length > 0) {
        console.warn('Email Fail @',info.rejected.join(', '));
        notification.error({
          message: '推送失败！',
          description: title,
        })
      }
    }).catch(err => {
      this.setState({sending: false});
      console.error(err);
      notification.error({
        message: '推送出现了问题！',
        description: '可能需要先设置你的SMTP邮箱!',
      })
    });
  }

  render() {
    const { title } = this.props;
    const { content, sending } = this.state;
    return (
      <div id="note">
        <div className="top">
          {title}
          {sending ?
            <Spin className="spin" size="small" /> :
            <Button className="button" type="ghost" size="small" onClick={this.send}>
              发送到kindle
              <Icon type="upload" />
            </Button>
          }
        </div>
        <div id="note-content"></div>
      </div>
    )
  }
}
