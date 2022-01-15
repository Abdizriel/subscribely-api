import { Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '@subscribely/core';

export type CityFindOptions = {
  skip?: number;
  take?: number;
  cursor?: Prisma.CityWhereUniqueInput;
  where?: Prisma.CityWhereInput;
  orderBy?: Prisma.CityOrderByWithRelationInput;
};

@Injectable()
export class CityRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.city.findUnique({
      where: {
        id,
      },
    });
  }

  async findByName(name: string) {
    return this.prisma.city.findFirst({
      where: {
        name,
      },
    });
  }

  async create(data: Prisma.CityCreateInput) {
    return this.prisma.city.create({
      data,
    });
  }
}
