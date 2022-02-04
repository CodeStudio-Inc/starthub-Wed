import {render, fireEvent} from '@testing-library/react'
import Loans from './index'

it('testMyInputs', () => {
    const {queryByPlaceholderText} = render(<Loans/>)
    const input = queryByPlaceholderText('Amount')
    expect(input).toHaveLength(1)
})