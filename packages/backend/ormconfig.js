module.exports = {
  type: 'postgres',
  host: 'bp-pg-db',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'bp-pg-db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  migrationsTableName: 'custom_migration_table',
  migrations: ['dist/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migration',
  },
};
