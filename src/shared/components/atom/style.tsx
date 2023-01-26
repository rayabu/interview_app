// @ts-nocheck
import React from 'react';
interface Props {
  children: string;
  global?: 'true' | 'false';
}

function Style({children, global = 'false'}: Props) {
  return <style {...{jsx: 'true', global: global}}>{children}</style>;
}

export default Style;
