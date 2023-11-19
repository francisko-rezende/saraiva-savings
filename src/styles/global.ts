import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: 'Inter';
  src:
    url('/fonts/inter.ttf') format('truetype');
  font-weight: 100 900;
  font-display: fallback;
}

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root, #__next {
  isolation: isolate;
}
`
