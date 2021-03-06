import { API } from '../middleware/apimiddleware';
import { schema } from 'normalizr';

// Normalizr schemas
const categorySchema = new schema.Entity('categories', undefined, {
  idAttribute: 'category_id'
});
const categoriesSchema = new schema.Array(categorySchema);

const currentUserSchema = new schema.Entity(
  'currentUser',
  {
    category: [categorySchema]
  },
  { idAttribute: 'user_id' }
);

const itemSchema = new schema.Entity(
  'items',
  {
    category: categorySchema
  },
  {
    idAttribute: 'item_id'
  }
);
const itemsSchema = new schema.Array(itemSchema);

const likedItemSchema = new schema.Entity(
  'likedItems',
  {
    category: categorySchema
  },
  {
    idAttribute: 'item_id'
  }
);
const likedItemsSchema = new schema.Array(likedItemSchema);

const getUserFriendSchema = new schema.Entity('friends', undefined, {
  idAttribute: 'user_id'
});
const getUserFriendsSchema = new schema.Array(getUserFriendSchema);

// ----------------------------------------------------

export const getCurrentUserData = () => ({
  type: 'GET_CURRENT_USER_DATA',
  [API]: {
    url: '/me',
    schema: currentUserSchema
  }
});

export const getAllCategories = () => ({
  type: 'GET_ALL_CATEGORIES',
  [API]: {
    url: '/categories',
    schema: categoriesSchema
  }
});

export const getAllRecommendedItems = () => ({
  type: 'GET_ALL_RECOMMENDED_ITEMS',
  [API]: {
    url: '/items/recommended',
    schema: itemsSchema
  }
});

export const getLikedItems = user_id => ({
  type: 'GET_LIKED_ITEMS',
  [API]: {
    url: `/users/${user_id}/items`,
    schema: likedItemsSchema
  }
});

export const getFriendsLikedItems = user_id => ({
  type: 'GET_FRIENDS_LIKED_ITEMS',
  [API]: {
    url: `/users/${user_id}/items`,
    schema: likedItemsSchema
  },
  user_id
});

export const getUserFriends = () => ({
  type: 'GET_USER_FRIENDS',
  [API]: {
    url: '/me/friends',
    schema: getUserFriendsSchema
  }
});

export const selectACategory = category_id => ({
  type: 'SELECT_A_CATEGORY',
  category_id,
  [API]: {
    method: 'PUT',
    url: `/me/categories/${category_id}`
  }
});

export const deselectACategory = category_id => ({
  type: 'DESELECT_A_CATEGORY',
  category_id,
  [API]: {
    method: 'DELETE',
    url: `/me/categories/${category_id}`
  }
});

export const setItemAffinity = (item_id, affinity) => ({
  type: 'SET_ITEM_AFFINITY',
  loading: true,
  [API]: {
    method: 'PUT',
    url: `/items/${item_id}/like/${affinity}`,
    schema: likedItemSchema
  }
});
