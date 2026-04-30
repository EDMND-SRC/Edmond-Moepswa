import * as migration_20260406_065751_init from './20260406_065751_init';
import * as migration_20260413_073331_fix_projects_schema from './20260413_073331_fix_projects_schema';

export const migrations = [
  {
    up: migration_20260406_065751_init.up,
    down: migration_20260406_065751_init.down,
    name: '20260406_065751_init',
  },
  {
    up: migration_20260413_073331_fix_projects_schema.up,
    down: migration_20260413_073331_fix_projects_schema.down,
    name: '20260413_073331_fix_projects_schema'
  },
];
