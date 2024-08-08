import { Project, User } from "../types";

export const isManager = (managerID: Project['manager'], userID: User['_id']) => managerID === userID