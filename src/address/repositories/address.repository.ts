import { Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '@subscribely/core';

export type AddressFindOptions = {
  skip?: number;
  take?: number;
  cursor?: Prisma.AddressWhereUniqueInput;
  where?: Prisma.AddressWhereInput;
  orderBy?: Prisma.AddressOrderByWithRelationInput;
};

@Injectable()
export class AddressRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.address.findUnique({
      where: {
        id,
      },
      include: {
        city: true,
        country: true,
      },
    });
  }

  async findOne(where: Prisma.AddressWhereInput) {
    return this.prisma.address.findFirst({
      where,
      include: {
        city: true,
        country: true,
      },
    });
  }

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AddressWhereUniqueInput;
    where?: Prisma.AddressWhereInput;
    orderBy?: Prisma.AddressOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.address.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        city: true,
        country: true,
      },
    });
  }

  async count(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AddressWhereUniqueInput;
    where?: Prisma.AddressWhereInput;
    orderBy?: Prisma.AddressOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.address.count({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.AddressCreateInput) {
    return this.prisma.address.create({
      data,
      include: {
        city: true,
        country: true,
      },
    });
  }

  async update(params: {
    where: Prisma.AddressWhereUniqueInput;
    data: Prisma.AddressUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.address.update({
      data,
      where,
      include: {
        city: true,
        country: true,
      },
    });
  }

  async delete(where: Prisma.AddressWhereUniqueInput) {
    return this.prisma.address.delete({
      where,
      include: {
        city: true,
        country: true,
      },
    });
  }
}
