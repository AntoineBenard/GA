import React from 'react';
import renderer from 'react-test-renderer';
import Logger from '../component/Logger';

it('Logger snapshot', () => {
  const tree = renderer
    .create(<Logger logs={[{ line: 1, value: 'coucou' }]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
