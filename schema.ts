/*
Full list of fields
https://keystonejs.com/docs/apis/fields

Document fields
https://keystonejs.com/docs/guides/document-fields#how-to-use-document-fields

Relationships
https://keystonejs.com/docs/guides/relationships#understanding-relationships

Auth & access control
https://keystonejs.com/docs/guides/auth-and-access-control
*/

import { list } from "@keystone-6/core";

import {
  text,
  relationship,
  password,
  timestamp,
  select,
  // checkbox,
  integer,
  image,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { Lists } from ".keystone/types";

export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: "Post.author", many: true }),
    },
    ui: {
      listView: {
        initialColumns: ["name", "email", "posts"],
      },
    },
  }),

  Post: list({
    fields: {
      title: text(),
      status: select({
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
        ],
        defaultValue: "draft",
        ui: {
          displayMode: "segmented-control",
        },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineCreate: { fields: ["name", "email"] },
        },
      }),
      tags: relationship({
        ref: "Tag.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] },
        },
        many: true,
      }),
    },
  }),

  Tag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({ ref: "Post.tags", many: true }),
    },
  }),

  Product: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      price: integer({ validation: { isRequired: true } }),
      description: text(),
      image: image(),
      category: relationship({ ref: "Category.products" }),
      // featured: checkbox(),
    },
  }),

  Category: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      products: relationship({ ref: "Product.category", many: true }),
      image: image(),
    },
    ui: {
      listView: {
        initialColumns: ["name"],
      },
    },
  }),

  // TODO: Solution for store owner to not allow orders certain dates
  UnavailableDate: list({
    fields: {
      date: timestamp(),
    },
  }),
};
