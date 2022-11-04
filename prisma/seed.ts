import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      avatarUrl: 'https://github.com/makrau.png'
    }
  });

  const poll = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-03T12:00:00.223Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-04T12:00:00.223Z',
      firstTeamCountryCode: 'US',
      secondTeamCountryCode: 'FR',

      guesses: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 3,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: poll.id
              }
            }
          }
        }
      }
    }
  })
}

main()