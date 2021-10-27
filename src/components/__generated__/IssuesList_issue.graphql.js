/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type IssuesList_issue$ref: FragmentReference;
declare export opaque type IssuesList_issue$fragmentType: IssuesList_issue$ref;
export type IssuesList_issue = {|
  +node: ?{|
    +id: string,
    +title: string,
    +createdAt: any,
  |},
  +$refType: IssuesList_issue$ref,
|};
export type IssuesList_issue$data = IssuesList_issue;
export type IssuesList_issue$key = {
  +$data?: IssuesList_issue$data,
  +$fragmentRefs: IssuesList_issue$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssuesList_issue",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Issue",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "createdAt",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IssueEdge",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '23b373d5a23754010162d9fc27ec990a';

module.exports = node;
