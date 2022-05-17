module.exports = {
  type: 'postgres',
  host: 'bp-pg-db',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'bp-pg-db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // Changer en true quand une entité est modifiée pour que les changements s'appliquent. docker logs -f backend pour vérifier les erreurs de démarrage s'il y a lieu
  logging: false,
  migrationsTableName: 'custom_migration_table',
  migrations: ['dist/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migration',
  },
};
