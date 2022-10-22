module.exports = {
    type: 'postgres',
    host: 'bp-pg-db', // Changer en localhost dans un environnement local.
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'bp-pg-db',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true, // Changer en true quand une entité est modifiée pour que les changements s'appliquent. docker logs -f backend pour vérifier les erreurs de démarrage s'il y a lieu
    logging: true,
    migrationsTableName: 'custom_migration_table',
    migrations: ['dist/migration/*{.ts,.js}'],
    cli: {
        migrationsDir: 'migration',
    },
    seeds: ['dist/src/database/seeds/*.js'],
    factories: ['dist/src/database/factories/*.js'],
};
