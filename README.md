# Day 2

Today's challenge is based on the videos #2.0 to #2.3.

Today you have to build a simple, but sexy REST API.

This api has to have the following methods:

```
GET /podcasts
POST /podcasts
GET /podcasts/:id
PATCH /podcasts/:id
DELETE /podcasts/:id
GET /podcasts/:id/episodes
POST /podcasts/:id/episodes
PATCH /podcasts/:id/episodes/:episodeId
DELETE /podcasts/:id/episodes/:episodeId
```

This is how the podcast.entity should look like:

```
class Podcast {
id: number;
title: string;
category: string;
rating:number;
episodes:Episode[]
}
```

You have to create the Episode entity.
You have to create a Podcast Service and implement your own database.
ALL endpoints should work.
Create podcasts.service, podcasts.controllers and episode.entity

# Day 8

Your score is: 12/12

**QUESTION 1 OF 12**  
CORRECT  
What is an Entity in TypeORM?

Is a class that maps to a DB Table

**QUESTION 2 OF 12**  
CORRECT  
Can I put a decorator on top of another decorator?

Yes

**QUESTION 3 OF 12**  
CORRECT  
What does synchronize do?

Updates the Database to reflect the TypeORM @Columns

**QUESTION 4 OF 12**  
CORRECT  
Should we do synchronize:true in production?

No

**QUESTION 5 OF 12**  
CORRECT  
What are 'Active Record' and 'Data Mapper'?

They are data access patterns to access the objects on the Database

**QUESTION 6 OF 12**  
CORRECT  
Why do we use Data Mapper with NestJS

Because NestJS has many built-in tools to work with Repositories

**QUESTION 7 OF 12**  
CORRECT  
What are mapped types?

Classes that allow us to generate a type from another type with transformations

**QUESTION 8 OF 12**  
CORRECT  
What does PickType do?

Extends a class with only the fields that we choose.

**QUESTION 9 OF 12**  
CORRECT  
What does OmitType do?

Extends a class without the fields that we choose.

**QUESTION 10 OF 12**  
CORRECT  
What does PartialType do?

Extends a class with all fields not required.

**QUESTION 11 OF 12**  
CORRECT  
What do these decorators do?

```
 **@Column** ()
 **@Field** (type => String)
 **@IsString** ()
```

@Column is for the DB, @Field is for GraphQL, @IsString is for validation

**QUESTION 12 OF 12**  
CORRECT  
Can I combine PickType with PartialType?

Yes.
