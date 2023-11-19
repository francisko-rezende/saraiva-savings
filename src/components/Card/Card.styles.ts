'use client'

import styled, { css } from 'styled-components'

export const Wrapper = styled.article`
  ${({ theme }) => css`
    padding: ${theme.spacings[6]};
    background-color: ${theme.colors.zinc[950]};
    border-radius: ${theme.borderRadius.md};
    border: ${theme.colors.gray[200]} solid 1px;
    box-shadow: ${theme.shadows.medium};
  `}
`
