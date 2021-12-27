# Full-stack Typescript boilerplate

I had various ideas dead on arrival because I was so bored having to work on authentication, authorization, and probably payments. This will serve as a starting point for any silly idea I might want to try out.

It also works as a playground, since adding a new package and trying something new is such a breeze.


## Stack (When finished)

- **Nx workspace:** Picking Nx to collocate my packages and share code. 
- **Nest backend:** Although I'm not a fan of decorators, I appreciate that it's opinionated enough and guides me through some decisions. Also has great documentation. 
- **Next frontend:** My preferred way of writing React. Simplifies the development process a lot, and SSR out of the box is great to have.
- **Prisma:** Typesafe ORM, with types that can be shared by both Typescript codebases. 

### What about..
- **Remix:** Promising but too new. Might revisit.
- **Full-stack Next.js:** Feels hacky. Also don't enjoy having my routes/controllers under `/pages`.
- **GraphQL:** It's an overkill for what I'm doing. Also unnecessary config.
- **Any MVC:** I wish - is Adonis good? I don't know.
- **Auth0:** Probably. Had fun writing the auth flow though. Might have to do it eventually.

## Contributing

Honestly, if you have any comments or ideas, I would love to hear them. If there are security holes, or something could be done better, drop me a comment. No need to fix anything - I appreciate the heads up all the same.

Otherwise, here's my roadmap:
https://github.com/dimitrisnl/nest-skeleton/projects/1

## Development

1. Clone the repo
2. Create and populate the `.env` & `docker.env` based on the examples

3. Start docker
```sh
docker compose up
```

4. Run the migrations
```sh
npx prisma migrate dev
```

5. Run in development
```sh
yarn start:dev
```


## Prior art & inspiration

A couple of repositories I monitored to get inspiration:

- https://github.com/VincentJouanne/nest-clean-architecture-ddd-example
- https://github.com/ahmetuysal/nest-hackathon-starter
- https://github.com/notiz-dev/nestjs-prisma-starter
- https://github.com/denlysenko/bookapp
- https://github.com/aulasoftwarelibre/nx-boilerplate
