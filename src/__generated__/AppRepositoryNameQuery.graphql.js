/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type IssuesList_repository$ref = any;
type RepositoryHeader_repository$ref = any;
export type AppRepositoryNameQueryVariables = {|
  owner: string,
  name: string,
|};
export type AppRepositoryNameQueryResponse = {|
  +repository: ?{|
    +$fragmentRefs: RepositoryHeader_repository$ref & IssuesList_repository$ref
  |}
|};
export type AppRepositoryNameQuery = {|
  variables: AppRepositoryNameQueryVariables,
  response: AppRepositoryNameQueryResponse,
|};
*/


/*
query AppRepositoryNameQuery(
  $owner: String!
  $name: String!
) {
  repository(owner: $owner, name: $name) {
    ...RepositoryHeader_repository
    ...IssuesList_repository
    id
  }
}

fragment IssuesListItem_issue on Issue {
  id
  title
  createdAt
  number
}

fragment IssuesList_repository on Repository {
  issues(orderBy: {field: CREATED_AT, direction: ASC}, states: CLOSED, first: 10) {
    edges {
      node {
        ...IssuesListItem_issue
        id
        __typename
      }
      cursor
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

fragment RepositoryHeader_repository on Repository {
  __typename
  owner {
    __typename
    login
    id
  }
  name
  nameWithOwner
  createdAt
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "owner"
},
v2 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "owner"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "ASC",
      "field": "CREATED_AT"
    }
  },
  {
    "kind": "Literal",
    "name": "states",
    "value": "CLOSED"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppRepositoryNameQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RepositoryHeader_repository"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "IssuesList_repository"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AppRepositoryNameQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "login",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "nameWithOwner",
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": (v6/*: any*/),
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
                    "concreteType": "Issue",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "number",
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  },
                  {
                    "kind": "ClientExtension",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__id",
                        "storageKey": null
                      }
                    ]
                  }
                ],
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
            "storageKey": "issues(first:10,orderBy:{\"direction\":\"ASC\",\"field\":\"CREATED_AT\"},states:\"CLOSED\")"
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": [
              "orderBy",
              "states"
            ],
            "handle": "connection",
            "key": "Issues_issues",
            "kind": "LinkedHandle",
            "name": "issues"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "600014e6b523f444baaa4768db86794e",
    "id": null,
    "metadata": {},
    "name": "AppRepositoryNameQuery",
    "operationKind": "query",
    "text": "query AppRepositoryNameQuery(\n  $owner: String!\n  $name: String!\n) {\n  repository(owner: $owner, name: $name) {\n    ...RepositoryHeader_repository\n    ...IssuesList_repository\n    id\n  }\n}\n\nfragment IssuesListItem_issue on Issue {\n  id\n  title\n  createdAt\n  number\n}\n\nfragment IssuesList_repository on Repository {\n  issues(orderBy: {field: CREATED_AT, direction: ASC}, states: CLOSED, first: 10) {\n    edges {\n      node {\n        ...IssuesListItem_issue\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      hasPreviousPage\n    }\n    totalCount\n  }\n  id\n}\n\nfragment RepositoryHeader_repository on Repository {\n  __typename\n  owner {\n    __typename\n    login\n    id\n  }\n  name\n  nameWithOwner\n  createdAt\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '402a033b166cdf5b52e1195718092c84';

module.exports = node;
