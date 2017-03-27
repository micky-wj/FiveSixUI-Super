import React from 'react';
// import classNames from 'classnames';
import { getClassName, getKeyFromNode } from '../_util/common';

export type ButtonSize = 'small' | 'large';

export interface ButtonGroupProps {
  size?: ButtonSize;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}

export default function ButtonGroup(props: ButtonGroupProps) {
  const { prefixCls = 'ant-btn-group', size = '', className, ...others } = props;

  // large => lg
  // small => sm
  const sizeCls = ({
    large: 'lg',
    small: 'sm',
  })[size] || '';

  // const classes = getClassName(prefixCls, {
  //   [`${prefixCls}-${sizeCls}`]: sizeCls,
  // }, className);

  return <div {...others} className={className} />;
}
