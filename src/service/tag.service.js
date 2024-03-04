import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) => axios.get(`${APIEnum.TAG}?${stringify(query)}`);
export const create = (data) => axios.post(`${APIEnum.TAG}`, data);
export const update = (id, data) => axios.put(`${APIEnum.TAG}/${id}`, data);
export const remove = (id) => axios.delete(`${APIEnum.TAG}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.TAG}/${id}`);
