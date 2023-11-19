'use client'

import styled, { css } from 'styled-components'

export const Value = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes['3xl']};
    color: ${theme.colors.zinc[950]};
    font-weight: ${theme.fontWeights.medium};
  `}
`
