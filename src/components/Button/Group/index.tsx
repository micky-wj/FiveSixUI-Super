import React from 'react';
import { getClassName, getKeyFromNode } from '../../_util/common';

export type ButtonSize = 'small' | 'large';

export interface ButtonGroupProps {
  className?: string;
  prefixCls?: string;
  size?: ButtonSize;
  style?: React.CSSProperties;
}

export default function ButtonGroup(props: ButtonGroupProps) {
  const { prefixCls = 'wl-btn-group', size = '', className, ...others } = props;

  // large => lg
  // small => sm
  const sizeCls = ({
    large: 'lg',
    small: 'sm',
  })[size] || '';

  // 注意这里className的设置 能够允许用户设置className
  const classes = `${className || ''} ` + getClassName(prefixCls, {
    [`${sizeCls}`]: !!sizeCls,
  });

  return <div className={classes} {...others}/>;
}
