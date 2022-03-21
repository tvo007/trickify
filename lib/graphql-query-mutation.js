export const ALL_SAMPLERS_QUERY = `
query getAllSamplers {
    Samplers(sort: "-date_created") {
      created_by
      id
      name
      runtime
      uploaded_at
      url
    }
  }
`;

export const SAMPLER_QUERY = `
query getSamplerById($id: ID!) {
    Samplers_by_id(id: $id) {
      created_by
      id
      name
      runtime
      uploaded_at
      url
      scenes(sort: "timestamp") {
        date_created
        date_updated
        id
        timestamp
        tricks
      }
    }
  }
  
`;

// export const POST_QUERY = `
//     query getOnePage($id: ID!) {
//         page(id: $id) {
//         data {
//         id
//         attributes {
//             title
//             content_blocks {
//             data {
//                 id
//                 attributes {
//                 content
//                 }
//             }
//             }
//         }
//         }
//     }
//     }
// `;

export const CREATE_SCENE_MUTATION = `
  mutation createScene ($timestamp: Int!, $tricks: String!, $id: ID! ) {
    create_Scenes_item(data: {timestamp: $timestamp, tricks: $tricks, sampler_id: {id: $id}}) {
      date_created
      date_updated
      timestamp
      tricks
      id
    }
  }
`;

export const CREATE_POST_MUTATION = `
mutation createPost($title: String!) {
  create_Posts_item(data: {status: "Published", title: $title}) {
    date_created
    date_updated
    id
    status
    title
    content
  }
}
`;

// export const CREATE_POST_MUTATION = `
//     mutation createPage($title: String!) {
//         createPage( data: { title: $title }) {
//         data {
//             id
//             attributes {
//             title
//             }
//         }
//         }
//     }
// `;

export const UPDATE_CONTENT_MUTATION = `
  mutation updatePostContent($content: String!, $id: ID!) {
    update_Posts_item(data: {content: $content}, id: $id) {
      content
      date_created
      date_updated
      id
      sort
      status
      title
    }
  }

`;

export const UPDATE_PAGE_MUTATION = `
    mutation updatePage($id: ID!, $title: String!) {
        updatePage(id: $id, data: { title: $title }) {
        data {
            id
            attributes {
            title
            }
        }
        }
    }
`;

export const DELETE_PAGE_MUTATION = `
    mutation deletePage($id: ID!) {
        deletePage(id: $id) {
        data {
            id
            attributes {
            title
            }
        }
        }
    }
`;

export const CREATE_BLOCK_MUTATION = `
    mutation createContentBlock($content: String!, $pageId: ID!) {
    createContentBlock(data: { content: $content, page: $pageId }) {
      data {
        id
        attributes {
          content
          page {
            data {
              id
            }
          }
        }
      }
    }
  }


`;

export const UPDATE_BLOCK_MUTATION = `
    mutation updateContentBlock($id: ID!, $content: String!) {
        updateContentBlock(id: $id, data: { content: $content }) {
        data {
            id
            attributes {
            content
            }
        }
        }
    }
`;

export const DELETE_BLOCK_MUTATION = `
    mutation deleteContentBlock($id: ID!) {
        deleteContentBlock(id: $id) {
        data {
            id
            attributes {
            content
           
            }
        }
        }
    }

`;
