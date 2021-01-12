import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Episode } from './episode/entities/episode.entity';
import { EpisodesModule } from './episode/episodes.module';
import { JwtMidddlware } from './jwt/jwt.middleware';
import { JwtModule } from './jwt/jwt.module';
import { JwtService } from './jwt/jwt.service';
import { Podcast } from './podcast/entities/podcast.entity';
import { PodcastsModule } from './podcast/podcasts.module';
import { Users } from './user/entities/user.entity';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.string().required(),
        POSTGRES_USERNAME: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => {
        return { user: req.user };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      logging: process.env.NODE_ENV === 'development',
      entities: [Users, Podcast, Episode],
      synchronize: true, // take care of this on production
    }),
    JwtModule.forRoot({ jwtSecret: process.env.JWT_SECRET }),
    AuthModule,
    UsersModule,
    PodcastsModule,
    EpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMidddlware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
