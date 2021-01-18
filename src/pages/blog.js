import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import '../../styles/blogpage.css';

function BlogPage() {
  // usestaticquery -> query data at build time
  /* const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `); */

  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            title
            slug
            publishedDate(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  `);

  const {
    allContentfulBlogPost: { edges },
  } = data;

  return (
    <div>
      <h1>Blog posts</h1>
      <ol className="blog-list">
        {edges.map(edge => {
          const {
            node: { title, slug, publishedDate },
          } = edge;

          console.log('sluggi -', slug);

          return (
            <li key={`${slug}`} className="blog-list-item">
              <Link to={`/blog/${slug}`} className="blog-link">
                <span className="blog-link-title">{title}</span>,
                <span className="blog-link-date">{publishedDate}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default BlogPage;
