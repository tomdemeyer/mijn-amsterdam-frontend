import React from 'react';
import styles from './LoadingContent.module.scss';
import { ComponentChildren } from 'App.types';
import classnames from 'classnames';

type width = string;
type height = string;
type marginBottom = string;

export type BarConfig = Array<[width, height, marginBottom]>;

export interface ComponentProps {
  children?: ComponentChildren;
  barConfig?: BarConfig;
  className?: string;
}

const defaultBarConfig: BarConfig = [
  ['70%', '2rem', '.7rem'],
  ['90%', '2rem', '.7rem'],
  ['90%', '2rem', '.7rem'],
  ['40%', '2rem', '0'],
];

export default function LoadingContent({
  barConfig = defaultBarConfig,
  className,
}: ComponentProps) {
  return (
    <div className={classnames(styles.LoadingContent, className)}>
      {barConfig.map(([width, height, marginBottom], index) => {
        return (
          <div
            key={index}
            style={{
              width,
              height,
              marginBottom,
            }}
          />
        );
      })}
    </div>
  );
}
