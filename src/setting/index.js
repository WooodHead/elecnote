import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Steps, message, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import './index.less';

const steps = [{
  title: 'SMTP',
  content: 'First-content',
}, {
  title: 'Kindle',
  content: 'Second-content',
}, {
  title: 'Done',
  content: 'Last-content',
}];

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      smtp: {
        host: { value: localStorage.getItem('host'), placeholder: '发送邮件服务器' },
        port: { value: localStorage.getItem('port'), placeholder: '端口号' },
        user: { value: localStorage.getItem('user'), placeholder: '邮箱账户名' },
        pass: { value: localStorage.getItem('pass'), placeholder: '邮箱密码' },
      },
      kindle: { value: localStorage.getItem('kindle'), placeholder: '发送至Kindle电子邮箱' },
    };
    this.next = this.next.bind(this);
  }

  next() {
    const { currentStep, smtp, kindle } = this.state;
    switch (currentStep) {
      case 0:
        Object.keys(smtp).forEach(name => {
          localStorage.setItem(name, smtp[name].value);
        });
        this.setState({currentStep: this.state.currentStep + 1});
        break;
      case 1:
        localStorage.setItem('kindle', kindle.value);
        this.setState({currentStep: this.state.currentStep + 1});
        break;
      case 2:
        window.close();
        break;
      default:
        break;
    }
  }

  render() {
    const { currentStep, smtp, kindle } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 12, offset: 8 },
    };
    return (
      <div id="root">
        <Steps current={currentStep}>
          {steps.map(item => <Steps.Step key={item.title} title={item.title} />)}
        </Steps>
        <Form horizontal onSubmit={this.handleSubmit}>
          {currentStep === 0 && Object.keys(smtp).map(name => (
            <Form.Item key={name} label={name} {...formItemLayout}>
              <Input {...smtp[name]} onChange={(e) => {
                this.state.smtp[name].value = e.target.value;
                this.forceUpdate();
              }}/>
            </Form.Item>
          ))}
          {currentStep === 1 && (
            <Form.Item label="kindle" {...formItemLayout}>
              <Input {...kindle} onChange={(e) => {
                this.state.kindle.value = e.target.value;
                this.forceUpdate();
              }}/>
            </Form.Item>
          )}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" onClick={this.next} style={{ width: '60%' }}>
              {currentStep === 2 ? '完成' : '下一步'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<Setting />, document.getElementById('render'));
