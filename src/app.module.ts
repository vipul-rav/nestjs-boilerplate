import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SampleAPIModule } from './sample-api/sample-api.module';
import configuration from './config/configuration';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { TransactionInterceptor } from './interceptors/transaction.interceptor';
import { NestDrizzleModule } from './drizzle/drizzle.module';
import * as schema from './drizzle/schema';

const drizzleModule =
  process.env.ENABLE_DRIZZLE === 'true'
    ? NestDrizzleModule.forRootAsync({
        useFactory: () => {
          if (!process.env.DATABASE_URL) {
            //TODO: commented out for development, but should be uncommented in production
            //throw new Error('DATABASE_URL environment variable is not set');
            console.warn(
              'DATABASE_URL environment variable is not set, using default value',
            );
          }
          return {
            driver: 'postgres-js',
            url: process.env.DATABASE_URL as string,
            options: { schema },
            migrationOptions: { migrationsFolder: './migration' },
          };
        },
      })
    : null;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      ignoreEnvVars: process.env.NODE_ENV === 'production',
      load: [configuration],
      isGlobal: true,
    }),
    ...(drizzleModule ? [drizzleModule] : []),
    SampleAPIModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionInterceptor,
    },
  ],
})
export class AppModule {}
