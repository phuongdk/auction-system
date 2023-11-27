import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AppUser } from '../api/users/entities/appuser.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const repository = dataSource.getRepository(AppUser);

    await repository.insert({
      email: 'johndoe@example.com',
      password: '123456',
      first_name: 'John',
      last_name: 'Doe',
      balance: 100
    });
    const userFactory = await factoryManager.get(AppUser);
        // save 1 factory generated entity, to the database
        await userFactory.save();
  }
}