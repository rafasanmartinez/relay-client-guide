/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddCommentInput = {|
  body: string,
  clientMutationId?: ?string,
  subjectId: string,
|};
export type IssueAddCommentMutationVariables = {|
  input: AddCommentInput,
  connections: $ReadOnlyArray<string>,
|};
export type IssueAddCommentMutationResponse = {|
  +addComment: ?{|
    +clientMutationId: ?string,
    +commentEdge: ?{|
      +cursor: string,
      +node: ?{|
        +author: ?{|
          +login: string
        |},
        +publishedAt: ?any,
        +id: string,
        +body: string,
      |},
    |},
    +subject: ?{|
      +id: string
    |},
  |}
|};
export type IssueAddCommentMutation = {|
  variables: IssueAddCommentMutationVariables,
  response: IssueAddCommentMutationResponse,
|};
*/


/*
mutation IssueAddCommentMutation(
  $input: AddCommentInput!
) {
  addComment(input: $input) {
    clientMutationId
    commentEdge {
      cursor
      node {
        author {
          __typename
          login
          ... on Node {
            __isNode: __typename
            id
          }
        }
        publishedAt
        id
        body
      }
    }
    subject {
      __typename
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientMutationId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "login",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "publishedAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "body",
  "storageKey": null
},
v9 = [
  (v7/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueAddCommentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AddCommentPayload",
        "kind": "LinkedField",
        "name": "addComment",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "IssueCommentEdge",
            "kind": "LinkedField",
            "name": "commentEdge",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "IssueComment",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "author",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "subject",
            "plural": false,
            "selections": (v9/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "IssueAddCommentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AddCommentPayload",
        "kind": "LinkedField",
        "name": "addComment",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "IssueCommentEdge",
            "kind": "LinkedField",
            "name": "commentEdge",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "IssueComment",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "author",
                    "plural": false,
                    "selections": [
                      (v10/*: any*/),
                      (v5/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v9/*: any*/),
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "commentEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "subject",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4692eeb63394a0e59b7ce6d216cc1ff3",
    "id": null,
    "metadata": {},
    "name": "IssueAddCommentMutation",
    "operationKind": "mutation",
    "text": "mutation IssueAddCommentMutation(\n  $input: AddCommentInput!\n) {\n  addComment(input: $input) {\n    clientMutationId\n    commentEdge {\n      cursor\n      node {\n        author {\n          __typename\n          login\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        publishedAt\n        id\n        body\n      }\n    }\n    subject {\n      __typename\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '657011937d71b97db431a58c475f16c5';

module.exports = node;
