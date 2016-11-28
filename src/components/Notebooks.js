import React, { Component } from 'react';
import { Menu } from 'antd';
import Evernote from '../utils/Evernote';
import Notebook from './Notebook';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Notebooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stacks: [],
      openKeys: [],
      selectedKeys: [],
    };
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    Evernote.getAllNotebooks().then(notebooks => {
      console.log(notebooks);
      // 组合
      let stacks = new Map();
      notebooks.forEach(({ stack, guid, name, serviceUpdated }) => {
        if (stack === null) stack = 'NOSTACK';
        if (stacks.has(stack)) {
          stacks.get(stack).push({ guid, name, serviceUpdated });
        } else {
          stacks.set(stack, [{ guid, name, serviceUpdated }]);
        }
      });
      // 内部排序
      stacks = [...stacks.entries()];
      stacks.forEach(([stack, notebooks]) => {
        notebooks.sort((a, b) => b.serviceUpdated - a.serviceUpdated);
      });
      // 外部排序
      // stacks = [...stacks.entries()];
      stacks.sort((a, b) => {
        if (a[0] === 'NOSTACK') return 1;
        if (b[0] === 'NOSTACK') return -1;
        return b[1][0].serviceUpdated - a[1][0].serviceUpdated
      });
      // // 验证
      // console.log(stacks);
      // stacks.forEach(([stack, notebooks]) => {
      //   console.log('');
      //   console.log(stack);
      //   notebooks.forEach(({name, serviceUpdated}) => {
      //     console.log(name, new Date(serviceUpdated).toLocaleString());
      //   })
      // })
      this.state.stacks = stacks;
      this.state.openKeys = stacks.map(([stack]) => stack);
      const firstNotebook = stacks[0][1][0] || {};
      this.state.selectedKeys = [firstNotebook.guid];
      this.props.onSelect(firstNotebook);
      this.forceUpdate();
    })
  }

  onSelect({key}) {
    for (let i = 0; i < this.state.stacks.length; i++) {
      const notebooks = this.state.stacks[i][1];
      for (let j = 0; j < notebooks.length; j++) {
        const notebook = notebooks[j];
        if (notebook.guid === key) {
          this.props.onSelect(notebook);
          this.setState({selectedKeys: [key]})
          return;
        }
      }
    }
  }

  render() {
    const { stacks, selectedKeys, openKeys } = this.state;
    return (
      <div id="notebooks">
        <Menu
          className="menu"
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={this.onSelect}
          openKeys={openKeys}
          onOpenChange={(openKeys) => this.setState({openKeys})}
        >
          {stacks.map(([stack, notebooks]) => (
            <SubMenu key={stack} title={stack !== 'NOSTACK' ? stack : '默认'}>
              {notebooks.map(({ guid, name }) => (
                <Menu.Item key={guid}>{name}</Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </div>
    )
  }
}
