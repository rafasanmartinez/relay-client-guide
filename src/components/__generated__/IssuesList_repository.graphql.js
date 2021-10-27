/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type IssuesList_issue$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type IssuesList_repository$ref: FragmentReference;
declare export opaque type IssuesList_repository$fragmentType: IssuesList_repository$ref;
export type IssuesList_repository = {|
  +issues: {|
    +edges: ?$ReadOnlyArray<?{|
      +cursor: string,
      +$fragmentRefs: IssuesList_issue$ref,
    |}>,
    +pageInfo: {|
      +startCursor: ?string,
      +endCursor: ?string,
      +hasNextPage: boolean,
      +hasPreviousPage: boolean,
    |},
    +totalCount: number,
  |},
  +$refType: IssuesList_repository$ref,
|};
export type IssuesList_repository$data = IssuesList_repository;
export type IssuesList_repository$key = {
  +$data?: IssuesList_repository$data,
  +$fragmentRefs: IssuesList_repository$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "issuesFirst"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssuesList_repository",
  "selections": [
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "IssuesList_issue"
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
    }
  ],
  "type": "Repository",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'f8e9c0018213db37e965201fbe2fced6';

module.exports = node;
