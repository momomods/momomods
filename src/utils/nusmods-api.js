import config from '../constants/modsConfig';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

const ayBaseUrl = `${config.apiBaseUrl}/${config.academicYear.replace('/', '-')}`;

const NUSModsApi = {
  ayBaseUrl: () => ayBaseUrl,
  // List of modules for the entire acad year.
  moduleListUrl: () => (
    `${ayBaseUrl}/moduleList.json`
  ),
  // Module for that acad year. Not tied to any semester.
  moduleDetailsUrl: (moduleCode) => (
    `${ayBaseUrl}/modules/${moduleCode}.json`
  ),
};

export default NUSModsApi;
