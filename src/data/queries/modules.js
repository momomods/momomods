import {
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';
import ModuleType from '../types/ModuleType';
import { Module as ModuleModel } from '../models';

const modules = {
  type: new List(ModuleType),
  args: {
    year: { type: new NonNull(StringType) },
    semester: { type: new NonNull(StringType) },
  },
  async resolve({ request }, { year, semester }) {
    const allMods = await ModuleModel.findAll({
      where: {
        year,
        semester: parseInt(semester, 10),
      },
    });
    return allMods;
  },
};

export default modules;
