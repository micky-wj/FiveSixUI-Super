import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Button from '..';

const ButtonGroup = Button.Group;
// 测试覆盖率只能表明你测到了，但并不能保证所有情形你都测到了，因此使用以下情形对测试case进行约束
// 以下为大致的测试步骤，使用渐进的顺序

// step1. test custom use 
//        正常场景测试，主要测试是否会报错，倾向使用shallow以加快测试速度；
// step2. test special use 
//        特殊、异常使用场景测试，主要测试是否会报错；
// step3. test props
//        API测试，普通属性测试，按照属性维度，测试正常值、异常值表现是否符合预期，此时测试更追求正确性，注意使用setProps函数对组件的表现进行动态跟踪；
// step4. test action props
//        API测试，事件属性测试，使用mock的方式，考察动作函数是否正常触发、触发时机、触发参数等是否符合预期；
// step5. test user interaction
//        用户行为测试，模拟用户动作，如多次点击、重复操作等；
// step6. test func
//        纯函数测试
// step7. test additional
//        其他补充测试

describe('Button', () => {
  // step1. test custom use
  // 此时列举常见场景，可使用shallow的方式查看正常使用方式的正确性；
  it('test custom use for: button', () => {
    const wrapper = shallow(
      <div>
        <Button>Button</Button>
      </div>
    );
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('test custom use for: button group', () => {
    const wrapper = shallow(
      <div>
        <ButtonGroup>
          <Button>Button1</Button>
          <Button>Button2</Button>
          <Button>Button3</Button>
        </ButtonGroup>
      </div>
    );
    expect(wrapper.find(ButtonGroup)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(3);
  });

  // step2. test special use
  // 此时列举极端使用场景，使异常情形下不至于出现不可收敛的错误；

  it('test special use for multi props', () => {
    const wrapper = mount(
      <div>
        <ButtonGroup size="large">
          <Button disabled fullWidth ghost loading shape="circle" size="large" type="Button">Button</Button>
          <Button disabled fullWidth ghost loading shape="circle" size="large" type="Button">Button</Button>
        </ButtonGroup>
      </div>
    );
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(ButtonGroup)).toHaveLength(1);
  });

  it('test special use for wrong props', () => {
    const wrapper = mount(
      <div>
        <Button shape="square">Button1</Button>
        <Button size="default">Button2</Button>
        <Button type="second">Button3</Button>
      </div>
    );
    expect(wrapper.find(Button)).toHaveLength(3);
  });

  // step3. test props 
  // 逐个测试传入属性，并尽可能的测试多种情形，此时需渲染出来进行测试，需使用mount；
  // 可参考测试路线：无、有（正常值、异常值）、搭配

  it('test button props: disabled', () => {

    let wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button>Button1</Button>
      </div>
    );
    // 无
    expect(wrapper.find('.wl-btn').at(0).props().disabled).toBe(false);

    // 有：正常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button disabled={true}>Button1</Button>
        <Button disabled={false}>Button2</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).props().disabled).toBe(true);
    expect(wrapper.find('.wl-btn').at(1).props().disabled).toBe(false);

    // 有：异常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button disabled="disabled">Button1</Button>
        <Button disabled="true">Button2</Button>
        <Button disabled>Button3</Button>
        <Button disabled={null}>Button4</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).props().disabled).toBe(true);
    expect(wrapper.find('.wl-btn').at(1).props().disabled).toBe(true);
    expect(wrapper.find('.wl-btn').at(2).props().disabled).toBe(true);
    expect(wrapper.find('.wl-btn').at(3).props().disabled).toBe(false);
  });

  it('test button props: fullWidth', () => {
    let wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button>Button1</Button>
      </div>
    );
    // 无
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-full-width')).toBe(false);

    // 有：正常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button fullWidth={true}>Button1</Button>
        <Button fullWidth={false}>Button2</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-full-width')).toBe(true);
    expect(wrapper.find('.wl-btn').at(1).hasClass('wl-btn-full-width')).toBe(false);


    // 有：异常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button fullWidth="fullWidth">Button1</Button>
        <Button fullWidth="true">Button2</Button>
        <Button fullWidth>Button3</Button>
        <Button fullWidth={null}>Button4</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-full-width')).toBe(true);
    expect(wrapper.find('.wl-btn').at(1).hasClass('wl-btn-full-width')).toBe(true);
    expect(wrapper.find('.wl-btn').at(2).hasClass('wl-btn-full-width')).toBe(true);
    expect(wrapper.find('.wl-btn').at(3).hasClass('wl-btn-full-width')).toBe(false);
  });

  it('test button props: ghost', () => {
    let wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button>Button1</Button>
      </div>
    );
    // 无
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-bg-ghost')).toBe(false);

    // 有：正常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button ghost={true}>Button1</Button>
        <Button ghost={false}>Button2</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-bg-ghost')).toBe(true);
    expect(wrapper.find('.wl-btn').at(1).hasClass('wl-btn-bg-ghost')).toBe(false);


    // 有：异常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button ghost="ghost">Button1</Button>
        <Button ghost="true">Button2</Button>
        <Button ghost>Button3</Button>
        <Button ghost={null}>Button4</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-bg-ghost')).toBe(true);
    expect(wrapper.find('.wl-btn').at(1).hasClass('wl-btn-bg-ghost')).toBe(true);
    expect(wrapper.find('.wl-btn').at(2).hasClass('wl-btn-bg-ghost')).toBe(true);
    expect(wrapper.find('.wl-btn').at(3).hasClass('wl-btn-bg-ghost')).toBe(false);
  });

  it('test button props: loading', () => {
    let wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button>Button1</Button>
      </div>
    );
    // 无
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-loading')).toBe(false);

    // 有：正常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button loading={true}>Button1</Button>
        <Button loading={false}>Button2</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-loading')).toBe(true);
    expect(wrapper.find('.wl-btn').at(1).hasClass('wl-btn-loading')).toBe(false);


    // 有：异常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button loading="loading">Button1</Button>
        <Button loading="true">Button2</Button>
        <Button loading>Button3</Button>
        <Button loading={null}>Button4</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-loading')).toBe(true);
    expect(wrapper.find('.wl-btn').at(1).hasClass('wl-btn-loading')).toBe(true);
    expect(wrapper.find('.wl-btn').at(2).hasClass('wl-btn-loading')).toBe(true);
    expect(wrapper.find('.wl-btn').at(3).hasClass('wl-btn-loading')).toBe(false);
  });

  it('test button props: htmlType', () => {
    let wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button>Button1</Button>
      </div>
    );
    // 无
    expect(wrapper.find('.wl-btn').at(0).props().type).toBe('button');

    // 有：正常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button htmlType="button">Button1</Button>
        <Button htmlType="submit">Button2</Button>
        <Button htmlType="reset">Button3</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).props().type).toBe('button');
    expect(wrapper.find('.wl-btn').at(1).props().type).toBe('submit');
    expect(wrapper.find('.wl-btn').at(2).props().type).toBe('reset');
  });

  it('test button props: shape', () => {
    let wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button>Button1</Button>
      </div>
    );
    // 无
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-circle')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-circle-outline')).toBe(false);

    // 有：正常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button shape="circle">Button1</Button>
        <Button shape="circle-outline">Button2</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-circle')).toBe(true);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-circle-outline')).toBe(false);
    expect(wrapper.find('.wl-btn').at(1).hasClass('wl-btn-circle')).toBe(false);
    expect(wrapper.find('.wl-btn').at(1).hasClass('wl-btn-circle-outline')).toBe(true);


    // 有：异常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button shape="square">Button1</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-circle')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-circle-outline')).toBe(false);
  });

  it('test button props: size', () => {
    let wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button>Button1</Button>
      </div>
    );
    // 无
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-sm')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-lg')).toBe(false);

    // 有：正常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button size="small">Button1</Button>
        <Button size="large">Button2</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-sm')).toBe(true);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-lg')).toBe(false);
    expect(wrapper.find('.wl-btn').at(1).hasClass('wl-btn-sm')).toBe(false);
    expect(wrapper.find('.wl-btn').at(1).hasClass('wl-btn-lg')).toBe(true);


    // 有：异常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button size="big">Button1</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-sm')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-lg')).toBe(false);
  });

  it('test button props: type', () => {
    let wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button>Button1</Button>
      </div>
    );
    // 无
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-primary')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-dashed')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-danger')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-ghost')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-default')).toBe(true);

    // 有：正常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button type="primary">Button1</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-primary')).toBe(true);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-dashed')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-danger')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-ghost')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-default')).toBe(false);


    // 有：异常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <Button type="other">Button1</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-primary')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-dashed')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-danger')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-ghost')).toBe(false);
    expect(wrapper.find('.wl-btn').at(0).hasClass('wl-btn-default')).toBe(false);
  });

  it('test button props: className', () => {
    const wrapper = mount(
      <div>
        <Button className="test">Button1</Button>
      </div>
    );
    expect(wrapper.find('.wl-btn.test')).toHaveLength(1);
  });

  it('test buttonGroup props: size', () => {
    let wrapper = mount( // 渲染出来 必须使用mount
      <ButtonGroup>
        <Button>Button1</Button>
      </ButtonGroup>
    );
    // 无
    expect(wrapper.find('.wl-btn-group').at(0).hasClass('wl-btn-group-sm')).toBe(false);
    expect(wrapper.find('.wl-btn-group').at(0).hasClass('wl-btn-group-lg')).toBe(false);

    // 有：正常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <ButtonGroup size="small">Button1</ButtonGroup>
        <ButtonGroup size="large">Button2</ButtonGroup>
      </div>
    );
    expect(wrapper.find('.wl-btn-group').at(0).hasClass('wl-btn-group-sm')).toBe(true);
    expect(wrapper.find('.wl-btn-group').at(0).hasClass('wl-btn-group-lg')).toBe(false);
    expect(wrapper.find('.wl-btn-group').at(1).hasClass('wl-btn-group-sm')).toBe(false);
    expect(wrapper.find('.wl-btn-group').at(1).hasClass('wl-btn-group-lg')).toBe(true);


    // 有：异常值
    wrapper = mount( // 渲染出来 必须使用mount
      <div>
        <ButtonGroup size="big">Button1</ButtonGroup>
      </div>
    );
    expect(wrapper.find('.wl-btn-group').at(0).hasClass('wl-btn-group-sm')).toBe(false);
    expect(wrapper.find('.wl-btn-group').at(0).hasClass('wl-btn-group-lg')).toBe(false);
  });

  it('test buttonGroup props: className', () => {
    const wrapper = mount(
      <div>
        <ButtonGroup className="test">
          <Button>Button1</Button>
        </ButtonGroup>
      </div>
    );
    expect(wrapper.find('.wl-btn-group.test')).toHaveLength(1);
  });

  // step4. test action props
  // 测试传入事件，事件是否正确触发，触发参数是否正常？
  it('test action: onClick', () => {
    const onClickButton = jest.fn();
    const wrapper = mount(
      <div>
        <Button onClick={onClickButton}></Button>
      </div>
    );
    wrapper.find('.wl-btn').at(0).simulate('click');
    expect(onClickButton).toHaveBeenCalledTimes(1);
  });
  // step5. test user interaction
  // 模拟用户操作顺序，进行相关属性的行为测试
  it('test action: disabled click', () => {
    const onClickButton = jest.fn();
    const wrapper = mount(
      <div>
        <Button disabled onClick={onClickButton}></Button>
      </div>
    );
    wrapper.find('.wl-btn').at(0).simulate('click');
    expect(onClickButton).toHaveBeenCalledTimes(0);
  });

  // step6. test additional
  // 测试一些其他相关函数
  it('have static perperty for type detecting', () => {
    const wrapper = mount(
      <Button>Button Text</Button>
    );
    // eslint-disable-next-line
    expect(wrapper.type().__FIVESIX_BUTTON).toBe(true);
  });
  it('renders Chinese characters correctly', () => {
    const wrapper = render(
      <Button>按钮</Button>
    );
    expect(wrapper.text()).toEqual('按 钮');
  });
});
