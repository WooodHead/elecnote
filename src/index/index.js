import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Button } from 'antd';
import Notebooks from './components/Notebooks';
import Notebook from './components/Notebook';
import Note from './components/Note';
import './index.less';

const ipcRenderer = require('electron').ipcRenderer;

const has = (key) => localStorage.getItem(key) ? true : false;

class Elecnote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSetting: has('host') && has('port') && has('user') && has('pass') && has('kindle') && has('evernote'),
      notebook: {},
      note: {},
    };
    this.setting = this.setting.bind(this);
  }

  setting() {
    ipcRenderer.send('show-setting-window');
  }

  render() {
    const { hasSetting, notebook, note } = this.state;
    if (!hasSetting) {
      return (
        <div id="root">
          <div id="init">
            <div className="title">在使用前，您需要先设置您kindle信任的发件邮箱和收件邮箱地址。</div>
            <Button type="ghost" size="large" onClick={this.setting}>去设置</Button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="root">
          <Notebooks onSelect={(notebook) => this.setState({notebook})}/>
          <Notebook {...notebook} onSelect={(note) => this.setState({note})} />
          <Note {...note} />
        </div>
      );
    }
  }
}

ReactDOM.render(<Elecnote />, document.getElementById('render'));
