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
  +number: number,
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "number",
      "storageKey": null
    }
  ],
  "type": "Issue",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '81edffd9c81a3cf46c1466eac0752d2d';

module.exports = node;
