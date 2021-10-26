/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type AppRepositoryHeader_repository$ref: FragmentReference;
declare export opaque type AppRepositoryHeader_repository$fragmentType: AppRepositoryHeader_repository$ref;
export type AppRepositoryHeader_repository = {|
  +owner: {|
    +login: string
  |},
  +name: string,
  +nameWithOwner: string,
  +createdAt: any,
  +$refType: AppRepositoryHeader_repository$ref,
|};
export type AppRepositoryHeader_repository$data = AppRepositoryHeader_repository;
export type AppRepositoryHeader_repository$key = {
  +$data?: AppRepositoryHeader_repository$data,
  +$fragmentRefs: AppRepositoryHeader_repository$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AppRepositoryHeader_repository",
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
          "name": "login",
          "storageKey": null
        }
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "Repository",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '6798a0464695b700d351a9c72b066987';

module.exports = node;
