import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import '../../styles/layout.css';

function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `);

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1 className="app-title">{data.site.siteMetadata.title}</h1>
        <nav className="app-nav">
          <ul>
            <li>
              <Link to="/" activeClassName="link-active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" activeClassName="link-active">
                About
              </Link>
            </li>
            <li>
              <Link to="/blog" activeClassName="link-active">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" activeClassName="link-active">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        © {data.site.siteMetadata.author} 2021
      </footer>
    </div>
  );
}

export default Layout;
