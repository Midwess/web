'use client';

import { findLast } from 'lodash';

export enum Responsive {
  SMALL,
  MEDIUM,
  LARGE,
  XL,
  XXL,
}

const ResponsiveMap = {
  [Responsive.SMALL]: (size: number) => size > 640,
  [Responsive.MEDIUM]: (size: number) => size >= 768,
  [Responsive.LARGE]: (size: number) => size >= 1024,
  [Responsive.XL]: (size: number) => size >= 1280,
  [Responsive.XXL]: (size: number) => size >= 1536,
};

export type ResponsiveMatchItem = [Responsive, number];

export const responsiveMatch = (
  defaultVal: number,
  ...args: ResponsiveMatchItem[]
): number => {
  const size = (global.window && window.innerWidth) || 0;
  if (!size) return defaultVal;

  if (!args || !args.length) return defaultVal;

  let foundMatchedResponsiveValue = Object.entries(ResponsiveMap)
    .filter(([, match]) => {
      return match(size);
    })
    .map(([key]) => {
      const value = args.find((it) => it && it[0] && it[0].toString() === key);
      return [key, value?.[1]];
    });

  foundMatchedResponsiveValue = findLast(
    foundMatchedResponsiveValue,
    ([, value]) => !!value,
  ) as never;

  return (foundMatchedResponsiveValue?.[1] ?? defaultVal) as unknown as number;
};
