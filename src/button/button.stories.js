import React from 'react';
import { storiesOf } from '@storybook/react';
import { LUButton } from './button';

storiesOf('LUButton', module)
  .add('simple button', () => (
    <LUButton label="LUButton"/>
  )) 