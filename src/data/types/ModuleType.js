import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const ModuleType = new ObjectType({
  name: 'Module',
  fields: {
    id: { type: new NonNull(IntType) },
    year: { type: new NonNull(StringType) },
    semester: { type: new NonNull(IntType) },
    code: { type: new NonNull(StringType) },
    title: { type: new NonNull(StringType) },
    description: { type: StringType },
    department: { type: StringType },
    credit: { type: IntType },
    workload: { type: StringType },
    prerequisite: { type: StringType },
    preclusion: { type: StringType },
    examDate: { type: StringType },
    timetable: { type: StringType },
  },
});

export default ModuleType;
