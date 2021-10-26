/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppRepositoryNameQueryVariables = {||};
export type AppRepositoryNameQueryResponse = {|
  +repository: ?{|
    +name: string,
    +nameWithOwner: string,
    +createdAt: any,
    +issues: {|
      +edges: ?$ReadOnlyArray<?{|
        +cursor: string,
        +node: ?{|
          +id: string,
          +title: string,
          +createdAt: any,
        |},
      |}>,
      +nodes: ?$ReadOnlyArray<?{|
        +id: string,
        +title: string,
        +createdAt: any,
      |}>,
      +pageInfo: {|
        +startCursor: ?string,
        +endCursor: ?string,
        +hasNextPage: boolean,
        +hasPreviousPage: boolean,
      |},
      +totalCount: number,
    |},
  |}
|};
export type AppRepositoryNameQuery = {|
  variables: AppRepositoryNameQueryVariables,
  response: AppRepositoryNameQueryResponse,
|};
*/


/*
query AppRepositoryNameQuery {
  repository(owner: "facebook", name: "relay") {
    name
    nameWithOwner
    createdAt
    issues(orderBy: {field: CREATED_AT, direction: DESC}, states: CLOSED, first: 10) {
      edges {
        cursor
        node {
          id
          title
          createdAt
        }
      }
      nodes {
        id
        title
        createdAt
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "name",
    "value": "relay"
  },
  {
    "kind": "Literal",
    "name": "owner",
    "value": "facebook"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameWithOwner",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  },
  (v3/*: any*/)
],
v6 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 10
    },
    {
      "kind": "Literal",
      "name": "orderBy",
      "value": {
        "direction": "DESC",
        "field": "CREATED_AT"
      }
    },
    {
      "kind": "Literal",
      "name": "states",
      "value": "CLOSED"
    }
  ],
  "concreteType": "IssueConnection",
  "kind": "LinkedField",
  "name": "issues",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "IssueEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cursor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Issue",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": (v5/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Issue",
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageInfo",
      "kind": "LinkedField",
      "name": "pageInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "startCursor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "endCursor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasNextPage",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasPreviousPage",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCount",
      "storageKey": null
    }
  ],
  "storageKey": "issues(first:10,orderBy:{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"},states:\"CLOSED\")"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppRepositoryNameQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": "repository(name:\"relay\",owner:\"facebook\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppRepositoryNameQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v6/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": "repository(name:\"relay\",owner:\"facebook\")"
      }
    ]
  },
  "params": {
    "cacheID": "93ba9ef68223dc143b5499e260819a79",
    "id": null,
    "metadata": {},
    "name": "AppRepositoryNameQuery",
    "operationKind": "query",
    "text": "query AppRepositoryNameQuery {\n  repository(owner: \"facebook\", name: \"relay\") {\n    name\n    nameWithOwner\n    createdAt\n    issues(orderBy: {field: CREATED_AT, direction: DESC}, states: CLOSED, first: 10) {\n      edges {\n        cursor\n        node {\n          id\n          title\n          createdAt\n        }\n      }\n      nodes {\n        id\n        title\n        createdAt\n      }\n      pageInfo {\n        startCursor\n        endCursor\n        hasNextPage\n        hasPreviousPage\n      }\n      totalCount\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'aef57668ca9d12016379654dbc5d4d12';

module.exports = node;
