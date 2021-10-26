/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RepositoryHeader_repository$ref: FragmentReference;
declare export opaque type RepositoryHeader_repository$fragmentType: RepositoryHeader_repository$ref;
export type RepositoryHeader_repository = {|
  +owner: {|
    +login: string
  |},
  +name: string,
  +nameWithOwner: string,
  +createdAt: any,
  +$refType: RepositoryHeader_repository$ref,
|};
export type RepositoryHeader_repository$data = RepositoryHeader_repository;
export type RepositoryHeader_repository$key = {
  +$data?: RepositoryHeader_repository$data,
  +$fragmentRefs: RepositoryHeader_repository$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RepositoryHeader_repository",
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
(node/*: any*/).hash = 'b7868613169a3ceb4ecd62a0a3916614';

module.exports = node;
