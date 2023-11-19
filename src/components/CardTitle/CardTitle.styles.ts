'use client'

import styled, { css } from 'styled-components'

export const Title = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes['sm']};
    color: ${theme.colors.zinc[800]};
    font-weight: ${theme.fontWeights.light};
    display: flex;
    justify-content: space-between;
    gap: ${theme.spacings[4]};
  `}
`
