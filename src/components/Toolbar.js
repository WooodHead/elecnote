import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import email2kindle from '../utils/email2kindle';

export default class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.send = this.send.bind(this);
  }

  send() {
    console.log('send...');
    return;
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
    return (
      <div id="toolbar">
        <Button className="button" type="primary" size="small" onClick={this.send}>
          发送到kindle
          <Icon type="upload" />
        </Button>
      </div>
    )
  }
}
