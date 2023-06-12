import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUser } from '../entities/appuser.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(AppUser)
    private usersRepository: Repository<AppUser>,
  ) { }

  create(email: string, password: string, first_name: string, last_name: string) {
    const user = this.usersRepository.create({ email, password, first_name, last_name, balance: 100 });

    return this.usersRepository.save(user);
  }

  findAll(): Promise<AppUser[] | []> {
    return this.usersRepository.find();
  }

  async findEmail(email: string): Promise<AppUser | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findMe(id: string): Promise<AppUser | null> {
    return this.usersRepository.findOneBy({ id });
  }

  deposit(id: string, amount: number): any {
    return this.usersRepository.update({ id }, {balance: amount});
  }
}
