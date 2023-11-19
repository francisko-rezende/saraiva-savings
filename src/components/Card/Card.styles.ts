'use client'

import styled, { css } from 'styled-components'

export const Wrapper = styled.article`
  ${({ theme }) => css`
    padding: ${theme.spacings[6]};
    background-color: ${theme.colors.zinc[50]};
    border-radius: ${theme.borderRadius.md};
    border: ${theme.colors.zinc[900]} solid 1px;
    box-shadow: ${theme.shadows.medium};
  `}
`
