import { shallow } from 'enzyme'
import * as React from 'react'
import App from './app'

describe('App', () => {
  it('should render correctly', () => {
    const app = shallow(<App />)
    expect(app).toMatchSnapshot()
  })
})
