import { Module, RequestMethod, MiddlewareConsumer } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { PodcastsModule } from "./podcast/podcasts.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Podcast } from "./podcast/entities/podcast.entity";
import { Episode } from "./podcast/entities/episode.entity";
import { Review } from "./podcast/entities/review.entity";
import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";
import { JwtModule } from "./jwt/jwt.module";
import { JwtMiddleware } from "./jwt/jwt.middleware";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === "production",
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production", "test")
          .required(),
      }),
    }),
    TypeOrmModule.forRoot({
      ...(process.env.DATABASE_URL
        ? { type: "postgres", url: process.env.DATABASE_URL }
        : {
            type: "sqlite",
            database: "db.sqlite3",
          }),
      synchronize: true,
      logging: process.env.NODE_ENV === "development",
      entities: [Podcast, Episode, User, Review],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      context: ({ req }) => {
        return { user: req["user"] };
      },
    }),
    JwtModule.forRoot({
      privateKey:
        process.env.JWT_PRIVATE_KEY ?? "R5KLyzlKSElntjQPVUFFPcgiplg7q2Lg",
    }),
    PodcastsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: "/graphql",
      method: RequestMethod.ALL,
    });
  }
}
