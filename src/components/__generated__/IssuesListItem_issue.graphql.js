/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type IssuesListItem_issue$ref: FragmentReference;
declare export opaque type IssuesListItem_issue$fragmentType: IssuesListItem_issue$ref;
export type IssuesListItem_issue = {|
  +id: string,
  +title: string,
  +createdAt: any,
  +$refType: IssuesListItem_issue$ref,
|};
export type IssuesListItem_issue$data = IssuesListItem_issue;
export type IssuesListItem_issue$key = {
  +$data?: IssuesListItem_issue$data,
  +$fragmentRefs: IssuesListItem_issue$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssuesListItem_issue",
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
  "type": "Issue",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '6557eb3d6a99dbc1b9db1c266b45f74b';

module.exports = node;
