import { authorType } from "./author";
import { postType } from "./post";
import { seoType } from "./seo";

// `seoType` is an object type reused by documents, not a document itself; it
// still has to be registered here for `type: "seo"` fields to resolve.
export const schemaTypes = [postType, authorType, seoType];
