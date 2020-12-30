import styled from "@emotion/styled"
import { rhythm } from "../../../utils/typography"

const BlogContent = styled.div`
  overflow: auto;
  
  p {
      text-align: justify;
  }

  pre {
    background-color: rgb(210, 210, 210);
    padding: ${rhythm(1 / 2)};
    border-radius: 5px;

    code {
      color: rgb(26, 29, 33, 1);
    }
  }
`

export default BlogContent