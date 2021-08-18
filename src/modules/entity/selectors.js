import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import get from "lodash/get";

import EntitySchema from "./schema";

const getEntities = state => state.entities;

const getAll = () =>
  createSelector(
    getEntities,
    (state, props) => props.entity,
    (state, props) => get(state.entity, `${props.entity}.${props.name}`, []),
    (state, props) => props.primaryKey,
    (state, props) => props.relations,
    (entities, entityName, data, primaryKey, relations) => {
      const { ids, isFetched, meta } = data;
      const normalized = denormalize(
        { [entityName]: ids },
        { [entityName]: [EntitySchema(entityName, primaryKey, relations)] },
        { ...entities, [entityName]: get(entities, entityName, {}) }
      );

      return {
        items: get(normalized, entityName, []),
        isFetched,
        meta
      };
    }
  );

const getOne = () =>
  createSelector(
    getEntities,
    (state, props) => props.entity,
    (state, props) => get(state.entity, `${props.entity}.${props.name}One`, {}),
    (state, props) => props.primaryKey,
    (state, props) => props.relations,
    (state, props) => props.id,
    (entities, entityName, data, primaryKey, relations, id) => {
      const { isFetched } = data;
      const normalized = denormalize(
        { [entityName]: id ? id : data.id },
        { [entityName]: EntitySchema(entityName, primaryKey, relations) },
        { ...entities, [entityName]: get(entities, entityName, {}) }
      );
      return {
        isFetched,
        item: get(normalized, entityName, {})
      };
    }
  );

const getInfo = () =>
  createSelector(
    getEntities,
    (state, { entity }) => entity,
    (state, { entity = "info", name }) => get(state.entity, `${entity}.${name}Info`, []),
    (entities, entityName, data) => {
      const { items = [], isFetched } = data;

      return {
        items,
        isFetched
      };
    }
  );

export default {
  getAll,
  getOne,
  getInfo
};
