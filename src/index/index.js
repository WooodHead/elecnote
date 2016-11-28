import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Notebooks from './components/Notebooks';
import Notebook from './components/Notebook';
import Note from './components/Note';
import './index.less';

class Elecnote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebook: {},
      note: {},
    };
  }

  render() {
    const { notebook, note } = this.state;
    return (
      <div id="root">
        <Notebooks onSelect={(notebook) => this.setState({notebook})}/>
        <Notebook {...notebook} onSelect={(note) => this.setState({note})} />
        <Note {...note} />
      </div>
    )
  }
}

ReactDOM.render(<Elecnote />, document.getElementById('render'));
