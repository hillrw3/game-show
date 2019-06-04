import React from 'react'
import App from './App'
import {mount, shallow} from "enzyme"

it('renders without crashing', () => {
  const component = shallow(<App/>)
  expect(component.text()).toContain("Spin")
})

it('opens a question when a tile is clicked', () => {
  const component = mount(<App/>)

  expect(component.find('.question-content').length).toEqual(0)

  component.find('.tile').first().simulate('click')
  component.update()

  expect(component.find('.question-content').length).toEqual(1)
})
