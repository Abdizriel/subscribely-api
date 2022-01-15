import { Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '@subscribely/core';

export type CountryFindOptions = {
  skip?: number;
  take?: number;
  cursor?: Prisma.CountryWhereUniqueInput;
  where?: Prisma.CountryWhereInput;
  orderBy?: Prisma.CountryOrderByWithRelationInput;
};

@Injectable()
export class CountryRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.country.findUnique({
      where: {
        id,
      },
    });
  }

  async findByIso(iso: string) {
    return this.prisma.country.findFirst({
      where: {
        iso,
      },
    });
  }

  async create(data: Prisma.CountryCreateInput) {
    return this.prisma.country.create({
      data,
    });
  }
}
