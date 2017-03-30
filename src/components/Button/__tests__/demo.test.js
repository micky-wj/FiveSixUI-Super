import React from 'react';
import Button from '..';
import renderer from 'react-test-renderer';

// 简陋版GUI测试
// 在最开始需要撰写简单的应用场景，在开发、迭代时会提示对界面的更改，以确保更改是符合预期的

const ButtonGroup = Button.Group;

test('Button demo basic', () => {
    const component = renderer.create(
        <div>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="danger">Danger</Button>
            <Button type="ghost">Ghost</Button>
        </div>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Button demo disabled', () => {
    const component = renderer.create(
        <div>
            <Button type="primary">Primary</Button>
            <Button type="primary" disabled>Primary(disabled)</Button>
            <br />
            <Button>Default</Button>
            <Button disabled>Default(disabled)</Button>
            <br />
            <Button>Ghost</Button>
            <Button disabled>Ghost(disabled)</Button>
            <br />
            <Button type="dashed">Dashed</Button>
            <Button type="dashed" disabled>Dashed(disabled)</Button>
        </div>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Button demo ghost', () => {
    const component = renderer.create(
        <div style={{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }}>
            <Button type="primary" ghost>Primary</Button>
            <Button ghost>Default</Button>
            <Button type="dashed" ghost>Dashed</Button>
            <Button type="danger" ghost>danger</Button>
        </div>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Button demo loading', () => {
    const component = renderer.create(
        <div>
            <Button type="primary" loading>
                Loading
        </Button>
            <Button type="primary" size="small" loading>
                Loading
        </Button>
            <br />
            <Button shape="circle" loading />
            <Button type="primary" shape="circle" loading />
        </div>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Button demo size', () => {
    const component = renderer.create(
        <div>
            <Button type="primary" size="large">Large</Button>
            <Button type="primary" size="small">Small</Button>
        </div>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Button demo fullWidth', () => {
    const component = renderer.create(
        <div>
            <Button type="primary" fullWidth>fullWidth</Button>
            <Button type="primary">Normal</Button>
        </div>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Button demo ButtonGroup', () => {
    const component = renderer.create(
        <div>
            <h4>Basic</h4>
            <ButtonGroup>
                <Button>Cancel</Button>
                <Button type="primary">OK</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button disabled>L</Button>
                <Button disabled>M</Button>
                <Button disabled>R</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button type="primary">L</Button>
                <Button>M</Button>
                <Button>M</Button>
                <Button type="dashed">R</Button>
            </ButtonGroup>
        </div>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
