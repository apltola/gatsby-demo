import React from 'react';
import { Link } from 'gatsby';

function IndexPage() {
  return (
    <div>
      <h1>Hello</h1>
      <p>My name is alskubalsku. This is a gatsby site.</p>
      <p>
        Please <Link to="/contact">contact me!!</Link>
      </p>
    </div>
  );
}

export default IndexPage;
