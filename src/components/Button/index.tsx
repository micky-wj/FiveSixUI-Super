import React from 'react';
import Group from './Group';
import { getClassName, getKeyFromNode } from '../_util/common';

import { findDOMNode } from 'react-dom';
// import Icon from '../icon';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
    return typeof str === 'string';
}

// 中文字符间加入一个空格
function insertSpace(child) {
    if (child == null) {
        return;
    }
    if (isString(child.type) && isTwoCNChar(child.props.children)) {
        return React.cloneElement(child, {},
            child.props.children.split('').join(' '));
    }
    if (isString(child)) {
        if (isTwoCNChar(child)) {
            child = child.split('').join(' ');
        }
        return <span>{child}</span>;
    }
    return child;
}
export type ButtonHtmlType = 'submit' | 'button' | 'reset';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'large';
export type ButtonType = 'default' | 'primary' | 'dashed' | 'danger' | 'ghost';

export interface ButtonProps {
    className?: string;
    icon?: string; // 暂不支持
    prefixCls?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    ghost?: boolean;
    loading?: boolean;
    htmlType?: ButtonHtmlType;
    shape?: ButtonShape;
    size?: ButtonSize;
    type?: ButtonType;
    style?: React.CSSProperties;
    onClick?: React.FormEventHandler<any>;
    onMouseUp?: React.FormEventHandler<any>;
}

export default class Button extends React.Component<ButtonProps, any> {
    static Group = Group;
    static __FIVESIX_BUTTON = true;

    static defaultProps = {
        prefixCls: 'wl-btn',
        disabled: false,
        fullWidth: false,
        ghost: false,
        loading: false,
        htmlType: 'button',
        type: 'default',
    };

    static propTypes = {
        className: React.PropTypes.string,
        icon: React.PropTypes.string,
        // disabled: React.PropTypes.bool,
        // fullWidth: React.PropTypes.bool,
        // ghost: React.PropTypes.bool,
        // loading: React.PropTypes.bool,
        htmlType: React.PropTypes.oneOf(['submit', 'button', 'reset']),
        shape: React.PropTypes.string,
        size: React.PropTypes.string,
        type: React.PropTypes.string,
        style: React.PropTypes.object,
        onClick: React.PropTypes.func,
    };

    clickedTimer: number;
    loadedTimer: number;

    constructor(props) {
        super(props);
        this.state = {
            loaded: props.loading,
            clicked: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const currentLoading = this.props.loading;
        const loaded = nextProps.loading;

        if (currentLoading) {
            clearTimeout(this.loadedTimer);
        }

        if (loaded) {
            this.loadedTimer = setTimeout(() => this.setState({ loaded }), 200);
        } else {
            this.setState({ loaded });
        }
    }

    componentWillUnmount() {
        if (this.clickedTimer) {
            clearTimeout(this.clickedTimer);
        }
        if (this.loadedTimer) {
            clearTimeout(this.loadedTimer);
        }
    }

    handleClick = (e) => {
        // 增加点击特效
        const { onClick } = this.props;

        this.setState({ clicked: true });
        clearTimeout(this.clickedTimer);
        this.clickedTimer = setTimeout(() => {
            this.setState({ clicked: false });
        onClick && onClick(e);

        }, 500);

    }

    // Handle auto focus when click button in Chrome
    handleMouseUp = (e) => {
        (findDOMNode(this) as HTMLElement).blur();
        if (this.props.onMouseUp) {
            this.props.onMouseUp(e);
        }
    }

    render() {
        const { className, prefixCls, shape, size = '', type, disabled,ghost, fullWidth, loading, icon, htmlType, children, ...others } = this.props;
        const { loaded, clicked } = this.state;

        const sizeCls = ({
            large: 'lg',
            small: 'sm',
        })[size] || '';

        // 注意这里className的设置 能够允许用户设置className
        const classes = `${className || ''} ` + getClassName(prefixCls, {
            [`${shape}`]: !!shape,
            [`${sizeCls}`]: !!sizeCls,
            [`${type}`]: !!type,
            'bg-ghost': !!ghost,
            'full-width': !!fullWidth,
            'loading': !!loaded,
            'icon-only': !children && (icon || loaded),
            clicked,
        });

        const loaderNode = loaded ? (<div className={`${prefixCls}-loader`}></div>) : '';
        const iconNode = icon ? null : '';
        // <Icon type={iconType} />
        const kids = React.Children.map(children, insertSpace);

        return <button
            type={htmlType}
            className={classes}
            disabled={!!disabled}
            onMouseUp={this.handleMouseUp}
            onClick={this.handleClick}
            {...others}
        >
            {loaderNode || iconNode}{kids}
        </button>;
    }
}
