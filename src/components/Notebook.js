import React, { Component } from 'react';
import { Menu } from 'antd';
import Evernote from '../utils/Evernote';
import Note from './Note';

export default class Notebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      selectedKeys: [],
    };
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.guid === nextProps.guid) return false;
    this.getNotebook(nextProps.guid);
    return true;
  }

  getNotebook(guid) {
    Evernote.getNotebook(guid).then(({ notes }) => {
      this.state.notes = notes.map(({ guid, title }) => ({ guid, title }));
      const firstNote = this.state.notes[0] || {};
      this.state.selectedKeys = [firstNote.guid];
      this.props.onSelect(firstNote);
      this.forceUpdate();
    })
  }

  onSelect({key}) {
    const note = this.state.notes.find(({guid}) => guid === key);
    this.props.onSelect(note);
  }

  render() {
    const { name } = this.props;
    const { notes, selectedKeys } = this.state;
    return (
      <div id="notebook">
        <div className="top">{name}</div>
        <Menu
          className="menu"
          selectedKeys={selectedKeys}
          onSelect={this.onSelect}
        >
          {notes.map(({ guid, title }) => (
            <Menu.Item key={guid}>{title}</Menu.Item>
          ))}
        </Menu>
      </div>
    )
  }
}

const styles = {
  container: {
  },
};
