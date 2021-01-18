import React from 'react';
import { graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import Img from 'gatsby-image';

import '../../styles/blogpost.css';

/* export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`; */

/* function Blog(props) {
  const {
    data: { markdownRemark },
  } = props;

  console.log('template props ', markdownRemark);
  return (
    <div>
      <header className="post-header">
        <h1>{markdownRemark.frontmatter.title}</h1>
        <span className="post-date">{markdownRemark.frontmatter.date}</span>
      </header>
      <section
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
      ></section>
    </div>
  );
} */

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            fluid(maxWidth: 800) {
              src
            }
            __typename
          }
        }
      }
    }
  }
`;

const Bold = ({ children }) => <span className="bold">{children}</span>;
const Text = ({ children }) => <p className="align-center">{children}</p>;

function Blog({ data }) {
  const { title, publishedDate, body } = data.contentfulBlogPost;

  const textRenderOptions = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.EMBEDDED_ASSET]: node => {
        console.log('mitä tääl on?', node);
        return (
          <React.Fragment>
            <Img alt="kuva" src={node.data.target.fluid.src} />
          </React.Fragment>
        );
      },
    },
  };

  return (
    <div>
      <header className="post-header">
        <h1>{title}</h1>
        <span className="post-date">{publishedDate}</span>
      </header>
      <section>
        {renderRichText(body, textRenderOptions)}
        {/* documentToReactComponents(
          JSON.parse(contentfulBlogPost.body.raw),
          textRenderOptions
        ) */}
      </section>
    </div>
  );
}

export default Blog;
