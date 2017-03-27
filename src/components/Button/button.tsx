import React from 'react';
import { getClassName, getKeyFromNode } from '../_util/common';

import { findDOMNode } from 'react-dom';
// import Icon from '../icon';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
  return typeof str === 'string';
}

// Insert one space between two chinese characters automatically.
function insertSpace(child) {
  // Check the child if is undefined or null.
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

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'large';

export interface ButtonProps {
  type?: ButtonType;
  htmlType?: string;
  icon?: string;
  shape?: ButtonShape;
  size?: ButtonSize;
  onClick?: React.FormEventHandler<any>;
  onMouseUp?: React.FormEventHandler<any>;
  loading?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
}

export default class Button extends React.Component<ButtonProps, any> {
  static Group: any;

  static defaultProps = {
    prefixCls: 'wl-btn',
    type: 'default',
    size: 'default',
    loading: false,
    clicked: false,
    ghost: false,
  };

  static propTypes = {
    type: React.PropTypes.string,
    shape: React.PropTypes.oneOf(['circle', 'circle-outline']),
    size: React.PropTypes.oneOf(['large', 'default', 'small']),
    htmlType: React.PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: React.PropTypes.func,
    loading: React.PropTypes.bool,
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
  };

  timeout: number;
  delayTimeout: number;

  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentLoading = this.props.loading;
    const loading = nextProps.loading;

    if (currentLoading) {
      clearTimeout(this.delayTimeout);
    }

    if (loading) {
      this.delayTimeout = setTimeout(() => this.setState({ loading }), 200);
    } else {
      this.setState({ loading });
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }

  handleClick = (e) => {
    // Add click effect
    const {onClick} = this.props;

    this.setState({ clicked: true });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ clicked: false }), 500);

      onClick && onClick(e);
  }

  // Handle auto focus when click button in Chrome
  handleMouseUp = (e) => {
    (findDOMNode(this) as HTMLElement).blur();
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }
  }

  render() {
    const { type, shape, size = '', htmlType, children, icon, className, prefixCls, ghost, ...others } = this.props;
    const { loading, clicked } = this.state;

    // large => lg
    // small => sm
    const sizeCls = ({
      large: 'lg',
      small: 'sm',
    })[size] || '';

    // 注意这里className的设置 能够允许用户设置className
    const classes = `${className} ` + getClassName(prefixCls, {
      [`${type}`]: !!type,
      [`${shape}`]: !!shape,
      [`${sizeCls}`]: !!sizeCls,
      'icon-only': !children && icon,
      loading,
      clicked,
      ghost,
    });

    const iconType = loading ? 'loading' : icon;
    const iconNode = iconType ? null : null;
    // <Icon type={iconType} />
    const kids = React.Children.map(children, insertSpace);

    return (
      <button
        type={htmlType || 'button'}
        className={classes}
        onMouseUp={this.handleMouseUp}
        onClick={this.handleClick}
      >
        {iconNode}{kids}
      </button>
    );
  }
}
