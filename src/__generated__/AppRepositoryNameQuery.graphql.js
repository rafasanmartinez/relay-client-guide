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
  issuesFirst?: ?number,
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
  $issuesFirst: Int
) {
  repository(owner: $owner, name: $name) {
    ...RepositoryHeader_repository
    ...IssuesList_repository_3eY0Ee
    id
  }
}

fragment IssuesList_issue on IssueEdge {
  node {
    id
    title
    createdAt
  }
}

fragment IssuesList_repository_3eY0Ee on Repository {
  issues(orderBy: {field: CREATED_AT, direction: ASC}, states: CLOSED, first: $issuesFirst) {
    edges {
      cursor
      ...IssuesList_issue
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    totalCount
  }
}

fragment RepositoryHeader_repository on Repository {
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
  "name": "issuesFirst"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "owner"
},
v3 = [
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppRepositoryNameQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
            "args": [
              {
                "kind": "Variable",
                "name": "issuesNumber",
                "variableName": "issuesFirst"
              }
            ],
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
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AppRepositoryNameQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
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
            "args": [
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "issuesFirst"
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
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
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
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "518404ec438062a5f944af1a8748d79d",
    "id": null,
    "metadata": {},
    "name": "AppRepositoryNameQuery",
    "operationKind": "query",
    "text": "query AppRepositoryNameQuery(\n  $owner: String!\n  $name: String!\n  $issuesFirst: Int\n) {\n  repository(owner: $owner, name: $name) {\n    ...RepositoryHeader_repository\n    ...IssuesList_repository_3eY0Ee\n    id\n  }\n}\n\nfragment IssuesList_issue on IssueEdge {\n  node {\n    id\n    title\n    createdAt\n  }\n}\n\nfragment IssuesList_repository_3eY0Ee on Repository {\n  issues(orderBy: {field: CREATED_AT, direction: ASC}, states: CLOSED, first: $issuesFirst) {\n    edges {\n      cursor\n      ...IssuesList_issue\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      hasPreviousPage\n    }\n    totalCount\n  }\n}\n\nfragment RepositoryHeader_repository on Repository {\n  owner {\n    __typename\n    login\n    id\n  }\n  name\n  nameWithOwner\n  createdAt\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b15753edfecae61e18be10cec6f9e914';

module.exports = node;
