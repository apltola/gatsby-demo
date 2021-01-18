const path = require('path');

/* exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions;

  // lisätään markdownremark nodeihin uus kenttä: slug, jota käytetään sit blog templateen navigoimisessa.
  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');
    console.log(slug);

    // lisää uus kenttä nodeen. eli nyt markdown nodeihin tulee uus field slug
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
}; */

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 1. get path to template
  const blogTemplate = path.resolve('./src/templates/blog.js');

  try {
    // 2. get markdown data
    const res = await graphql(`
      query {
        allContentfulBlogPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);

    // 3. create new pages
    res.data.allContentfulBlogPost.edges.forEach(edge => {
      createPage({
        path: `/blog/${edge.node.slug}`, // path where page should be accessed in browser
        component: blogTemplate, // path to template file
        context: {
          slug: edge.node.slug,
        }, // additional props
      });
    });
  } catch (error) {
    console.log('create pages error!');
    throw error;
  }
};
