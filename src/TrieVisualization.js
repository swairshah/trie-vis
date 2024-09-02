
import React, { useState, useMemo } from 'react';
import buttons from './Buttons'; // Make sure this import is correct

class TrieNode {
  constructor() {
    this.children = {};
    this.buttons = new Set();
    this.isEndOfQuery = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(query, buttonId) {
    let node = this.root;
    for (let char of query.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
      node.buttons.add(buttonId);
    }
    node.isEndOfQuery = true;
  }

  getSubtree(prefix) {
    let node = this.root;
    for (let char of prefix.toLowerCase()) {
      if (!node.children[char]) return null;
      node = node.children[char];
    }
    return node;
  }
}

const TreeNode = ({ char, node, query }) => {
  if (!node) return null;

  return (
    <li>
      <div className="node-content">
        <span className="node-char">{char}</span>
        {node.buttons.size > 0 && (
          <span className="node-buttons">
            ({Array.from(node.buttons).join(', ')})
          </span>
        )}
      </div>
      {Object.keys(node.children).length > 0 && (
        <ul>
          {Object.entries(node.children).map(([childChar, childNode]) => (
            <TreeNode key={childChar} char={childChar} node={childNode} query={query} />
          ))}
        </ul>
      )}
    </li>
  );
};

const TrieVisualization = () => {
  const [query, setQuery] = useState('');
  
  const trie = useMemo(() => {
    const newTrie = new Trie();
    buttons.forEach(button => {
      button.queries.forEach(query => {
        newTrie.insert(query, button.id);
      });
    });
    return newTrie;
  }, []);

  const [subtree, setSubtree] = useState(trie.root);

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSubtree(trie.getSubtree(newQuery) || trie.root);
  };

  return (
    <div className="trie-visualization">
      <h1>Trie Visualization</h1>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Type your query here"
        className="query-input"
      />
      <div className="tree-container">
        <ul className="tree">
          <TreeNode char="root" node={subtree} query={query} />
        </ul>
      </div>
    </div>
  );
};

const styles = `
.trie-visualization {
  font-family: Arial, sans-serif;
  padding: 10px;
  max-width: 100%;
  margin: 0 auto;
  overflow-x: auto;
}

.query-input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 14px;
}

.tree-container {
  padding: 10px;
  border-radius: 5px;
  overflow: auto;
}

.tree, .tree ul, .tree li {
  position: relative;
}

.tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-origin: top center;
  transform: scale(0.8);
}

.tree ul {
  display: flex;
  padding: 10px 0;
}

.tree li {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5px;
}

.tree li::before,
.tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid #ccc;
  width: 50%;
  height: 10px;
}

.tree li:only-child::after, 
.tree li:only-child::before {
  display: none;
}

.tree li:only-child {
  padding-top: 0;
}

.tree li:first-child::before, 
.tree li:last-child::after {
  border: 0 none;
}

.tree li:last-child::before {
  border-right: 1px solid #ccc;
  border-radius: 0 3px 0 0;
}

.tree li:first-child::after {
  border-radius: 3px 0 0 0;
}

.node-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-align: center;
  font-size: 12px;
}

.node-char {
  font-weight: bold;
  margin-bottom: 2px;
}

.node-buttons {
  font-size: 0.7em;
  color: blue;
}
`

const styles2 = `
  .trie-visualization {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 100%;
    margin: 0 auto;
    overflow-x: auto;
  }

  .query-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
  }

  .tree-container {
    padding: 20px;
    border-radius: 5px;
    overflow: auto;
  }

  .tree, .tree ul, .tree li {
    position: relative;
  }

  .tree {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tree ul {
    display: flex;
    padding: 20px 0;
  }

  .tree li {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
  }

  .tree li::before {
    content: '';
    position: absolute;
    top: 0;
    right: 50%;
    border-top: 1px solid #ccc;
    width: 50%;
    height: 20px;
  }

  .tree li::after {
    content: '';
    position: absolute;
    top: 0;
    right: 50%;
    border-top: 1px solid #ccc;
    width: 50%;
    height: 20px;
  }

  .tree li:only-child::after, .tree li:only-child::before {
    display: none;
  }

  .tree li:only-child {
    padding-top: 0;
  }

  .tree li:first-child::before, .tree li:last-child::after {
    border: 0 none;
  }

  .tree li:last-child::before {
    border-right: 1px solid #ccc;
    border-radius: 0 5px 0 0;
  }

  .tree li:first-child::after {
    border-radius: 5px 0 0 0;
  }

  .node-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }

  .node-char {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .node-buttons {
    font-size: 0.8em;
    color: blue;
  }
`;

const TrieVis = () => (
  <>
    <style>{styles}</style>
    <TrieVisualization />
  </>
);

export default TrieVis;
