Day 2

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
